mod prisma;
use std::borrow::Cow;
use std::collections::HashMap;
use std::fs::File;
use std::io::BufReader;
use std::io::BufWriter;
use std::io::Cursor;
use std::sync::Arc;
use std::sync::Mutex;

#[allow(unused)]
use actix_web::web;
use actix_web::web::Data;
use actix_web::App;
use actix_web::HttpResponse;
use actix_web::HttpServer;
use image::DynamicImage;
use image::ImageOutputFormat;
use nokhwa::pixel_format::RgbFormat;
use nokhwa::query;
use nokhwa::utils::ApiBackend;
use nokhwa::utils::CameraIndex;
use nokhwa::utils::RequestedFormat;
use nokhwa::utils::RequestedFormatType;
// use eye::hal::format::PixelFormat;
// use eye::hal::traits::{Context, Device, Stream};
// use eye::hal::PlatformContext;
use base64::prelude::*;
use image::ImageBuffer;
use image::Pixel;
use image::Rgb;
use nokhwa::Camera;
use prisma::contents;
use prisma::PrismaClient;
use prisma_client_rust::chrono::Utc;
use prisma_client_rust::Direction;
use reqwest::Body;
struct AppState {
    db: PrismaClient,
    // camera: Arc<Mutex<Camera>>,
    idx: CameraIndex,
    // stream: Arc<Mutex<eye::hal::platform::Stream<'a>>>,
    // desc: eye::hal::stream::Descriptor,
}
#[actix_web::get("/contents")]
async fn get_contents(data: Data<AppState>) -> HttpResponse {
    // println!("get_contents");
    match data
        .db
        .contents()
        .find_many(vec![])
        .order_by(contents::insertion_date::order(Direction::Asc))
        .exec()
        .await
    {
        Ok(e) => HttpResponse::Accepted().json(e),
        Err(e) => HttpResponse::InternalServerError().body(e.to_string()),
    }
}

#[actix_web::get("/pull_out")]
async fn pull_out(data: Data<AppState>) -> HttpResponse {
    match data.db.contents().find_many(vec![]).exec().await {
        Ok(e) => HttpResponse::Accepted().json(e),
        Err(e) => HttpResponse::InternalServerError().body(e.to_string()),
    }
}
#[actix_web::get("/do")]
async fn do_something(data: Data<AppState>) -> HttpResponse {
    let mut camera = Camera::new(
        data.idx.clone(),
        RequestedFormat::new::<RgbFormat>(RequestedFormatType::None),
    )
    .unwrap();
    let frame = camera.frame().unwrap().decode_image::<RgbFormat>().unwrap();
    let img = DynamicImage::ImageRgb8(frame);

    let mut buf = Vec::new();
    img.write_to(&mut Cursor::new(&mut buf), ImageOutputFormat::Jpeg(80))
        .unwrap();
    let res = reqwest::Client::new()
        .post("https://api.logmeal.com/v2/image/segmentation/complete/v1.0")
        .bearer_auth(include_str!(
            "C:\\Users\\thajd\\eyeFridge\\backend\\logmeal.env"
        ))
        .multipart(
            reqwest::multipart::Form::new().part(
                "image",
                reqwest::multipart::Part::bytes(Cow::from(buf.clone()))
                    .file_name("image.jpg")
                    .mime_str("image/jpeg")
                    .unwrap(),
            ),
        )
        .send()
        .await
        .unwrap();

    let proc = res
        .json::<HashMap<String, serde_json::Value>>()
        .await
        .unwrap();
    let image_data = proc.get("processed_image_size").unwrap();

    let result = proc.get("segmentation_results").unwrap();
    let center = result[0].get("center").unwrap();
    let ty = result[0].get("recognition_results").unwrap()[0]
        .get("name")
        .unwrap();
    if (center.get("x").unwrap().as_u64().unwrap()
        > image_data.get("width").unwrap().as_u64().unwrap() / 2)
    {
        println!("right");
        data.db
            .contents()
            .create(ty.to_string(), Utc::now().into(), vec![])
            .exec()
            .await
            .unwrap();
    } else {
        println!("left");
        data.db
            .pull_out()
            .create(ty.to_string(), Utc::now().into(), vec![])
            .exec()
            .await
            .unwrap();
    }
    HttpResponse::Ok()
        .content_type("text/html;charset=utf-8")
        .body(format!(
            include_str!("index.html"),
            BASE64_STANDARD.encode(buf),
            result.to_string(),
        ))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let stdin = std::io::stdin();
    let cameras = query(ApiBackend::Auto).unwrap();
    println!("{:#?}", cameras);
    let mut s = String::new();
    stdin.read_line(&mut s).unwrap();
    let idx = s.trim().parse::<u32>().unwrap();
    let cidx = CameraIndex::Index(idx);
    let format = RequestedFormat::new::<RgbFormat>(RequestedFormatType::None);
    let mut camera = Camera::new(cidx.clone(), format).unwrap();
    let frame = camera.frame().unwrap();
    let decoded = frame.decode_image::<RgbFormat>().unwrap();
    let img = DynamicImage::ImageRgb8(decoded);
    img.save("image.jpg").unwrap();
    println!("Image saved");
    let client = web::Data::new(AppState {
        db: PrismaClient::_builder().build().await.unwrap(),
        idx: cidx,
    });

    HttpServer::new(move || {
        App::new()
            .app_data(client.clone())
            .service(get_contents)
            .service(pull_out)
            .service(do_something)
    })
    .bind(("127.0.0.1", 3001))?
    .run()
    .await
}

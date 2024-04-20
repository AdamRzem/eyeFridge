mod prisma;
use std::sync::Arc;
use std::sync::Mutex;

#[allow(unused)]
use actix_web::web;
use actix_web::web::Data;
use actix_web::App;
use actix_web::HttpResponse;
use actix_web::HttpServer;
use nokhwa::pixel_format::RgbFormat;
use nokhwa::query;
use nokhwa::utils::ApiBackend;
use nokhwa::utils::CameraIndex;
use nokhwa::utils::RequestedFormat;
use nokhwa::utils::RequestedFormatType;
// use eye::hal::format::PixelFormat;
// use eye::hal::traits::{Context, Device, Stream};
// use eye::hal::PlatformContext;
use image::ImageBuffer;
use image::Pixel;
use image::Rgb;
use nokhwa::Camera;
use prisma::contents;
use prisma::PrismaClient;
use prisma_client_rust::Direction;
struct AppState {
    db: PrismaClient,
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
    HttpResponse::Ok().body("Hello world!")
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
    let mut camera = Camera::new(cidx, format).unwrap();
    let frame = camera.frame().unwrap();
    let decoded = frame.decode_image::<RgbFormat>().unwrap();
    decoded.save("test.jpg").unwrap();
    let client = web::Data::new(AppState {
        db: PrismaClient::_builder().build().await.unwrap(),
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

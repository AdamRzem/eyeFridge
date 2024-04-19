mod prisma;
#[allow(unused)]
use actix_web::web;
use actix_web::web::Data;
use actix_web::App;
use actix_web::HttpResponse;
use actix_web::HttpServer;
use prisma::contents;
use prisma::PrismaClient;
use prisma_client_rust::Direction;
#[actix_web::get("/contents")]
async fn get_contents(db: Data<PrismaClient>) -> HttpResponse {
    println!("get_contents");
    match db
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
async fn pull_out(db: Data<PrismaClient>) -> HttpResponse {
    match db.contents().find_many(vec![]).exec().await {
        Ok(e) => HttpResponse::Accepted().json(e),
        Err(e) => HttpResponse::InternalServerError().body(e.to_string()),
    }
}
#[actix_web::get("/do")]
async fn do_something() -> HttpResponse {
    HttpResponse::Ok().body("Hello world!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let client = web::Data::new(PrismaClient::_builder().build().await.unwrap());

    HttpServer::new(move || App::new().app_data(client.clone()).service(get_contents).service(pull_out).service(do_something))
        .bind(("127.0.0.1", 3001))?
        .run()
        .await
}

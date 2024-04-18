mod prisma;

use prisma::contents;
use prisma::PrismaClient;
use prisma_client_rust::chrono::{DateTime, Local};
use serde::de::Error;

#[tokio::main]
async fn main() {
    let client = PrismaClient::_builder().build().await.unwrap();
    let data = client
        .contents()
        .create("huj".to_string(), Local::now().into(), vec![])
        .exec()
        .await
        .unwrap();
    println!("{:?}", data);
    // Ok(())
}

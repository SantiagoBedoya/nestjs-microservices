import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

// Create a logger instance
const logger = new Logger("Main");

// Create the microservice options Object - TCP
const microserviceOptions: MicroserviceOptions = {
  // transport: Transport.TCP,
  // options: {
  //   host: "127.0.0.1",
  //   port: 8877,
  // }
  // transport: Transport.REDIS,
  // options: {
  //   url: "redis://localhost:6379",
  // }
  transport: Transport.GRPC,
  options: {
    package: "app",
    protoPath: join(__dirname, "app.proto"),
  }
}


async function bootstrap() {
  console.log(join(__dirname, "app.proto"));
  const app = await NestFactory.createMicroservice(AppModule, microserviceOptions)

  await app.listen()
  logger.log("Microservice is listening...");
}
bootstrap();

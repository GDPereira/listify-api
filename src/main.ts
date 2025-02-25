import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get("PORT");

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const origin = [/localhost:\d+/];

  app.enableCors({ origin, credentials: true });

  await app.listen(port);
}
bootstrap();

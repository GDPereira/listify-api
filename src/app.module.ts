import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { PasetoService } from "./paseto/paseto.service";
import { PasetoModule } from "./paseto/paseto.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get("MONGODB_URL"),
        dbName: configService.get("MONGODB_NAME"),
        user: configService.get("MONGODB_USER"),
        pass: configService.get("MONGODB_PASSWORD"),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    PasetoModule,
  ],
  controllers: [AppController],
  providers: [AppService, PasetoService],
})
export class AppModule {}

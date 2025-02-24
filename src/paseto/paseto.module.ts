import { Module } from "@nestjs/common";
import { PasetoService } from "./paseto.service";
import { PasetoGuard } from "./paseto.guard";

@Module({
  providers: [PasetoService, PasetoGuard],
  exports: [PasetoService, PasetoGuard],
})
export class PasetoModule {}

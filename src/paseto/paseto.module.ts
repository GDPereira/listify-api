import { Module } from '@nestjs/common';
import { PasetoService } from './paseto.service';

@Module({
  providers: [PasetoService],
})
export class PasetoModule {}

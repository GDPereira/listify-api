import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PasetoService } from './paseto.service';

@Injectable()
export class PasetoGuard implements CanActivate {
  constructor(private pasetoService: PasetoService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.paseto;

    if (!token) {
      return false;
    }

    try {
      const payload = await this.pasetoService.verifyToken(token);
      request.user = payload;
      return true;
    } catch (err) {
      console.log('err :>> ', err);
      return false;
    }
  }
}

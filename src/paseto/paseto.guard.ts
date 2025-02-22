import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { PasetoService } from './paseto.service';

@Injectable()
export class PasetoGuard implements CanActivate {
  constructor(private pasetoService: PasetoService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.paseto;

    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      const payload = await this.pasetoService.verifyToken(token);
      request.user = payload;
      return true;
    } catch (err) {
      console.error('err :>> ', err);
      throw new UnauthorizedException('Invalid token');
    }
  }
}

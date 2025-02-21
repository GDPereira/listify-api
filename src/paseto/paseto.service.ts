import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPrivateKey, createPublicKey, KeyObject } from 'crypto';
import { V4 } from 'paseto';

@Injectable()
export class PasetoService {
  private readonly privateKey: KeyObject;
  private readonly publicKey: KeyObject;

  constructor(private readonly configService: ConfigService) {
    this.privateKey = createPrivateKey(
      this.configService.get('PASETO_PRIVATE_KEY'),
    );

    this.publicKey = createPublicKey(
      this.configService.get('PASETO_PUBLIC_KEY'),
    );
  }

  async createToken(payload: Record<PropertyKey, unknown>, expiresIn?: string) {
    return V4.sign(payload, this.privateKey, {
      expiresIn: expiresIn ?? '24h',
    });
  }

  async verifyToken(token: string) {
    const valid = await V4.verify(token, this.publicKey);
    console.log('valid :>> ', valid);
    return valid;
  }
}

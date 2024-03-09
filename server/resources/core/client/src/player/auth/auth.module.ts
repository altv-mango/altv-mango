import { Module } from '@altv-mango/client';
import { AuthController } from './auth.controller';

@Module({
    controllers: [AuthController],
})
export class AuthModule {}

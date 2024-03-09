import { Module } from '@altv-mango/server';
import { AuthController } from './auth.controller';

@Module({
    controllers: [AuthController],
})
export class AuthModule {}

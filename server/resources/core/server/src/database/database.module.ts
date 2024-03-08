import { Global, Module } from '@altv-mango/server';
import { DatabaseService } from './database.service';

@Global()
@Module({
    providers: [DatabaseService],
    exports: [DatabaseService],
})
export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test/test.controller';
import { KcController } from './kc/kc.controller';

@Module({
  imports: [],
  controllers: [AppController, TestController, KcController],
  providers: [AppService],
})
export class AppModule {}

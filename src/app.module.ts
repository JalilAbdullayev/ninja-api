import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NinjaModule } from './ninja/ninja.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [NinjaModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

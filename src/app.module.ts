import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { AppController } from '~/app.controller'
import { AppService } from '~/app.service'
import { AudioModule } from '~/audio/audio.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'static'),
    // }),
    BullModule.forRootAsync({
      useFactory: () => ({
        redis: {
          host: 'localhost',
          port: 6379,
        },
      }),
    }),
    AudioModule,
    BullModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { ExpressAdapter as BullBoardExpressAdapter } from '@bull-board/express'
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { AudioService } from './audio.service'
import { AudioController } from './audio.controller'
import { BullModule, InjectQueue } from '@nestjs/bull'
import { AudioConsumer } from './audio.consumer'
import { Queue } from 'bull'

@Module({
  imports: [
    // BullModule.registerQueueAsync({
    //   useFactory: () => ({
    //     name: 'audio',
    //     redis: {
    //       port: 6379,
    //       host: 'localhost',
    //     },
    //     processors: [],
    //   }),
    // }),
    BullModule.registerQueue({
      name: 'audio',
      redis: {
        port: 6379,
        host: 'localhost',
      },
    }),
  ],
  providers: [AudioService, AudioConsumer],
  controllers: [AudioController],
})
export class AudioModule {
  private bullBoardExpressAdapter: BullBoardExpressAdapter

  constructor(@InjectQueue('audio') private readonly audioQueue: Queue) {
    this.bullBoardExpressAdapter = new BullBoardExpressAdapter()

    createBullBoard({
      queues: [new BullAdapter(this.audioQueue)],
      serverAdapter: this.bullBoardExpressAdapter,
    })
  }
}

import { NestFactory } from '@nestjs/core'
import compression from 'compression'
import expressBasicAuth from 'express-basic-auth'
import { AppModule } from './app.module'
import { Queue } from 'bull'
import { createBullBoard } from 'bull-board'
import { BullAdapter } from 'bull-board/bullAdapter'

const bqueue = (strs?: TemplateStringsArray, name?: string) =>
  `BullQueue_${name}`

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(compression())

  const queue = app.get<Queue>(bqueue`${'audio'}`)
  const bullBoard = createBullBoard([new BullAdapter(queue)])
  app.use('/bull', bullBoard.router)

  // app.use(
  //   '/',
  //   expressBasicAuth({
  //     users: {
  //       admin: 'admin123',
  //     },
  //     challenge: true,
  //   })
  // )
  await app.listen(3000)
}
bootstrap()

import { Queue } from 'bull'
import { createBullBoard } from 'bull-board'
import { BullAdapter } from 'bull-board/bullAdapter'
import compression from 'compression'
import expressBasicAuth from 'express-basic-auth'

import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module'

const bqueue = (strs?: TemplateStringsArray, name?: string) =>
  `BullQueue_${name}`

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(compression())

  const config = new DocumentBuilder()
    .setTitle('네스트JS, Queue')
    .setDescription('The Queue API description')
    .setVersion('1.0')
    .addTag('queue')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

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

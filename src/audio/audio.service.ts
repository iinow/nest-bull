import { Queue } from 'bull'

import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AudioService {
  constructor(@InjectQueue('audio') private audioQueue: Queue) {}

  addTask(name: string) {
    console.log(name)
    this.audioQueue.add(name, { foo: 'bar' })
  }
}

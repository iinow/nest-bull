import { Job } from 'bull'

import { OnQueueActive, Process, Processor } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'

@Processor('audio')
export class AudioConsumer {
  // @Process()
  executeTask(job: Job<unknown>) {
    console.log(job.data)
  }

  @Process('ko')
  executeTaskKo(job: Job<unknown>) {
    console.log('ko', job.data)
  }
}

import { Controller, Get, Injectable, Param, Query } from '@nestjs/common'
import { AudioService } from './audio.service'

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Get()
  addQueueTask(@Query('name') name: string) {
    this.audioService.addTask(name)
  }
}

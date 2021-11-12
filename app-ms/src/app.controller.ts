import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';


@Controller()
export class AppController {
  private _logger: Logger = new Logger();
  constructor(private readonly appService: AppService) {}

  // Define the message pattern for this method
  @MessagePattern("add")
  async accumulate(data: number[]) {
    this._logger.log("Adding " + data.toString());
    return this.appService.accumulate(data);
  }
}

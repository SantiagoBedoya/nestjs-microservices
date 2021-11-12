import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  private _logger: Logger = new Logger();
  constructor(private readonly appService: AppService) {}

  @Post("add")
  async accumulate(@Body("data") data: number[]) {
    this._logger.log("Adding " + data.toString());
    return this.appService.accumulate(data);
  }
}

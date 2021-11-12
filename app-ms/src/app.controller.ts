import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { GrpcMethod, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

interface INumberArray {
  data: number[];
}

interface ISumOfNumberArray {
  sum: number;
}

@Controller()
export class AppController {
  private _logger: Logger = new Logger();
  constructor(private readonly appService: AppService) {}

  // Define the message pattern for this method

  // @MessagePattern("add") // For Redis or TCP
  // accumulate(data: number[]) {
  //   this._logger.log("Adding " + data.toString());
  //   return this.appService.accumulate(data);
  // }
  @GrpcMethod("AppController", "Accumulate")
  accumulate(numberArray: INumberArray, metadata: any): ISumOfNumberArray {
    this._logger.log("Adding " + numberArray.data.toString());
    return { sum: this.appService.accumulate(numberArray.data) };
  }
}

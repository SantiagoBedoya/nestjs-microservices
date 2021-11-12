import { Body, Controller, Get, Logger, OnModuleInit, Post } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
// import { AppService } from './app.service';
import { IGrpcService } from './grpc.interface';
import { microserviceOptions } from './grpc.options';


@Controller()
export class AppController implements OnModuleInit {

  private _logger: Logger = new Logger();

  @Client(microserviceOptions)
  private client: ClientGrpc;

  private grpcService: IGrpcService;

  // for TCP or REDIS
  // constructor(private readonly appService: AppService) {}

  onModuleInit() {
    this.grpcService = this.client.getService<IGrpcService>("AppController")
  }

  @Post("add")
  async accumulate(@Body("data") data: number[]) {
    this._logger.log("Adding " + data.toString());
    // return this.appService.accumulate(data);
    return this.grpcService.accumulate({ data })
  }
}

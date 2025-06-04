import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoreModule } from "./modules/core/core.module";

@Module({
    imports: [CoreModule],
    controllers: [AppController],
    providers: [AppService],
    exports:[]
})
export class AppModule{}
import {Body, Controller, Post} from "@nestjs/common";

@Controller('creature')
export class AttributeController {
    @Post()
    createBeast(@Body() createBeast) {

    }
}
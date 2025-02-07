import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {UserService} from "../services/user.service";
import {JwtAuthGuard} from "../../auth/guards/jwt.guard";
import {UpdateProfileDto, UserProfileDto} from "../dtos/user-profile.dto";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getUserProfile(
        @Req() req: any
    ): Promise<UserProfileDto> {
        return this.userService.getUserProfile(req.user.id)
    }

    @Post('profile/update')
    @UseGuards(JwtAuthGuard)
    updateProfile(@Req() req: any, @Body() payload: UpdateProfileDto): Promise<any> {
        return this.userService.updateProfile(req.user.id, payload)
    }
}

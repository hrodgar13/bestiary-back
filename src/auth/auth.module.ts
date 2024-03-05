import {Module} from '@nestjs/common';
import {AuthService} from './services/auth.service';
import {AuthController} from './controllers/auth.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";
import {LocalStrategy} from "./strategies/local.startegy";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {APP_GUARD} from "@nestjs/core";
import {RolesGuard} from "./guards/roles.guard";
import {Request} from "./entities/messages.entity";
import {RequestController} from "./controllers/request.controller";
import {RequestService} from "./services/request.service";

@Module({
    controllers: [
        AuthController,
        RequestController,
    ],
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forFeature([User, Request]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [
        AuthService,
        RequestService,
        LocalStrategy,
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: RolesGuard
        }
    ],
})
export class AuthModule {
}

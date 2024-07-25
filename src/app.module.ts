import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CreatureModule} from './creature/creature.module';
import {MulterModule} from '@nestjs/platform-express';
import {AuthModule} from './auth/auth.module';
import {User} from './auth/entities/user.entity';
import {Creature} from "./creature/entities/creature.entity";
import {ActionsAbilities} from "./creature/entities/actions-abilities.entity";
import {StatBlock} from "./creature/entities/stat-block.entity";
import {Translation} from "./creature/entities/translation.entity";
import {Attribute} from "./creature/entities/attribute.entity";
import {Measure} from "./creature/entities/measure.entity";
import {FileUploadService} from "./creature/services/file-upload.service";
import {FileUploadController} from "./creature/contollers/file-upload.controller";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {Request} from "./auth/entities/messages.entity";
import {UserProfile} from "./user/entities/user-profile.entity";
import {Universe} from "./user/entities/universe.entity";
import {DungeonSubscription} from "./user/entities/dungeon.subscription";
import {UniverseCategory} from "./user/entities/universe-category.entity";
import {UniverseCategoryItem} from "./user/entities/universe-category-item.entity";
import {UniverseHat} from "./user/entities/universe-hat.entity";
import {UniverseStructureParagraph} from "./user/entities/universe-stucture-paragraph.entity";
import {UserController} from "./user/controllers/user.controller";
import {UserService} from "./user/services/user.service";

@Module({
    imports: [
        CreatureModule,
        AuthModule,
        MulterModule.register({dest: './uploads'}),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: 'localhost',
                port: +configService.get<number>('TYPEORM_PORT'),
                username: configService.get('TYPEORM_USERNAME'),
                password: configService.get('TYPEORM_PASSWORD'),
                database: configService.get('TYPEORM_DATABASE'),
                entities: [
                    User,
                    Creature,
                    ActionsAbilities,
                    StatBlock,
                    Translation,
                    Attribute,
                    Measure,
                    Request,
                    DungeonSubscription,
                    Universe,
                    UniverseCategory,
                    UniverseCategoryItem,
                    UniverseHat,
                    UniverseStructureParagraph,
                    UserProfile,
                ],
                synchronize: true,
            }),
            inject: [ConfigService]
        }),
        TypeOrmModule.forFeature([
            User,
            Creature,
            ActionsAbilities,
            StatBlock,
            Translation,
            Attribute,
            Measure,
            Request,
            DungeonSubscription,
            Universe,
            UniverseCategory,
            UniverseCategoryItem,
            UniverseHat,
            UniverseStructureParagraph,
            UserProfile,
        ]),
    ],
    controllers: [
        AppController,
        FileUploadController,
        UserController
    ],
    providers: [
        AppService,
        FileUploadService,
        UserService
    ],
})
export class AppModule {
}

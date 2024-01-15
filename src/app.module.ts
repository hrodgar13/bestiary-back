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

@Module({
    imports: [
        CreatureModule,
        AuthModule,
        MulterModule.register({dest: './uploads'}),
        TypeOrmModule.forRoot({
            type: "postgres",
            url: 'postgres://junaapxa:YO4gMLgHu9FG70RCqacAJIDpri3TnKeG@snuffleupagus.db.elephantsql.com/junaapxa',
            logging: true,
            entities: [
                User,
                Creature,
                ActionsAbilities,
                StatBlock,
                Translation,
                Attribute,
                Measure,
            ],
            synchronize: true,
        }),
    ],
    controllers: [
        AppController,
        FileUploadController
    ],
    providers: [
        AppService,
        FileUploadService
    ],
})
export class AppModule {
}

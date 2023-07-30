import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CreatureModule} from './creature/creature.module';
import {Creature} from "./creature/entities/creature.entity";
import {Images} from "./creature/entities/images.entity";
import {Size} from "./creature/entities/size.entity";
import {Type} from "./creature/entities/type.entity";
import {Aligment} from "./creature/entities/aligment.entity";
import {ArmorClass} from "./creature/entities/armor-class.entity";
import {SpeedModifier} from "./creature/entities/speed-modifier.entity";
import {StatBlock} from "./creature/entities/stat-block.entity";
import {SavingThrowModifier} from "./creature/entities/saving-throw-modifier.entity";
import {SkillModifier} from "./creature/entities/skill-modifier.entity";
import {DamageType} from "./creature/entities/damage-type.entity";
import {Statement} from "./creature/entities/statement.entity";
import {FeelModifiers} from "./creature/entities/feels-modifier.entity";
import {Language} from "./creature/entities/language.entity";
import {Action} from "./creature/entities/action.entity";
import {Ability} from "./creature/entities/abilities.entity";
import {Speed} from "./creature/entities/speed.entity";
import {Skill} from "./creature/entities/skill.entity";
import {SavingThrow} from "./creature/entities/saving-throw.entity";
import {Feel} from "./creature/entities/feel.entity";
import {MulterModule} from "@nestjs/platform-express";
import {AuthModule} from './auth/auth.module';
import {User} from "./auth/entities/user.entity";

@Module({
    imports: [
        CreatureModule,
        AuthModule,
        MulterModule.register({dest: './uploads'}),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'ViribusUnitis.sqlite',
            entities: [Creature, Images, Size, Type, Aligment, ArmorClass, SpeedModifier, StatBlock, SavingThrowModifier, SkillModifier, DamageType, Statement, FeelModifiers, Language, Ability, Action, Speed, Skill, SavingThrow, Feel, User],
            synchronize: true
        })
    ],
    controllers: [AppController],
    providers: [
        AppService
    ],
})
export class AppModule {
}

import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {Creature} from "./entities/creature.entity";
import {ActionsAbilities} from "./entities/actions-abilities.entity";
import {StatBlock} from "./entities/stat-block.entity";
import {Translation} from "./entities/translation.entity";
import {Attribute} from "./entities/attribute.entity";
import {Measure} from "./entities/measure.entity";
import {AttributeController} from "./contollers/attribute.controller";
import {AttributeService} from "./services/attribute.service";
import {CreatureController} from "./contollers/creature.controller";
import {CreatureService} from "./services/creature.service";

@Module({
    controllers: [
        AttributeController,
        CreatureController
    ],
    providers: [
        AttributeService,
        CreatureService
    ],
    exports: [],
    imports: [
        TypeOrmModule.forFeature([
            Creature,
            ActionsAbilities,
            StatBlock,
            Translation,
            Attribute,
            Measure,
        ]),
    ],
})
export class CreatureModule {
}

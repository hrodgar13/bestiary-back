import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {Creature} from "./entities/creature.entity";
import {ActionsAbilities} from "./entities/actions-abilities.entity";
import {StatBlock} from "./entities/stat-block.entity";
import {Translation} from "./entities/translation.entity";
import {Attribute} from "./entities/attribute.entity";
import {Measure} from "./entities/measure.entity";

@Module({
    controllers: [],
    providers: [],
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

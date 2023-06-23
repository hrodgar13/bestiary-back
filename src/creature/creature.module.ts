import {Module} from "@nestjs/common";
import {CreatureController} from "./controllers/creature.controller";
import {CreatureService} from "./services/creature.service";

@Module({
  controllers: [CreatureController],
  providers: [CreatureService]
})
export class CreatureModule {}

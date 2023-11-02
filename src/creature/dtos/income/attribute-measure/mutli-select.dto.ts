import { CreatureAttributeMeasureDto } from './creature-measure.dto';
import {ImmunitiesDamageMeasure} from "../../../entities/attribute-measure/immunities-damage-measure.entity";
import {VulnerabilitiesDamageMeasure} from "../../../entities/attribute-measure/vulnerabilities-damage-measure.entity";
import {SpeedsMeasure} from "../../../entities/attribute-measure/speeds-measure.entity";
import {ResistsDamageMeasure} from "../../../entities/attribute-measure/resists-damage-measure.entity";
import {FeelingsMeasure} from "../../../entities/attribute-measure/feelings-measure.entity";
import {SavingThrowMeasure} from "../../../entities/attribute-measure/saving-throw-measure.entity";
import {SkillsMeasure} from "../../../entities/attribute-measure/skills.measure";
import {ConditionsMeasure} from "../../../entities/attribute-measure/conditions-measure.entity";
import {LanguagesMeasure} from "../../../entities/attribute-measure/languages.measure";
import {RegionsMeasure} from "../../../entities/attribute-measure/regions-measure.entity";

export enum MultiFieldsENUM {
  vulnerabilities = 'vulnerabilities',
  immunities = 'immunities',
  speeds = 'speeds',
  resists = 'resists',
  feelings = 'feelings',
  savingThrows = 'savingThrows',
  skills = 'skills',
  conditionsImmunities = 'conditionsImmunities',
  languages = 'languages',
  regions = 'regions',
}

export class MutliSelectDto {
  [MultiFieldsENUM.immunities]: CreatureAttributeMeasureDto[];
  [MultiFieldsENUM.vulnerabilities]: CreatureAttributeMeasureDto[];
  [MultiFieldsENUM.speeds]: CreatureAttributeMeasureDto[];
  [MultiFieldsENUM.resists]: CreatureAttributeMeasureDto[];
  [MultiFieldsENUM.feelings]: CreatureAttributeMeasureDto[];
  [MultiFieldsENUM.savingThrows]: CreatureAttributeMeasureDto[];
  [MultiFieldsENUM.skills]: CreatureAttributeMeasureDto[];
  [MultiFieldsENUM.conditionsImmunities]?: CreatureAttributeMeasureDto[];
  [MultiFieldsENUM.languages]: CreatureAttributeMeasureDto[];
  [MultiFieldsENUM.regions]: CreatureAttributeMeasureDto[];
}

import { CreatureAttributeMeasureDto } from './creature-measure.dto';

export enum MultiFieldsENUM {
  vulnerabilities = 'vulnerabilities',
  immunities = 'immunities',
  speeds = 'speeds',
  resists = 'resists',
  feelings = 'feelings',
  savingThrows = 'saving-throws',
  skills = 'skills',
  conditionsImmunities = 'conditions-immunities',
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

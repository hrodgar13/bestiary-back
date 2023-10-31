import {
  Column,
  Entity, JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Translation } from './translations/translation.entity';
import { Alignment } from './attributes/alignment.entity';
import { Type } from './attributes/type.entity';
import { Size } from './attributes/size.entity';
import { ArmorTag } from './attributes/armor-tag.entity';
import { MultiFieldsENUM } from '../dtos/income/attribute-measure/mutli-select.dto';
import { ImmunitiesDamageMeasure } from './attribute-measure/immunities-damage-measure.entity';
import { VulnerabilitiesDamageMeasure } from './attribute-measure/vulnerabilities-damage-measure.entity';
import { ResistsDamageMeasure } from './attribute-measure/resists-damage-measure.entity';
import { SpeedsMeasure } from './attribute-measure/speeds-measure.entity';
import { FeelingsMeasure } from './attribute-measure/feelings-measure.entity';
import { SavingThrowMeasure } from './attribute-measure/saving-throw-measure.entity';
import { SkillsMeasure } from './attribute-measure/skills.measure';
import { ConditionsMeasure } from './attribute-measure/conditions-measure.entity';
import { LanguagesMeasure } from './attribute-measure/languages.measure';
import { Ability } from './actions-abilities/abilities.entity';
import { RegionsMeasure } from './attribute-measure/regions-measure.entity';
import { ActionsAbilitiesENUM } from '../dtos/income/actions/action-ability-block.dto';
import { Action } from './actions-abilities/action.entity';
import { BonusAction } from './actions-abilities/bonus-action.entity';
import { LegendaryAction } from './actions-abilities/legendary-action.entity';

@Entity()
export class Creature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isFinished: boolean;

  @OneToOne(() => Translation, {cascade: true})
  @JoinColumn()
  creatureName: Translation;

  @ManyToOne(() => Alignment, (alignment) => alignment.creatures)
  alignment: Alignment;

  @ManyToOne(() => Type, (type) => type.creatures)
  type: Type;

  @ManyToOne(() => Size, (size) => size.creatures)
  size: Size;

  @Column()
  armorClass: number;

  @ManyToOne(() => ArmorTag, (armorTag) => armorTag.creatures)
  armorTag: ArmorTag;

  @Column({ nullable: true })
  hits: number;

  @Column({ nullable: true })
  hitsInDice: string;

  @Column({ nullable: true })
  strength: number;

  @Column({ nullable: true })
  dexterity: number;

  @Column({ nullable: true })
  construction: number;

  @Column({ nullable: true })
  intelligence: number;

  @Column({ nullable: true })
  wisdom: number;

  @Column({ nullable: true })
  charisma: number;

  @Column({ nullable: true })
  dangerLevel: number;

  @Column({ nullable: true })
  experience: string;

  @Column({ nullable: true })
  masteryBonus: number;

  @OneToOne(() => Translation, {cascade: true})
  @JoinColumn()
  description: Translation;

  @OneToMany(() => ImmunitiesDamageMeasure, (idm) => idm.creature, {cascade: true})
  [MultiFieldsENUM.immunities]: ImmunitiesDamageMeasure[];

  @OneToMany(() => VulnerabilitiesDamageMeasure, (vdm) => vdm.creature, {cascade: true})
  [MultiFieldsENUM.vulnerabilities]: VulnerabilitiesDamageMeasure[];

  @OneToMany(() => ResistsDamageMeasure, (rdm) => rdm.creature, {cascade: true})
  [MultiFieldsENUM.resists]: ResistsDamageMeasure[];

  @OneToMany(() => SpeedsMeasure, (speeds) => speeds.creature, {cascade: true})
  [MultiFieldsENUM.speeds]: SpeedsMeasure[];

  @OneToMany(() => FeelingsMeasure, (feelings) => feelings.creature, {cascade: true})
  [MultiFieldsENUM.feelings]: FeelingsMeasure[];

  @OneToMany(() => SavingThrowMeasure, (st) => st.creature, {cascade: true})
  [MultiFieldsENUM.savingThrows]: SavingThrowMeasure[];

  @OneToMany(() => SkillsMeasure, (skill) => skill.creature, {cascade: true})
  [MultiFieldsENUM.skills]: SkillsMeasure[];

  @OneToMany(() => ConditionsMeasure, (condition) => condition.creature, {cascade: true})
  [MultiFieldsENUM.conditionsImmunities]: ConditionsMeasure[];

  @OneToMany(() => LanguagesMeasure, (lang) => lang.creature, {cascade: true})
  [MultiFieldsENUM.languages]: LanguagesMeasure[];

  @OneToMany(() => RegionsMeasure, (rm) => rm.creature, {cascade: true})
  [MultiFieldsENUM.regions]: RegionsMeasure[];

  @OneToMany(() => Ability, (ability) => ability.creature, {cascade: true})
  [ActionsAbilitiesENUM.abilities]: Ability[];

  @OneToMany(() => Action, (action) => action.creature, {cascade: true})
  [ActionsAbilitiesENUM.actions]: Action[];

  @OneToMany(() => BonusAction, (action) => action.creature, {cascade: true})
  [ActionsAbilitiesENUM.bonusActions]: BonusAction[];

  @OneToMany(() => LegendaryAction, (action) => action.creature, {cascade: true})
  [ActionsAbilitiesENUM.legendaryActions]: LegendaryAction[];
}

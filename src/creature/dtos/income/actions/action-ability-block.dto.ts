import { ActionAbilityDto } from './action-ability.dto';

export enum ActionsAbilitiesENUM {
  abilities = 'abilities',
  actions = 'actions',
  bonusActions = 'bonusActions',
  legendaryActions = 'legendaryActions',
}
export class ActionsAndAbilitiesAmount {
  [ActionsAbilitiesENUM.abilities]: ActionAbilityDto[];
  [ActionsAbilitiesENUM.actions]: ActionAbilityDto[];
  [ActionsAbilitiesENUM.bonusActions]: ActionAbilityDto[];
  [ActionsAbilitiesENUM.legendaryActions]: ActionAbilityDto[];
}

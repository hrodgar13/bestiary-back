import { ActionAbilityDto } from './action-ability.dto';

export enum ActionsAbilitiesENUM {
  abilities = 'abilities',
  actions = 'actions',
  bonusActions = 'bonus-actions',
  legendaryActions = 'legendary-actions',
}
export class ActionsAndAbilitiesAmount {
  [ActionsAbilitiesENUM.abilities]: ActionAbilityDto[];
  [ActionsAbilitiesENUM.actions]: ActionAbilityDto[];
  [ActionsAbilitiesENUM.bonusActions]: ActionAbilityDto[];
  [ActionsAbilitiesENUM.legendaryActions]: ActionAbilityDto[];
}

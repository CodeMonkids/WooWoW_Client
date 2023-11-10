export enum CharacterClass {
  'BANDIT' = '도적',
  'WIZARD' = '마법사',
  'PALADIN' = '성기사',
  'PRIEST' = '사제',
  'DARK_WIZARD' = '흑마법사',
  'HUNTER' = '사냥꾼',
  'DRUID' = '드루이드',
  'WARRIOR' = '전사',
}

export interface Stat {
  name: string;
  effective: string | number | undefined;
}

export interface StatList {
  left: Stat[];
  right: Stat[];
}

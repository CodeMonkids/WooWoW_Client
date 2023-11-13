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

export enum Quality {
  COMMON = '일반',
  UNIQUE = '고급',
  RARE = '희귀',
  EPIC = '영웅',
  DEFAULT = 'default',
}

export enum Dir {
  RIGHT = 'right',
  LEFT = 'left',
  TOP = 'top',
  BOTTOM = 'bottom',
}
  
export interface Stat {
  name: string;
  effective: string | number | undefined;
}

export interface StatList {
  left: Stat[];
  right: Stat[];
}

export enum Parts {
  '머리' = '머리',
  '목' = '목',
  '어깨' = '어깨',
  '등' = '등',
  '가슴' = '가슴',
  '속옷' = '속옷',
  '겉옷' = '겉옷',
  '손목' = '손목',
  '손' = '손',
  '허리' = '허리',
  '다리' = '다리',
  '발' = '발',
  '반지 1' = '반지 1',
  '반지 2' = '반지 2',
  '장신구 1' = '장신구 1',
  '장신구 2' = '장신구 2',
  '주장비' = '주장비',
  '보조장비' = '보조장비',
  '원거리 장비' = '원거리 장비',
}

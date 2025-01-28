export enum Theme {
  Green = 'green',
  Yellow = 'yellow',
  Cyan = 'cyan',
  Navy = 'navy',
  Red = 'red',
  Purple = 'purple',
  Pink = 'pink',
  Turquoise = 'turquoise',
  Brown = 'brown',
  Magenta = 'magenta',
  Blue = 'blue',
  NavyGrey = 'navy-grey',
  ArmyGreen = 'army-green',
  Gold = 'gold',
  Orange = 'orange',
}

export interface Pot {
  name: string;
  target: string;
  theme: Theme;
  totalSaved: number;
}

export interface Config {
  headers: {Authorization: string}
}

export interface Credentials {
  email: string
  password: string
}
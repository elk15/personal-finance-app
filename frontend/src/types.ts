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

export interface Config {
  headers: {Authorization: string}
}

export interface Credentials {
  email: string
  password: string
}

export type LoadingState = 'idle' | 'pending' | 'succeeded' | 'failed'

export interface UserData {
  token?: string
  email: string
  name: string
  balance: number
}

export interface UserState {
  userInfo: UserData | null
  userToken: string | null
  balance: number
  loadingStatus: {
    [key: string]: LoadingState
  }
  error: {
    [key: string]: string | null
  }
}

export interface ItemState {
  data: Pot[]
  loadingStatus: {
    [key: string]: LoadingState
  }
  error: {
    [key: string]: string | null
  }
}

export interface Pot {
  id: string;
  name: string;
  target: number;
  theme: Theme;
  totalSaved: number;
}

export type PotWithoutId = Omit<Pot, 'id'>
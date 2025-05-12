export type Country = {
  id: number;
  name: string;
  emoji: string;
  code: string;
  continent?: Continent;
}

export type Continent = {
  id: number;
  name: string;
}
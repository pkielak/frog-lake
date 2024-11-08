export type Gender = "male" | "female";

export interface Field {
  x: number;
  y: number;
  id?: number;
  gender?: Gender;
}

export type FrogType = Required<Frog>;

export class Frog implements FrogType {
  x: number;
  y: number;
  id: number;
  gender: Gender;

  constructor(x: number, y: number, id: number, gender: Gender) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.gender = gender;
  }
}

export class Lake {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

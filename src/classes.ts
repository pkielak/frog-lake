export class Frog {
  x: number;
  y: number;
  id: number;
  gender: "male" | "female";

  constructor(x: number, y: number, id: number, gender: "male" | "female") {
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

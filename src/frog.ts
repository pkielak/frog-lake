export type Char = "tall" | "short" | "fat" | "slim";
export type Gender = "male" | "female";

export default class Frog {
  x: number;
  y: number;
  gender: Gender;
  chars: [Char, Char];

  constructor(x: number, y: number, gender: Gender, chars: [Char, Char]) {
    this.x = x;
    this.y = y;
    this.gender = gender;
    this.chars = chars;
  }

  jump(x: number, y: number) {
    const range = this.gender === "male" ? 3 : 2;

    if (Math.abs(x - this.x) <= range && Math.abs(y - this.y) <= range) {
      this.x = x;
      this.y = y;
    }
  }
}

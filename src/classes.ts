export type Gender = "male" | "female";

export interface Field {
  x: number;
  y: number;
  id?: number;
  gender?: Gender;
}

export type FrogType = Required<Field>;

export class Frog implements FrogType {
  x: number;
  y: number;
  id: number;
  gender: Gender;
  #radius: number;

  constructor(x: number, y: number, id: number, gender: Gender) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.gender = gender;
    this.#radius = this.gender === "male" ? 3 : 2;
  }

  canJump(x?: number, y?: number) {
    return (
      x !== undefined &&
      y !== undefined &&
      Math.abs(x - this.x) <= this.#radius &&
      Math.abs(y - this.y) <= this.#radius
    );
  }

  canReproduce(otherFrog: Frog) {
    return (
      this.gender !== otherFrog.gender &&
      Math.abs(this.x - otherFrog.x) <= 1 &&
      Math.abs(this.y - otherFrog.y) <= 1
    );
  }

  jump(x: number, y: number, frogs: Frog[], setFrogs: (frogs: Frog[]) => void) {
    return setFrogs([
      ...frogs.filter((frog) => frog.id !== this.id),
      new Frog(x, y, this.id, this.gender),
    ]);
  }

  #newFrogPosition(
    motherX: number,
    motherY: number,
    frogs: Frog[],
    lake: Lake
  ) {
    let x: number | undefined;
    let y: number | undefined;
    const directions = [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x: -1, y: 1 },
      { x: -1, y: 0 },
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
    ];

    for (let i = 0; i < directions.length; i++) {
      const newX = motherX + directions[i].x;
      const newY = motherY + directions[i].y;

      if (
        newX < lake.x &&
        newX >= 0 &&
        newY < lake.y &&
        newY >= 0 &&
        !frogs.some((frog) => frog.x === newX && frog.y === newY)
      ) {
        x = newX;
        y = newY;
        break;
      }
    }

    return {
      x,
      y,
    };
  }

  #getRandomGender() {
    const genders = ["male", "female"];

    const genderIndex = Math.round(Math.random());

    return genders[genderIndex] as Gender;
  }

  reporduce(frogs: Frog[], lake: Lake, setFrogs: (rogs: Frog[]) => void) {
    const { x, y } = this.#newFrogPosition(this.x, this.y, frogs, lake);

    if (x !== undefined && y !== undefined) {
      const frog = new Frog(x, y, frogs.length, this.#getRandomGender());
      return setFrogs([...frogs, frog]);
    }

    if (!Number.isInteger(x) || !Number.isInteger(x)) {
      alert(`Can't reproduce`);
    }
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

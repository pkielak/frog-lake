import { useMemo } from "react";
import { useLakeContext } from "../LakeContext";
import { Field, Frog, Gender } from "../classes";

export default function Actions() {
  const { lake, frogs, selectedFields, setFrogs, setSelectedFields } =
    useLakeContext();

  const selectedFrogs = useMemo(
    () => selectedFields.filter((field) => typeof field.id === "number"),
    [selectedFields]
  );

  const currentFrog = useMemo(
    () => frogs.find((frog) => frog.id === selectedFrogs[0]?.id),
    [selectedFrogs]
  );

  const selectedEmptyFields = useMemo(
    () => selectedFields.filter((field) => typeof field.id !== "number"),
    [selectedFields]
  );

  const canJump = useMemo(
    () =>
      currentFrog &&
      selectedEmptyFields[0] &&
      Math.abs(selectedEmptyFields[0].x - currentFrog.x) <=
        (currentFrog.gender === "male" ? 3 : 2) &&
      Math.abs(selectedEmptyFields[0].y - currentFrog.y) <=
        (currentFrog.gender === "male" ? 3 : 2),
    [currentFrog, selectedEmptyFields]
  );

  const canReproduce = useMemo(() => {
    return (
      selectedFrogs.length === 2 &&
      selectedFrogs[0]?.gender !== selectedFrogs[1]?.gender &&
      Math.abs(selectedFrogs[0]?.x - selectedFrogs[1]?.x) <= 1 &&
      Math.abs(selectedFrogs[0]?.y - selectedFrogs[1]?.y) <= 1
    );
  }, [selectedFrogs]);

  function onJump() {
    if (canJump && currentFrog) {
      const frog = new Frog(
        selectedEmptyFields[0].x,
        selectedEmptyFields[0].y,
        currentFrog.id,
        currentFrog.gender
      );
      setFrogs([
        ...frogs.filter((frog) => frog.id !== selectedFrogs[0].id),
        frog,
      ]);
      setSelectedFields([]);
    }
  }

  function newFrogPosition(motherX: number, motherY: number) {
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

    if (!Number.isInteger(x) || !Number.isInteger(x)) {
      alert(`Can't reproduce`);
    }

    return {
      x,
      y,
    };
  }

  function getRandomGender() {
    const genders = ["male", "female"];

    const genderIndex = Math.round(Math.random());

    console.log(genderIndex);

    return genders[genderIndex] as Gender;
  }

  function onReporduce() {
    if (canReproduce) {
      const { x: motherX, y: motherY } = selectedFrogs.find(
        (frog) => frog.gender === "female"
      ) as Field;
      const { x, y } = newFrogPosition(motherX, motherY);

      if (typeof x === "number" && typeof y === "number") {
        const frog = new Frog(x, y, frogs.length, getRandomGender());
        setFrogs([...frogs, frog]);
        setSelectedFields([]);
      }
    }
  }

  return (
    <div className="actions">
      <h3>Legend</h3>
      <ul>
        <li>
          <span className="frog male"></span>
          <strong>Frog male</strong>
        </li>
        <li>
          <span className="frog female"></span>
          <strong>Frog female</strong>
        </li>
      </ul>

      <h3>Actions</h3>
      <button type="button" id="jump" onClick={onJump} disabled={!canJump}>
        Jump
      </button>
      <button
        type="button"
        id="reproduce"
        onClick={onReporduce}
        disabled={!canReproduce}
      >
        Reproduce
      </button>
    </div>
  );
}

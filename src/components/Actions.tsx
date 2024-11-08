import { useMemo } from "react";
import { useLakeContext } from "../LakeContext";
import { Frog } from "../classes";

export default function Actions() {
  const { frogs, selectedFields, setFrogs, setSelectedFields } =
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

  const canReproduce = useMemo(
    () =>
      selectedFrogs.length === 2 &&
      selectedFrogs[0].gender !== selectedFrogs[1].gender,
    [selectedFrogs]
  );

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
      <button type="button" id="reproduce" disabled={!canReproduce}>
        Reproduce
      </button>
    </div>
  );
}

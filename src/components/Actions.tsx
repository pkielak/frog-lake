import { useMemo } from "react";
import { useLakeContext } from "../LakeContext";
import { Frog } from "../classes";

export default function Actions() {
  const { frogs, selected, setFrogs, setSelected } = useLakeContext();

  const selectedFrogs = useMemo(
    () => selected.filter((selection) => typeof selection.id === "number"),
    [selected]
  );

  const currentFrog = useMemo(
    () => frogs.find((frog) => frog.id === selectedFrogs[0]?.id),
    [selectedFrogs]
  );

  const selectedFields = useMemo(
    () => selected.filter((selection) => typeof selection.id !== "number"),
    [selected]
  );

  const canJump = useMemo(
    () =>
      currentFrog &&
      selectedFields[0] &&
      Math.abs(selectedFields[0].x - currentFrog.x) <=
        (currentFrog.gender === "male" ? 3 : 2) &&
      Math.abs(selectedFields[0].y - currentFrog.y) <=
        (currentFrog.gender === "male" ? 3 : 2),
    [currentFrog, selectedFields]
  );

  function onJump() {
    if (currentFrog) {
      const frog = new Frog(
        selectedFields[0].x,
        selectedFields[0].y,
        currentFrog.id,
        currentFrog.gender
      );
      setFrogs([
        ...frogs.filter((frog) => frog.id !== selectedFrogs[0].id),
        frog,
      ]);
      setSelected([]);
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
      <button type="button" id="reproduce" disabled={selectedFrogs.length < 2}>
        Reproduce
      </button>
    </div>
  );
}

import { useMemo } from "react";

import { useLakeContext } from "../../LakeContext";
import { Frog } from "../../classes";
import Description from "./Description/Description";

import styles from "./Actions.module.css";

export default function Actions() {
  const { lake, frogs, selectedFields, setFrogs, setSelectedFields } =
    useLakeContext();

  const selectedFrogFields = useMemo(
    () => selectedFields.filter((field) => typeof field.id === "number"),
    [selectedFields]
  );

  const currentFrog = useMemo(
    () => frogs.find((frog) => frog.id === selectedFrogFields[0]?.id),
    [selectedFrogFields]
  );

  const selectedEmptyFields = useMemo(
    () => selectedFields.filter((field) => typeof field.id !== "number"),
    [selectedFields]
  );

  const canJump = useMemo(
    () =>
      currentFrog?.canJump(
        selectedEmptyFields?.[0]?.x,
        selectedEmptyFields?.[0]?.y
      ),
    [currentFrog, selectedEmptyFields]
  );

  const canReproduce = useMemo(() => {
    return (
      currentFrog &&
      selectedFrogFields.length === 2 &&
      currentFrog.canReproduce(selectedFrogFields[1] as Frog)
    );
  }, [selectedFrogFields]);

  function onJump() {
    if (canJump && currentFrog) {
      currentFrog.jump(
        selectedEmptyFields[0].x,
        selectedEmptyFields[0].y,
        frogs,
        setFrogs
      );
      setSelectedFields([]);
    }
  }

  function onReporduce() {
    if (canReproduce) {
      const motherField = selectedFrogFields.find(
        (frog) => frog.gender === "female"
      );

      const motherFrog = frogs.find((frog) => frog.id === motherField?.id);

      motherFrog && motherFrog.reporduce(frogs, lake, setFrogs);
      setSelectedFields([]);
    }
  }

  return (
    <div className={styles.actions}>
      <div className={styles.container}>
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
      </div>

      <div className={styles.container}>
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

      <Description />
    </div>
  );
}

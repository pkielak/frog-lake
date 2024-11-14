import { useLakeContext } from "../../LakeContext";
import { Frog } from "../../classes";

import styles from "./Lake.module.css";

function LakeCell({
  frog,
  selectedFields,
  onSelect,
}: {
  frog?: Frog;
  selectedFields: boolean;
  onSelect: () => void;
}) {
  return (
    <td>
      <label
        className={
          frog &&
          `frog ${frog?.gender} ${frog?.traits?.height} ${frog?.traits?.weight}`
        }
      >
        <input type="checkbox" onChange={onSelect} checked={selectedFields} />
      </label>
    </td>
  );
}

export default function LakeComponent() {
  const { lake, frogs, selectedFields, setSelectedFields } = useLakeContext();

  function findFrog(col: number, row: number) {
    return frogs.find((frog) => frog.x === col && frog.y === row);
  }

  function isCellSelected(col: number, row: number) {
    return selectedFields.some((field) => field.x === col && field.y === row);
  }

  function onSelect(col: number, row: number) {
    const isSelected = selectedFields.some(
      (field) => field.x === col && field.y === row
    );
    const frog = findFrog(col, row);

    setSelectedFields([
      ...(isSelected
        ? selectedFields.filter((field) => field.x !== col && field.y !== row)
        : [...selectedFields, { ...(frog ? frog : {}), x: col, y: row }]),
    ]);
  }

  return (
    <table id="lake" className={styles.lake}>
      <tbody>
        {Array.from({ length: lake.y }, (_, row) => (
          <tr key={`row-${row}`}>
            {Array.from({ length: lake.x }, (_, col) => (
              <LakeCell
                key={`col-${row}${col}`}
                frog={findFrog(col, row)}
                selectedFields={isCellSelected(col, row)}
                onSelect={() => onSelect(col, row)}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

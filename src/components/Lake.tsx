import { useLakeContext } from "../LakeContext";
import { Field, Frog, Lake } from "../classes";

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
      <label className={frog && `frog ${frog?.gender}`}>
        <input type="checkbox" onChange={onSelect} checked={selectedFields} />
      </label>
    </td>
  );
}

export default function LakeComponent() {
  const { frogs, selectedFields, setSelectedFields } = useLakeContext();
  const lake = new Lake(10, 6);

  function isCellSelected(col: number, row: number) {
    return selectedFields.some((field) => field.x === col && field.y === row);
  }

  function onSelect(col: number, row: number, frog?: Frog) {
    const isSelected = selectedFields.some(
      (field) => field.x === col && field.y === row
    );

    setSelectedFields([
      ...(isSelected
        ? selectedFields.filter((field) => field.x !== col && field.y !== row)
        : [...selectedFields, { x: col, y: row, id: frog?.id } as Field]),
    ]);
  }

  return (
    <table id="lake">
      <thead>
        <tr>
          <th colSpan={lake.x}>Lake</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: lake.y }, (_, row) => (
          <tr key={`row-${row}`}>
            {Array.from({ length: lake.x }, (_, col) => {
              const frog = frogs.find(
                (frog) => frog.x === col && frog.y === row
              );
              return (
                <LakeCell
                  key={`col-${row}${col}`}
                  frog={frog}
                  selectedFields={isCellSelected(col, row)}
                  onSelect={() => onSelect(col, row, frog)}
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

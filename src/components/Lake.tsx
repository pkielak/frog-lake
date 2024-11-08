import { Selection, useLakeContext } from "../LakeContext";
import { Frog, Lake } from "../classes";

function LakeCell({
  frog,
  selected,
  onSelect,
}: {
  frog?: Frog;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <td>
      <label className={frog && `frog ${frog?.gender}`}>
        <input type="checkbox" onChange={onSelect} checked={selected} />
      </label>
    </td>
  );
}

export default function LakeComponent() {
  const { frogs, selected, setSelected } = useLakeContext();
  const lake = new Lake(10, 6);

  function isCellSelected(col: number, row: number) {
    return selected.some(
      (selection) => selection.x === col && selection.y === row
    );
  }

  function onSelect(col: number, row: number, frog?: Frog) {
    const isSelected = selected.some(
      (selection) => selection.x === col && selection.y === row
    );

    setSelected([
      ...(isSelected
        ? selected.filter(
            (selection) => selection.x !== col && selection.y !== row
          )
        : [...selected, { x: col, y: row, id: frog?.id } as Selection]),
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
                  selected={isCellSelected(col, row)}
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

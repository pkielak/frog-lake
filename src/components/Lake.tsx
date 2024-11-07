import Frog from "../frog";

export default function Lake() {
  const rows = 6;
  const columns = 10;
  let frogs = [
    new Frog(0, 0, "male", ["fat", "short"]),
    new Frog(1, 0, "female", ["slim", "tall"]),
  ];

  function LakeCell({ frog }: { frog?: "frog male" | "frog female" }) {
    return (
      <td>
        <label className={frog}>
          <input type="checkbox" />
        </label>
      </td>
    );
  }

  return (
    <table id="lake">
      <thead>
        <tr>
          <th colSpan={columns}>Lake</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }, (_, row) => (
          <tr key={`row-${row}`}>
            {Array.from({ length: columns }, (_, col) => {
              const currentFrog = frogs.find(
                (frog) => frog.x === col && frog.y === row
              );

              return (
                <LakeCell
                  key={`col-${row}${col}`}
                  frog={currentFrog && `frog ${currentFrog.gender}`}
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

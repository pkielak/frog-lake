import "./App.css";

import Description from "./components/Description";
import Lake from "./components/Lake";
import Actions from "./components/Actions";
import { LakeProvider } from "./LakeContext";

function App() {
  return (
    <LakeProvider>
      <Description />
      <Lake />
      <Actions />
    </LakeProvider>
  );
}

export default App;

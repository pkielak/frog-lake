import "./App.css";

import Lake from "./components/Lake/Lake";
import { LakeProvider } from "./LakeContext";
import Nav from "./components/Nav/Nav";
import Actions from "./components/Actions/Actions";

function App() {
  return (
    <LakeProvider>
      <div className="app">
        <Nav />
        <Lake />
        <Actions />
      </div>
    </LakeProvider>
  );
}

export default App;

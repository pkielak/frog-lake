import React, { createContext, useContext, useState } from "react";
import { Frog } from "./classes";

export type Selection = { x: number; y: number; id?: number };

interface LakeContextType {
  frogs: Frog[];
  selected: Selection[];
  setFrogs: (frogs: Frog[]) => void;
  setSelected: (selection: Selection[]) => void;
}

const LakeContext = createContext<LakeContextType | undefined>(undefined);

export const initialState = [
  new Frog(0, 0, 0, "male"),
  new Frog(1, 0, 1, "female"),
];

export const useLakeContext = () => {
  const context = useContext(LakeContext);
  if (context === undefined) {
    throw new Error("useLakeContext must be used within a UserProvider");
  }
  return context;
};

export const LakeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [frogs, setFrogs] = useState(initialState);
  const [selected, setSelected] = useState<Selection[]>([]);

  return (
    <LakeContext.Provider value={{ frogs, selected, setFrogs, setSelected }}>
      {children}
    </LakeContext.Provider>
  );
};

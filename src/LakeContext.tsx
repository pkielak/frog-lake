import React, { createContext, useContext, useState } from "react";
import { Field, Frog, Lake } from "./classes";

interface LakeContextType {
  lake: Lake;
  frogs: Frog[];
  selectedFields: Field[];
  setFrogs: (frogs: Frog[]) => void;
  setSelectedFields: (field: Field[]) => void;
}

const LakeContext = createContext<LakeContextType | undefined>(undefined);

export const initialState = [
  new Frog(0, 0, 0, "male", { height: "short", weight: "fat" }),
  new Frog(1, 0, 1, "female", { height: "tall", weight: "slim" }),
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
  const lake = new Lake(10, 6);
  const [selectedFields, setSelectedFields] = useState<Field[]>([]);

  return (
    <LakeContext.Provider
      value={{ lake, frogs, selectedFields, setFrogs, setSelectedFields }}
    >
      {children}
    </LakeContext.Provider>
  );
};

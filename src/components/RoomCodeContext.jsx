import React, { createContext, useContext, useState } from "react";

const RoomCodeContext = createContext();

export function RoomCodeProvider({ children }) {
  const [roomCode, setRoomCode] = useState("kod1");

  return (
    <RoomCodeContext.Provider value={{ roomCode, setRoomCode }}>
      {children}
    </RoomCodeContext.Provider>
  );
}

export function useRoomCode() {
  const context = useContext(RoomCodeContext);
  if (!context) {
    throw new Error("useRoomCode must be used within a RoomCodeProvider");
  }
  return context;
}

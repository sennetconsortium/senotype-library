"use client";
import { AppProvider } from "@/context/AppContext";

function MountedWrapper({children, auth}) {

  return (
    <AppProvider auth={auth}>
      {children}
    </AppProvider>
  )
}

export default MountedWrapper
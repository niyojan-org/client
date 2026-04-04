"use client";

import Header from "../../components/Header";

function MfaShell({ children }) {
  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="mx-auto flex w-full flex-col gap-6 justify-center items-center">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default MfaShell;

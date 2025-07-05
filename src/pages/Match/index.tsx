import { useState } from "react";
import { CgMenuRight } from "react-icons/cg";

import { Matches } from "./components/matches";
import { Players } from "./components/players";
import { Table } from "./components/table";

type TCTProps = "matches" | "players" | "table";

export function Match() {
  const [contentView, setContentView] = useState<TCTProps>("matches");

  return (
    <div className="min-h-screen p-4 relative">
      <header className="flex items-center justify-between">
        <img
          src="/images/logo.png"
          alt="Logo Amigos do Society"
          className="w-full max-w-[40px]"
        />

        <button>
          <CgMenuRight className="text-2xl text-[#cfa321]" />
        </button>
      </header>

      {
        contentView === "matches"
          ? <Matches />
          : contentView === "players"
          ? <Players />
          : <Table />
      }
    </div>
  );
}

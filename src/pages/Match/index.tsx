import { useState } from "react";
import { CgMenuRight } from "react-icons/cg";

import { Matches } from "./components/matches";
import { Players } from "./components/players";
import { Table } from "./components/table";
import { Menu } from "../../components/menu";
import { DrawTeam } from "./components/drawTeam";

export type TCTProps = "matches" | "players" | "table" | "draw";

export function Match() {
  const [contentView, setContentView] = useState<TCTProps>("matches");

  const [menuIsVisible, setMenuIsVisible] = useState<boolean>(false);

  function handleToggleMenu(contentName: TCTProps) {
    setContentView(contentName);

    setMenuIsVisible(false);
  }

  return (
    <div className="min-h-screen p-4 relative">
      <header className="flex items-center justify-between">
        <img
          src="/images/logo.png"
          alt="Logo Amigos do Society"
          className="w-full max-w-[40px]"
        />

        <button onClick={() => setMenuIsVisible(true)}>
          <CgMenuRight className="text-2xl text-[#cfa321]" />
        </button>
      </header>

      <Menu
        $isVisible={menuIsVisible}
        $onToggleMenu={handleToggleMenu}
      />

      {
        contentView === "matches"
          ? <Matches />
          : contentView === "players"
          ? <Players />
          : contentView === "draw"
          ? <DrawTeam />
          : <Table />
      }
    </div>
  );
}

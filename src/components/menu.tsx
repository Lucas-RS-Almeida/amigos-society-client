import ReactDOM from "react-dom";

import type { TCTProps } from "../pages/Match";

interface IMenuProps {
  $isVisible: boolean;
  $onToggleMenu: (contentName: TCTProps) => void;
}

export function Menu({ $isVisible, $onToggleMenu }: IMenuProps) {
  if (!$isVisible) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="min-w-screen min-h-screen flex items-center justify-center fixed left-0 top-0 bgGradient">
      <ul className="text-center">
        <li className="mt-4">
          <button
            onClick={() => $onToggleMenu("matches")}
            className="text-[1.25rem] transition-colors hover:text-[#cfa321]"
          >
            Partidas
          </button>
        </li>
        <li className="mt-4">
          <button
            onClick={() => $onToggleMenu("players")}
            className="text-[1.25rem] transition-colors hover:text-[#cfa321]"
          >
            Jogadores
          </button>
        </li>
        <li className="mt-4">
          <button
            onClick={() => $onToggleMenu("table")}
            className="text-[1.25rem] transition-colors hover:text-[#cfa321]"
          >
            Tabela
          </button>
        </li>
        <li className="mt-4">
          <button
            onClick={() => $onToggleMenu("draw")}
            className="text-[1.25rem] transition-colors hover:text-[#cfa321]"
          >
            Sortear
           Time</button>
        </li>
      </ul>
    </div>,
    document.getElementById("root-menu") as HTMLElement,
  )
}

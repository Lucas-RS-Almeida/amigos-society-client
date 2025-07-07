import { IoClose, IoChevronDown } from "react-icons/io5";

import type { IMatchProps } from "./matches";

interface IMIProps {
  match: IMatchProps;
}

export function MatchItem({ match }: IMIProps) {
  const colorsTeams = [
    {
      name: "Amarelo",
      color: "#9a7917",
    },
    {
      name: "Azul",
      color: "#0b171f",
    },
    {
      name: "Laranja",
      color: "#eb8634",
    },
    {
      name: "Verde",
      color: "#1b6321",
    },
    {
      name: "Preto",
      color: "#000",
    },
  ]

  return (
    <li className="p-4 rounded-md bg-[rgba(0,0,0,0.4)]">
      <header className="flex items-center justify-between">
        <span>Copa Amigos do Society</span>

        <strong className={`font-bold ${match.matches.inProgress ? "text-[#53c95c]" : "text-white"}`}>
          {
            match.matches.inProgress ? "Em adamaneto" : "Encerrado"
          }
        </strong>
      </header>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-start gap-12">
          <div className="flex flex-col items-start">
            <div
              style={{ backgroundColor: colorsTeams.find((item) => item.name === match.home_team.name)?.color }}
              className="w-12 h-12 rounded-[50%]"
            />

            <span>{match.home_team.name}</span>
          </div>

          <span className="text-5xl">
            {match.matches.homeScore}
          </span>
        </div>

        <IoClose className="text-4xl" />

        <div className="flex items-start gap-12">
          <span className="text-5xl">
            {match.matches.awayScore}
          </span>

          <div className="flex flex-col items-end">
            <div
              style={{ backgroundColor: colorsTeams.find((item) => item.name === match.away_team.name)?.color }}
              className="w-12 h-12 rounded-[50%]"
            />

            <span>{match.away_team.name}</span>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center mt-4">
        <button className="flex items-center justify-center gap-2">
          <span>Mostar mais</span>

          <IoChevronDown />
        </button>
      </div>
    </li>
  );
}

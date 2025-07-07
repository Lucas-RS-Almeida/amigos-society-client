import { useState, useEffect } from "react";
import type { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { IoClose, IoChevronDown } from "react-icons/io5";

import type { IMatchProps } from "./matches";

import { api } from "../../../api";

interface IMIProps {
  match: IMatchProps;
}

export interface IMPProps {
  match_player: {
    id: string,
    matchId: string,
    playerId: string,
    teamId: string,
    goals: number,
    yellowCards: number,
    redCard: boolean,
    createdAt: string,
    updatedAt: string,
  },
  match: {
    id: string,
    homeTeamId: string,
    awayTeamId: string,
    homeScore: number,
    awayScore: number,
    matchDay: string,
    inProgress: boolean,
    createdAt: string,
    updatedAt: string,
  },
  player: {
    id: string,
    name: string,
    playerType: string,
    teamId: string,
    matchDay: string,
    ipPlayer: string,
    createdAt: string,
    updatedAt: string,
  },
  team: {
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  }
}

export function MatchItem({ match }: IMIProps) {
  const [matchPlayer, setMatchPlayer] = useState<IMPProps[]>([]);

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
  ];

  useEffect(() => {
    async function loadMatchPlayer() {
      try {
        const response: AxiosResponse<IMPProps[]> = await api
          .get(`/match-player/${match.matches.id}`);

        setMatchPlayer(response.data);
      } catch (error: any) {
        toast.error(error?.response?.data?.error);
      }
    }

    loadMatchPlayer();
  }, []);

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
            {
              matchPlayer.find((mp) => mp.match_player.teamId === match.home_team.id)
                ?.match_player.goals || 0
            }
          </span>
        </div>

        <IoClose className="text-4xl" />

        <div className="flex items-start gap-12">
          <span className="text-5xl">
            {
              matchPlayer.find((mp) => mp.match_player.teamId === match.away_team.id)
                ?.match_player.goals || 0
            }
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

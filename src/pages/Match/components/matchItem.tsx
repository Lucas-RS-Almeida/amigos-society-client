import { useState, useEffect } from "react";
import type { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { IoClose, IoChevronDown } from "react-icons/io5";
import { IoIosFootball } from "react-icons/io";

import type { IMatchProps } from "./matches";

import { api } from "../../../api";

export const colorsTeams = [
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

interface IMIProps {
  match: IMatchProps;
}

export interface IMPProps {
  statistics_player: {
    id: string,
    matchId: string,
    playerId: string,
    teamId: string,
    teamType: "home" | "away",
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
  const [statisticsPlayer, setStatisticPlayer] = useState<IMPProps[]>([]);

  const [statisticsView, setStatisticsView] = useState<boolean>(false);

  useEffect(() => {
    async function statisticsPlayer() {
      try {
        const response: AxiosResponse<IMPProps[]> = await api
          .get(`/statistic-player/${match.matches.id}`);

        setStatisticPlayer(response.data);
      } catch (error: any) {
        toast.error(error?.response?.data?.error);
      }
    }

    statisticsPlayer();
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

          <span className="text-5xl">{match.matches.homeScore}</span>
        </div>

        <IoClose className="text-4xl" />

        <div className="flex items-start gap-12">
          <span className="text-5xl">{match.matches.awayScore}</span>

          <div className="flex flex-col items-end">
            <div
              style={{ backgroundColor: colorsTeams.find((item) => item.name === match.away_team.name)?.color }}
              className="w-12 h-12 rounded-[50%]"
            />

            <span>{match.away_team.name}</span>
          </div>
        </div>
      </div>

      {
        statisticsView && (
          <div className="flex items-start justify-between mt-5">
            <div className="flex flex-col items-start gap-2">
              {
                statisticsPlayer.filter((sp) => sp.statistics_player.teamType === "home")
                .reverse()
                .map((sp) =>{
                  if (sp.statistics_player.goals > 0) {
                    return (
                      <div
                        key={sp.statistics_player.id}
                        className="flex items-center gap-8"
                      >
                        <span>{sp.player.name}</span>

                        <IoIosFootball />
                      </div>
                    )
                  }

                  if (sp.statistics_player.yellowCards > 0) {
                    return (
                      <div
                        key={sp.statistics_player.id}
                        className="flex items-center gap-8"
                      >
                        <span>{sp.player.name}</span>

                        <div className="w-[10px] h-[12px] rounded-[2px] rotate-12 bg-yellow-500" />
                      </div>
                    )
                  }

                  if (sp.statistics_player.redCard) {
                    return (
                      <div
                        key={sp.statistics_player.id}
                        className="flex items-center gap-8"
                      >
                        <span>{sp.player.name}</span>

                        <div className="w-[10px] h-[12px] rounded-[2px] rotate-12 bg-red-500" />
                      </div>
                    )
                  }
                })
              }
            </div>
            <div className="flex flex-col items-end gap-2">
              {
                statisticsPlayer.filter((sp) => sp.statistics_player.teamType === "away")
                .reverse()
                .map((sp) =>{
                  if (sp.statistics_player.goals > 0) {
                    return (
                      <div
                        key={sp.statistics_player.id}
                        className="flex items-center gap-8"
                      >
                        <IoIosFootball />

                        <span>{sp.player.name}</span>
                      </div>
                    )
                  }

                  if (sp.statistics_player.yellowCards > 0) {
                    return (
                      <div
                        key={sp.statistics_player.id}
                        className="flex items-center gap-8"
                      >
                        <div className="w-[10px] h-[12px] rounded-[2px] -rotate-12 bg-yellow-500" />

                        <span>{sp.player.name}</span>
                      </div>
                    )
                  }

                  if (sp.statistics_player.redCard) {
                    return (
                      <div
                        key={sp.statistics_player.id}
                        className="flex items-center gap-8"
                      >
                        <div className="w-[10px] h-[12px] rounded-[2px] -rotate-12 bg-red-500" />

                        <span>{sp.player.name}</span>
                      </div>
                    )
                  }
                })
              }
            </div>
          </div>
        )
      }

      <div className="w-full flex justify-center mt-4">
        <button
          onClick={() => setStatisticsView(prevState => !prevState)}
          className="flex items-center justify-center gap-2"
        >
          <span>
            {
              statisticsView ? "Ocultar estatísticas" : "Mostrar estatísticas"
            }
          </span>

          <IoChevronDown className={`mt-1 transition-transform ${statisticsView && `rotate-180`}`} />
        </button>
      </div>
    </li>
  );
}

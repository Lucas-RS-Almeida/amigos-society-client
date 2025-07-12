import { useState, useEffect } from "react"
import type { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { IoChevronUp } from "react-icons/io5";
import { TbPlayFootball } from "react-icons/tb";
import { GiGoalKeeper } from "react-icons/gi";

import { api } from "../../../api";

import { NoContentCard } from "../../../components/noContentCard";
import { LoaderData } from "../../../components/loaderData";

import { colorsTeams } from "./matchItem";

export interface IPlayersProps {
  players: {
    id: string;
    name: string;
    teamId: string;
    matchDay: string;
    ipPlayer: string;
    playerType: string;
    createdAt: string;
    updated_at: string;
  },
  teams: ITeamProps;
}

export interface ITeamProps {
  id: string;
  name: string;
  createdAt: string;
  updated_at: string;
}

export function Players() {
  const [players, setPlayers] = useState<IPlayersProps[]>([]);
  const [teams, setTeams] = useState<ITeamProps[]>([]);

  const [
    goalkeepersIsVisible,
    setGoalkeepersIsVisible,
  ] = useState<boolean>(true);
  const [
    playersIsVisible,
    setPlayersIsVisible,
  ] = useState<boolean>(true);

  const [loadingData, setLoadingData] = useState<boolean>(false);

  const now = new Date().toISOString().split("T")[0];

  useEffect(() => {
    async function loadData() {
      try {
        setLoadingData(true);

        const [players, teams] = await Promise.all([
          loadPlayers(),
          loadTeams(),
        ]);

        setPlayers(players);
        setTeams(teams);
      } catch (error: any) {
        toast.error(error?.response?.data?.error);
      } finally {
        setLoadingData(false);
      }
    }

    loadData();
  }, []);

  async function loadPlayers() {
    const response: AxiosResponse<IPlayersProps[]> = await api
          .get(`/players/${now}`);

    return response.data;
  }

  async function loadTeams() {
    const response: AxiosResponse<ITeamProps[]> = await api
          .get(`/teams`);

    return response.data;
  }

  if (loadingData) {
    return <LoaderData $nameData="jogadores" />
  }

  return (
    <div className="mt-6">
      {
        (players.length > 0)
          ? (
            <>
              {
                players[0].players.teamId
                  ? (
                    <>
                      {
                        teams.map((t) => (
                          <div key={t.id} className="mt-4 first:mt-0">
                            <header
                              onClick={() => setGoalkeepersIsVisible((prevState) => !prevState)}
                              className="w-full h-8 flex items-center justify-center gap-2 px-4 cursor-pointer rounded-t-md"
                               style={{ backgroundColor: colorsTeams.find((item) => item.name === t.name)?.color }}
                            >
                              <span className="font-bold">{t.name}</span>
                            </header>

                            <ul className="p-4 rounded-b-md shadow bg-[rgba(0,0,0,0.2)]">
                              {
                                players.filter((p) => p.teams.id === t.id).map((p) => (
                                  <li key={p.players.id} className="w-full mt-4 flex items-center justify-center px-4 gap-4 rounded-md first:mt-0">
                                    <span>{p.players.name}</span>
                                    <span>-</span>
                                    <span>
                                      {
                                        (p.players.playerType === "player")
                                          ? <TbPlayFootball />
                                          : <GiGoalKeeper />
                                      }
                                    </span>
                                  </li>
                                ))
                              }
                            </ul>
                          </div>
                        ))
                      }
                    </>
                  ) : (
                    <>
                      <div>
                        <header
                          onClick={() => setGoalkeepersIsVisible((prevState) => !prevState)}
                          className="w-full h-8 flex items-center justify-center gap-2 px-4 cursor-pointer rounded-t-md bg-[#041728]"
                        >
                          <span className="font-bold">Goleiros</span>

                          <IoChevronUp
                            className={`mt-1 ${!goalkeepersIsVisible && "rotate-180"}`}
                          />
                        </header>

                        {
                          goalkeepersIsVisible && (
                            <ul className="p-4 rounded-b-md shadow bg-[rgba(0,0,0,0.2)]">
                              {
                                players?.filter((p) => p.players.playerType === "goalkeeper")?.map((p) => (
                                  <li
                                    key={p.players.id}
                                    className="w-full mt-4 flex items-center justify-center px-4 rounded-md first:mt-0"
                                  >
                                    {p.players.name}
                                  </li>
                                ))
                              }
                            </ul>
                          )
                        }
                      </div>

                      <div className="mt-4">
                        <header
                          onClick={() => setPlayersIsVisible((prevState) => !prevState)}
                          className="w-full h-8 flex items-center justify-center gap-2 px-4 cursor-pointer rounded-t-md bg-[#041728]"
                        >
                          <span className="font-bold">Jogadores</span>

                          <IoChevronUp
                            className={`mt-1 ${!playersIsVisible && "rotate-180"}`}
                          />
                        </header>

                        {
                          playersIsVisible && (
                            <ul className="p-4 rounded-b-md shadow bg-[rgba(0,0,0,0.2)]">
                              {
                                players?.filter((p) => p.players.playerType === "player")?.map((p) => (
                                  <li
                                    key={p.players.id}
                                    className="w-full mt-4 flex items-center justify-center px-4 rounded-md first:mt-0"
                                  >
                                    {p.players.name}
                                  </li>
                                ))
                              }
                            </ul>
                          )
                        }
                      </div>
                    </>
                  )
              }
            </>
          ) : (
            <NoContentCard
              $icon={<TbPlayFootball className="text-5xl" />}
              $message="Nenhum jogador ainda foi cadastrado, aguarde..."
              $isAction={false}
            />
          )
      }
    </div>
  )
}

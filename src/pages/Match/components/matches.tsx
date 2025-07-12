import { useState, useContext, useEffect } from "react";
import type { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { TbSoccerField } from "react-icons/tb";

import { Context } from "../../../contexts/AuthContext";

import { api } from "../../../api";

import { MatchesForm } from "./matchesForm";
import { MatchItem } from "./matchItem";

import { NoContentCard } from "../../../components/noContentCard";
import { LoaderData } from "../../../components/loaderData";

export interface IMatchProps {
  home_team: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  away_team: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  matches: {
    id: string;
    homeTeamId: string;
    awayTeamId: string;
    homeScore: number;
    awayScore: number;
    matchDay: string;
    inProgress: boolean;
    createdAt: string;
    updatedAt: string;
  }
}

export function Matches() {
  const [matches, setMatches] = useState<IMatchProps[]>([]);

  const [refresh, setRefresh] = useState<boolean>(false);
  const [formIsVisible, setFormIsVisible] = useState<boolean>(false);
  const [loadingMatches, setLoadingMatches] = useState<boolean>(false);

  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    async function loadMatches() {
      try {
        const response: AxiosResponse<IMatchProps[]> = await api
          .get("/matches");

        setMatches(response.data);
      } catch (error: any) {
        toast.error(error?.response?.data?.error);
      }
    }

    loadMatches();
  }, [refresh]);

  async function handleCreateMatch(homeTeamId: string, awayTeamId: string) {
    if (homeTeamId === awayTeamId) {
      toast.error("Selecione times diferentes");

      return;
    }

    try {
      await api.post("/matches", { homeTeamId, awayTeamId });

      setRefresh(prevState => !prevState);
    } catch (error: any) {
      throw new Error(error?.response?.data?.error);
    }
  }

  if (loadingMatches) {
    return <LoaderData $nameData="partidas" />
  }

  return (
    <div>
      <MatchesForm
        $isVisible={formIsVisible && isAuthenticated}
        $onSubmit={handleCreateMatch}
        $onClose={() => setFormIsVisible(false)}
      />

      {
        (matches.length > 0) && (
          <ul className="flex flex-col gap-4 mt-6">
            {
              matches.map((match) => (
                <MatchItem key={match.matches.id} match={match} />
              ))
            }
          </ul>
        )
      }

      {
        (matches.length === 0 && isAuthenticated) && (
          <NoContentCard
            $icon={<TbSoccerField className="text-5xl" />}
            $message="Nenhuma partida iniciada. Clique no botão abaixo para iniciar uma nova patida."
            $isAction
            $onFunction={() => setFormIsVisible(true)}
          />
        )
      }

      {
        (!formIsVisible && matches.length > 0 && isAuthenticated) && (
          <div className="w-full flex items-center justify-center fixed right-0 bottom-4">
            <button
              onClick={() => setFormIsVisible(true)}
              className="h-10 px-4 flex items-center justify-center gap-2 rounded-md transition-all bg-[#cfa321] hover:bg-[#9a7917]"
            >
              <span className="font-bold">Adicionar Nova Partida</span>
            </button>
          </div>
        )
      }
    </div>
  )
}

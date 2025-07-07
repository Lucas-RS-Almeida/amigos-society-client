import { useState, useEffect, type FormEvent } from "react";
import type { AxiosResponse } from "axios";
import { FiLoader } from "react-icons/fi";

import { api } from "../../../api";
import { toast } from "react-toastify";

interface IMFProps {
  $isVisible: boolean;
  $onSubmit: (homeTeamId: string, awayTeamId: string) => Promise<void>;
  $onClose: () => void;
}

interface ITeamsProps {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export function MatchesForm({ $isVisible, $onSubmit, $onClose }: IMFProps) {
  const [teams, setTeams] = useState<ITeamsProps[]>([]);

  const [teamIdOne, setTeamIdOne] = useState<string>("");
  const [teamIdTwo, setTeamIdTwo] = useState<string>("");

  const [loadingTeams, setLoadingTeams] = useState<boolean>(false);
  const [inRequesting, setInRequesting] = useState<boolean>(false);

  const formIsValid = teamIdOne && teamIdTwo;

  useEffect(() => {
    async function loadTeams() {
      try {
        setLoadingTeams(true);

        const response: AxiosResponse<ITeamsProps[]> = await api
          .get("/teams");

        setTeams(response.data);
      } catch (error: any) {
        console.log(error?.response?.data?.error);
      } finally {
        setLoadingTeams(false);
      }
    }

    loadTeams();
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      setInRequesting(true);

      await $onSubmit(teamIdOne, teamIdTwo);

      setTeamIdOne("");
      setTeamIdTwo("");

      $onClose();
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setInRequesting(false);
    }
  }

  if (!$isVisible) {
    return null;
  }

  return (
    <div
      onClick={$onClose}
      className="min-w-screen min-h-screen fixed top-0 left-0 flex flex-col gap-4 items-center justify-center bgGradient"
    >
      <form
        onSubmit={handleSubmit} className="w-full max-w-[300px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="w-full h-10 relative rounded-md px-2 border-1 border-[#636262]">
          {
            loadingTeams
              ? (
                <div className="w-full h-10 flex items-center justify-between absolute top-0 left-0 rounded-md px-2 border-1 border-none">
                  <span>Carregando Times</span>

                  <FiLoader className="text-[1.25rem] animate-spin" />
                </div>
              ) : (
                <select
                  onChange={(event) => setTeamIdOne(event.target.value)}
                  value={teamIdOne}
                  className="w-full h-10 absolute top-0 left-0 rounded-md px-2 border-1 border-none"
                >
                  <option value="">Selecione o time 1</option>

                  {
                    teams.map((team) => (
                      <option
                        key={team.id}
                        value={team.id}
                        className="text-black"
                      >
                        {team.name}
                      </option>
                    ))
                  }
                </select>
              )
          }
        </div>
        <div className="w-full h-10 relative mt-4 rounded-md px-2 border-1 border-[#636262]">
          {
            loadingTeams
              ? (
                <div className="w-full h-10 flex items-center justify-between absolute top-0 left-0 rounded-md px-2 border-1 border-none">
                  <span>Carregando Times</span>

                  <FiLoader className="text-[1.25rem] animate-spin" />
                </div>
              ) : (
                <select
                  onChange={(event) => setTeamIdTwo(event.target.value)}
                  value={teamIdTwo}
                  className="w-full h-10 absolute top-0 left-0 rounded-md px-2 border-1 border-none"
                >
                  <option value="">Selecione o time 2</option>

                  {
                    teams.map((team) => (
                      <option
                        key={team.id}
                        value={team.id}
                        className="text-black"
                      >
                        {team.name}
                      </option>
                    ))
                  }
                </select>
              )
          }
        </div>

        <button
          type="submit"
          disabled={!formIsValid}
          className="w-full h-10 flex items-center justify-center gap-2 rounded-md mt-5 transition-all bg-[#cfa321] hover:bg-[#9a7917] disabled:bg-[#ccc]"
        >
          {
            inRequesting
              ? (<FiLoader className="text-[1.25rem] animate-spin" />)
              : (<span className="font-bold">Adicionar</span>)
          }
        </button>
      </form>

      <button>Cancelar</button>
    </div>
  );
}

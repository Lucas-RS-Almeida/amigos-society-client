import { useState, useEffect } from "react";
import type { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { GiDiceFire } from "react-icons/gi";
import { TbPlayFootball } from "react-icons/tb";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { FiLoader } from "react-icons/fi";

import { api } from "../../../api";

import type { IPlayersProps } from "./players";

import { LoaderData } from "../../../components/loaderData";
import { NoContentCard } from "../../../components/noContentCard";

export function DrawTeam() {
  const [players, setPlayers] = useState<IPlayersProps[]>([]);

  const [loadingPlayers, setLoadingPlayers] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [inRequesting, setInRequesting] = useState<boolean>(false);

  useEffect(() => {
    async function loadPlayers() {
      try {
        setLoadingPlayers(true);

        const now = new Date().toISOString().split("T")[0];

        const response: AxiosResponse<IPlayersProps[]> = await api
          .get(`/players/${now}`);

        setPlayers(response.data);
      } catch (error: any) {
        toast.error(error?.response?.data?.error);
      } finally {
        setLoadingPlayers(false);
      }
    }

    loadPlayers();
  }, [refresh]);

  async function handleDrawTeams() {
    try {
      setInRequesting(true);

      await api.put("/players/draw-team");

      setRefresh(refresh);
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    } finally {
      setInRequesting(false);

      setRefresh(refresh);
    }
  }

  if (loadingPlayers) {
    return <LoaderData $nameData="jogadores" />
  }

  return (
    <div>
      {
        (players.length > 0)
          ? (
            <>
              {
                players[0].players.teamId
                  ? (
                    <NoContentCard
                      $icon={<GiDiceFire className="text-5xl" />}
                      $message="Os times já foram sorteados, acesse o menu e volte para página de jogadores."
                      $isAction={false}
                    />
                  ) : (
                    <div className="w-full flex items-center justify-center mt-40">
                      <button
                        onClick={handleDrawTeams}
                        className="h-10 px-4 flex items-center justify-center gap-2 rounded-md transition-all bg-[#cfa321] hover:bg-[#9a7917]"
                      >
                        {
                          inRequesting
                            ? (<FiLoader className="text-[1.25rem] animate-spin" />)
                            : (
                              <>
                                <GiPerspectiveDiceSixFacesRandom className="text-[1.5rem]" />

                                <span className="font-bold">Sortear times</span>
                              </>
                            )
                        }
                      </button>
                    </div>
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
  );
}

import { useState } from "react";
import { toast } from "react-toastify";

import { api } from "../../../api";

import { FormRegister } from "./formRegiter";
import { CardSuccess } from "./cardSuccess";

interface IPlayerPageProps {
  $onBackToHome: () => void;
}

interface IBodyProps {
  name: string;
  playerType: "player" | "goalkeeper";
}

export function PlayerPage({ $onBackToHome }: IPlayerPageProps) {
  const [body, setBody] = useState<IBodyProps>({} as IBodyProps);
  const [inRequesting, setInRequesting] = useState<boolean>(false);

  async function handleRegisterPlayer(name: string) {
    if (!name) {
      toast.error("Nome é obrigatório");

      return;
    }

    try {
      setInRequesting(true);

      await api.post("/players", {
        name,
        playerType: "player",
      });

      setBody({
        name,
        playerType: "player",
      });

      localStorage.setItem("@Amigos_society_registred", JSON.stringify({
        registred: true,
        matchDay: new Date().toISOString().split("T")[0],
      }));
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    } finally {
      setInRequesting(false);
    }
  }

  return (
    <div className="flex flex-col items-center">
      {
        (Object.values(body).length === 0) ? (
          <>
            <header className="text-center">
              <span className="font-bold">Você selecionou a categoria: Jogador</span>
            </header>

            <FormRegister $onSubmit={handleRegisterPlayer} $inRequesting={inRequesting} />

            <button
              onClick={$onBackToHome}
              className="bg-none mt-4"
            >
              <span className="transition-all hover:text-[#636262]">Voltar</span>
            </button>
          </>
        ) : (
          <CardSuccess $name={body.name} $playerType={body.playerType} />
        )
      }
    </div>
  );
}

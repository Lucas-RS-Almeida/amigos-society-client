import { useState, useEffect } from "react";

import { Slider } from "./components/slider";
import { PlayerPage } from "./components/playerPage";
import { GoalkeeperPage } from "./components/goalkeeperPage";
import { CardWarning } from "./components/cardWarning";
import type { AxiosResponse } from "axios";
import { api } from "../../api";

interface ILSProps {
  registred: boolean;
  matchDay: string;
}

interface IResponseProps {
  registred: boolean;
}

export function Homepage() {
  const [category, setCategory] = useState<"player" | "goalkeeper" | "">("");
  const [isRegistred, setIsRegistred] = useState<boolean>(false);

  useEffect(() => {
    async function verifyPlayer() {
      const registredLS = localStorage.getItem("@Amigos_society_registred");
      const registredParse: ILSProps = registredLS ? JSON.parse(registredLS) : {} as ILSProps;

      const now = new Date().toISOString().split("T")[0];

      const response: AxiosResponse<IResponseProps> = await api.get(`/players/${now}/ip`);

      if (
        (registredParse?.registred && (now === registredParse?.matchDay))
        || response.data.registred
      ) {
        setIsRegistred(true);
      }
    }

    verifyPlayer();
  });

  function handleSetCategory(value: "player" | "goalkeeper") {
    setCategory(value);
  }

  function handleBackToHome() {
    setCategory("");
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <header className="flex flex-col items-center gap-4">
        <img
          src="/images/logo.png"
          alt="Logo Amigos do Society"
          className="w-full max-w-[120px]"
        />

        {
          (category === "" && !isRegistred) && (
            <div className="text-center">
              <h2 className="text-[1.25rem] font-bold">Selecione sua Categoria</h2>
              <span className="text-[#636262]">você não poderá cadastrar outros jogadores</span>
            </div>
          )
        }
      </header>

      {
        (category === "" && isRegistred)
          ? <CardWarning />
          : (category === "" && !isRegistred)
          ? <Slider $onSetCategory={handleSetCategory} />
          : (category === "player")
          ? <PlayerPage $onBackToHome={handleBackToHome} />
          : <GoalkeeperPage $onBackToHome={handleBackToHome} />
      }

      <footer className="max-w-[300px] text-center">
        <span className="text-[#636262]">No campo, na graça: amigos em Cristo, irmãos na partida!</span>
      </footer>
    </div>
  );
}

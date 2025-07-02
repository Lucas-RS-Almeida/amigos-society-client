import { FaCheck } from "react-icons/fa";

interface ICardSuccessProps {
  $name: string;
  $playerType: "player" | "goalkeeper";
}

export function CardSuccess({ $name, $playerType }: ICardSuccessProps) {
  return (
    <div className="w-full max-w-[300px] flex flex-col items-center rounded-md p-4 bg-[#001922]">
      <div className="w-[60px] h-[60px] flex items-center justify-center rounded-md mb-4 bg-[#cfa321]">
        <FaCheck className="text-3xl text-[#001922]" />
      </div>

      <div className="flex flex-col items-center text-center gap-2">
        <span className="font-bold">Parabéns {$name}!</span>
        <span>Você se cadastrou como: {$playerType === "player" ? "Jogador" : "Goleiro"}.</span>
        <span>Realize o pagamento e aguarde o sorteio do time no nosso grupo do whatsapp!</span>
      </div>
    </div>
  );
}

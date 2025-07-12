import { FaTable } from "react-icons/fa";
import { NoContentCard } from "../../../components/noContentCard";

export function Table() {
  return (
    <div>
      <NoContentCard
        $icon={<FaTable className="text-5xl" />}
        $message="Nenhum dado pra gerar tabela, insira partidas."
        $isAction={false}
      />
    </div>
  )
}

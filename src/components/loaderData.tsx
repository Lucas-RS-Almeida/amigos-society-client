import { GiSoccerBall } from "react-icons/gi";

interface ILDProps {
  $nameData: string;
}

export function LoaderData({ $nameData }: ILDProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-28">
      <div className="w-full max-w-[300px] flex flex-col items-center gap-3">
        <GiSoccerBall className="text-7xl animate-spin delay text-[#cfa321]" />

        <span className="text-[1.25rem] text-center">
          {`Carregando ${$nameData.toLowerCase()}, por favor, aguarde...`}
        </span>
      </div>
    </div>
  );
}

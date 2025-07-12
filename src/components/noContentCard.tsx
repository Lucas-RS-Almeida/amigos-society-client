import type { ReactNode } from "react";

interface INCCProps {
  $icon: ReactNode;
  $message: string;
  $isAction: boolean;
  $onFunction?: () => void;
}

export function NoContentCard({
  $icon,
  $message,
  $isAction,
  $onFunction,
}: INCCProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-28">
      <div className="w-full max-w-[300px] flex flex-col items-center gap-5">
        <div className="w-[80px] h-[80px] flex items-center justify-center rounded-md bg-[#cfa321]">
          { $icon }
        </div>

        <span className="text-[1.25rem] text-center">
          { $message }
        </span>

        {
          $isAction && (
            <button
              onClick={$onFunction}
              className="w-full h-10 flex items-center justify-center gap-2 rounded-md transition-all bg-[#cfa321] hover:bg-[#9a7917]"
            >
              <span className="font-bold">Iniciar</span>
            </button>
          )
        }
      </div>
    </div>
  );
}

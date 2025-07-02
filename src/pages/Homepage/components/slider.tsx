interface ISliderProps {
  $onSetCategory: (value: "player" | "goalkeeper") => void;
}

export function Slider({ $onSetCategory }: ISliderProps) {
  return (
    <div className="w-[300px] overflow-x-auto scroll-smooth">
      <style>
        {`
          div::-webkit-scrollbar {
            width: 8px;
          }
          div::-webkit-scrollbar-track {
            background: transparent;
          }
          div::-webkit-scrollbar-thumb {
            background-color: transparent;
          }
        `}
      </style>

      <div className="flex space-x-4 px-2">
        <div className="min-w-[240px] max-w-[240px] min-h-[260px] rounded-md bg-[url(/images/player.png)] bg-cover">
          <div
            className="w-full h-full flex flex-col justify-end cursor-pointer"
            onClick={() => $onSetCategory("player")}
          >
            <footer className="w-full h-[100px] flex flex-col justify-end text-center rounded-md py-2 bg-gradient-to-t from-black/99 to-white/0">
              <span className="text-[1.25rem] text-[#ccc]">Jogador</span>
            </footer>
          </div>
        </div>

        <div className="min-w-[240px] max-w-[240px] min-h-[260px] rounded-md bg-[url(/images/goalkeeper.png)] bg-cover">
          <div
            className="w-full h-full flex flex-col justify-end cursor-pointer"
            onClick={() => $onSetCategory("goalkeeper")}
          >
            <footer className="w-full h-[100px] flex flex-col justify-end text-center rounded-md py-2 bg-gradient-to-t from-black/99 to-white/0">
              <span className="text-[1.25rem] text-[#ccc]">Goleiro</span>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

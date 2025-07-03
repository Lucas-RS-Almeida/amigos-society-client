import { useState, type FormEvent } from "react";
import { FiLoader } from "react-icons/fi";

interface IFormRegisterProps {
  $onSubmit: (name: string) => void;
  $inRequesting: boolean;
}

export function FormRegister({ $onSubmit, $inRequesting }: IFormRegisterProps) {
  const [name, setName] = useState<string>("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    $onSubmit(name);

    setName("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[300px] mt-6"
    >
      <input
        placeholder="Insira seu nome"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="w-full h-10 rounded-md px-4 border-1 border-[#636262]"
      />

      <button
        type="submit"
        className="w-full h-10 flex items-center justify-center gap-2 rounded-md mt-5 transition-all bg-[#cfa321] hover:bg-[#9a7917]"
      >
        {$inRequesting
            ? (<FiLoader className="text-[1.25rem] animate-spin" />)
            : (<span className="font-bold">Adicionar</span>)
          }
      </button>
    </form>
  );
}

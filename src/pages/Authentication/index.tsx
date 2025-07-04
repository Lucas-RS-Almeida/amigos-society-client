import { useState, type FormEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiLoader } from "react-icons/fi";

import { Context } from "../../contexts/AuthContext";

export function Authentication() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [inputType, setInputType] = useState<"text" | "password">("password");

  const [inRequesting, setInRequesting] = useState<boolean>(false);

  const { onLogin } = useContext(Context);

  const navigate = useNavigate();

  function handleToggleInputType() {
    setInputType(prevState => prevState === "password" ? "text" : "password");
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      setInRequesting(true);

      await onLogin({ name, password });

      navigate("/matches");
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setInRequesting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <header className="flex flex-col items-center gap-4">
        <img
          src="/images/logo.png"
          alt="Logo Amigos do Society"
          className="w-full max-w-[80px]"
        />

        <div className="text-center">
          <h3 className="text-2xl font-bold">Entrar</h3>
          <span className="text-[#636262]">faça login com seus dados pessoais.</span>
        </div>
      </header>

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

        <input
          placeholder="Senha"
          type={inputType}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full h-10 rounded-md mt-4 px-4 border-1 border-[#636262]"
        />

        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            onChange={handleToggleInputType}
            className="cursor-pointer accent-[#cfa321]"
          />
          <label>Mostrar senha</label>
        </div>

        <button
          type="submit"
          className="w-full h-10 flex items-center justify-center gap-2 rounded-md mt-5 transition-all bg-[#cfa321] hover:bg-[#9a7917]"
        >
          {inRequesting
            ? (<FiLoader className="text-[1.25rem] animate-spin" />)
            : (<span className="font-bold">Adicionar</span>)
          }
        </button>
      </form>
    </div>
  );
}

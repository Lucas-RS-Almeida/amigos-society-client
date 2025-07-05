import { IoIosAddCircle } from "react-icons/io";

import { MatchesForm } from "./matchesForm";
import { useState } from "react";

export function Matches() {
  const [formIsVisible, setFormIsVisible] = useState<boolean>(false);

  return (
    <div>
      <MatchesForm
        $isVisible={formIsVisible}
        $onClose={() => setFormIsVisible(false)}
      />

      {
        !formIsVisible && (
          <button
            onClick={() => setFormIsVisible(true)}
            className="absolute bottom-4 right-4"
          >
            <IoIosAddCircle className="text-4xl text-[#cfa321]" />
          </button>
        )
      }
    </div>
  )
}

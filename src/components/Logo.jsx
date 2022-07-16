import React from "react";
import { useNavigate } from "react-router-dom";
const Logo = () => {
  const navigate = useNavigate();
  return (
    <h1
      onClick={() => {
        navigate("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="cursor-pointer font-black font-['Monoton'] text-zinc-500 text-sm md:text-4xl tracking-widest m-0"
    >
      <span className="font-['Monoton'] text-rose-500">D</span>
      <span className="font-['Monoton'] text-amber-500">E</span>
      <span className="font-['Monoton'] text-teal-500">S</span>
      <span className="font-['Monoton'] text-sky-500">O</span>
      <span className="font-['Monoton'] text-purple-500">P</span>
      <span className="font-['Monoton'] text-lime-500">I</span>
      <span className="font-['Monoton'] text-emerald-500">X</span>
      <span className="font-['Monoton'] text-cyan-500">E</span>
      <span className="font-['Monoton'] text-fuchsia-500">L</span>
      ART
    </h1>
  );
};

export default Logo;

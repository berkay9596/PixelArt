import React from "react";
import Logo from "../components/Logo";
const Footer = () => {
  return (
    <footer
      style={{ background: "black" }}
      className="footer flex flex-col  items-center p-5 bg-neutral text-neutral-content"
    >
      <div className="items-center grid-flow-col h-20 my-3">
        <p className="text-md md:text-xl">Copyright © 2022</p> - <Logo /> -{" "}
        <p className="text-md md:text-xl">All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;

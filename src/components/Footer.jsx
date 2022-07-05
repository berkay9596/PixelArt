import React from "react";
import Logo from "../components/Logo";
const Footer = () => {
  return (
    <footer
      style={{ background: "black"}}
      className="footer flex flex-col items-center p-5 bg-neutral text-neutral-content "
    >
      <div className="flex items-center flex-col h-15 prose">
        <p className="text-md md:text-xl">Copyright © 2022</p>
        <div className="my-4">
          {" "}
          <Logo />
        </div>{" "}
        <p className="text-md md:text-xl my-4">All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;

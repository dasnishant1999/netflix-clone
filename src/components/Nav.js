import React, { useState, useEffect } from "react";

import "./Nav.css";

function Nav() {
  const [show, setshow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setshow(true);
      } else {
        setshow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show &&'nav_black'}`}>
      <img
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />
      <img
        className="nav_avatar"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCHdnmEvoEahtsIo4B0BwdMK2PAHzdvIE59Q&usqp=CAU"
        alt="Avatar Logo"
      />
    </div>
  );
}

export default Nav;

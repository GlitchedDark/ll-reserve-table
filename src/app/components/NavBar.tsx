import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons/faCircleArrowLeft";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import Image from "next/image";
import { markazi } from "../fonts";

export default function NavBar() {
  return (
    <nav className="bg-slate-100">
      <div className="w-auto h-20 px-5 py-4 flex flex-row">
        <FontAwesomeIcon
          icon={faCircleArrowLeft}
          className="w-8 h-auto md:hidden md:scale-0"
          style={{ color: "#495E57" }}
        />
        <div className="grow flex flex-row gap-2 justify-center items-center md:justify-start md:pl-5" aria-label="Home">
          <Image
            src="/lemon.png"
            width={16}
            height={16}
            style={{ width: "auto", height: "70%" }}
            alt="Picture of Little Lemon Logo"
          />
          <div className="text-xl text-LLgreen uppercase tracking-widest ">
            <h1 className={markazi.className}>Little Lemon</h1>
          </div>
        </div>
        <FontAwesomeIcon
          icon={faBars}
          className="w-8 h-auto items-end md:hidden md:scale-0"
          style={{ color: "#495E57" }}
        />
        <div className="text-sm lg:text-base hidden md:flex flex-row gap-1 place-items-center font-bold uppercase pr-5">
          <h1 className="p-2 rounded-lg hover:bg-slate-200 hover:text-slate-800 " aria-label="Home">Home</h1>
          <h1 className="p-2 rounded-lg hover:bg-slate-200 hover:text-slate-800 " aria-label="About">About</h1>
          <h1 className="p-2 rounded-lg hover:bg-slate-200 hover:text-slate-800 " aria-label="Menu">Menu</h1>
          <h1 className="p-2 rounded-lg hover:bg-slate-200 hover:text-slate-800 " aria-label="Reservations">Reservations</h1>
          <h1 className="p-2 rounded-lg hover:bg-slate-200 hover:text-slate-800 " aria-label="Order Online">Order Online</h1>
          <h1 className="p-2 rounded-lg hover:bg-slate-200 hover:text-slate-800 " aria-label="Log In">Log In</h1>
        </div>
      </div>
    </nav>
  );
}

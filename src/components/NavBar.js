import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClipboardList, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export default function Navbar({ fixed }) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-purple-700 mb-3">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="logo text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white"
              href="/recipes"
            >
              Recipe Manager
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li className="nav-item">
                <Link to={"/recipes"} className="nav-menu px-3 py-2 flex items-center text-xs font-bold leading-snug text-white hover:opacity-75 transition duration-300">
                    <FontAwesomeIcon icon={faClipboardList} /><span className="ml-2">Recipes List</span>
                </Link>
                
                </li>
                <li className="nav-item">
                <Link to={"/add"} className="nav-menu px-3 py-2 flex items-center text-xs font-bold leading-snug text-white hover:opacity-75 transition duration-300">
                    <FontAwesomeIcon icon={ faPlusCircle } /><span className="ml-2">Add Recipe</span>
                </Link>
                </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
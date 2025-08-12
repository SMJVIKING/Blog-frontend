"use client";

import { useAuth } from "@/context/AutContext";
import NavLink from "./NavLink";
import DarkModeToggle from "@/ui/DarkModeToggle";

const navLinks = [
  {
    id: 1,
    children: "خانه",
    path: "/",
  },
  {
    id: 2,
    children: "بلاگ ها",
    path: "/blogs",
  },
];

function Header() {
  const { user, isLoading } = useAuth();

  return (
    <header
      className={`shadow-md bg-inherit mb-10 sticky top-0 transition-all duration-200 border-b border-b-secondary-300 z-10
    ${isLoading ? "blur-sm opacity-70" : "blur-0 opacity-100"}`}
    >
      <nav className="container">
        <ul className="flex items-center text-secondary-400 justify-between py-2">
          <div className="flex items-center gap-x-10">
            {navLinks.map((navLink) => {
              return (
                <li key={navLink.id}>
                  <NavLink path={navLink.path}>{navLink.children}</NavLink>
                </li>
              );
            })}
          </div>
          <div className="flex gap-x-10 justify-center items-center">
            <li>
              {user ? (
                <NavLink path="/profile">پروفایل</NavLink>
              ) : (
                <NavLink path="/signin">ورود</NavLink>
              )}
            </li>

            <li className="">
              <DarkModeToggle />
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
export default Header;

import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close, en, ka } from "../assets";
import i18n from "../lang/i18n";
import "../lang/i18n";
import { tt } from "../lang/tt";

const Navbar = () => {
  const { t } = useTranslation();

  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const navigate = useNavigate();
  const location = useLocation();

  const switchLanguage = (lang) => {
    localStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
    setCurrentLang(lang);

    const currentPathWithoutLang = location.pathname.replace(/^\/(en|ka)/, "");
    const newPath = `/${lang}${currentPathWithoutLang}`;
    navigate(newPath, { replace: true });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex ">
            {t("Tornike Okroadze")}
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav[tt("title")] ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav[tt("title")])}
            >
              <a href={`#${nav.id}`}>{nav[tt("title")]}</a>
            </li>
          ))}
        </ul>

        <div className="items-center hidden sm:flex">
          <img
            src={currentLang === "ka" ? en : ka}
            alt={currentLang === "ka" ? "English" : "Georgian"}
            className="w-8 h-8 object-contain cursor-pointer rounded-full transition duration-300 ease-in-out hover:scale-110"
            onClick={() => switchLanguage(currentLang == "ka" ? "en" : "ka")}
          />
        </div>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "show" //flex
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav[tt("title")]
                      ? "text-white"
                      : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav[tt("title")]);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav[tt("title")]}</a>
                </li>
              ))}
            </ul>
            <div className="flex gap-5 mt-5">
              <img
                src={ka}
                alt="Georgian"
                className="w-8 h-8 rounded-full transition duration-300 ease-in-out cursor-pointer"
                onClick={() => {
                  switchLanguage("ka");
                  setToggle(!toggle);
                }}
              />
              <img
                src={en}
                alt="English"
                className="w-8 h-8 rounded-full transition duration-300 ease-in-out cursor-pointer"
                onClick={() => {
                  switchLanguage("en");
                  setToggle(!toggle);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

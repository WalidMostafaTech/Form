import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import useNavigationLinks from "@/hooks/useNavigationLinks";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/store/modals/modalsSlice";

const MobileNav = () => {
  const { modalName } = useSelector((state) => state.modals);

  const open = modalName === "mobileNav";

  const dispatch = useDispatch();

  const [openItem, setOpenItem] = useState(null);

  const links = useNavigationLinks();

  const toggleItem = (name) => {
    setOpenItem((prev) => (prev === name ? null : name));
  };

  const closeOnLinkClick = () => {
    dispatch(closeModal());
    setOpenItem(null);
  };

  return createPortal(
    <div
      className={`lg:hidden fixed inset-0 z-50 bg-primary overflow-y-auto
      transition-all duration-400 ease-in-out
      ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}`}
    >
      <button
        onClick={closeOnLinkClick}
        className="absolute top-8 inset-e-4 text-primary bg-white
        w-8 h-8 rounded-full flex items-center justify-center text-xl cursor-pointer"
      >
        <IoClose />
      </button>

      <nav className="h-full flex flex-col justify-center items-center gap-6 px-6">
        {links.map((link) => {
          const hasItems = link.items && link.items.length > 0;
          const isOpen = openItem === link.name;

          return (
            <div key={link.name} className="w-full text-center">
              {/* Main Link */}
              {hasItems ? (
                <button
                  onClick={() => toggleItem(link.name)}
                  className="nav_link text-lg! w-fit mx-auto flex items-center justify-center gap-2"
                >
                  {link.name}
                  <IoChevronDown
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <NavLink
                  to={link.href}
                  onClick={closeOnLinkClick}
                  className="nav_link text-lg! w-fit mx-auto block"
                >
                  {link.name}
                </NavLink>
              )}

              {/* Accordion Items */}
              {hasItems && (
                <div
                  className={`overflow-hidden transition-all duration-500 
                  bg-secondary rounded-lg max-w-xs mx-auto ${
                    isOpen ? "max-h-96 mt-3 py-2" : "max-h-0"
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    {link.items.map((sub) => (
                      <NavLink
                        key={sub.name}
                        to={sub.href}
                        onClick={closeOnLinkClick}
                        className="text-primary font-semibold hover:text-white transition"
                      >
                        {sub.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>,
    document.body,
  );
};

export default MobileNav;

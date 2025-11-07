import { MdDehaze } from "react-icons/md";
import logo from "../assets/logo.svg";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

function Header({ collapsed, setCollapsed }) {
  const navigate = useNavigate();
  const signout = () => {
    sessionStorage.removeItem("token");
    navigate('/login');
  }
  return (
    <>
      <div className="header-box flex justify-between items-center bg-sky-950 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-6">
          <div className="toggle-icon">
            <MdDehaze className="text-2xl cursor-pointer text-gray-50" onClick={() => setCollapsed(!collapsed)}/>
          </div>
          <div className="logo">
            <img src={logo} alt="logo" className="max-w-44 md:max-w-52" />
          </div>
        </div>
        <div>
          <Menu as="div" className="relative inline-block">
            <MenuButton className="inline-flex justify-center gap-x-1.5 bg-sky-700 px-3 py-2 text-sm/4 md:text-base  font-semibold text-white shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-sky-800 rounded-full w-8 h-8 md:w-10 md:h-10 cursor-pointer">
              N
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
              <div className="py-1">
                  <MenuItem>
                    <MenuButton
                      onClick={signout}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden cursor-pointer">
                      Sign out
                    </MenuButton>
                  </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </>
  );
}

export default Header;

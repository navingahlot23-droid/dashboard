import SidebarMenu from "./SidebarMenu"; 
import { useEffect } from "react";

function Sidebar({ collapsed, setCollapsed  }) { 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    handleResize(); // run once
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setCollapsed]);
  
  return (
  <aside collapsed={collapsed} className={`text-white h-screen bg-sky-950 transition-all duration-300 overflow-y-auto ${collapsed ? "w-0 lg:w-16" : "w-52"}`}> 
  <SidebarMenu collapsed={collapsed} /> 
  </aside > 
  ); 
}

export default Sidebar;
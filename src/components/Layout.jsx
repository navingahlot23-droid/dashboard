import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { useLocation } from "react-router-dom";

function Layout() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
    return (
        <>
            <div className="h-screen flex flex-col">
                {!isLoginPage && (
                    <Header collapsed={collapsed} setCollapsed={setCollapsed} />
                )}

                <div className="flex flex-1 overflow-hidden">
                    {!isLoginPage && (
                        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                    )}

                    <MainContent />
                </div>
            </div>
        </>
    )
}

export default Layout;
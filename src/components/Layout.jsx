import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

function Layout() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <>
                <div className="h-screen flex flex-col bg-gray-100">
                    {/* ✅ Header stays outside and sticky */}
                    <Header collapsed={collapsed} setCollapsed={setCollapsed} />

                    {/* ✅ Sidebar + Main content below header */}
                    <div className="flex flex-1 overflow-hidden">
                        <Sidebar
                            collapsed={collapsed} setCollapsed={setCollapsed}
                        />

                        {/* Scrollable content */}
                        <MainContent />
                    </div>
                </div>
        </>
    )
}

export default Layout;
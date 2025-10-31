import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { MdOutlineHome, MdOutlineCategory, MdFormatListBulleted, MdAdd, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { NavLink } from 'react-router-dom';

function SidebarMenu({ collapsed }) {
    return (
        <>
            <div className='sidebar-wrap'>
                <Menu
                    iconShape="circle"
                    menuItemStyles={{
                        button: ({ level }) => ({
                          // style only top-level buttons
                          ...(level === 0
                            ? {
                                backgroundColor: "#052f4a",
                                "&:hover": {
                                  backgroundColor: "#0369a1",
                                  color: "#fff",
                                },
                              }
                            : {
                                // sub-menu buttons
                                backgroundColor: "#dff2fe",
                                color: "#000",
                                "&:hover": {
                                  backgroundColor: "#b8e6fe",
                                },
                              }),
                        }),
                      }}
                      >
                    <MenuItem component={<NavLink to = '/dashboard'/>} className='border-y border-y-sky-900' icon={<MdOutlineHome className="text-xl" />}>
                        {!collapsed && "Dashboard"}
                    </MenuItem>

                    <SubMenu  className='border-b border-b-sky-900' icon={<MdOutlineCategory className="text-xl" />} label={!collapsed && "Category"}>
                        <MenuItem  component={<NavLink to = '/category'/>} className='border-b border-b-sky-300' icon={<MdFormatListBulleted  className="text-sm" />}><span className='text-sm'>Category List</span></MenuItem>
                        <MenuItem  component={<NavLink to = '/add-category'/>} icon={<MdAdd   className="text-sm" />}><span className='text-sm'>Add Category</span></MenuItem>
                    </SubMenu>
                    <SubMenu  icon={<MdOutlineProductionQuantityLimits className="text-xl" />} label={!collapsed && "Product"}>
                        <MenuItem  component={<NavLink to = '/product'/>} className='border-b border-b-sky-300' icon={<MdFormatListBulleted  className="text-sm" />}><span className='text-sm'>Product List</span></MenuItem>
                        <MenuItem  component={<NavLink to = '/add-product'/>} icon={<MdAdd   className="text-sm" />}><span className='text-sm'>Add Product</span></MenuItem>
                    </SubMenu>
                </Menu>
            </div>
        </>
    )
}

export default SidebarMenu;

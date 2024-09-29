import React, { useState, useRef, useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUsers, FaUserCog, FaSignOutAlt, FaChevronDown, FaChartLine } from 'react-icons/fa'
import { getCurrentAdmin } from '../../utils/getCurrentAdmin'
import { useLogout } from '../../utils/logoutAdmin.js'
import mainLogo from "../../assets/Logos/main-logo.webp";

const Header = () => {
  const { handleLogout } = useLogout();
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const admin = getCurrentAdmin()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <motion.header className="bg-lightBlue text-white px-8 py-2">
      <div className="flex flex-row justify-between items-center">
        <div className="logo w-[18vw] md:w-[8vw]">
          <img className='w-full scale-150' src={mainLogo} alt="Main Logo" />
        </div>
        <nav className="flex items-center space-x-4">
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="hidden sm:inline">{admin?.username || "Admin"}</span>
              <FaChevronDown className="w-4 h-4 ml-2" />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                >
                  <NavLink
                    to="/admin-dashboard/profile"
                    className={({ isActive }) =>
                      `${isActive ? 'bg-orange text-white' : 'text-gray-900 hover:bg-orange hover:text-white'
                      } flex w-full items-center px-4 py-2 text-sm transition-colors duration-200`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <FaUserCog className="w-5 h-5 mr-2" />
                    Admin Profile
                  </NavLink>
                  <button
                    className="text-gray-900 hover:bg-orange hover:text-white flex w-full items-center px-4 py-2 text-sm transition-colors duration-200"
                    onClick={() => {
                      setIsOpen(false)
                      handleLogout();
                    }}
                  >
                    <FaSignOutAlt className="w-5 h-5 mr-2" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </div>
    </motion.header>
  )
}

const SidebarItem = ({ to, icon: Icon, children, exact = false }) => {
  const location = useLocation()
  const isActive = exact ? location.pathname === to : location.pathname.startsWith(to)

  return (
    <NavLink
      to={to}
      className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ease-in-out
        ${isActive ? 'bg-orange text-white' : 'bg-transparent text-darkBlue hover:bg-orange hover:text-white'}`}
    >
      <Icon className="w-5 h-5" />
      <span className="ml-2">{children}</span>
    </NavLink>
  )
}

const Sidebar = () => {
  const isMobile = window.innerWidth < 640
  const { handleLogout } = useLogout();

  return (
    <nav className="flex flex-row flex-wrap sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2 p-4 sm:p-8 overflow-x-auto sm:overflow-x-visible">
      <SidebarItem to="/admin-dashboard" icon={FaChartLine} exact={true}>Dashboard</SidebarItem>
      <SidebarItem to="/admin-dashboard/manage-users" icon={FaUsers}>Manage Users</SidebarItem>
      {!isMobile && (
        <>
          <SidebarItem to="/admin-dashboard/profile" icon={FaUserCog}>Admin Profile</SidebarItem>
          <button
            onClick={() => { handleLogout() }}
            className="flex items-center px-4 py-2 rounded-md text-[#D0021B] hover:bg-[#D0021B] hover:text-white transition-colors duration-200 ease-in-out">
            <FaSignOutAlt className="w-5 h-5 mr-2" />
            Logout
          </button>
        </>
      )}
    </nav>
  )
}

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex flex-col sm:flex-row">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="sm:w-64"
          >
            <Sidebar />
          </motion.div>
        </AnimatePresence>
        <main className="flex-1 p-4 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={window.location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard

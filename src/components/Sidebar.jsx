import { X, Home, Users, Settings, MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          <span className="text-xl font-semibold">Dashboard</span>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-5">
          <Link to={'/'} className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700">
            <Home className="mr-3 h-5 w-5" />
            Home
          </Link>
          <Link to={'/contacts'} className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700">
            <Users className="mr-3 h-5 w-5" />
            Contacts
          </Link>
          <Link to={'/message'} className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700">
            <MessageCircle className="mr-3 h-5 w-5" />
            Message
          </Link>
          <Link to={'/'} className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700">
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Link>
        </nav>
      </div>
    )
  }

  export default Sidebar
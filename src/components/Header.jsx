import { Bell, Menu} from 'lucide-react'
import { Button } from "@/components/ui/button"



// eslint-disable-next-line react/prop-types
const Header = ({ toggleSidebar }) => {
    return (
      <header className="bg-white shadow-md">
        <div className="flex items-center justify-between h-16 px-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center ml-auto">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
    )
  }

  export default Header
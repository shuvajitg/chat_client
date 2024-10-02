import Dashboard from './components/Dashbord'
import { Toaster } from 'react-hot-toast'
import  {AppContextProvider}  from './context/creatContext'

function App() {

  return (
    <AppContextProvider>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Dashboard/>
    </AppContextProvider>
  )
}

export default App

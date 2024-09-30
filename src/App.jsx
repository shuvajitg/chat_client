import Dashboard from './components/Dashbord'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Dashboard/>
    </>
  )
}

export default App

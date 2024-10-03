import Dashboard from './components/Dashbord'
import { Toaster } from 'react-hot-toast'
import  {AppContextProvider}  from './context/creatContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Chat from './components/Chat'

function App() {

  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
            <Route index element={<Chat />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" reverseOrder={false} />
    </AppContextProvider>
  )
}

export default App

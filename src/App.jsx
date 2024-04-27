import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import RootLayout from './layout/RootLayout'
import { Tasks } from './pages/alltask/Tasks'
import NewTask from './pages/newtask/NewTask'
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import toast, { Toaster } from 'react-hot-toast';
import ClientTask from './component/ClientTask'
import EditTask from './pages/editTask/EditTask'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/alltask' element={<Tasks/>}/>
        <Route path='/newtask' element={<NewTask/>}/>
        <Route path='/ClientTask/:userId' element={<ClientTask/>}/>
        <Route path='/edittask/:userId' element={<EditTask/>} />
        </Route>

        {/* Sign in and sign up route */}

        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
    <Toaster/>
    </>
    
  )
}

export default App

// npm i react-router-dom
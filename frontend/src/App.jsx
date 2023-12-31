import './App.css';
import PageNav from './components/PageNav';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Service from './pages/Service';

function App() {

  return (

    <>
      <PageNav />

      <div className='bg-slate-200 w-full h-screen'>

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/service' element={<Service/>} />
        </Routes>

        
      </div>


    </>


  )
}

export default App

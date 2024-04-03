import {Routes,Route,BrowserRouter} from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import Groups from './containers/Grupos';
import Gastos from './containers/Gastos';
import Amigos from './containers/Amigos';

function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Groups/>}/>
      <Route path='/amigos' element={<Amigos/>}/>
      <Route path='/gastos' element={<Gastos/>}/>
      <Route path='/grupos' element={<Groups/>}/>
    </Routes>
    </>
  )
}

export default App

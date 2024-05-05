import {Routes,Route,BrowserRouter} from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import Groups from './containers/Grupos';
import Gastos from './containers/Gastos';
import Amigos from './containers/Amigos';
import GroupDetails from './components/GroupDetails';

//? Estilo para los botones generalizado

function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path='/amigos' element={<Amigos/>}/>
      <Route path='/gastos' element={<Gastos/>}/>
      <Route path='/grupos' element={<Groups/>}/>
      <Route path='/grupos/detalle-de-grupo/' element={<GroupDetails/>}/>
    </Routes>
    </>
  )
}

export default App

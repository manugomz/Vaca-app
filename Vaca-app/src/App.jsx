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
      <Route path='/Amigos' element={<Amigos/>}/>
      <Route path='/Gastos' element={<Gastos/>}/>
      <Route path='/Grupos' element={<Groups/>}/>
    </Routes>
    </>
  )
}

export default App

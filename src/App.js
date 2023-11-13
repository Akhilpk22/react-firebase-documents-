import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Document from './pages/Document';
import Quilpage from './pages/Quilpage';



function App() {
  return (
    <div className="App">
      
      <Routes>
      
        <Route path='/' element={<Home/>}/>
        <Route path='/Document/' element={<Document />}/>
        <Route path='/Quilpage/:id' element={<Quilpage/>}/>
      </Routes>
      
    </div>
  );
}
export default App;

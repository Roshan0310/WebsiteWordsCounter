import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import CreateForm from './components/CreateForm';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/' element={<CreateForm/>}/>

       </Routes>

       </BrowserRouter>
    </div>
  );
}

export default App;

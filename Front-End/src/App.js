import logo from './logo.svg';
import './App.css';
import NavBar from "./component/NavBar.js";
import Button from "./component/Button.js"
import Hero from "./assets/Hero.jpg";

import Home from "./component/Pages/Home";
import Login from "./component/Pages/Login";
import Register from "./component/Pages/Register"

import{BrowserRouter as Router, Route, Routes} from "react-router-dom"


function App() {
  return (
    <div className="App">
      <NavBar/>
      <Router>

        <Routes>
          <Route path = "/" element= {<Home/>} />
          <Route path = "/Login" element = {<Login/>}/>
          <Route path = "/Register" element = {<Register/>}/>
        </Routes>

      </Router>
      
      

    </div>
  );
}

export default App;

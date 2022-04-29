import react from 'react'
import { useState,createContext,useContext,useEffect} from 'react'
import AuthContext  from "../context/AuthProvider.js"
import "bootstrap/dist/css/bootstrap.css"
import {Nav,  Navbar} from "react-bootstrap"
import "../App.css"


function NavBar() {
    var AccountText;
    const  {auth} = useContext(AuthContext);

    if(auth == null){
        AccountText = "Sign In";
    }else{
        AccountText = "Sign Out"
    }

    if(AccountText=="Sign In"){
        return(
            <Navbar className="NavBar" bg="dark" variant= "dark" sticky="top" expand="lg">
                <Navbar.Brand>
                    Macro Counter
                </Navbar.Brand>
    
                <Navbar.Toggle/> 
    
                <Navbar.Collapse>
                    <Nav className="navbar-nav ms-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="Login">{AccountText}</Nav.Link>
                        <Nav.Link href="Register">Register</Nav.Link>
                        
                    </Nav>
                </Navbar.Collapse>
    
            </Navbar>
        );
    }else{
        return(
            <Navbar className="NavBar" bg="dark" variant= "dark" sticky="top" expand="lg">
                <Navbar.Brand>
                    Macro Counter
                </Navbar.Brand>
    
                <Navbar.Toggle/> 
    
                <Navbar.Collapse>
                    <Nav className="navbar-nav ms-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="SignOut">{AccountText}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
    
            </Navbar>
        );
    }
}

export default NavBar
import   { React } from 'react';
import {  Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";



function Header() {
  

    return (

            <header>
                <Navbar className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                alt=""
                                src="/logo.png"
                                width="80"
                                className="d-inline-block align-top me-3"
                            />{" "}
                        </Navbar.Brand>
                        <h4 className="text-center">
                            {" "}
                            Front End Test - NY Times Reader
                        </h4>
                    </Container>
                </Navbar>
            </header>

    );
}

export default Header;

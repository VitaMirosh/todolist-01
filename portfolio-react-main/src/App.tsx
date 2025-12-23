import React from 'react';
import './App.css';
import Header from "./header/Header";
import Main from "./main/Main";
import Skills from "./skills/Skills";
import Projects from "./projects/Projects";
import {Employment} from "./employee/Employment";
import {Contact} from "./contacts/Contact";
import {Footer} from "./footer/Footer";

function App() {
    return (
        <div className="App">
            <Header/>
            <Main/>
            <Skills/>
            <Projects/>
            <Employment/>
            <Contact/>
            <Footer/>
        </div>
    );
}

export default App;

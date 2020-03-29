import React from 'react';
import ReactDOM from 'react-dom';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import './Main.css';
import './extraStyles/Main--Animations.css';

import Resume from '../components/Resume';
import Help from '../components/Help';

// FUNCOES DO JAVASCRIPT
function animateSidebar(e){
    if (e == "expanded"){
        //Alterando CSS
        document.getElementsByClassName("container--sidebar")[0].classList.remove("sidebar--visible-left");
        document.getElementsByClassName("container--sidebar")[0].classList.add("sidebar--hidden-left");            
        document.getElementsByClassName("button--sidebar-retract")[0].classList.add("button--sidebar-expand");
        document.getElementsByClassName("button--sidebar-retract")[0].classList.remove("button--sidebar-retract");
    }
    else{
        //Retracao
        if (e.target.classList.contains("button--sidebar-retract")){
            //Alterando CSS            
            document.getElementsByClassName("container--sidebar")[0].classList.remove("sidebar--visible-left");
            document.getElementsByClassName("container--sidebar")[0].classList.add("sidebar--hidden-left");
            e.target.classList.remove("button--sidebar-retract");
            e.target.classList.add("button--sidebar-expand");
        }
        else{
            //Alterando CSS
            document.getElementsByClassName("container--sidebar")[0].classList.remove("sidebar--hidden-left");
            document.getElementsByClassName("container--sidebar")[0].classList.add("sidebar--visible-left");
            e.target.classList.remove("button--sidebar-expand");
            e.target.classList.add("button--sidebar-retract");            
        }
    }
};

function accessPage(page){
    debugger
    alert(page);
    var container = document.getElementById("dynamicContent");
    debugger
    ReactDOM.unmountComponentAtNode(container);
};

window.addEventListener('load', handleResize);
function handleResize(){
    if (window.outerWidth < 490){
        animateSidebar("expanded");
    }
};

class Main extends React.Component{
    // Substituindo o construtor do componente (são inputs do componente)
    constructor(props) {
        super(props);
        this.state = {
            child: Resume
        };

        this.testeStr = "oi"

        this.teste = function joao (oi){
            this.testeStr = "tchau";
            this.setState({child: Help});
            this.forceUpdate();
        };
    }
    
    // RETORNO BÁSICO DO HTML
    render(){
        return (
            <div className="container--father">
                <div className="container--blackboard-columnar">                               
                    
                    {/* Main Navbar */}
                    <div className="navbar-main--top">
                        <div className="left--side">
                            <div className="logo"></div>
                            <p>Vesaliuz</p>
                        </div>
                        
                        <div className="right--side">
                            <i className="alert"></i>
                            <p>Bem-vindo, João</p>
                            <div className="photo"></div>
                            <button className="button--rectangle-secondary-middle-size lrbuton icon-exit--white">
                                <p>Sair</p>
                            </button>
                        </div>
                    </div>
                
                    {/* Main Content */}
                    <div className="container--main-content">
                        
                        {/* Sidebar */}
                        <div className="container--sidebar">
                            <div className="sidebar" id="box">
                                <button 
                                    className="icon--home-white selected"                                
                                    onClick={() => accessPage("home")}
                                >
                                    <span>Início</span>
                                </button>

                                <button 
                                    className="icon--agendamentos"
                                    onClick={() => accessPage("agenda")}
                                >
                                    <span>Agenda</span>
                                </button>

                                <button 
                                    className="icon--pacientes"
                                    onClick={() => accessPage("pacientes")}
                                >
                                    <span>Pacientes</span>
                                </button>
                                
                                <button 
                                    className="icon--financas"
                                    onClick={() => accessPage("financas")}
                                >
                                    <span>Financeiro</span>
                                </button>
                                
                                <button 
                                    className="icon--exams"
                                    onClick={() => accessPage("exams")}
                                >
                                    <span>Exames</span>
                                </button>

                                <button 
                                    className="icon--procedure"
                                    onClick={() => accessPage("tratamentos")}
                                >       
                                    <span>Tratamentos</span>
                                </button>
                                
                                <button 
                                    className="icon--laboratory"
                                    onClick={() => accessPage("laboratorio")}
                                >
                                    <span>Laboratório</span>
                                </button>
                                
                                <button 
                                    className="icon--news"
                                    onClick={() => accessPage("noticias")}
                                >
                                    <span>Notícias</span>
                                </button>                            

                                <button 
                                    className="icon--help"
                                    onClick={() => this.teste("ajuda")}
                                >
                                    <span>Ajuda</span>
                                </button>
                                
                                <button 
                                    className="icon--nubibuz"
                                    onClick={() => accessPage("nubibuz")}
                                >
                                    <span>Sobre Nós</span>
                                </button>                   
                            </div>
                        </div>        

                        <button 
                            className="button--sidebar-retract" 
                            onClick={animateSidebar}
                        >
                        </button>

                        <p>{this.testeStr}</p>

                        {/* Dynamic Content - Miolo */}
                        <div id="dynamicContent">
                            { React.createElement(this.state.child) }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
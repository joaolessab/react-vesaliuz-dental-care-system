import React from 'react';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/Main.css';
import '../assets/css/Responsive/Main--Responsive.css';
import '../assets/css/Animations/Main--Animations.css';

import Resume from '../components/Resume';
import Help from '../components/Help';

// FUNCOES DO JAVASCRIPT
function animateSidebar(e){
    if (e === "expanded"){
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

window.addEventListener('load', handleResize);
function handleResize(){
    if (window.location == "/"){
        if (window.outerWidth < 490){
            animateSidebar("expanded");
        }
    }
};

class Main extends React.Component{
    // Substituindo o construtor do componente (são inputs do componente)
    constructor(props) {
        super(props);
        this.state = {
            child: Resume
        };

        // Funcao para acessar componentes dinamicos
        this.accessPage = function accessPage (page){
            this.switchButtonSelected(page);

            if (page === "Resume")
                this.setState({child: Resume});

            if (page === "Help")
                this.setState({child: Help});

            this.forceUpdate();
        };

        // Funcao para limpar selecao de botoes
        this.switchButtonSelected = function switchButtonSelected(page){
            var sidebar = document.getElementsByClassName("sidebar")[0];
            var botaoSelecionado = sidebar.getElementsByClassName("selected")[0];
            botaoSelecionado.classList.remove("selected");


            // Adding Blue
            if (page === "Resume")
                document.getElementsByClassName("icon--home")[0].classList.add("selected");
            if(page === "Help")
                document.getElementsByClassName("icon--help")[0].classList.add("selected");
        };
    }
    
    // RETORNO BÁSICO DO HTML
    render(){
        return (
            <div className="container--app-father">
                
                {/* INICIO DO MAIN */}
                <div className="container--blackboard-main">                   
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
                            <button className="button--white-square">
                                <p>Sair</p>
                            </button>
                        </div>
                    </div>
                
                    {/* Main Content */}
                    <div className="container--content-main">
                        
                        {/* Sidebar */}
                        <div className="container--sidebar">
                            <div className="sidebar" id="box">
                                <button 
                                    className="icon--home selected"                                
                                    onClick={() => this.accessPage("Resume")}
                                >
                                    <span>Início</span>
                                </button>

                                <button 
                                    className="icon--agendamentos"
                                    onClick={() => this.accessPage("Agenda")}
                                >
                                    <span>Agenda</span>
                                </button>

                                <button 
                                    className="icon--clientes"
                                    onClick={() => this.accessPage("Clients")}
                                >
                                    <span>Clientes</span>
                                </button>
                                
                                <button 
                                    className="icon--financas"
                                    onClick={() => this.accessPage("Finances")}
                                >
                                    <span>Financeiro</span>
                                </button>
                                
                                <button 
                                    className="icon--exams"
                                    onClick={() => this.accessPage("Exams")}
                                >
                                    <span>Exames</span>
                                </button>

                                <button 
                                    className="icon--procedure"
                                    onClick={() => this.accessPage("Treatments")}
                                >       
                                    <span>Tratamentos</span>
                                </button>
                                
                                <button 
                                    className="icon--laboratory"
                                    onClick={() => this.accessPage("Laboratory")}
                                >
                                    <span>Laboratório</span>
                                </button>
                                
                                <button 
                                    className="icon--news"
                                    onClick={() => this.accessPage("News")}
                                >
                                    <span>Notícias</span>
                                </button>                            

                                <button 
                                    className="icon--help"
                                    onClick={() => this.accessPage("Help")}
                                >
                                    <span>Ajuda</span>
                                </button>
                                
                                <button
                                    className="icon--nubibuz"
                                    onClick={() => this.accessPage("Nubibuz")}
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
                        {/* Dynamic Content - Miolo */}
                        { React.createElement(this.state.child) }
                    </div>
                </div>
                {/* FINAL DO MAIN */}
                
            </div>
        );
    }
}

export default Main;
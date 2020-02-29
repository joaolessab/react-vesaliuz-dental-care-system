import React from 'react';

//Arquivos CSS e Imagens devem ser importados aqui
import './Main.css';
import './MainAnimations.css';
import Resume from '../components/Resume';

export default function Main(){

    function animateSidebar(e){
        //Retract
        if (e.target.classList.contains("button--sidebar-retract")){
            //Changing CSS            
            document.getElementsByClassName("container--sidebar")[0].classList.remove("sidebar--visible-left");
            document.getElementsByClassName("container--sidebar")[0].classList.add("sidebar--hidden-left");
            e.target.classList.remove("button--sidebar-retract");
            e.target.classList.add("button--sidebar-expand");
        }
        else{
            //Changing CSS
            document.getElementsByClassName("container--sidebar")[0].classList.remove("sidebar--hidden-left");
            document.getElementsByClassName("container--sidebar")[0].classList.add("sidebar--visible-left");
            e.target.classList.remove("button--sidebar-expand");
            e.target.classList.add("button--sidebar-retract");            
        }
    };

    function accessPage(page){
        alert(page);
    };

    // Retorno básico do HTML
    return (
        <div className="container--father">
            <div className="container--blackboard-columnar">                               
                
                {/* MAIN NAVBAR */}
                <div className="navbar-main--top">
                    <div className="left--side">
                        <div className="logo"></div>
                        <p>Clínica <em>Dente Brilhoso</em></p>
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
             
                {/* MAIN CONTENT */}
                <div className="container--main-content">
                    
                    {/* SIDEBAR */}
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
                                onClick={() => accessPage("ajuda")}
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
                    
                                        
                    {/* DYNAMIC CONTENT - MIOLO*/}
                    <Resume />

                </div>

            </div>
        </div>
    );
}
import React from 'react';

//Arquivos CSS e Imagens devem ser importados aqui
import './Main.css';

export default function Main(){

    // Retorno básico do HTML
    return (
        <div className="father-container">
            <div className="blackboard-container--columnar">                               
                <div className="main-navbar--top">

                    <div className="left-side">
                        <div className="logo"></div>
                        <p>Clínica Dente Brilhoso</p>
                    </div>
                    
                    <div className="right-side">
                        <i className="alert"></i>
                        <p>Bem-vindo, João</p>
                        <div className="photo"></div>
                        <button className="secondary-button--rectangle--middle---size lrbuton icon-exit--white">
                            <p>Sair</p>
                        </button>
                    </div>
                </div>
                
                <div className="main-container--content">
                    <div className="sidebar-container">
                        <div className="sidebar">
                            <button className="arrows icon-arrowup"></button>
                            <div className="icons">
                                <button className="icon-home">
                                    <p>Início</p>
                                </button>
                                <button className="icon-agendamentos">
                                    <p>Agendamentos</p>
                                </button>
                                <button className="icon-pacientes">
                                    <p>Pacientes</p>
                                </button>
                                <button className="icon-financas">
                                    <p>Finanças</p>
                                </button>
                                <button className="icon-exams">
                                    <p>Exames</p>
                                </button>
                                <button className="icon-exams">
                                    <p>Exames</p>
                                </button>
                                <button className="icon-exams">
                                    <p>Exames</p>
                                </button>
                                <button className="icon-exams">
                                    <p>Exames</p>
                                </button>
                                <button className="icon-exams">
                                    <p>Exames</p>
                                </button>
                                <button className="icon-exams">
                                    <p>Exames</p>
                                </button>
                                <button className="icon-exams">
                                    <p>Exames</p>
                                </button>
                                <button className="icon-exams">
                                    <p>Exames</p>
                                </button>
                                <button className="icon-exams">
                                    <p>Exames</p>
                                </button>
                            </div>
                            <button button className="arrows icon-arrowdown"></button>
                        </div>
                    </div>

                    <div className="miolo-container">

                    </div>
                </div>
            </div>
        </div>
    );
}
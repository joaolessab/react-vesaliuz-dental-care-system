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
                        <p>Clínica <em>Dente Brilhoso</em></p>
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
                
                <div className="main-header--content">
                    <div className="begin--spaced"></div>

                    <div className="middle--spaced">
                        <h1>Página Inicial</h1>
                    </div>

                    <div className="end--spaced days-groupButton">
                        <button className="selected">Dia</button>
                        <button>Semana</button>
                        <button>Mês</button>
                        <button>Ano</button>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="main-container--content">
                    {/* SIDEBAR */}
                    <div className="sidebar-container">
                        <div className="sidebar">
                            <button className="arrows icon-arrowup"></button>
                            <div className="icons">
                                <button className="icon-home--white selected"></button>
                                <button className="icon-agendamentos"></button>
                                <button className="icon-pacientes"></button>
                                <button className="icon-financas"></button>
                                <button className="icon-exams"></button>
                                <button className="icon-exams"></button>
                                <button className="icon-exams"></button>
                                <button className="icon-exams"></button>
                                <button className="icon-exams"></button>
                                <button className="icon-exams"></button>
                                <button className="icon-exams"></button>
                                <button className="icon-exams"></button>
                            </div>
                            <button button className="arrows icon-arrowdown"></button>
                        </div>
                    </div>
                    {/* MIOLO */}
                    <div className="miolo-container">
                        <div>pokdsakodsap</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
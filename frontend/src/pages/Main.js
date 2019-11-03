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
                        <p>Clínica: Dente Brilhoso</p>
                    </div>
                    
                    <div className="right-side">
                        <i className="alert"></i>
                        <p>Bem-vindo, João</p>
                        <div className="photo"></div>
                        <button className="secondary-button--rectangle--middle---size lrbuton">
                            <p>Novo Projeto</p>
                            <i className="ic-plus"></i>
                        </button>
                    </div>
                </div>
                
                <div className="main-container--header">
                    
                </div>
                
                <div className="main-container--content">
                    <div className="sidebar-container">
                        <div className="sidebar">
                            <button className="home-icon--black"></button>
                            <button className="agendamentos"></button>
                            <button className="pacientes"></button>
                            <button className="financas"></button>
                            <button className="exames"></button>
                        </div>
                    </div>

                    <div className="miolo-container">

                    </div>
                </div>
            </div>
        </div>
    );
}
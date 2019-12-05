import React from 'react';
import { render } from 'react-dom';
import { defaults } from 'react-chartjs-2';
import  { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2'; 

//Arquivos CSS e Imagens devem ser importados aqui
import './Main.css';

export default function Main(){
    defaults.global.defaultFontFamily = 'Averta';

    /* CHART DATA */
    const lineChartData = {
        data: {
            labels: ["Jan", "Fev", "Mar", "Abr", "Mai"],
            datasets: [
                {
                    label: "Limpezas",
                    backgroundColor: "rgba(255, 0, 255, 0.75)",
                    borderColor: "white",
                    borderWidth: 2,
                    data: [4, 5, 11, 10, 32]
                },
                {
                    label: "Extrações",
                    backgroundColor: "rgba(0, 255, 0, 0.75)",
                    borderColor: "white",
                    borderWidth: 2,
                    data: [14, 15, 1, 20, 20]
                },
                {
                    label: "Clareamentos",
                    backgroundColor: "rgba(0, 255, 255, 0.75)",
                    borderColor: "white",
                    borderWidth: 2, 
                    data: [24, 25, 1, 10, 40]
                }
            ]
        },
        options: {
            legend: {
                display: true,
                labels: {fontFamily: 'Averta'}
            },
            responsive: true
        }
    };

    const pieChartData = {
        data: {
            labels: ["Jan", "Fev", "Mar", "Abr", "Mai"],
            datasets: [
                {
                    backgroundColor: [
                        "#f43004",
                        "#decf3f",
                        "#FFA500",
                        "#9b59b6",
                    ],
                    borderColor: "white",
                    borderWidth: 2,
                    data: [14, 15, 4, 20]
                }
            ]
        },
        options: {
            legend: {display: false},
            responsive: true,
            maintainAspectRatio: false
        }
    };

    function teste(e){
        debugger
    };

    // Retorno básico do HTML
    return (
        <div className="father-container">
            <div className="blackboard-container--columnar">                               
                {/* MAIN NAVBAR */}
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
                            <button className="arrows icon-arrowdown"></button>
                        </div>
                    </div>
                    
                    {/* MIOLO */}
                    <div className="miolo-container">
                        <div className="title-div">
                            <h1>Página Inicial</h1>
                        </div>
                        <div className="search-div">
                            <input type="text" placeholder="Quer encontrar alguma coisa? Eu te ajudo..." />
                            <button id="limpa"></button>
                            <button id="lupa"></button>
                        </div>
                        <div className="info-div">

                        </div>
                        <div className="chart-div">
                            <div className="revenue"></div>
                            <div className="expense"></div>
                        </div>
                    </div>

                    <div className="auxiliar-container">
                        <div className="topbuttons-div">
                            <button className="selected">Dia</button>
                            <button>Semana</button>
                            <button>Mês</button>
                            <button>Ano</button>
                        </div>
                        {/* BIGGER CHART */}
                        <div className="line-div">
                            <div className="title-for-divs">
                                <p>Tratamentos</p>
                            </div>
                            <div className="final-chart">
                                <Line
                                    options = {lineChartData.options}
                                    data = {lineChartData.data}
                                />
                            </div>
                            <div className="details-for-divs">
                                <p>Detalhes</p>
                                <button></button>
                            </div>
                        </div>
                        <div className="chart-div--bottom">
                            <div className="bar-div--left">       
                                <div className="title-for-divs">
                                    <p>Tratamentos</p>
                                </div>
                                <div className="final-chart">   
                                    <Pie 
                                        width = {80}
                                        height = {80}
                                        options = {pieChartData.options}
                                        data = {pieChartData.data}
                                    />
                                </div>
                                <div className="details-for-divs">
                                    <p>Detalhes</p>
                                    <button></button>
                                </div>
                            </div>
                            <div className="bar-div--right">
                                <div className="title-for-divs">
                                    <p>Tratamentos</p>
                                </div>
                                <div className="final-chart">   
                                    <Pie 
                                        width = {80}
                                        height = {80}
                                        options = {pieChartData.options}
                                        data = {pieChartData.data}
                                    />
                                </div>
                                <div className="details-for-divs">
                                    <p>Detalhes</p>
                                    <button></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
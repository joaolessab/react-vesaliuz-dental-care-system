import React from 'react';
import { render } from 'react-dom';
import { defaults } from 'react-chartjs-2';
import  { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2'; 
import { Radar } from 'react-chartjs-2';

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

    const radarChartData = {
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
                        <div className="sidebar">
                            <button className="icon--home-white selected"></button>
                            <button className="icon--agendamentos"></button>
                            <button className="icon--pacientes"></button>
                            <button className="icon--financas"></button>
                            <button className="icon--exams"></button>
                            <button className="icon--exams"></button>
                            <button className="icon--exams"></button>
                            <button className="icon--exams"></button>
                            <button className="icon--exams"></button>
                            <button className="icon--exams"></button>
                            <button className="icon--exams"></button>
                            <button className="icon--exams"></button>
                        </div>
                        <button id="button--sidebar-action" className="button--sidebar-retract"></button>
                    </div>
                    
                    {/* MIOLO */}
                    <div className="container--miolo">
                        <div className="div--title">
                            <h1>Página Inicial</h1>
                        </div>
                        <div className="div--search">
                            <input type="text" placeholder="Quer encontrar alguma coisa? Eu te ajudo..." />
                            <button id="limpa"></button>
                            <button id="lupa"></button>
                        </div>
                        <div className="div--info">

                        </div>
                        <div className="div--chart">
                            <div className="revenue"></div>
                            <div className="expense"></div>
                        </div>
                    </div>

                    <div className="container--auxiliar">
                        <div className="div--topbuttons">
                            <button className="selected">Dia</button>
                            <button>Semana</button>
                            <button>Mês</button>
                            <button>Ano</button>
                        </div>
                        {/* BIGGER CHART */}
                        <div className="div--line">
                            <div className="div--titles">
                                <p>Tratamentos</p>
                            </div>
                            <div className="div--chart-final">
                                <Line
                                    options = {lineChartData.options}
                                    data = {lineChartData.data}
                                />
                            </div>
                            <div className="div--details">
                                <p>Detalhes</p>
                                <button></button>
                            </div>
                        </div>
                        <div className="div--chart-bottom">
                            <div className="div--bar-left">       
                                <div className="div--titles">
                                    <p>Tratamentos</p>
                                </div>
                                <div className="div--chart-final">   
                                    <Pie 
                                        width = {80}
                                        height = {80}
                                        options = {pieChartData.options}
                                        data = {pieChartData.data}
                                    />
                                </div>
                                <div className="div--details">
                                    <p>Detalhes</p>
                                    <button></button>
                                </div>
                            </div>
                            <div className="div--bar-right">
                                <div className="div--titles">
                                    <p>Tratamentos</p>
                                </div>
                                <div className="div--chart-final">   
                                    <Radar 
                                        width = {80}
                                        height = {80}
                                        options = {radarChartData.options}
                                        data = {radarChartData.data}
                                    />
                                </div>
                                <div className="div--details">
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
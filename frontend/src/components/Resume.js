import React from 'react';
import { render } from 'react-dom';
import { defaults } from 'react-chartjs-2';
import  { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2'; 
import { Radar } from 'react-chartjs-2';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../App.css';
import './Resume.css';

export default function Resume(){
    defaults.global.defaultFontFamily = 'Averta';

    // CHART DATA 
    const lineChartData = {
        data: {
            labels: ["Jan", "Fev", "Mar", "Abr", "Mai"],
            datasets: [
                {
                    label: "Limpezas",
                    backgroundColor: "#007BFF",
                    borderColor: "white",
                    borderWidth: 2,
                    data: [4, 5, 11, 10, 32]
                },
                {
                    label: "Extrações",
                    backgroundColor: "#32cc77",
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
                        "#007BFF",
                        "#32cc77",
                        "#e47474",
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

    // FUNCOES DO JAVASCRIPT
    function teste(e){
        debugger
    };

    // RETORNO BÁSICO DO HTML
    return (
        <div className="container--miolo">
            <div className="container--content">
                <div className="div--title">
                    <h1>Página Inicial</h1>
                </div>

                {/* Auto Complete */}
                <div className="div--search">
                    <input type="text" placeholder="Quer encontrar alguma coisa? Eu te ajudo..." />
                                        
                    <button id="limpa"></button>
                    <button id="lupa"></button>
                </div>

                <div className="div--info">
                    <div className="div--info-icon">
                    </div>
                    <div className="div--info-text">
                        <h1>Aprenda como organizar sua agenda</h1>
                        <p>Seus rendimentos dependem do seu tempo disponível. Quanto mais você escalar o seu negócio, mais resultados irá obter. Esse artigo aborda exatamente o passo a passo para...</p>
                    </div>
                </div>

                <div className="div--chart">
                    <div className="revenue">
                        <h1>R$ 2.730,50</h1>
                        <p>Opa, lucrou? Confira sua receita</p>
                    </div>
                    <div className="expense">
                        <h1>R$ 1.302,26</h1>
                        <p>Gastou, né? Confira suas despesas</p>
                    </div>
                </div>
            </div>

            <div className="container--auxiliar">
                <div className="div--topbuttons">
                    <button className="selected">Dia</button>
                    <button>Semana</button>
                    <button>Mês</button>
                    <button>Ano</button>
                </div>
                
                {/* Bigger Chart */}
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
                            <p>Tratamentos por mês</p>
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
    );
}
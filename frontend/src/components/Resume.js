import React from 'react';
import { defaults } from 'react-chartjs-2';
import  { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2'; 
import { Bar } from 'react-chartjs-2';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/Resume.css';
import '../assets/css/Responsive/Resume--Responsive.css';

import AutoCompleteSuggest from './AutoCompleteSuggest';

export default function Resume(){
    defaults.global.defaultFontFamily = 'Averta';

    // CHART DATA 
    const lineChartData = {
        data: {
            labels: ["Jan", "Fev", "Mar", "Abr", "Mai"],
            datasets: [
                {
                    label: "Limpezas",
                    backgroundColor: "#55BCC9",
                    borderColor: "white",
                    borderWidth: 2,
                    data: [4, 5, 11, 10, 32]
                },
                {
                    label: "Extrações",
                    backgroundColor: "#97CAEF",
                    borderColor: "white",
                    borderWidth: 2,
                    data: [14, 15, 1, 20, 20]
                },
                {
                    label: "Clareamentos",
                    backgroundColor: "#557A95",
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
            labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
            datasets: [
                {
                    backgroundColor: [
                        "#5D001E",
                        "#E3E2DF",
                        "#E3AFBC",
                        "#9A1750",
                        "#EE4C7C"
                    ],
                    borderColor: "white",
                    borderWidth: 2,
                    data: [14, 15, 4, 20, 8]
                }
            ]
        },
        options: {
            legend: {display: false},
            responsive: true,
            // Se setar para false, ele respeitará o tamanho customizado definido por você
            maintainAspectRatio: true
        }
    };

    const barChartData = {
        data: {
            labels: ["Jan", "Fev", "Mar", "Abr", "Mai"],
            datasets: [
                {
                    backgroundColor: [
                        "#2C3531",
                        "#116466",
                        "#D9B08C",
                        "#FFCB9A",
                        "#D1E8E2"
                    ],
                    borderColor: "white",
                    borderWidth: 2,
                    data: [14, 15, 10, 20, 12]
                }
            ]
        },
        options: {
            legend: {display: false},
            responsive: true,
            maintainAspectRatio: true
        }
    };
    
    // FUNCOES DO JAVASCRIPT
    /*function teste(e){
        debugger
    };*/

    // RETORNO BÁSICO DO HTML
    return (
        <div className="container--miolo-main">
            <div className="container--content-resume">
                <div className="div--content-title">
                    <h1>Página Inicial</h1>
                </div>

                {/* Auto Suggest */}
                < AutoCompleteSuggest />

                <div className="div--info">
                    <div className="div--info-icon">
                    </div>
                    <div className="div--info-text">
                        <h1>Dica do dia: Aprenda como organizar sua agenda</h1>
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

            <div className="container--auxiliar-resume">
                <div className="div--topbuttons">
                    <button className="button--grey-label_underlined selected">Dia</button>
                    <button className="button--grey-label_underlined">Semana</button>
                    <button className="button--grey-label_underlined">Mês</button>
                    <button className="button--grey-label_underlined">Ano</button>
                </div>
                
                {/* Bigger Chart */}
                <div className="div--line">
                    <div className="div--chart-title">
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
                        <div className="div--chart-title">
                            <p>Tratamentos por mês</p>
                        </div>
                        <div className="div--chart-final">
                            <Pie 
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
                        <div className="div--chart-title">
                            <p>Tratamentos</p>
                        </div>
                        <div className="div--chart-final">
                            <Bar
                                options = {barChartData.options}
                                data = {barChartData.data}
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
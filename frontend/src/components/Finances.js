import React from 'react';
import { defaults } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/Finances.css';
import '../assets/css/Responsive/Resume--Responsive.css';

// ================ COMPONENTES ===============
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Checkbox from '@material-ui/core/Checkbox';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

// ================ ÍCONES ===============
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import SendIcon from '@material-ui/icons/Send';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

defaults.global.defaultFontFamily = 'Averta';

const mixedChartData = {
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março'],
        datasets: [
            {
                label: 'Faturamento',
                type:'line',
                data: [250, 120, 340],
                fill: false,
                borderColor: '#efdc4c',
                backgroundColor: '#efdc4c',
                pointBorderColor: '#efdc4c',
                pointBackgroundColor: '#efdc4c',
                pointHoverBackgroundColor: '#efdc4c',
                pointHoverBorderColor: '#efdc4c',
            },
            {
                type: 'bar',
                label: 'Receita',
                data: [200, 20, 300],
                fill: false,
                backgroundColor: '#32cc77',
                borderColor: '#32cc77',
                /*hoverBackgroundColor: '#2386fd',
                hoverBorderColor: '#2386fd',*/
            },
            {
                type: 'bar',
                label: 'Despesa',
                data: [50, 100, 40],
                fill: false,
                backgroundColor: '#e47474',
                borderColor: '#e47474',
                /*hoverBackgroundColor: '#71B37C',
                hoverBorderColor: '#71B37C',*/
            }
        ]
    },
    options: {
        responsive: true,
        tooltips: {
            mode: 'label'
        },
        elements: {
            line: {
                fill: false
            }
        },
        /*scales: {
            xAxes: [
                {
                    display: true,
                    gridLines: {
                        display: false
                    },
                    labels: {
                        show: true
                    }
                }
            ],
            yAxes: [
                {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    gridLines: {
                        display: false
                    },
                    labels: {
                        show: true
                    }
                },
                {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {
                        display: false
                    },
                    labels: {
                        show: true
                    }
                }
            ]
        }*/
    }
};

class Finances extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            transactions: [
                { 
                    id: 0,
                    description: "Limpeza rápida do Marcus",
                    price: "105,00",
                    type: 1,
                    tag: "Tratamentos"
                },
                { 
                    id: 1,
                    description: "Clareamento do João",
                    price: "500,00",
                    type: 1,
                    tag: "Tratamentos"
                },
                { 
                    id: 2,
                    description: "Cadeira para recepcionista",
                    price: "279,00",
                    type: 0,
                    tag: "Infraestrutura"
                },
                { 
                    id: 3,
                    description: "Lâmpadas para escritório",
                    price: "89,00",
                    type: 0,
                    tag: "Infraestrutura"
                },
                { 
                    id: 4,
                    description: "Limpeza rápida do Cláudio",
                    price: "105,00",
                    type: 1,
                    tag: "Tratamentos"
                },
                { 
                    id: 5,
                    description: "Enxaguante bucal 2L",
                    price: "50,00",
                    type: 0,
                    tag: "Material"
                }
            ]
        };
    };

    render(){
        // LISTAGEM DE PACIENTES
        const listTransactions = this.state.transactions.map((transaction) => {
            return (
                    <div className="div--grid_item" key={transaction.id}>
                        <div className="div--grid_item_left">
                            <Checkbox
                                className="checkbox--list-selection"
                                checked={ this.state.eventAllDayCheck } 
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={< CheckCircleIcon />}
                                onChange={ this.changeAllDayCheck }
                            />                   
                            <div>{transaction.description}</div>
                        </div>
                        <div className="div--grid_item_right">
                            <div className="div--grid_item_right_each">
                                <p className="financial--tag"><em>{transaction.tag}</em></p>
                            </div>
                            <div className="div--grid_item_right_each">
                                <div className={transaction.type === 1 ? "financial--revenue-icon" : "financial--expense-icon"}></div>
                            </div>
                            <div className="div--grid_item_right_each">
                                <p className="item--price">R$<em>{transaction.price}</em></p>
                            </div>
                        </div>
                    </div>
            );
        });

        // RETORNO BÁSICO DO HTML
        return (
            <div className="container--miolo-main">
                <div className="container--content-resume">
                    <div className="div--content-title">
                        <h1>Finanças</h1>
                    </div>

                    <div className="div--content-body">
                        {/* Div com Resumo */}
                        <div className="div--content-row">
                            <div className="div--content-summary">
                                <h1>R$ 2.015,10</h1>
                                <p>Seu saldo geral está positivo</p>

                            </div>

                            <div className="div--content-actions">
                                <Bar
                                    options = {mixedChartData.options}
                                    data = {mixedChartData.data}
                                    height = {80}
                                />
                            </div>
                        </div>

                        <div className="div--content-row mt20">
                            <div><p className="modal--body-custom-title">Transações recentes</p></div>
                            {/*<div>
                                <Button className="button--blue-noborder">Nova Receita</Button>
                                <Button className="button--blue-noborder">Nova Despesa</Button>
                                <Button className="button--blue-noborder">Importar</Button>
                                <Button className="button--blue-noborder">Ver todas</Button>
                            </div> */}
                        </div>
                            
                        {/* Div com filtros */}
                        <div className="div--grid_filter_item">
                            <div className="div--grid_item_left">
                                <div className="div--grid_item_left_each">
                                    <Button><ArrowDropUpIcon/></Button>
                                    <Button><ArrowDropDownIcon/></Button>
                                </div>
                            </div>
                            <div className="div--grid_item_right">
                                <div className="div--grid_item_right_each">
                                    <Button><ArrowDropUpIcon/></Button>
                                    <Button><ArrowDropDownIcon/></Button>
                                </div>
                                <div className="div--grid_item_right_each">
                                    <Button><ArrowDropUpIcon/></Button>
                                    <Button><ArrowDropDownIcon/></Button>
                                </div>
                                <div className="div--grid_item_right_each">
                                    <Button><ArrowDropUpIcon/></Button>
                                    <Button><ArrowDropDownIcon/></Button>
                                </div>
                            </div>
                        </div>

                        {/* Div com itens */}
                        <div className="div--content-row mt10">
                            <div className="div--financial-row">
                                { listTransactions }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Finances;
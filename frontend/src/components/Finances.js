import React from 'react';
import { defaults } from 'react-chartjs-2';
import  { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2'; 
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

defaults.global.defaultFontFamily = 'Averta';

const lineChartData = {
    data: {
        labels: ["Jan", "Fev", "Mar"],
        datasets: [
            {
                label: "Receitas",
                borderColor: "#32cc77",
                backgroundColor: "#32cc77",
                borderWidth: 2,
                data: [900, 2200, 3250]
            },
            {
                label: "Despesas",
                borderColor: "#e47474",
                backgroundColor: "#e47474",
                borderWidth: 2,
                data: [2050, 2000, 1208]
            }
        ]
    },
    options: {
        legend: {
            display: false,
            labels: {fontFamily: 'Averta'}
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display:false
                }
            }],
            yAxes: [{
                ticks: {
                   fontColor: "transparent",
                   fontSize: 0
                },
                gridLines: {
                    display:false
                }   
            }]
        },
        responsive: true
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
                    <div className="div--financial_item" key={transaction.id}>
                        <div className="div--financial_item_left">
                            <Checkbox
                                className="checkbox--list-selection"
                                checked={ this.state.eventAllDayCheck } 
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={< CheckCircleIcon />}
                                onChange={ this.changeAllDayCheck }
                            />                   
                            <div>{transaction.description}</div>
                        </div>
                        <div className="div--financial_item_right">
                            <p className="financial--tag"><em>{transaction.tag}</em></p>
                            <p className="item--price">R$<em>{transaction.price}</em></p>
                            <div className={transaction.type === 1 ? "financial--revenue-icon" : "financial--expense-icon"}></div>
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
                                    options = {lineChartData.options}
                                    data = {lineChartData.data}
                                    height = {50}
                                />
                            </div>
                        </div>

                        <div className="div--content-row mt20 div--financial-header_between">
                            <div><p className="modal--body-custom-title">Transações recentes</p></div>
                            {/*<div>
                                <Button className="button--blue-noborder">Nova Receita</Button>
                                <Button className="button--blue-noborder">Nova Despesa</Button>
                                <Button className="button--blue-noborder">Importar</Button>
                                <Button className="button--blue-noborder">Ver todas</Button>
                            </div> */}
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
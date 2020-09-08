import React from 'react';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/Finances.css';
import '../assets/css/Responsive/Resume--Responsive.css';

// ================ COMPONENTES ===============
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

// ================ ÍCONES ===============
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import SendIcon from '@material-ui/icons/Send';

class Finances extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            transactions: [
                { 
                    id: 0,
                    description: "Limpeza rápida do Marcus",
                    price: "105,00",
                    type: 1
                },
                { 
                    id: 1,
                    description: "Clareamento do João",
                    price: "500,00",
                    type: 1
                },
                { 
                    id: 2,
                    description: "Cadeira para recepcionista",
                    price: "279,00",
                    type: 0
                },
                { 
                    id: 3,
                    description: "Lâmpadas para escritório",
                    price: "89,00",
                    type: 0
                },
                { 
                    id: 4,
                    description: "Limpeza rápida do Cláudio",
                    price: "105,00",
                    type: 1
                },
                { 
                    id: 5,
                    description: "Enxaguante bucal 2L",
                    price: "50,00",
                    type: 0
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
                            <div className={transaction.type === 1 ? "financial--revenue-icon" : "financial--expense-icon"}></div>
                            <div>{transaction.description}</div>
                        </div>
                        <div className="div--financial_item_right">
                            <p className="item--price">R$<em>{transaction.price}</em></p>
                            <Button className="button--delete"><DeleteForeverIcon /></Button>
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
                                <h1>Ações rápidas</h1>
                                <div className="div--content-actions_button-bars">
                                    <Button className="div--content-actions_revenue">
                                        <AddIcon/>
                                        Receita
                                    </Button>
                                    <Button className="div--content-actions_expense">
                                        <RemoveIcon/>
                                        Despesa
                                    </Button>
                                    <Button className="div--content-actions_export">
                                        <SendIcon/>
                                        Exportar
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="div--content-row mt20 div--financial-header_between">
                            <div><p className="modal--body-custom-title">Transações recentes</p></div>
                            <div><Button>Ver todas</Button></div>
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
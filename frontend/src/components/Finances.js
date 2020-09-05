import React from 'react';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/Finances.css';
import '../assets/css/Responsive/Resume--Responsive.css';

// ================ COMPONENTES ===============

import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

class Finances extends React.Component{    
    // Visualização de Todo o conteúdo do HTML
    render(){
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
                                <p>Seu saldo geral está positivo!</p>
                            </div>

                            <div className="div--content-actions">
                                <h1>Ações</h1>
                                <div className="div--content-actions_button-bars">
                                    <Button>+</Button>
                                    <Button>-</Button>
                                    <Button>Importar</Button>
                                </div>
                            </div>
                        </div>

                        <div className="div--content-row mt20">
                            <p className="modal--body-custom-title">Transações</p>                     
                        </div>

                        {/* Div com itens */}
                        <div className="div--content-row mt10">
                            <div className="div--financial-row">
                                <div className="div--financial_item">
                                    <div className="div--financial_item_left">
                                        <div className="financial--revenue-icon"></div>
                                        <div>Limpeza rápida do Marcus</div>
                                    </div>
                                    <div className="div--financial_item_right">
                                        <p className="item--price">R$<em>105,00</em></p>
                                        <Button className="button--delete"><DeleteForeverIcon /></Button>
                                    </div>
                                </div>

                                <div className="div--financial_item">
                                    <div className="div--financial_item_left">
                                        <div className="financial--revenue-icon"></div>
                                        <div>Clareamento do João</div>
                                    </div>
                                    <div className="div--financial_item_right">
                                        <p className="item--price">R$<em>500,00</em></p>
                                        <Button className="button--delete"><DeleteForeverIcon /></Button>
                                    </div>
                                </div>

                                <div className="div--financial_item">
                                    <div className="div--financial_item_left">
                                        <div className="financial--expense-icon"></div>
                                        <div>Cadeira para recepcionista</div>
                                    </div>
                                    <div className="div--financial_item_right">
                                        <p className="item--price">R$<em>279,00</em></p>
                                        <Button className="button--delete"><DeleteForeverIcon /></Button>
                                    </div>
                                </div>

                                <div className="div--financial_item">
                                    <div className="div--financial_item_left">
                                        <div className="financial--revenue-icon"></div>
                                        <div>Clareamento do João</div>
                                    </div>
                                    <div className="div--financial_item_right">
                                        <p className="item--price">R$<em>500,00</em></p>
                                        <Button className="button--delete"><DeleteForeverIcon /></Button>
                                    </div>
                                </div>

                                <div className="div--financial_item">
                                    <div className="div--financial_item_left">
                                        <div className="financial--expense-icon"></div>
                                        <div>Cadeira para recepcionista</div>
                                    </div>
                                    <div className="div--financial_item_right">
                                        <p className="item--price">R$<em>279,00</em></p>
                                        <Button className="button--delete"><DeleteForeverIcon /></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Finances;
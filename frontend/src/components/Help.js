import React from 'react';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/Help.css';
import '../assets/css/Responsive/Help--Responsive.css';

import Accordion from './Accordion';

export default function Help(){
   
    // FUNCOES DO JAVASCRIPT
    /*function teste(e){
        debugger
    };*/   

    // RETORNO BÁSICO DO HTML
    return (
        <div className="container--miolo-main">
            <div className="container--content-help">
                <div className="div--content-title">
                    <h1>Como nós podemos te ajudar?</h1>
                </div>

                <div className="div--help-main">
                    <div>
                        <div className="cleiton"></div>
                    </div>
                    <div className="container--help-form">
                        <p className="p--subtitle">Conte-nos o seu problema</p>
                        <form>
                            <label for="name">Seu nome:</label>
                            <input type="text" id="name" placeholder="Digite o seu nome" className="input--white-context-wth-shadow"/>

                            <label for="email">Seu e-mail:</label>
                            <input type="email" id="email" placeholder="Digite seu melhor e-mail" className="input--white-context-wth-shadow"/>

                            <label for="telephone">Seu telefone:</label>
                            <input type="text" id="telephone" placeholder="Digite o seu melhor telefone" className="input--white-context-wth-shadow"/>

                            <label for="situation">Seu problema:</label>
                            <textarea id="situation" placeholder="Digite o seu relato" className="input--white-context-wth-shadow">
                            </textarea>

                            <input type="submit" value="Enviar" className="button--white-context"></input>                            
                        </form>
                    </div>
                </div>
            </div>

            <div className="container--auxiliar-help">
                <div className="div--help-main">
                    <p className="p--subtitle">Dúvidas Frequentes</p>
                    <br/>
                    <Accordion
                        question = {"Como faço para registrar reembolso?"}
                        answer = {'Basta acessar a aba de clientes e clicar no botão: "Vincular Exame".'}
                    />

                    <Accordion
                        question = {"Como faço para lançar despesas?"}
                        answer = {'Basta clicar no botão "Inserir despesa" na aba Despesas.'}
                    />

                    <Accordion
                        question = {"Como faço para lançar receitas?"}
                        answer = {'Basta clicar no botão "Inserir receita" na aba Receitas.'}
                    />

                    <Accordion
                        question = {"Como faço para pedir suporte agendado?"}
                        answer = {'Basta nos enviar uma mensagem no WhatsApp ou por e-mail solicitando o agendamento.'}
                    />
                    <button className="button--white-context">Clique aqui para visualizar mais perguntas</button>
                    <button className="button-chat" alt="Clique aqui para abrir o chat online"></button>
                    <div>Clique aqui para nos chamar via WhatsApp <div></div></div>
                </div>
            </div>
        </div>
    );
}
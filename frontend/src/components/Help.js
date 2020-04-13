import React from 'react';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/Help.css';
import '../assets/css/Responsive/Help--Responsive.css';

import Accordion from './Accordion';

class Help extends React.Component{    
    // Visualização de Todo o conteúdo do HTML
    render(){
        return (
            <div className="container--miolo-main">
                <div className="container--content-help">
                    <div className="div--content-title">
                        <h1>Como nós podemos te ajudar?</h1>
                    </div>               
                    
                    <div className="div--cleiton">
                    </div>
    
                    <div className="div--chats">
                        <div className="onlinechat">
                        </div>
                        
                        <div className="whatsapp">
                        </div>
                    </div>
                </div>
    
                <div className="container--form-help">
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
    
                        <input type="submit" value="Enviar e-mail" className="button--white-context"></input>                            
                    </form>
                </div>
    
                <div className="container-questions--help">
                    <p className="p--subtitle">Dúvidas Frequentes</p>
                    <div className="div--accordion-list">
                    <Accordion
                            question = {"Como faço para registrar reembolso?"}
                            answer = {'Basta acessar a aba de clientes e clicar no botão: "Vincular Exame".'}
                        />
                        <Accordion
                            question = {"Como faço para lançar receitas?"}
                            answer = {'Basta clicar no botão "Inserir receita" na aba Receitas.'}
                        />
                        <Accordion
                            question = {"Como faço para registrar reembolso?"}
                            answer = {'Basta acessar a aba de clientes e clicar no botão: "Vincular Exame".'}
                        />
                        <Accordion
                            question = {"Como faço para registrar reembolso?"}
                            answer = {'Basta acessar a aba de clientes e clicar no botão: "Vincular Exame".'}
                        />
                        <Accordion
                            question = {"Como faço para lançar receitas?"}
                            answer = {'Basta clicar no botão "Inserir receita" na aba Receitas.'}
                        />
                        <Accordion
                            question = {"Como faço para registrar reembolso?"}
                            answer = {'Basta acessar a aba de clientes e clicar no botão: "Vincular Exame".'}
                        />
                        <Accordion
                            question = {"Como faço para registrar reembolso?"}
                            answer = {'Basta acessar a aba de clientes e clicar no botão: "Vincular Exame".'}
                        />
                        <Accordion
                            question = {"Como faço para lançar receitas?"}
                            answer = {'Basta clicar no botão "Inserir receita" na aba Receitas.'}
                        />
                        <Accordion
                            question = {"Como faço para registrar reembolso?"}
                            answer = {'Basta acessar a aba de clientes e clicar no botão: "Vincular Exame".'}
                        />
                        <Accordion
                            question = {"Como faço para registrar reembolso?"}
                            answer = {'Basta acessar a aba de clientes e clicar no botão: "Vincular Exame".'}
                        />
                        <Accordion
                            question = {"Como faço para lançar receitas?"}
                            answer = {'Basta clicar no botão "Inserir receita" na aba Receitas.'}
                        />
                        <Accordion
                            question = {"Como faço para registrar reembolso?"}
                            answer = {'Basta acessar a aba de clientes e clicar no botão: "Vincular Exame".'}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Help;
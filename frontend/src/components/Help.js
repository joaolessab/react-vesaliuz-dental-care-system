import React from 'react';
import { defaults } from 'react-chartjs-2';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/Help.css';
import '../assets/css/Responsive/Help--Responsive.css';

import Accordion from './Accordion';

export default function Help(){
    defaults.global.defaultFontFamily = 'Averta';

    // RETORNO BÁSICO DO HTML
    return (
        <div className="container--miolo-main">
            <div className="container--content-help">
                <div className="div--content-title">
                    <h1>Como nós podemos te ajudar?</h1>
                </div>

                <div className="div--chart">
                    <div className="revenue">
                    </div>
                    
                    <div className="expense">
                    </div>
                </div>
                
                <div className="div--info">
                    <div className="div--info-icon">
                    </div>
                    <div className="div--info-text">
                        <h1>Aprenda como organizar sua agenda</h1>
                        <p>Seus rendimentos dependem do seu tempo disponível. Quanto mais você escalar o seu negócio, mais resultados irá obter. Esse artigo aborda exatamente o passo a passo para...</p>
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
                <div className="div--topbuttons">
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
                            question = {"Como faço para lançar receitas?"}
                            answer = {'Basta clicar no botão "Inserir receita" na aba Receitas.'}
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
                            question = {"Como faço para lançar receitas?"}
                            answer = {'Basta clicar no botão "Inserir receita" na aba Receitas.'}
                        />                  
                    </div>
                </div>
            </div>
        </div>
    );
}
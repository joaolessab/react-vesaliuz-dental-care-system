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
                        <p>Conte-nos o seu problema</p>
                        <form>
                            <label for="name">Seu nome:</label>
                            <input type="text" id="name" placeholder="Digite o seu nome" />

                            <label for="email">Seu e-mail:</label>
                            <input type="email" id="email" placeholder="Digite seu melhor e-mail" />

                            <label for="telephone">Seu telefone:</label>
                            <input type="text" id="telephone" placeholder="Digite o seu melhor telefone" />

                            <label for="situation">Seu problema:</label>
                            <textarea id="situation" placeholder="Digite o seu relato">
                            </textarea>

                            <input type="submit" value="Enviar"></input>
                        </form>
                    </div>
                </div>
            </div>

            <div className="container--auxiliar-help">
                <div className="div--help-main">
                    <p>Dúvidas Frequentes</p>
                    <br/>
                    <Accordion
                        question = {"Como faço para vincular um paciente com um exame?"}
                        answer = {'Basta acessar a aba de pacientes e clicar no botão: "Vincular Exame".'}
                    />

                    <Accordion
                        question = {"Como faço para lançar despesas?"}
                        answer = {'Basta clicar no botão "Inserir despesa" na aba Despesas.'}
                    />

                    <Accordion
                        question = {"Como faço para vincular um paciente com um exame?"}
                        answer = {'Basta acessar a aba de pacientes e clicar no botão: "Vincular Exame".'}
                    />

                    <Accordion
                        question = {"Como faço para lançar despesas?"}
                        answer = {'Basta clicar no botão "Inserir despesa" na aba Despesas.'}
                    />
                </div>
            </div>
        </div>
    );
}
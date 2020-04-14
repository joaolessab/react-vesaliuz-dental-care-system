import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/Help.css';
import '../assets/css/Responsive/Help--Responsive.css';

import Accordion from './Accordion';

class Help extends React.Component{    
    constructor(props){
        super(props);

        /* VARIABLES */
        this.state = {
            modalVisibility: false   
        };
    }

    onOpenModal = () => {
        this.setState({ modalVisibility: true });
    };
    
    onCloseModal = () => {
        this.setState({ modalVisibility: false });
    };

    // Visualização de Todo o conteúdo do HTML
    render(){
        const { modalVisibility } = this.state;

        return (
            <div className="container--miolo-main">
                <div className="container--content-help">
                    <div className="div--content-title">
                        <h1>Como nós podemos te ajudar?</h1>
                    </div>               
                    
                    <div className="div--cleiton">
                    </div>
    
                    <div className="div--chats">
                        <div className="onlinechat" onClick={() => this.onOpenModal()}>
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

                <Modal open={ modalVisibility } onClose={ this.onCloseModal } center>
                    <h1>Bem-vindo ao nosso Chat Online!</h1>
                    <div className="div--modalBody-chatBot">
                        <div className="div--chatBox">
                            <div className="div--chatBox-line">
                                <div className="">
                                </div>
                            </div>
                        </div>
                        <div className="div--typerBox">
                            <button className="button--letter"></button>
                            <input type="text" placeholder="Digite aqui sua mensagem..."/>
                            <button className="button--attach"></button>
                            <button className="button--send"></button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Help;
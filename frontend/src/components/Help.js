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
                    <div className="div--header-chatBot">
                        <div className="div--robotBig-chatBot"></div>
                        <div className="div--robotTalk-chatBot">
                            <p>Olá! Eu sou o Robustinho<br/>
                                <em>Estou aqui para te ajudar!</em>
                            </p>
                        </div>
                    </div>
                    <div className="div--modalBody-chatBot">
                        <div className="div--chatBox">
                            <div className="div--chatBox-line">
                                { /* Robot */ }
                                <div className="div--chatline-robot">
                                    <div className="chat-avatar"></div>
                                    <div className="chat-message">
                                        <p>Olá Maria, tudo bem? Como posso te ajudar?</p>
                                    </div>
                                </div>

                                { /* Customer */ }
                                <div className="div--chatline-customer">
                                    <div className="chat-avatar"></div>
                                    <div className="chat-message">
                                        <p>Gostaria de saber como faço para emitir notas fiscais</p>
                                    </div>
                                </div>

                                { /* Customer */ }
                                <div className="div--chatline-customer">
                                    <div className="chat-avatar"></div>
                                    <div className="chat-message">
                                        <p>Sou um usuário assíduo do sistema e tenho muitos pacientes, porém, minha vida está um pouco corrida</p>
                                    </div>
                                </div>

                                { /* Customer */ }
                                <div className="div--chatline-customer">
                                    <div className="chat-avatar"></div>
                                    <div className="chat-message">
                                        <p>Será que podem me auxiliar?</p>
                                    </div>
                                </div>

                                { /* Robot */ }
                                <div className="div--chatline-robot">
                                    <div className="chat-avatar"></div>
                                    <div className="chat-message">
                                        <p>Com certeza, Maria! Vamos lá:</p>
                                    </div>
                                </div>

                                { /* Robot */ }
                                <div className="div--chatline-robot">
                                    <div className="chat-avatar"></div>
                                    <div className="chat-message">
                                        <p>Em nosso menu lateral, clique em <strong>Pacientes</strong>.<br/>
                                        Em seguida, selecione o paciente desejado.<br/>
                                        O próximo passo é apenas clicar no botão <strong>Emitir Nota fiscal e aguardar alguns segundos.</strong><br/>
                                        Pronto! Sua nota fiscal irá começar o download automaticamente.</p>
                                    </div>
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
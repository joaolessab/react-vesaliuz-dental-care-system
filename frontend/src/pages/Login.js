import React, { useState } from 'react';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import './Login.css';
import './extraStyles/Login--Responsive.css';

export default function Login({ history }){
    // FUNCOES DO JAVASCRIPT
    const [username, setUsername] = useState('');

    // Declarando uma função básica de preenchimento automático
    function handleSubmit(e){
        e.preventDefault();
        console.log(username);

        // Redireciona a rota
        history.push('/main');
    }

    // RETORNO BÁSICO DO HTML
    return (
        <div className="container--father">
            <div className="container--blackboard">
                <div className="container--form">
                    <div className="container--form-top">
                        <div>
                            <div className="div--brushTeth"></div>
                            <button className="button--rectangle-secondary">Cadastre-se</button>
                        </div>
                    </div>
                    <div className="container--form-middle">
                        <form onSubmit = { handleSubmit }>
                            <h1 className="text--higher">Olá! Vamos começar? Faça o login</h1>
                            <h1 className="text--lower">Olá! Vamos começar?<br/>Faça o login</h1>
                            <input
                                placeholder="Email"
                                value = {username}
                                onChange = { e => setUsername(e.target.value) } /* Chamando useState para armazenar valor no username */
                            />
                            <input 
                                type="password"
                                placeholder="Senha"
                            />
                            <div className="div--container-formAction">
                                <div className="div--container-formAction--leftSplitter">
                                    <button className="button--labelType">Esqueceu sua senha?</button>
                                </div>
                                <div className="div--container-formAction--rightSplitter">
                                    <button className="button--rectangle-primary">Entrar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="container--form-bottom">
                        <button className="button--labelType">Nubibuz 2019</button>
                        <button className="button--labelType">Termos e Condições</button>
                        <button className="button--labelType">Privacidade</button>
                        <button className="button--labelType">Precisa de ajuda?</button>
                    </div>
                </div>
                <div className="container--draw">                    
                    <div className="div--darkblue-left">
                        <div className="div--points-top"></div>
                        <div className="div--brushTeth"></div>
                        <div className="div--happyTeeth"></div>
                        <div className="div--cloud-centered"></div>
                        <div className="div--cloud-bottom"></div>
                        <div className="div--points-bottom"></div>
                    </div>
                    <div className="div--lightblue-right"></div>
                </div>
            </div>
        </div>
    );
}
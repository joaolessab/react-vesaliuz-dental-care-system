import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/Login.css';
import '../assets/css/Responsive/Login--Responsive.css';

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
        <div className="container--app-father">

            {/* INICIO DO LOGIN */}
            <div className="container--blackboard-login">                
                <div className="container--form">
                    <div className="container--form-top">
                        <div>
                            <div className="div--brushTeth"></div>
                            <Button variant="contained" className="button--white-context">Cadastre-se</Button>
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
                                    <button className="button--black-label">Esqueceu sua senha?</button>
                                </div>
                                <div className="div--container-formAction--rightSplitter">
                                    <Button variant="contained" className="button--blue-context">Entrar</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="container--form-bottom">
                        <button className="button--black-label">Nubibuz 2019</button>
                        <button className="button--black-label">Termos e Condições</button>
                        <button className="button--black-label">Privacidade</button>
                        <button className="button--black-label">Precisa de ajuda?</button>
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
            {/* FINAL DO LOGIN   */}

        </div>
    );
}
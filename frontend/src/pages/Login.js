import React, { useState } from 'react';

//Arquivos CSS e Imagens devem ser importados aqui
import './Login.css';
import logo from '../assets/logo.svg';

export default function Login({ history }){ // React herdou a propriedade history dos routes
    // Iniciando useStates
    const [username, setUsername] = useState('');

    // Declarando uma função básica de preenchimento automático
    function handleSubmit(e){
        e.preventDefault();
        console.log(username);

        // Redireciona a rota
        history.push('/main');
    }

    // Retorno básico do HTML
    return (
        <div className="father-container">
            <div className="blackboard-container">
                <div className="form-container">
                    <form onSubmit = { handleSubmit }>
                        <img src={logo} alt= "Vesalius"/>
                        <h1>Faça login para usar o Vesalius</h1>
                        <input 
                            placeholder="Digite seu usuario"
                            value = {username}
                            onChange = { e => setUsername(e.target.value) } /* Chamando useState para armazenar valor no username */
                        />
                        <input 
                            type="password"
                            placeholder="Digite seu usuario"
                        />
                        <button>Enviar</button>
                    </form>
                </div>
                <div className="draw-container">                    
                    <div className="left--darkblue">
                        <div className="top--points"></div>
                        <div className="brush--teth"></div>
                        <div className="happy--teeth"></div>
                        <div className="cloud--centered"></div>
                        <div className="cloud--bottom"></div>
                        <div className="bottom--points"></div>
                    </div>
                    <div className="right--lightblue"></div>
                </div>
            </div>
        </div>
    );
}
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

    return (
        <div className="login-container">
            <form onSubmit = { handleSubmit }>
                <img src={logo} alt= "Vesalius"/>
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
    );
}
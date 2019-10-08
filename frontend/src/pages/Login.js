import React from 'react';
//Arquivos CSS e Imagens devem ser importados aqui
import './Login.css';
import logo from '../assets/logo.svg';

export default function Login(){
    return (
        <div className="login-container">
            <form>
                <img src={logo} alt= "Vesalius"/>
                <input 
                    placeholder="Digite seu usuario"
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
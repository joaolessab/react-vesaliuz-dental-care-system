import React from 'react';
import { render } from 'react-dom';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../App.css';
import './Help.css';
import './extraStyles/Help--Responsive.css';

export default function Help(){
   
    // FUNCOES DO JAVASCRIPT
    function teste(e){
        debugger
    };    

    // RETORNO BÁSICO DO HTML
    return (
        <div className="container--miolo">
            <div className="container--content">
                <div className="div--title">
                    <h1>Como nós podemos te ajudar?</h1>
                </div>

                <div className="div--info">
                    <div className="div--info-icon">
                    </div>
                    <div className="div--info-text">
                        <h1>Aprenda como organizar sua agenda</h1>
                        <p>Seus rendimentos dependem do seu tempo disponível. Quanto mais você escalar o seu negócio, mais resultados irá obter. Esse artigo aborda exatamente o passo a passo para...</p>
                    </div>
                </div>

                <div className="div--chart">
                    <div className="revenue">
                        <h1>R$ 2.730,50</h1>
                        <p>Opa, lucrou? Confira sua receita</p>
                    </div>
                    <div className="expense">
                        <h1>R$ 1.302,26</h1>
                        <p>Gastou, né? Confira suas despesas</p>
                    </div>
                </div>
            </div>

            <div className="container--auxiliar">
            </div>
        </div>
    );
}
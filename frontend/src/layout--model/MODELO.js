import React from 'react';
import { defaults } from 'react-chartjs-2';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/Help.css';
import '../assets/css/Responsive/Help--Responsive.css';

export default function Help(){
    defaults.global.defaultFontFamily = 'Averta';

    // RETORNO BÁSICO DO HTML
    return (
        <div className="container--miolo-main">
            <div className="container--content-modelo">
                <div className="div--content-title">
                    <h1>Página Inicial</h1>
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

            <div className="container--auxiliar-resume">
                <div className="div--topbuttons">
                    <button className="button--grey-label_underlined selected">Dia</button>
                    <button className="button--grey-label_underlined">Semana</button>
                    <button className="button--grey-label_underlined">Mês</button>
                    <button className="button--grey-label_underlined">Ano</button>
                </div>
            </div>
        </div>
    );
}
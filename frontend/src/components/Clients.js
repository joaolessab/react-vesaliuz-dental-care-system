import React from 'react';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/Clients.css';
import '../assets/css/Responsive/Clients--Reponsive.css';

import AutoCompleteSuggest from './AutoCompleteSuggest';

class Clients extends React.Component{    
    // Visualização de Todo o conteúdo do HTML
    render(){
        // RETORNO BÁSICO DO HTML
        return (
            <div className="container--miolo-main">
                <div className="container--content-clients">
                    <div className="div--content-title">
                        <h1>Clientes</h1>
                    </div>
    
                    {/* Auto Suggest */}
                    < AutoCompleteSuggest />
    
                    <div className="div--info">
                        <div className="div--info-icon">
                        </div>
                        <div className="div--info-text">
                            <h1>Dica do dia: Aprenda como organizar sua agenda</h1>
                            <p>Seus rendimentos dependem do seu tempo disponível. Quanto mais você escalar o seu negócio, mais resultados irá obter. Esse artigo aborda exatamente o passo a passo para...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Clients;
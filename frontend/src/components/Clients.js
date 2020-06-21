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
    
                    <div className="container--clients-card">
                        <div className="div--individual-card">
                            <div className="div--card-picture clark"></div>
                            <div className="div--card-name">Clark Cold</div>
                            <div className="div--card-contact">clarkcold@gmail.com<br/>(12) 99088-4140</div>
                            <div className="div--card-address">Avenia Brasil, 21</div>
                        </div>
                        
                        <div className="div--individual-card">
                            <div className="div--card-picture diana"></div>
                            <div className="div--card-name">Diana Mendes</div>
                            <div className="div--card-contact">dianamendes@gmail.com<br/>(12) 87995-1105</div>
                            <div className="div--card-address">Rua Monsenhor Dutra, 43</div>
                        </div>
                        
                        <div className="div--individual-card">
                            <div className="div--card-picture oliver"></div>
                            <div className="div--card-name">Oliver Queen</div>
                            <div className="div--card-contact">oliverthekey@gmail.com<br/>(12) 97865-2141</div>
                            <div className="div--card-address">Avenida JK, 110</div>
                        </div>  

                        <div className="div--individual-card">
                            <div className="div--card-picture bruce"></div>
                            <div className="div--card-name">Brunce Wayne da Silva</div>
                            <div className="div--card-contact">brucesilva@gmail.com<br/>(12) 99065-4040</div>
                            <div className="div--card-address">Rua Jacareí, 230</div>
                        </div>                                              
                    </div>
                </div>
            </div>
        );
    }
}

export default Clients;
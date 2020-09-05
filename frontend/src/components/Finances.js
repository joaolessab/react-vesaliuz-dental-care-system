import React from 'react';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/Resume.css';
import '../assets/css/Responsive/Resume--Responsive.css';

class Finances extends React.Component{    
    // Visualização de Todo o conteúdo do HTML
    render(){
        // RETORNO BÁSICO DO HTML
        return (
            <div className="container--miolo-main">
                <div className="container--content-resume">
                    <div className="div--content-title">
                        <h1>Finanças</h1>
                    </div>

                </div>
            </div>
        );
    }
}

export default Finances;
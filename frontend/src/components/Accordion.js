import React from 'react';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/Accordion.css';

class Accordion extends React.Component{
    // Substituindo o construtor do componente (são inputs do componente)
    
    addAccordionMover(e) {
        var clickedButton = e.target;
        clickedButton.classList.add("active");

        var panel = clickedButton.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } 
        else {
            panel.style.maxHeight = panel.scrollHeight + 20 + "px";
        }
    };

    // Visualização de Todo o conteúdo do HTML
    render(){
        return (
            <div className="container--accordion">
                <button 
                    className="accordion--button"
                    onClick={this.addAccordionMover}
                >                        
                    { this.props.question }
                </button>

                <div className="accordion--panel">
                    <p>{ this.props.answer }</p>
                </div>
            </div>
        );
    }
}

export default Accordion;
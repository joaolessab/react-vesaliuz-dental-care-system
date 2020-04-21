import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/Agenda.css';

class Agenda extends React.Component{

    constructor(props){
        super(props);

        /* VARIABLES */
        this.state = {
            modalVisibility: false,
            newsFilter: 10,
            selectedTags: ["Todos"]
        };
        
        this.modalTitle = "";
        this.modalBody = "";
        this.modalPicture = "";
    }

    // Visualização de Todo o conteúdo do HTML
    render(){

        // RETORNO BÁSICO DO HTML
        return (
            <div className="container--miolo-main">
                <div className="container--content-agenda">                    
                    <div className="div--content-title">
                        <h1>Agenda</h1>
                    </div>

                    <p>Testando</p>
                </div>

                {/* Modal de notícia */}
                <Modal open={ this.state.modalVisibility } onClose={ this.onCloseModal } center>
                    <h1>{ this.modalTitle }</h1>
                    <div className="div--modalBody-default" dangerouslySetInnerHTML={{ __html: this.modalBody }} />
                </Modal>
            </div>
        );
    }
}

export default Agenda;
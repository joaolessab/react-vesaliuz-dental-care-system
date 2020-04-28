import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/Agenda.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

class Agenda extends React.Component{

    constructor(props){
        super(props);

        /* VARIABLES */
        this.state = { };
        
        this.modalTitle = "";
        this.modalBody = "";
        this.modalPicture = "";        
    }

    // Visualização de Todo o conteúdo do HTML
    render(){
        const localizer = momentLocalizer(moment);

        const myEventsList = [];

        // RETORNO BÁSICO DO HTML
        return (
            <div className="container--miolo-main">
                <div className="container--content-agenda">                    
                    <div className="div--content-title">
                        <h1>Agenda</h1>
                    </div>

                    <div className="div--content-agenda">
                    <Calendar
                        localizer={ localizer }
                        events={ myEventsList }
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                    />
                    </div>
                </div>

                {/* Modal de notícia */}
                <Modal open={ this.state.modalVisibility } onClose={ this.onCloseModal } center>
                    <h1>{ this.modalTitle }</h1>
                    <div className="div--modalBody-default" dangerouslySetInnerHTML={ { __html: this.modalBody } } />
                </Modal>
            </div>
        );
    }
}

export default Agenda;
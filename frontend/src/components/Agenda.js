import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/Agenda.css';

class Agenda extends React.Component{

    constructor(props){
        super(props);

        /* VARIABLES */
        this.state = {
            currentDate : '2018-11-01',
            schedulerData : [
                { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
                { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
            ]
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

                    <div className="div--content-agenda">
                    <Paper>
                        <Scheduler
                        data={this.state.schedulerData}
                        >
                        <ViewState
                            currentDate={this.state.currentDate}
                        />
                        <DayView
                            startDayHour={9}
                            endDayHour={14}
                        />
                        <Appointments />
                        </Scheduler>
                    </Paper>
                    </div>
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
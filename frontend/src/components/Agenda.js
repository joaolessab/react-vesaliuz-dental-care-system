import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  MonthView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';
import { owners } from "../mock--API/agenda/tasks";
import { appointments, resourcesData } from "../mock--API/agenda/resources";

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/Agenda.css';

class Agenda extends React.Component{

    constructor(props){
        super(props);

        /* VARIABLES */
        this.state = {
            data: appointments,
            resources: [
                {
                    fieldName: 'roomId',
                    title: 'Room',
                    instances: resourcesData,
                },
                {
                    fieldName: 'members',
                    title: 'Members',
                    instances: owners,
                    allowMultiple: true,
                },
            ],
        };
        
        this.modalTitle = "";
        this.modalBody = "";
        this.modalPicture = "";

        this.commitChanges = this.commitChanges.bind(this);
    }

    commitChanges = ({ added, changed, deleted }) => {
        this.setState((state) => {
          let { data } = state;
          if (added) {
            const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
            data = [...data, { id: startingAddedId, ...added }];
          }
          if (changed) {
            data = data.map(appointment => (
              changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
          }
          if (deleted !== undefined) {
            data = data.filter(appointment => appointment.id !== deleted);
          }
          return { data };
        });
    };

    // Visualização de Todo o conteúdo do HTML
    render(){
        const { data, resources } = this.state;

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
                            data={ data }
                            >
                            <ViewState
                                defaultCurrentDate="2017-05-25"
                            />
                            <EditingState
                                onCommitChanges={ this.commitChanges }
                            />
                            <EditRecurrenceMenu />

                            <MonthView />
                            <Appointments />
                            <AppointmentTooltip
                                showOpenButton
                            />
                            <AppointmentForm />

                            <Resources
                                data={ resources }
                                mainResourceName="roomId"
                            />
                            <DragDropProvider />
                            </Scheduler>
                        </Paper>
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
import React, { createElement } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/pt-br';

import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/Agenda.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

moment.locale('pt-br');

class Agenda extends React.Component{
    constructor(props){
        super(props);

        /* VARIABLES */
        this.state = {
            events: [
                {
                    start: moment().toDate(),
                    end: moment().add(1, "days").toDate(),
                    title: "Teste do João"
                }
            ]
        };
         
        this.viewType = "month";
        
        this.modalTitle = "";
        this.modalBody = "";
        this.modalPicture = "";
    }

    // On load
    /*componentDidMount(){
        this.load()
    }

    load = () => {
        this.insertScrollAgendaDiv();
    }*/

    changeAgendaType = (newView) => {
        this.viewType = newView;
        this.forceUpdate();
    };

    onEventResize = (type, { event, start, end, allDay }) => {
        debugger
        this.setState(state => {
            debugger
            state.events[0].start = start;
            state.events[0].end = end;
            return { events: state.events };
        });
    };

    onEventDrop = ({ event, start, end, allDay }) => {
        debugger
        console.log(start);
    };

    handleSelect = ({ start, end }) => {
        debugger
        const title = window.prompt('New Event name');
        if (title)
            this.setState({
                events: [
                    ...this.state.events,
                    {
                        start,
                        end,
                        title,
                    },
                ],
                culture: 'es'
            });
    };

    // Visualização de Todo o conteúdo do HTML
    render(){
        const localizer = momentLocalizer(moment);
        const DnDCalendar = withDragAndDrop(Calendar);

        // RETORNO BÁSICO DO HTML
        return (
            <div className="container--miolo-main">
                <div className="container--content-agenda">                    
                    <div className="div--content-title">
                        <h1>Agenda</h1>
                    </div>

                    <div className="div--content-agenda">
                        <div className="bigcalendar--toolbar-custom">
                            <div className="div--days">
                                <button>Anterior</button>
                                <button>Hoje</button>
                                <button>Próximo</button>
                            </div>
                            <div className="text--date">
                                <p>Maio de 2020</p>
                            </div>
                            <div className="div--view">
                                <button onClick={() => this.changeAgendaType("month")}>Mês</button>
                                <button onClick={() => this.changeAgendaType("week")}>Semana</button>
                                <button onClick={() => this.changeAgendaType("day")}>Dia</button>
                                <button onClick={() => this.changeAgendaType("agenda")}>Agenda</button>
                            </div>
                        </div>
                        <DnDCalendar
                            defaultDate={moment().toDate()}
                            defaultView= { this.viewType }
                            localizer={ localizer }
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500 }}
                            
                            events={ this.state.events }
                            onEventDrop={ this.onEventDrop }
                            onEventResize={ this.onEventResize }
                            onSelectEvent={ event => alert(event.title) }
                            onSelectSlot={ this.handleSelect }
                            resizable
                        />
                        {/* <Calendar
                            defaultDate={moment().toDate()}
                            selectable
                            localizer={ localizer }
                            style={{ height: 500 }}
                        
                            events={ this.state.events }
                            defaultView="month"
                            onSelectEvent={event => alert(event.title)}
                            onSelectSlot={this.handleSelect}
                        /> */}
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
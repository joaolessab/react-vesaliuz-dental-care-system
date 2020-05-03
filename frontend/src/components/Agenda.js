import React, { createElement } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import TodayIcon from '@material-ui/icons/Today';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
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
            dateChosen: moment().toDate(),
            events: [
                {
                    start: moment().toDate(),
                    end: moment().add(1, "days").toDate(),
                    title: "Teste do João"
                }
            ],
            title: "Maio de 2020"
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

    changeAgendaType = (newType) => {
        this.findLiteralDate(newType);
        this.viewType = newType;
        this.forceUpdate();
    };

    findLiteralDate = (newType) => {
        if (newType == "day"){
            var oi = this.state.dateChosen.day();
            
            debugger
            var day = this.state.dateChosen.getDate();
            var month = this.findMonthString(this.state.dateChosen.getMonth().toString());
            var year = this.state.dateChosen.getFullYear();

            this.state.title = day + " de " + month + " de " + year;
        }
        else if (newType == "week"){
            debugger
        } 
        else if (newType == "month"){
            debugger
            var month = this.findMonthString(this.state.dateChosen.getMonth().toString()).toLocaleLowerCase();
            var year = this.state.dateChosen.getFullYear();

            this.state.title = month + " de " + year;
        }        
        else if (newType == "agenda"){
            this.state.title = "Inicio e Fim dos eventos";
        }
    };

    findMonthString = (month) => {
        switch(month) {
            case "1":
                return "Janeiro";
            case "2":
                return "Fevereiro";
            case "3":
                return "Março";
            case "4":
                return "Abril";
            case "5":
                return "Maio";
            case "6":
                return "Junho";
            case "7":
                return "Julho";
            case "8":
                return "Agosto";
            case "9":
                return "Setembro";
            case "10":
                return "Outubro";
            case "11":
                return "Novembro";
            case "12":
                return "Dezembro";
            default:
                return '-';
        }
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
                                <Tooltip TransitionComponent={Zoom} placement="bottom" title="Anterior">
                                    <Button><NavigateBeforeIcon/></Button>
                                </Tooltip>
                                <Tooltip TransitionComponent={Zoom} placement="bottom" title="Hoje">
                                    <Button><TodayIcon/></Button>
                                </Tooltip>
                                <Tooltip TransitionComponent={Zoom} placement="bottom" title="Próximo">
                                    <Button><NavigateNextIcon/></Button>
                                </Tooltip>
                                <Tooltip TransitionComponent={Zoom} placement="bottom" title="Novo evento">
                                    <Button><AddBoxIcon/></Button>
                                </Tooltip>
                            </div>
                            <div className="text--date">
                                <p>{ this.state.title }</p>
                            </div>
                            <div className="div--view">
                                <button onClick={() => this.changeAgendaType("day")}>Dia</button>
                                <button onClick={() => this.changeAgendaType("week")}>Semana</button>
                                <button onClick={() => this.changeAgendaType("month")} className="selected">Mês</button>
                                <button onClick={() => this.changeAgendaType("agenda")}>Agenda</button>
                            </div>
                        </div>
                        <DnDCalendar
                            defaultDate={ this.state.dateChosen }
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
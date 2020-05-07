import React, { createElement } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SearchIcon from '@material-ui/icons/Search';
import SyncIcon from '@material-ui/icons/Sync';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/pt-br';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/Agenda.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

moment.locale('pt-br');

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const classes = useStyles();
  
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
                },
                {
                    start: moment().add(1, "weeks").toDate(),
                    end: moment().add(1, "weeks").toDate(),
                    title: "Teste do Jones"
                },
                {
                    start: moment().add(1, "months").toDate(),
                    end: moment().add(1, "months").toDate(),
                    title: "Teste do Lessa"
                }
            ],
            dateStringTitle: "Maio de 2020",
            crudModalVisibility: false
        };
        
        this.whatDate = "today";
        this.viewType = "month";
        
        this.crudModalTitle = "Testando";
        this.crudModalBody = "Teste do Testando";
    }

    // On load
    /*componentDidMount(){
        this.load();
    }

    load = () => {
    }*/

    changeWhatDate = (whatDate) => {
        //Day
        if (this.viewType == "day"){
            if (whatDate == "next")
                this.state.dateChosen = moment(this.state.dateChosen).add(1, 'days').toDate();
            if (whatDate == "today")
                this.state.dateChosen = moment().toDate();
            if (whatDate == "previous")
                this.state.dateChosen = moment(this.state.dateChosen).subtract(1, 'days').toDate();
            
            this.findLiteralDate("day");
        }
        //Week
        else if (this.viewType == "week"){
            if (whatDate == "next")
                this.state.dateChosen = moment(this.state.dateChosen).add(1, 'weeks').toDate();
            if (whatDate == "today")
                this.state.dateChosen = moment().toDate();
            if (whatDate == "previous")
                this.state.dateChosen = moment(this.state.dateChosen).subtract(1, 'weeks').toDate();
            
            this.findLiteralDate("week");
        }
        //Month
        else if (this.viewType == "month"){
            if (whatDate == "next")
                this.state.dateChosen = moment(this.state.dateChosen).add(1, 'months').toDate();
            if (whatDate == "today")
                this.state.dateChosen = moment().toDate();
            if (whatDate == "previous")
                this.state.dateChosen = moment(this.state.dateChosen).subtract(1, 'months').toDate();

            this.findLiteralDate("month");
        }
        //Agenda
        else if (this.viewType == "agenda"){
            if (whatDate == "next")
                this.state.dateChosen = moment(this.state.dateChosen).add(1, 'months').toDate();
            if (whatDate == "today")
                this.state.dateChosen = moment().toDate();
            if (whatDate == "previous")
                this.state.dateChosen = moment(this.state.dateChosen).subtract(1, 'months').toDate();
            
            this.findLiteralDate("agenda");
        }
    
        this.whatDate = whatDate;
        this.forceUpdate();
    };

    changeViewType = (newType) => {
        this.findLiteralDate(newType);
        this.viewType = newType;
        this.forceUpdate();
    };

    findLiteralDate = (newType) => {
        if (newType == "day"){
            var day = moment(this.state.dateChosen).format('DD');
            var month = moment(this.state.dateChosen).format('MM');
            month = this.findMonthString(month);            
            var year = moment(this.state.dateChosen).format('YYYY');

            this.state.dateStringTitle = day + " de " + month + " de " + year;
        }
        else if (newType == "week"){
            var initialDayWeek = moment(this.state.dateChosen).startOf('week').format('DD');
            var initialMonthWeek = moment(this.state.dateChosen).startOf('week').format('MM');
            initialMonthWeek = this.findMonthString(initialMonthWeek);

            var finalDayWeek = moment(this.state.dateChosen).endOf('week').format('DD');
            var finalMonthWeek = moment(this.state.dateChosen).endOf('week').format('MM');
            finalMonthWeek = this.findMonthString(finalMonthWeek);
            var finalYearWeek = moment(this.state.dateChosen).endOf('year').format('YYYY');
            
            this.state.dateStringTitle = initialDayWeek + " de " + initialMonthWeek + " à " + finalDayWeek + " de " + finalMonthWeek + " - " + finalYearWeek;
        }
        else if (newType == "month"){
            var month = moment(this.state.dateChosen).format('MM');
            month = this.findMonthString(month);            
            var year = moment(this.state.dateChosen).format('YYYY');

            this.state.dateStringTitle = month + " de " + year;
        }        
        else if (newType == "agenda"){
            var initialDay = moment(this.state.dateChosen).format('DD');
            var initialMonth = moment(this.state.dateChosen).format('MM');
            initialMonth = this.findMonthString(initialMonth);

            var finalDay = moment(this.state.dateChosen).add(1, 'months').format('DD');
            var finalMonth = moment(this.state.dateChosen).add(1, 'months').format('MM');
            finalMonth = this.findMonthString(finalMonth);
            var finalYear = moment(this.state.dateChosen).add(1, 'months').format('YYYY');

            this.state.dateStringTitle = initialDay + " de " + initialMonth + " à " + finalDay + " de " + finalMonth + " - " + finalYear;
        }
    };

    findMonthString = (month) => {
        switch(month) {
            case "01":
                return "Janeiro";
            case "02":
                return "Fevereiro";
            case "03":
                return "Março";
            case "04":
                return "Abril";
            case "05":
                return "Maio";
            case "06":
                return "Junho";
            case "07":
                return "Julho";
            case "08":
                return "Agosto";
            case "09":
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

    /* Agenda behavior events */
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

    handleEventSelected = (event) => {
        this.openCrudModal(event.title, event.start, event.end)
    };

    handleSlotSelected = ({ start, end }) => {
        this.openCrudModal(null, start, end);
    };

    openCrudModal = (event, start, end) => {
        this.setState({ crudModalVisibility: true });
    };
    
    closeCrudModal = () => {
        this.setState({ crudModalVisibility: false });
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
                        <div>
                            <h1>Agenda</h1>
                        </div>
                        <div className="dateTitle">
                            <p>{ this.state.dateStringTitle }</p>
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className="div--content-agenda">
                        <div className="bigcalendar--toolbar-custom">
                            <div className="div--days">
                                <Button
                                    onClick={() => this.changeWhatDate("previous")}
                                >
                                    Anterior
                                </Button>
                                <Button
                                    onClick={() => this.changeWhatDate("today")}
                                    className={ this.whatDate == "today" ? "selected" : ""}
                                >
                                    Hoje
                                </Button>
                                <Button
                                    onClick={() => this.changeWhatDate("next")}
                                >
                                    Próximo
                                </Button>
                            </div>
                            <div className="div--manipulators">
                                <Tooltip TransitionComponent={Zoom} placement="bottom" title="Pesquisar eventos">
                                    <Button><SearchIcon/></Button>
                                </Tooltip>
                                <Tooltip TransitionComponent={Zoom} placement="bottom" title="Adicionar evento">
                                    <Button onClick={() => this.openCrudModal()}><AddBoxIcon/></Button>
                                </Tooltip>
                                <Tooltip TransitionComponent={Zoom} placement="bottom" title="Sincronizar calendário">
                                    <Button><SyncIcon/></Button>
                                </Tooltip>
                            </div>
                            <div className="div--view">
                                <Button 
                                    onClick={() => this.changeViewType("day")} 
                                    className={ this.viewType == "day" ? "selected" : ""}
                                >
                                    Dia
                                </Button>
                                <Button 
                                    onClick={() => this.changeViewType("week")} 
                                    className={ this.viewType == "week" ? "selected" : ""}
                                >
                                    Semana
                                </Button>
                                <Button 
                                    onClick={() => this.changeViewType("month")} 
                                    className={ this.viewType == "month" ? "selected" : ""}
                                >
                                    Mês
                                </Button>
                                <Button 
                                    onClick={() => this.changeViewType("agenda")} 
                                    className={ this.viewType == "agenda" ? "selected" : ""}
                                >
                                    Agenda
                                </Button>
                            </div>
                        </div>
                        <DnDCalendar
                            selectable
                            resizable

                            defaultDate={ this.state.dateChosen }
                            defaultView= { this.viewType }

                            localizer={ localizer }
                            style={{ height: 500 }}

                            startAccessor="start"
                            endAccessor="end"
                                                        
                            events={ this.state.events }
                            onEventDrop={ this.onEventDrop }
                            onEventResize={ this.onEventResize }
                            onSelectEvent={ event => this.handleEventSelected(event) }
                            onSelectSlot={ this.handleSlotSelected }
                        />
                    </div>
                </div>

                {/* Modal de notícia */}
                <Modal open={ this.state.crudModalVisibility } onClose={ this.closeCrudModal } center>
                    <div>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField id="standard-basic" label="Standard" />
                            <TextField id="filled-basic" label="Filled" variant="filled" />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </form>
                        <h1>{ this.crudModalTitle }</h1>
                        <div className="div--crudModalBody-default" dangerouslySetInnerHTML={ { __html: this.crudModalBody } } />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Agenda;
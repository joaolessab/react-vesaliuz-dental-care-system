import React from 'react';
import 'react-responsive-modal/styles.css';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import MomentUtils from "@date-io/moment";
import 'moment/locale/pt-br';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import { Modal } from 'react-responsive-modal';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SearchIcon from '@material-ui/icons/Search';
import SyncIcon from '@material-ui/icons/Sync';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputLabel from "@material-ui/core/InputLabel";

// ================ ESTILOS ===============

import '../assets/css/Agenda.css';
import '../assets/css/Animations/Agenda--Animations.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const momentLocale = moment.locale('pt-br');

const useStyles = theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
});
  
class Agenda extends React.Component{    
    constructor(props){         
        super(props);

        // ================ STATE FOR COMPONENT ===============

        this.state = {
            dateChosen: moment().toDate(),
            events: [
                {   
                    id: 1,
                    title: "Teste do João",
                    start: moment().toDate(),
                    end: moment().add(1, "days").toDate(),
                    observation: "Lorem Ipsum lorem ipsum",
                    client: 4
                },
                {
                    id: 2,
                    title: "Teste do Jones",
                    start: moment().add(1, "weeks").toDate(),
                    end: moment().add(1, "weeks").add(2, "hours").toDate(),
                    observation: "Lorem Ipsum lorem ipsum",
                    client: 3
                },
                {
                    id: 3,
                    title: "Teste do Cleiton",
                    start: moment().add(1, "weeks").add(2, "days").toDate(),
                    end: moment().add(1, "weeks").add(2, "days").add(2, "hours").toDate(),
                    observation: "Lorem Ipsum lorem ipsum",
                    client: 1
                },
                {
                    id: 4,
                    title: "Teste do Lessa",
                    start: moment().add(1, "months").toDate(),
                    end: moment().add(1, "months").toDate(),
                    observation: "Lorem Ipsum lorem ipsum",
                    client: 2
                }
            ],
            dateStringTitle: "Maio de 2020",
            crudModalVisibility: false,

            // ================ EVENT MODAL PARAMETERS ===============

            eventTitle : "",
            eventInitialDate: moment().toDate(),
            eventFinalDate: moment().add(1, "days").toDate(),
            eventInitialTime : "00:00",
            eventFinalTime: "00:00",
            eventAllDayCheck: false,
            eventRepeatCheck: false,
            eventClientListValue: 0, 
            eventClientList: [
                { name: "Selecione...", id: 0 },
                { name: "Andreas Pirlo", id: 1 },
                { name: "Paulo Dybala", id: 2 },
                { name: "Travis Scott", id: 3 },
                { name: "Cristiano Ronaldo", id: 4 }
            ],

            eventObservation : "",
            eventAfterDate: moment().add(1, "days").toDate(),            

            eventAgendaTimes : [
                "00:00",
                "00:15",
                "00:30",
                "00:45",
                "01:00",
                "01:15",
                "01:30",
                "01:45",
                "02:00",
                "02:15",
                "02:30",
                "02:45",
                "03:00",
                "03:15",
                "03:30",
                "03:45",
                "04:00",
                "04:15",
                "04:30",
                "04:45",
                "05:00",
                "05:15",
                "05:30",
                "05:45",
                "06:00",
                "06:15",
                "06:30",
                "06:45",
                "07:00",
                "07:15",
                "07:30",
                "07:45",
                "08:00",
                "08:15",
                "08:30",
                "08:45",
                "09:00",
                "09:15",
                "09:30",
                "09:45",
                "10:00",
                "10:15",
                "10:30",
                "10:45",
                "11:00",
                "11:15",
                "11:30",
                "11:45",
                "12:00",
                "12:15",
                "12:30",
                "12:45",
                "13:00",
                "13:15",
                "13:30",
                "13:45",
                "14:00",
                "14:15",
                "14:30",
                "14:45",
                "15:00",
                "15:15",
                "15:30",
                "15:45",            
                "16:00",
                "16:15",
                "16:30",
                "16:45",            
                "17:00",
                "17:15",
                "17:30",
                "17:45",            
                "18:00",
                "18:15",
                "18:30",
                "18:45",
                "19:00",
                "19:15",
                "19:30",
                "19:45",
                "20:00",
                "20:15",
                "20:30",
                "20:45",
                "21:00",
                "21:15",
                "21:30",
                "21:45",
                "22:00",
                "22:15",
                "22:30",
                "22:45",
                "23:00",
                "23:15",
                "23:30",
                "23:45"
            ],

            eventRepeatListValue: 0,
            eventRepeatList: [
                { option: "Selecione...", id: 0 },
                { option: "Diariamente", id: 1 },
                { option: "Semanalmente", id: 2 },
                { option: "Mensalmente", id: 3 },
                { option: "Anualmente", id: 4 }
            ],

            eventRepeatListItemValue: "-",
            eventRepeatListItem: [
                { option: "Selecione...", id: 0 },
                { option: "Dia(s)", id: 1 },
                { option: "Mes(es)", id: 2 },
                { option: "Semana(s)", id: 3 },
                { option: "Ano(s)", id: 4 }
            ]
        };

        /* Configurações da Agenda */
        this.whatDate = "today";
        this.viewType = "month";
    }

    changeWhatDate = (whatDate) => {
        //Day
        if (this.viewType === "day"){
            if (whatDate === "next")
                this.state.dateChosen = moment(this.state.dateChosen).add(1, 'days').toDate();
            if (whatDate === "today")
                this.state.dateChosen = moment().toDate();
            if (whatDate === "previous")
                this.state.dateChosen = moment(this.state.dateChosen).subtract(1, 'days').toDate();
            
            this.findLiteralDate("day");
        }
        //Week
        else if (this.viewType === "week"){
            if (whatDate === "next")
                this.state.dateChosen = moment(this.state.dateChosen).add(1, 'weeks').toDate();
            if (whatDate === "today")
                this.state.dateChosen = moment().toDate();
            if (whatDate === "previous")
                this.state.dateChosen = moment(this.state.dateChosen).subtract(1, 'weeks').toDate();
            
            this.findLiteralDate("week");
        }
        //Month
        else if (this.viewType === "month"){
            if (whatDate === "next")
                this.state.dateChosen = moment(this.state.dateChosen).add(1, 'months').toDate();
            if (whatDate === "today")
                this.state.dateChosen = moment().toDate();
            if (whatDate === "previous")
                this.state.dateChosen = moment(this.state.dateChosen).subtract(1, 'months').toDate();

            this.findLiteralDate("month");
        }
        //Agenda
        else if (this.viewType === "agenda"){
            if (whatDate === "next")
                this.state.dateChosen = moment(this.state.dateChosen).add(1, 'months').toDate();
            if (whatDate === "today")
                this.state.dateChosen = moment().toDate();
            if (whatDate === "previous")
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
        if (newType === "day"){
            var day = moment(this.state.dateChosen).format('DD');
            var month = moment(this.state.dateChosen).format('MM');
            month = this.findMonthString(month);            
            var year = moment(this.state.dateChosen).format('YYYY');

            this.state.dateStringTitle = day + " de " + month + " de " + year;
        }
        else if (newType === "week"){
            var initialDayWeek = moment(this.state.dateChosen).startOf('week').format('DD');
            var initialMonthWeek = moment(this.state.dateChosen).startOf('week').format('MM');
            initialMonthWeek = this.findMonthString(initialMonthWeek);

            var finalDayWeek = moment(this.state.dateChosen).endOf('week').format('DD');
            var finalMonthWeek = moment(this.state.dateChosen).endOf('week').format('MM');
            finalMonthWeek = this.findMonthString(finalMonthWeek);
            var finalYearWeek = moment(this.state.dateChosen).endOf('year').format('YYYY');
            
            this.state.dateStringTitle = initialDayWeek + " de " + initialMonthWeek + " à " + finalDayWeek + " de " + finalMonthWeek + " - " + finalYearWeek;
        }
        else if (newType === "month"){
            var month = moment(this.state.dateChosen).format('MM');
            month = this.findMonthString(month);            
            var year = moment(this.state.dateChosen).format('YYYY');

            this.state.dateStringTitle = month + " de " + year;
        }        
        else if (newType === "agenda"){
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
            //debugger
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
        this.openCrudModal(event.title, event.start, event.end, event.observation);
    };

    handleSlotSelected = ({ start, end }) => {
        //Slot em branco
        this.openCrudModal(null, start, end);
    };

    openCrudModal = (title, start, end, observation) => {
        // Assumindo que é um evento novo
        if (start === null){
            this.disabledKeyboardDatePicker = false;
            //this.allDayEvent = false;
            //this.repeatEvent = false;

            this.setState({
                eventTitle: "",
                eventObservation: ""
            });
        }
        //Assumindo que é uma edição
        else{
            this.setState({
                eventTitle: title,
                eventObservation: observation
            });
        }
        
        this.setCRUDInitialTime(start);
        this.setCRUDFinalTime(end);
        this.setState({ crudModalVisibility: true });
    };

    setCRUDInitialTime = (start) => {
        var hour, minutes = null;

        if (start != undefined && start != null){
            hour = moment(start.toISOString());
            minutes = start.getMinutes();
        }
        else{
            hour = moment();
            minutes = moment().toDate().getMinutes();
        }

        // Minutes
        if (minutes > 0 && minutes < 16)
            minutes = 15;
        else if (minutes > 15 && minutes < 31)
            minutes = 30;
        else if (minutes > 30 && minutes < 46)
            minutes = 45;
        else if (minutes === 0)
            minutes = 0;
        else if (minutes > 45){
            minutes = 0;
            hour = hour.add("1", "hours");
        }
        hour = hour.toDate().getHours();
        
        /* Caso o moment preencha faltando um 0 */
        hour = hour.toString();
        minutes = minutes.toString();

        if (hour.length === 1)
            hour = "0" + hour;

        if (minutes.length === 1)
            minutes = minutes + "0";

        var initialTime = hour + ":" + minutes;
        this.initialTime = initialTime;
    };

    setCRUDFinalTime = (end) => {
        var hour, minutes = null;

        if (end != undefined && end != null){
            hour = moment(end.toISOString());
            minutes = end.getMinutes();
        }
        else{
            hour = moment().add("1", "hours");
            minutes = moment().toDate().getMinutes();
        }
        
        // Minutes
        if (minutes > 0 && minutes < 16)
            minutes = 15;
        else if (minutes > 15 && minutes < 31)
            minutes = 30;
        else if (minutes > 30 && minutes < 46)
            minutes = 45;
        else if (minutes === 0)
            minutes = 0;
        else if (minutes > 45){
            minutes = 0;
            hour = hour.add("1", "hours");
        }
        hour = hour.toDate().getHours();
        
        /* Caso o moment preencha faltando um 0 */
        hour = hour.toString();
        minutes = minutes.toString();

        if (hour.length === 1)
            hour = "0" + hour;

        if (minutes.length === 1)
            minutes = minutes + "0";

        var finalTime = hour + ":" + minutes;
        this.finalTime = finalTime;
    };
    
    closeCrudModal = () => {
        this.setState({ crudModalVisibility: false });
    };

    // ================ ONCHANGE EVENTS ===============

    changeEventTitle = (e) => {
        this.setState({ eventTitle: e.target.value });
    };

    changeInitialDate = (date) => {
        this.setState({ eventInitialDate: date });
    };

    changeFinalDate = (date) => {
        this.setState({ eventFinalDate: date });
    };

    changeInitialTime = (e) => {
        this.setState({ eventInitialTime: e.target.value });
    };

    changeFinalTime = (e) => {
        this.setState({ eventFinalTime: e.target.value });
    };

    changeAllDayCheck = (e) => {
        this.setState({ 
            eventAllDayCheck: e.target.checked,
            eventInitialTime: "00:00",
            eventFinalTime: "00:00"
        });
    };
    
    changeRepeatCheck = (e) => {
        this.setState({ 
            eventRepeatCheck: e.target.checked
        });
    };

    changeEventClient = (e) => {
        this.setState({ eventClientListValue: e.target.value });
    };

    changeEventObservation = (e) => {
        this.setState({ eventObservation: e.target.value });
    };

    changeRepeatMode = (e) => {
        this.setState({ eventRepeatListValue: e.target.value });

        for (var i = 0; i < this.state.eventRepeatListItem.length; i++){
            if (this.state.eventRepeatList[i].id === e.target.value){
                this.setState({ eventRepeatListItemValue: this.state.eventRepeatListItem[i].option });
            }
        }
    };

    changeAfterDate = (date) => {
        this.setState({eventAfterDate: date});
    };

    // ================ RENDERIZAÇÃO DO CONTEÚDO HTML ===============

    render(){
        const { classes } = this.props;
        const localizer = momentLocalizer(moment);
        const DnDCalendar = withDragAndDrop(Calendar);

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
                                    className={ this.whatDate === "today" ? "selected" : ""}
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
                                {/* <Tooltip TransitionComponent={Zoom} placement="bottom" title="Sincronizar calendário"> */}
                                    <Button disabled><SyncIcon/></Button>
                                {/* </Tooltip> */}
                            </div>
                            <div className="div--view">
                                <Button 
                                    onClick={() => this.changeViewType("day")} 
                                    className={ this.viewType === "day" ? "selected" : ""}
                                >
                                    Dia
                                </Button>
                                <Button 
                                    onClick={() => this.changeViewType("week")} 
                                    className={ this.viewType === "week" ? "selected" : ""}
                                >
                                    Semana
                                </Button>
                                <Button 
                                    onClick={() => this.changeViewType("month")} 
                                    className={ this.viewType === "month" ? "selected" : ""}
                                >
                                    Mês
                                </Button>
                                <Button 
                                    onClick={() => this.changeViewType("agenda")} 
                                    className={ this.viewType === "agenda" ? "selected" : ""}
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

                {/* Modal de Agenda */}
                <Modal open={ this.state.crudModalVisibility } onClose={ this.closeCrudModal } center>
                    <div className="div--modalAgenda-body">
                        <div className="div--agenda-appointment-body">
                            <div 
                                className={ this.state.eventRepeatCheck === true ? "div--agenda-appointment div--agenda-appointment--opened" : "div--agenda-appointment" }
                            >
                                <form className={classes.root} noValidate autoComplete="off">
                                    <MuiPickersUtilsProvider libInstance={ moment } utils={ MomentUtils } locale={ momentLocale }>                                
                                        {/* Titulo */}
                                        <div className="div--agendaForm-title agenda--component">
                                            <TextField 
                                                id="title-event" 
                                                label="Título do seu evento:" 
                                                value = { this.state.eventTitle } 
                                                onChange = { this.changeEventTitle }
                                            />
                                        </div>

                                        {/* Datas e horários */}
                                        <div className="div--agendaForm-dates agenda--component">
                                            <KeyboardDatePicker
                                                disableToolbar
                                                variant="inline"
                                                format="DD/MM/YYYY"
                                                margin="normal"
                                                id="date-picker-initial"
                                                label="Inicia em:"
                                                value={ this.state.eventInitialDate }
                                                autoOk = { true }
                                                onChange={ this.changeInitialDate }
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                            
                                            <KeyboardDatePicker
                                                disableToolbar
                                                variant="inline"
                                                format="DD/MM/YYYY"
                                                margin="normal"
                                                id="date-picker-final"
                                                label="Encerra em:"                                                    
                                                disabled = { this.state.eventAllDayCheck }
                                                value={ this.state.eventFinalDate }
                                                autoOk = { true }
                                                onChange={ this.changeFinalDate }
                                                KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                                }}
                                            />
                                        </div>
                                        <div className="div--agendaForm-times agenda--component">
                                            <div>
                                                <InputLabel htmlFor="checkbox--initial-time">Hora de início:</InputLabel>
                                                <Select
                                                    labelId="checkbox--initial-time"
                                                    id="checkbox--initial-time"                                                    
                                                    disabled = { this.state.eventAllDayCheck }
                                                    value={ this.state.eventInitialTime }
                                                    onChange={ this.changeInitialTime }
                                                    input={<Input />}
                                                >
                                                    { this.state.eventAgendaTimes.map((timeItem) => (
                                                        <MenuItem key={timeItem} value={timeItem}>
                                                            <ListItemText primary={timeItem} />
                                                        </MenuItem>
                                                    )) }
                                                </Select>
                                            </div>
                                            <div className="div--hours-finish">
                                                <InputLabel htmlFor="checkbox--initial-time">Hora do término:</InputLabel>
                                                <Select
                                                    labelId="checkbox--final-time"
                                                    id="checkbox--final-time"                                                    
                                                    disabled = { this.state.eventAllDayCheck }
                                                    value={ this.state.eventFinalTime }
                                                    onChange={ this.changeFinalTime }
                                                    input={<Input />}
                                                >
                                                    {this.state.eventAgendaTimes.map((timeItem) => (
                                                    <MenuItem key={timeItem} value={timeItem}>
                                                        <ListItemText primary={timeItem} />
                                                    </MenuItem>
                                                    ))}
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="div--agendaForm-repeatOptions agenda--component">
                                            <FormControlLabel
                                                value="end"
                                                control={
                                                    <Checkbox
                                                        checked={ this.state.eventAllDayCheck } 
                                                        icon={<RadioButtonUncheckedIcon />}
                                                        checkedIcon={< CheckCircleIcon />}
                                                        onChange={ this.changeAllDayCheck }
                                                    />
                                                }
                                                label="Dia todo"
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel
                                                    value="end"
                                                    control={
                                                        <Checkbox
                                                            checked={ this.state.eventRepeatCheck }
                                                            icon={<RadioButtonUncheckedIcon />}
                                                            checkedIcon={< CheckCircleIcon />}
                                                            onChange={ this.changeRepeatCheck }
                                                        />
                                                    }
                                                    label="Repetir"
                                                    labelPlacement="end"
                                                />
                                        </div>
                                        <div className="div--agendaForm-client agenda--component">
                                            <InputLabel htmlFor="checkbox--agenda-client" className="input--agendaForm-client">Cliente:</InputLabel>
                                            <Select
                                                labelId="checkbox--agenda-client"
                                                id="checkbox--agenda-client"
                                                value = { this.state.eventClientListValue }
                                                onChange={ this.changeEventClient }
                                                input={ <Input /> }
                                            >
                                                { this.state.eventClientList.map((clientItem) => (
                                                    <MenuItem key={ clientItem.name } value={ clientItem.id }>
                                                        <ListItemText primary={ clientItem.name } />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </div>
                                        <div className="div--agendaForm-observation agenda--component">
                                            <InputLabel htmlFor="textarea-observation">Observações:</InputLabel>
                                            <TextareaAutosize 
                                                id="textarea-observation" 
                                                value = { this.state.eventObservation } 
                                                aria-label="minimum height" 
                                                rowsMin={3} 
                                                placeholder="Escreva detalhes do seu evento ou compromisso"
                                                onChange = { this.changeEventObservation }
                                            />
                                        </div>
                                    </MuiPickersUtilsProvider>
                                </form>
                            </div>
                            <div
                                className={ this.state.eventRepeatCheck === true ? "div-agenda--repeat div-agenda--repeat--opened" : "div-agenda--repeat"}
                            >
                                <MuiPickersUtilsProvider libInstance={ moment } utils={ MomentUtils } locale={ momentLocale }>                                
                                    <div className="div--agendaForm-client agenda--component">
                                        <InputLabel htmlFor="checkbox--repeat-mode">Repetição:</InputLabel>
                                        <Select
                                            labelId="checkbox--repeat-mode"
                                            id="checkbox--repeat-mode"
                                            value={ this.state.eventRepeatListValue }
                                            onChange={ this.changeRepeatMode }
                                            input={<Input />}
                                        >
                                            { this.state.eventRepeatList.map((repeatItem) => (
                                            <MenuItem key={repeatItem.option} value={repeatItem.id}>
                                                <ListItemText primary={repeatItem.option} />
                                            </MenuItem>
                                            ))}
                                        </Select>
                                        <div className="div--repeat-mode">
                                            <div>
                                                <TextField id="counter-repeat-mode" label="Repita a cada:" /> 
                                            </div>
                                            <div className="div--repeat-sample">
                                                <p>{ this.state.eventRepeatListItemValue }</p>
                                            </div>
                                        </div>
                                        <div className="div--endrepeat-mode">                                            
                                            <InputLabel htmlFor="checkbox--endrepeat-mode">Quando encerra a repetição?</InputLabel>
                                            <div className="div--endrepeat-mode-chosen-firstdiv">
                                                <FormControlLabel
                                                    value="end"
                                                    control={
                                                        <Checkbox
                                                            checked={ this.state.eventAllDayCheck } 
                                                            icon={<RadioButtonUncheckedIcon />}
                                                            checkedIcon={< CheckCircleIcon />}
                                                            onChange={ this.changeAllDayCheck }
                                                        />
                                                    }
                                                    label="Nunca"
                                                    labelPlacement="end"
                                                />
                                            </div>
                                            <div className="div--endrepeat-mode-chosen">
                                                <div>
                                                    <FormControlLabel
                                                        value="end"
                                                        control={
                                                            <Checkbox
                                                                checked={ this.state.eventAllDayCheck } 
                                                                icon={<RadioButtonUncheckedIcon />}
                                                                checkedIcon={< CheckCircleIcon />}
                                                                onChange={ this.changeAllDayCheck }
                                                            />
                                                        }
                                                        label="Em:"
                                                        labelPlacement="end"
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        id="input--repeat-number"
                                                        type="number"
                                                        defaultValue = "0"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="div--endrepeat-mode-chosen">
                                                <div>
                                                    <FormControlLabel
                                                        value="end"
                                                        control={
                                                            <Checkbox
                                                                checked={ this.allDayEvent } 
                                                                icon={<RadioButtonUncheckedIcon />}
                                                                checkedIcon={< CheckCircleIcon />}
                                                                onChange={ this.changeAllDayCheck }
                                                            />
                                                        }
                                                        label="Depois de:"
                                                        labelPlacement="end"
                                                    />
                                                </div>
                                                <div>
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        format="DD/MM/YYYY"
                                                        margin="normal"
                                                        id="date-picker-final"
                                                        autoOk = { true }
                                                        value={ this.state.eventAfterDate }
                                                        onChange={ this.changeAfterDate }
                                                        KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>  
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>
                        <div className="div--agenda-footer">
                            <div className="div--agendaForm-buttonsBar agenda--component">
                                <Button id="deleteEventButton" 
                                    className={ this.state.eventRepeatCheck ? "hideComponent": "" }
                                >
                                    Excluir
                                </Button>
                                <Button id="cancelEventButton" onClick={ this.closeCrudModal }>Cancelar</Button>
                                <Button id="saveEventButton">Salvar</Button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default withStyles(useStyles)(Agenda);
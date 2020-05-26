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

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/Agenda.css';
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

        /* VARIABLES */

        /* Eventos da Agenda */
        this.state = {
            dateChosen: moment().toDate(),
            events: [
                {   
                    id: 1,
                    start: moment().toDate(),
                    end: moment().add(1, "days").toDate(),
                    title: "Teste do João"
                },
                {
                    id: 2,
                    start: moment().add(1, "weeks").toDate(),
                    end: moment().add(1, "weeks").toDate(),
                    title: "Teste do Jones"
                },
                {
                    id: 3,
                    start: moment().add(1, "months").toDate(),
                    end: moment().add(1, "months").toDate(),
                    title: "Teste do Lessa"
                }
            ],
            dateStringTitle: "Maio de 2020",
            crudModalVisibility: false
        };
        
        /* Configurações da Agenda */
        this.whatDate = "today";
        this.viewType = "month";        

        /* Propriedades do Modal do CRUD de eventos */
        this.selectedInitialDate = moment().toDate();
        this.selectedFinalDate = moment().toDate();
        this.selectedAfterDate = moment().add(1, "days").toDate();

        this.timePickerValues = [
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
        ];

        this.initialTime = this.timePickerValues[0];
        this.finalTime = this.timePickerValues[0];
        this.allDayEvent = false;
        this.repeatEvent = false;

        this.clientList = [
            "João Carlos Nunes",
            "Regina Lessa",
            "Travis Scott",
            "Cristiano Ronaldo",
            "Napoleon Hill"
        ];
        this.clientListSelected = this.clientList[2];

        this.repeatList = [
            "Diariamente",
            "Semanalmente",
            "Mensalmente",
            "Anualmente"
        ];
        this.repeatListSelected = this.repeatList[0];

        this.repeaterElements = ["Dia(s)", "Mes(es)", "Semana(s)", "Ano(s)"]
        this.repeaterElement = this.repeaterElements[0];
    }

    // On load
    /*componentDidMount(){
        this.load();
    }

    load = () => {
    }*/

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
        this.openCrudModal(event.title, event.start, event.end);
    };

    handleSlotSelected = ({ start, end }) => {
        this.openCrudModal(null, start, end);
    };

    openCrudModal = (event, start, end) => {
        this.setCRUDInitialTime(start);
        this.setCRUDFinalTime(end);

        this.setState({ crudModalVisibility: true });
    };

    setCRUDInitialTime = (start) => {
        debugger
        var hour, minutes = null;

        if (start != undefined && start != null){
            hour = start.getHours();
            minutes = start.getMinutes();
        }
        else{
            hour = moment().toDate().getHours();
            minutes = moment().toDate().getMinutes();
        }
        
        // Minutes
        if (minutes > 0 && minutes < 16)
            minutes = 15;
        else if (minutes > 15 && minutes < 31)
            minutes = 30;
        else if (minutes > 30 && minutes < 46)
            minutes = 45;
        else if (minutes > 45 || minutes == 0)
            minutes = 0;
        
        var finalTime = hour.toString() + ":" + minutes.toString();
        if (finalTime.length == 4)
            finalTime += "0";
        this.initialTime = finalTime;
    };

    setCRUDFinalTime = (end) => {
        debugger
        var hour, minutes = null;

        if (end != undefined && end != null){
            hour = end.getHours();
            minutes = end.getMinutes();
        }
        else{
            hour = moment().add(1, "hours").toDate().getHours();
            minutes = moment().add(1, "hours").toDate().getMinutes();
        }
        
        // Minutes
        if (minutes > 0 && minutes < 16)
            minutes = 15;
        else if (minutes > 15 && minutes < 31)
            minutes = 30;
        else if (minutes > 30 && minutes < 46)
            minutes = 45;
        else if (minutes > 45 || minutes == 0)
            minutes = 0;
        
        var finalTime = hour.toString() + ":" + minutes.toString();
        if (finalTime.length == 4)
            finalTime += "0";
        this.finalTime = finalTime;
    };
    
    closeCrudModal = () => {
        this.setState({ crudModalVisibility: false });
    };

    /* Funções do CRUD da Agenda */

    changeInitialDate = (date) => {
        debugger
        this.selectedInitialDate = date;
        this.forceUpdate();
    };

    changeFinalDate = (date) => {
        this.selectedFinalDate = date;
        this.forceUpdate();
    };

    changeAfterDate = (date) => {
        this.selectedAfterDate = date;
        this.forceUpdate();
    };

    changeInitialTime = (event) => {
        this.initialTime = event.target.value;
        this.forceUpdate();
    };

    changeFinalTime = (event) => {
        this.finalTime = event.target.value;
        this.forceUpdate();
    };

    changeRepeatMode = (event) => {
        this.clientListSelected = event.target.value;
        this.forceUpdate();
    };

    checkAllDayEvent = (event) => {
        this.allDayEvent = event.target.checked;
        alert("mudar as datas para ambas no mesmo dia");
        this.forceUpdate();
    };

    checkRepeatEvent = (event) => {
        this.repeatEvent = event.target.checked;
        this.forceUpdate();
    };

    // Visualização de Todo o conteúdo do HTML
    render(){
        const { classes } = this.props;
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

                {/* Modal de notícia */}
                <Modal open={ this.state.crudModalVisibility } onClose={ this.closeCrudModal } center>
                    <div className="div--modalAgenda-body">
                        <div className="div--agenda-appointment-body">
                            <div className="div--agenda-appointment">
                                <form className={classes.root} noValidate autoComplete="off">
                                    <MuiPickersUtilsProvider libInstance={ moment } utils={ MomentUtils } locale={ momentLocale }>                                
                                        {/* Titulo */}
                                        <div className="div--agendaForm-title agenda--component">
                                            <TextField id="title-event" label="Título do seu evento:" />
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
                                                value={ this.selectedInitialDate }
                                                autoOk = { true }
                                                onChange={(e) => this.changeInitialDate(e)}
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
                                                value={ this.selectedFinalDate }
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
                                                    value={ this.initialTime }
                                                    onChange={ this.changeInitialTime }
                                                    input={<Input />}
                                                >
                                                    {this.timePickerValues.map((timeItem) => (
                                                    <MenuItem key={timeItem} value={timeItem}>
                                                        <ListItemText primary={timeItem} />
                                                    </MenuItem>
                                                    ))}
                                                </Select>
                                            </div>
                                            <div className="div--hours-finish">
                                                <InputLabel htmlFor="checkbox--initial-time">Hora do término:</InputLabel>
                                                <Select
                                                    labelId="checkbox--final-time"
                                                    id="checkbox--final-time"
                                                    value={ this.finalTime }
                                                    onChange={ this.changeFinalTime }
                                                    input={<Input />}
                                                >
                                                    {this.timePickerValues.map((timeItem) => (
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
                                                        checked={ this.allDayEvent } 
                                                        icon={<RadioButtonUncheckedIcon />}
                                                        checkedIcon={< CheckCircleIcon />}
                                                        onChange={ this.checkAllDayEvent }
                                                    />
                                                }
                                                label="Dia todo"
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel
                                                    value="end"
                                                    control={
                                                        <Checkbox
                                                            checked={ this.repeatEvent } 
                                                            icon={<RadioButtonUncheckedIcon />}
                                                            checkedIcon={< CheckCircleIcon />}
                                                            onChange={ this.checkRepeatEvent }
                                                        />
                                                    }
                                                    label="Repetir"
                                                    labelPlacement="end"
                                                />
                                        </div>
                                        <div className="div--agendaForm-client agenda--component">
                                            <InputLabel htmlFor="checkbox--agenda-client">Cliente:</InputLabel>
                                            <Select
                                                labelId="checkbox--agenda-client"
                                                id="checkbox--agenda-client"
                                                value={ this.clientListSelected }
                                                onChange={ this.changeFinalTime }
                                                input={<Input />}
                                            >
                                                {this.clientList.map((clientItem) => (
                                                <MenuItem key={clientItem} value={clientItem}>
                                                    <ListItemText primary={clientItem} />
                                                </MenuItem>
                                                ))}
                                            </Select>
                                        </div>
                                        <div className="div--agendaForm-observation agenda--component">
                                            <InputLabel htmlFor="textarea-observation">Observações:</InputLabel>
                                            <TextareaAutosize id="textarea-observation" label="Testando" aria-label="minimum height" rowsMin={3} placeholder="Escreva detalhes do seu evento ou compromisso" />
                                        </div>
                                    </MuiPickersUtilsProvider>
                                </form>
                            </div>
                            <div className="div-agenda--repeat">
                                <MuiPickersUtilsProvider libInstance={ moment } utils={ MomentUtils } locale={ momentLocale }>                                
                                    <div className="div--agendaForm-client agenda--component">
                                        <InputLabel htmlFor="checkbox--repeat-mode">Repetição:</InputLabel>
                                        <Select
                                            labelId="checkbox--repeat-mode"
                                            id="checkbox--repeat-mode"
                                            value={ this.repeatListSelected }
                                            onChange={ this.changeRepeatMode }
                                            input={<Input />}
                                        >
                                            {this.repeatList.map((repeatItem) => (
                                            <MenuItem key={repeatItem} value={repeatItem}>
                                                <ListItemText primary={repeatItem} />
                                            </MenuItem>
                                            ))}
                                        </Select>
                                        <div className="div--repeat-mode">
                                            <div>
                                                <TextField id="counter-repeat-mode" label="Repita a cada:" /> 
                                            </div>
                                            <div className="div--repeat-sample">
                                                <p>{ this.repeaterElement }</p>
                                            </div>
                                        </div>
                                        <div className="div--endrepeat-mode">                                            
                                            <InputLabel htmlFor="checkbox--endrepeat-mode">Quando encerra a repetição?</InputLabel>
                                            <div className="div--endrepeat-mode-chosen-firstdiv">
                                                <FormControlLabel
                                                    value="end"
                                                    control={
                                                        <Checkbox
                                                            checked={ this.allDayEvent } 
                                                            icon={<RadioButtonUncheckedIcon />}
                                                            checkedIcon={< CheckCircleIcon />}
                                                            onChange={ this.checkAllDayEvent }
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
                                                                checked={ this.allDayEvent } 
                                                                icon={<RadioButtonUncheckedIcon />}
                                                                checkedIcon={< CheckCircleIcon />}
                                                                onChange={ this.checkAllDayEvent }
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
                                                                onChange={ this.checkAllDayEvent }
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
                                                        value={ this.selectedAfterDate }
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
                                <Button id="deleteEventButton">Excluir</Button>
                                <Button id="cancelEventButton">Cancelar</Button>
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
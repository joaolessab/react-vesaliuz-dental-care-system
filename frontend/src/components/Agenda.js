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
import cogoToast from 'cogo-toast';

// ================ ESTILOS ===============

import '../assets/css/Agenda.css';
import '../assets/css/Animations/Agenda--Animations.css';
import '../assets/css/Responsive/Agenda--Responsive.css';
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

        var starterMonth = moment().format('MM');
        starterMonth = this.findMonthString(starterMonth);            
        var starterYear = moment().format('YYYY');

        this.state = {
            agendaPickerMode: "today",            
            agendaDateText: starterMonth + " de " + starterYear,
            agendaViewType: "month",      
            agendaDataChosen: moment().toDate(), // arrumar set state

            agendaCRUDMode: "insert",
            agendaCRUDVisibility: false,          

            events: [
                {   
                    id: 1,
                    title: "Clareamento",
                    start: moment().toDate(),
                    end: moment().add(1, "days").toDate(),
                    client: 4,
                    observation: "Lorem Ipsum lorem ipsum",
                    isAllDay: false,
                    repeatOptions: {
                        enabled: false
                    }
                },
                {   
                    id: 2,
                    title: "Canal Dentário",
                    start: moment().toDate(),
                    end: moment().add(1, "days").toDate(),
                    client: 4,
                    observation: "Lorem Ipsum lorem ipsum",
                    isAllDay: false,
                    repeatOptions: {
                        enabled: false
                    }
                },
                {
                    id: 3,
                    title: "Implantação de Porcelanas",
                    start: moment().add(1, "weeks").toDate(),
                    end: moment().add(1, "weeks").add(2, "hours").toDate(),
                    client: 3,
                    observation: "Lorem Ipsum lorem ipsum",
                    isAllDay: false,
                    repeatOptions: {
                        enabled: true,
                        repeatMode: 1,
                        repeatEach: 3,
                        repeatEndMode: {
                            never: true
                        }
                    }
                },
                {
                    id: 4,
                    title: "Molde de Aparelho",
                    start: moment().add(1, "weeks").add(2, "days").toDate(),
                    end: moment().add(1, "weeks").add(2, "days").add(2, "hours").toDate(),
                    client: 3,
                    observation: "Lorem Ipsum lorem ipsum",
                    isAllDay: false,
                    repeatOptions: {
                        enabled: true,
                        repeatMode: 2,
                        repeatEach: 1,
                        repeatModeWeek: {
                            sunday: true,
                            monday: true,
                            tuesday: false,
                            wednesday: true,
                            thursday: false,
                            friday: false,
                            saturday: true
                        },
                        repeatEndMode: {
                            in: true,
                            inDateValue: moment().add(1, "weeks").add(2, "months").toDate()
                        }
                    }
                },
                {
                    id: 5,
                    title: "Remoção de Tártaro",
                    start: moment().add(5, "days").toDate(),
                    end: moment().add(6, "days").toDate(),
                    client: 3,
                    observation: "Lorem Ipsum lorem ipsum",
                    isAllDay: false,
                    repeatOptions: {
                        enabled: true,
                        repeatMode: 3,
                        repeatEach: 1,
                        repeatEndMode: {
                            after: true,
                            afterValue: 4
                        }
                    }
                }
            ],            

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
            eventInDateValue: moment().add(1, "days").toDate(),            

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

            eventRepeatCounterValue: 0,
            eventRepeatModeValue: 0,
            eventRepeatMode: [
                { option: "Selecione...", id: 0 },
                { option: "Dia(s)", id: 1 },
                { option: "Semana(s)", id: 2 },
                { option: "Mes(es)", id: 3 },
                { option: "Ano(s)", id: 4 }
            ],

            eventWeekSundayCheck: false,
            eventWeekMondayCheck: false,
            eventWeekTuesdayCheck: false,
            eventWeekWednesdayCheck: false,
            eventWeekThursdayCheck: false,
            eventWeekFridayCheck: false,
            eventWeekSaturdayCheck: false,

            eventRepeatNeverCheck: false,
            eventRepeatInCheck: false,
            eventRepeatAfterCheck: false,
            eventRepeatAfterValue: 0,

            eventIdSelected: 0
        };
    };

    // ================ AGENDA / CALENDAR EVENTS ===============

    openCrudModal = (mode, event) => {
        // Caso seja um evento novo
        if (mode === "insert"){
            this.setState({
                agendaCRUDMode: "insert",
                eventTitle: "",

                eventInitialDate: event === undefined || event === null ? moment().toDate() : event.start,
                eventFinalDate: event === undefined || event === null ? moment().toDate() : event.end,
                eventInitialTime: event === undefined || event === null ? this.setEventInitialTime() : this.readAlreadySetTime(event.start),
                eventFinalTime: event === undefined || event === null ? this.setEventFinalTime() : this.readAlreadySetTime(event.end),

                eventAllDayCheck: false,
                eventRepeatCheck: false,
                eventClientListValue: 0,
                eventObservation: "",

                eventRepeatModeValue: 0,

                agendaCRUDVisibility: true
            });
        }
        // Caso seja uma edição
        else{
            //loadar initialTime e finalTime caso haja
            this.setState({
                agendaCRUDMode: "edit",
                eventIdSelected: event.id === undefined || event.id === null ? "erro" : event.id,
                eventTitle: event.title === undefined || event.title === null ? "" : event.title,

                eventInitialDate: event.start === undefined || event.start === null ? moment().toDate() : event.start,
                eventFinalDate: event.end === undefined || event.end === null ? moment().toDate() : event.end,
                eventInitialTime: event.start === undefined || event.start === null ? this.setEventInitialTime() : this.readAlreadySetTime(event.start),
                eventFinalTime: event.end === undefined || event.end === null ? this.setEventFinalTime() : this.readAlreadySetTime(event.end),

                eventAllDayCheck: event.isAllDay === undefined || event.isAllDay === null ? false : event.isAllDay,
                eventRepeatCheck: event.repeatOptions === undefined || event.repeatOptions === null ? false : event.repeatOptions.enabled,
                eventClientListValue: event.client === undefined || event.client === null ? 0 : event.client,
                eventObservation: event.observation === undefined || event.observation === null ? "" : event.observation,
                
                eventRepeatCounterValue: event.repeatOptions === undefined || event.repeatOptions === null ? 0 : this.findRepeatOptionsFromEvent("each", event.repeatOptions),
                eventRepeatModeValue: event.repeatOptions === undefined || event.repeatOptions === null ? 0 : this.findRepeatOptionsFromEvent("mode", event.repeatOptions),
                
                eventWeekSundayCheck: this.findRepeatModeWeek('sunday', event),
                eventWeekMondayCheck: this.findRepeatModeWeek('monday', event),
                eventWeekTuesdayCheck: this.findRepeatModeWeek('tuesday', event),
                eventWeekWednesdayCheck: this.findRepeatModeWeek('wednesday', event),
                eventWeekThursdayCheck: this.findRepeatModeWeek('thursday', event),
                eventWeekFridayCheck: this.findRepeatModeWeek('friday', event),
                eventWeekSaturdayCheck: this.findRepeatModeWeek('saturday', event),

                eventRepeatNeverCheck: this.findRepeatEndOptionFromEvent('never', event),
                eventRepeatInCheck: this.findRepeatEndOptionFromEvent('in', event),
                eventInDateValue: this.findRepeatEndOptionFromEvent('inDateValue', event),
                eventRepeatAfterCheck: this.findRepeatEndOptionFromEvent('after', event),
                eventRepeatAfterValue: this.findRepeatEndOptionFromEvent('afterValue', event),

                agendaCRUDVisibility: true
            });
        }
    };

    findRepeatOptionsFromEvent = (type, repeatOptions) => {
        if (type === "each"){
            if (repeatOptions.repeatEach === undefined || repeatOptions.repeatEach === null){
                return 0;
            }
            else{
                return repeatOptions.repeatEach;
            }
        }

        if (type === "mode"){
            if (repeatOptions.repeatMode === undefined || repeatOptions.repeatMode === null){
                return 0;
            }
            else{
                return repeatOptions.repeatMode;
            }
        }
    };

    findRepeatEndOptionFromEvent = (type, event) => {
        if (event.repeatOptions === undefined || event.repeatOptions === null){
            if (type === "never") return false;
            if (type === "in") return false;
            if (type === "inDateValue") return moment().toDate();
            if (type === "after") return false;
            if (type === "afterValue") return 0;
        }
        
        if (event.repeatOptions.repeatEndMode === undefined || event.repeatOptions.repeatEndMode === null){
            if (type === "inDateValue")
                return moment().toDate();
            return false;
        }
        if (type === "never"){
            if (event.repeatOptions.repeatEndMode.never === undefined || event.repeatOptions.repeatEndMode.never === null)
                return false;
            return event.repeatOptions.repeatEndMode.never;
        }
        if (type === "in"){
            if (event.repeatOptions.repeatEndMode.in === undefined || event.repeatOptions.repeatEndMode.in === null)
                return false;
            return event.repeatOptions.repeatEndMode.in;
        }
        if (type === "inDateValue"){
            if (event.repeatOptions.repeatEndMode.inDateValue === undefined || event.repeatOptions.repeatEndMode.inDateValue === null)
                return moment().toDate();
            return event.repeatOptions.repeatEndMode.inDateValue;
        }
        if (type === "after"){
            if (event.repeatOptions.repeatEndMode.after === undefined || event.repeatOptions.repeatEndMode.after === null)
                return false;
            return event.repeatOptions.repeatEndMode.after;
        }
        if (type === "afterValue"){
            if (event.repeatOptions.repeatEndMode.after === undefined || event.repeatOptions.repeatEndMode.after === null)
                return 0;
            return event.repeatOptions.repeatEndMode.afterValue;
        }
    };

    findRepeatModeWeek = (day, event) => {
        if (event.repeatOptions === undefined || event.repeatOptions === null)
            return false;        
        if (event.repeatOptions.repeatModeWeek === undefined || event.repeatOptions.repeatModeWeek === null)
            return false;
        if (day === "sunday")
            return event.repeatOptions.repeatModeWeek.sunday;
        if (day === "monday")
            return event.repeatOptions.repeatModeWeek.monday;
        if (day === "tuesday")
            return event.repeatOptions.repeatModeWeek.tuesday;
        if (day === "wednesday")
            return event.repeatOptions.repeatModeWeek.wednesday;
        if (day === "thursday")
            return event.repeatOptions.repeatModeWeek.thursday;
        if (day === "friday")
            return event.repeatOptions.repeatModeWeek.friday;
        if (day === "saturday")
            return event.repeatOptions.repeatModeWeek.saturday;
    };

    closeCrudModal = () => {
        this.setState({ agendaCRUDVisibility: false });
    };

    onEventResize = (event) => {
        var newEvent = event;
        cogoToast.info(
            <div>
                <div>Tem certeza que deseja salvar alteração?</div>
                <button className="button--confirmation" onClick = {() => this.editDroppedEvent(newEvent)}>Sim</button>
                <button className="button--cancel" onClick = { this.destroyCogoToastInfo }>Não</button>
            </div>,
            { heading: 'Confirmação', position: 'top-center', hideAfter: 0 }
        );
    };

    deleteEvent = () => {
        var newEvents = [];
        var idSelected = this.state.eventIdSelected;

        for (var i = 0; i < this.state.events.length; i++){
            if (this.state.events[i].id !== idSelected)
                newEvents.push(this.state.events[i]);
        }

        // Salvando     
        this.setState({
            events: newEvents,
            agendaCRUDVisibility: false
        });

        cogoToast.success('Seu evento foi excluído.', { heading: 'Sucesso!', position: 'top-center', hideAfter: 3 });
    };

    generateHashID = () => {
        if (this.state.agendaCRUDMode === "insert"){
            return this.state.events.length + 1;
        }
        else{
            return this.state.eventIdSelected;
        }
    };

    saveEvent = () => {
        var idCreated = this.generateHashID();        
        var json = {
            "id": idCreated,
            "title": this.state.eventTitle,
            "start": this.state.eventInitialDate,
            "end": this.state.eventFinalDate,
            "client": this.state.eventClientListValue,
            "observation": this.state.eventObservation,
            "isAllDay": this.state.eventAllDayCheck,
            "repeatOptions": {
                enabled: this.state.eventRepeatCheck,
                repeatMode: this.state.eventRepeatModeValue,
                repeatEach: this.state.eventRepeatCounterValue,
                repeatModeWeek: {
                    sunday: this.state.eventWeekSundayCheck,
                    monday: this.state.eventWeekMondayCheck,
                    tuesday: this.state.eventWeekTuesdayCheck,
                    wednesday: this.state.eventWeekWednesdayCheck,
                    thursday: this.state.eventWeekThursdayCheck,
                    friday: this.state.eventWeekFridayCheck,
                    saturday: this.state.eventWeekSaturdayCheck
                },
                repeatEndMode: {
                    never: this.state.eventRepeatNeverCheck,
                    in: this.state.eventRepeatInCheck,
                    inDateValue: this.state.eventInDateValue,
                    after: this.state.eventRepeatAfterCheck,
                    afterValue: this.state.eventRepeatAfterValue
                }
            }
        };
        
        var newEvents = Object.assign([], this.state.events, {});
        
        // Salvando novo
        if (this.state.agendaCRUDMode === "insert"){
            newEvents.push(json);
            this.setState({
                events: newEvents,
                agendaCRUDVisibility: false
            });

            cogoToast.success('Seu evento foi adicionado.', { heading: 'Sucesso!', position: 'top-center', hideAfter: 3 });
        }
        // Editando existente
        else if (this.state.agendaCRUDMode === "edit"){
            for (var i = 0; i < newEvents.length; i++){
                if (newEvents[i].id === this.state.eventIdSelected)
                    newEvents[i] = json;
            }

            this.setState({
                events: newEvents,
                agendaCRUDVisibility: false
            });

            cogoToast.success('Seu evento foi editado.', { heading: 'Sucesso!', position: 'top-center', hideAfter: 3 });
        }
    };
    
    onEventDrop = (event) => {
        var newEvent = event;
        cogoToast.info(
            <div>
                <div>Tem certeza que deseja salvar alteração?</div>
                <button className="button--confirmation" onClick = {() => this.editDroppedEvent(newEvent)}>Sim</button>
                <button className="button--cancel" onClick = { this.destroyCogoToastInfo }>Não</button>
            </div>,
            { heading: 'Confirmação', position: 'top-center', hideAfter: 0 }
        );
    };

    editDroppedEvent = (newEvent) => {
        var newEvents = Object.assign([], this.state.events, {});

        for (var i = 0; i < newEvents.length; i++){
            if (newEvents[i].id === newEvent.event.id){
                newEvents[i].start = newEvent.start;
                newEvents[i].end = newEvent.end;
            }
        }

        this.setState({
            events: newEvents
        });
        
        this.destroyCogoToastInfo();
        cogoToast.success('A data do evento foi alterada.', { heading: 'Sucesso!', position: 'top-center', hideAfter: 3 });
    };

    destroyCogoToastInfo = () => {
        var ctToasts = document.getElementsByClassName("ct-toast");
        for (var i = 0; i < ctToasts.length; i++){
            ctToasts[i].remove();
        }
    };

    handleEventSelected = (event) => {
        this.openCrudModal("edit", event);
    };

    handleSlotSelected = ({ start, end }) => {
        var event = {"start": start, "end": end};
        this.openCrudModal("insert", event);
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
            eventFinalDate: this.state.eventInitialDate,
            eventInitialTime: "00:00",
            eventFinalTime: "00:00"
        });
    };
    
    changeRepeatCheck = (e) => {
        this.setState({            
            eventRepeatCheck: e.target.checked,
            eventRepeatCounterValue: 0,
            eventRepeatModeValue: 0,

            eventWeekSundayCheck: false,
            eventWeekMondayCheck: false,
            eventWeekTuesdayCheck: false,
            eventWeekWednesdayCheck: false,
            eventWeekThursdayCheck: false,
            eventWeekFridayCheck: false,
            eventWeekSaturdayCheck: false,

            eventRepeatNeverCheck: true,
            eventRepeatInCheck: false,
            eventRepeatAfterCheck: false,
            eventRepeatAfterValue: 0
        });
    };

    changeEventClient = (e) => {
        this.setState({ eventClientListValue: e.target.value });
    };

    changeEventObservation = (e) => {
        this.setState({ eventObservation: e.target.value });
    };

    changeEventCounter = (e) => {
        this.setState({ eventRepeatCounterValue: e.target.value });
    };

    changeRepeatMode = (e) => {
        this.setState({ eventRepeatModeValue: e.target.value });
    };

    changeInDate = (date) => {
        this.setState({ eventInDateValue: date });
    };

    changeRepeatWeekDay = (e, day) => {
        var isEnabled = e.target.parentElement.classList.contains("day-selected");

        if (day === "sunday")
            this.setState({ eventWeekSundayCheck: !isEnabled });
        if (day === "monday")
            this.setState({ eventWeekMondayCheck: !isEnabled });
        if (day === "tuesday")
            this.setState({ eventWeekTuesdayCheck: !isEnabled });
        if (day === "wednesday")
            this.setState({ eventWeekWednesdayCheck: !isEnabled });
        if (day === "thursday")
            this.setState({ eventWeekThursdayCheck: !isEnabled });
        if (day === "friday")
            this.setState({ eventWeekFridayCheck: !isEnabled });
        if (day === "saturday")
            this.setState({ eventWeekSaturdayCheck: !isEnabled });
    };
    
    changeEventRepeatNeverCheck = (e) => {
        if (e.target.checked){
            this.setState({
                eventRepeatInCheck: false,
                eventRepeatAfterCheck: false
            });
        }

        this.setState({eventRepeatNeverCheck: e.target.checked});
    };

    changeEventRepeatInCheck = (e) => {
        if (e.target.checked){
            this.setState({
                eventRepeatNeverCheck: false,
                eventRepeatAfterCheck: false
            });
        }

        this.setState({ 
            eventRepeatInCheck: e.target.checked
        });
    };

    changeEventRepeatAfterCheck = (e) => {
        if (e.target.checked){
            this.setState({
                eventRepeatNeverCheck: false,
                eventRepeatInCheck: false
            });
        }

        this.setState({ 
            eventRepeatAfterCheck: e.target.checked
        });
    };

    changeEventRepeatAfterValue = (e) => {
        this.setState({ 
            eventRepeatAfterValue: parseInt(e.target.value)
        });
    };

    // ================ UTILS EVENTS ===============

    changeWhatDate = (whatDate) => {
        var newDate = null;

        //Day
        if (this.state.agendaViewType === "day"){
            if (whatDate === "next")
                newDate = moment(this.state.agendaDataChosen).add(1, 'days').toDate(); 
            if (whatDate === "today")
                newDate = moment().toDate();
            if (whatDate === "previous")
                newDate = moment(this.state.agendaDataChosen).subtract(1, 'days').toDate();
            
            this.setState({ agendaDataChosen: newDate }, function () {
                this.findLiteralDate("day");
            });
        }
        //Week
        else if (this.state.agendaViewType === "week"){
            if (whatDate === "next")
                newDate = moment(this.state.agendaDataChosen).add(1, 'weeks').toDate();
            if (whatDate === "today")
                newDate = moment().toDate();
            if (whatDate === "previous")
                newDate = moment(this.state.agendaDataChosen).subtract(1, 'weeks').toDate();

            this.setState({ agendaDataChosen: newDate }, function () {
                this.findLiteralDate("week");
            });
        }
        //Month
        else if (this.state.agendaViewType === "month"){
            if (whatDate === "next")
                newDate = moment(this.state.agendaDataChosen).add(1, 'months').toDate();
            if (whatDate === "today")
                newDate = moment().toDate();
            if (whatDate === "previous")
                newDate = moment(this.state.agendaDataChosen).subtract(1, 'months').toDate();

            this.setState({ agendaDataChosen: newDate }, function () {
                this.findLiteralDate("month");
            });
        }
        //Agenda
        else if (this.state.agendaViewType === "agenda"){
            if (whatDate === "next")
                newDate = moment(this.state.agendaDataChosen).add(1, 'months').toDate();
            if (whatDate === "today")
                newDate = moment().toDate();
            if (whatDate === "previous")
                newDate = moment(this.state.agendaDataChosen).subtract(1, 'months').toDate();
            
            this.setState({ agendaDataChosen: newDate }, function () {
                this.findLiteralDate("agenda");
            });
        }

        // Setando view do botão selecionado
        this.setState({ agendaPickerMode: whatDate });
    };

    changeViewType = (newType) => {
        this.findLiteralDate(newType);
        this.setState({ agendaViewType : newType });
    };

    findLiteralDate = (newType) => {
        var day, month, year, initialDayWeek, initialMonthWeek, finalDayWeek, finalMonthWeek, finalYearWeek, initialDay, initialMonth, finalDay, finalMonth, finalYear = null;
        
        if (newType === "day"){
            day = moment(this.state.agendaDataChosen).format('DD');
            month = moment(this.state.agendaDataChosen).format('MM');
            month = this.findMonthString(month);            
            year = moment(this.state.agendaDataChosen).format('YYYY');

            this.setState({
                agendaDateText: day + " de " + month + " de " + year
            });
        }
        else if (newType === "week"){
            initialDayWeek = moment(this.state.agendaDataChosen).startOf('week').format('DD');
            initialMonthWeek = moment(this.state.agendaDataChosen).startOf('week').format('MM');
            initialMonthWeek = this.findMonthString(initialMonthWeek);

            finalDayWeek = moment(this.state.agendaDataChosen).endOf('week').format('DD');
            finalMonthWeek = moment(this.state.agendaDataChosen).endOf('week').format('MM');
            finalMonthWeek = this.findMonthString(finalMonthWeek);
            finalYearWeek = moment(this.state.agendaDataChosen).endOf('year').format('YYYY');

            this.setState({
                agendaDateText: initialDayWeek + " de " + initialMonthWeek + " à " + finalDayWeek + " de " + finalMonthWeek + " - " + finalYearWeek
            });
        }
        else if (newType === "month"){
            month = moment(this.state.agendaDataChosen).format('MM');
            month = this.findMonthString(month);            
            year = moment(this.state.agendaDataChosen).format('YYYY');

            this.setState({
                agendaDateText: month + " de " + year
            });
        }        
        else if (newType === "agenda"){
            initialDay = moment(this.state.agendaDataChosen).format('DD');
            initialMonth = moment(this.state.agendaDataChosen).format('MM');
            initialMonth = this.findMonthString(initialMonth);

            finalDay = moment(this.state.agendaDataChosen).add(1, 'months').format('DD');
            finalMonth = moment(this.state.agendaDataChosen).add(1, 'months').format('MM');
            finalMonth = this.findMonthString(finalMonth);
            finalYear = moment(this.state.agendaDataChosen).add(1, 'months').format('YYYY');

            this.setState({
                agendaDateText: initialDay + " de " + initialMonth + " à " + finalDay + " de " + finalMonth + " - " + finalYear
            });
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

    readAlreadySetTime = (timeGet) => {
        var minutes = timeGet.getMinutes();
        var hour = timeGet.getHours();

        // Verificação se não existe evento
        if (minutes !== 0 && minutes !== 15 && minutes !== 30 && minutes !== 45){
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
                hour = moment(timeGet);
                hour.add("1", "hours");
                hour = hour._d.getHours();
            }
        }

        hour = hour.toString();
        minutes = minutes.toString();

        // Tratamento Final das horas
        if (hour.length === 1)
            hour = "0" + hour;

        if (minutes.length === 1)
            minutes = minutes + "0";

        var theTime = hour + ":" + minutes;
        return theTime;
    };
    
    setEventInitialTime = () => {
        var hour, minutes = null;

        hour = moment();
        minutes = moment().toDate().getMinutes();

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
        return initialTime;
    };

    setEventFinalTime = () => {
        var hour, minutes = null;

        hour = moment().add("1", "hours");
        minutes = moment().toDate().getMinutes();
        
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
        return finalTime;
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
                            <p>{ this.state.agendaDateText }</p>
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
                                    className={ this.state.agendaPickerMode === "today" ? "selected" : ""}
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
                                    <Button onClick={() => this.openCrudModal("insert", null)}><AddBoxIcon/></Button>
                                </Tooltip>
                                {/* <Tooltip TransitionComponent={Zoom} placement="bottom" title="Sincronizar calendário"> */}
                                    <Button disabled><SyncIcon/></Button>
                                {/* </Tooltip> */}
                            </div>
                            <div className="div--view">
                                <Button 
                                    onClick={() => this.changeViewType("day")} 
                                    className={ this.state.agendaViewType === "day" ? "selected" : ""}
                                >
                                    Dia
                                </Button>
                                <Button 
                                    onClick={() => this.changeViewType("week")} 
                                    className={ this.state.agendaViewType === "week" ? "selected" : ""}
                                >
                                    Semana
                                </Button>
                                <Button 
                                    onClick={() => this.changeViewType("month")} 
                                    className={ this.state.agendaViewType === "month" ? "selected" : ""}
                                >
                                    Mês
                                </Button>
                                <Button 
                                    onClick={() => this.changeViewType("agenda")} 
                                    className={ this.state.agendaViewType === "agenda" ? "selected" : ""}
                                >
                                    Agenda
                                </Button>
                            </div>
                        </div>
                        <DnDCalendar
                            selectable
                            resizable

                            defaultDate={ this.state.agendaDataChosen }
                            defaultView= { this.state.agendaViewType }

                            localizer={ localizer }
                            style={{ height: 500 }}

                            startAccessor="start"
                            endAccessor="end"
                                                        
                            events={ this.state.events }
                            onEventDrop={ this.onEventDrop }
                            onEventResize={ this.onEventResize }
                            onSelectEvent={ appointments => this.handleEventSelected(appointments) }
                            onSelectSlot={ this.handleSlotSelected }
                        />
                    </div>
                </div>

                {/* Modal de Agenda */}
                <Modal open={ this.state.agendaCRUDVisibility } onClose={ this.closeCrudModal } center>
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
                                        <div className="div--repeat-type">
                                            <InputLabel htmlFor="checkbox--repeat-mode">Repetir a cada:</InputLabel>                                            
                                            <div className="div--repeat-sample">
                                                <TextField
                                                    id="input--repeat-counterValue"
                                                    type="number"
                                                    value = { this.state.eventRepeatCounterValue }
                                                    onChange = { this.changeEventCounter }
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </div>
                                            <Select
                                                labelId="checkbox--repeat-mode"
                                                id="checkbox--repeat-mode"
                                                value={ this.state.eventRepeatModeValue }
                                                onChange={ this.changeRepeatMode }
                                                input={<Input />}
                                            >
                                                { this.state.eventRepeatMode.map((repeatItem) => (
                                                <MenuItem key={repeatItem.option} value={repeatItem.id}>
                                                    <ListItemText primary={repeatItem.option} />
                                                </MenuItem>
                                                ))}
                                            </Select>
                                        </div>

                                        <div 
                                            className={ this.state.eventRepeatModeValue === 2 ? "div--repeat-week div--repeat-week-visible": "div--repeat-week" }
                                        >
                                            <InputLabel htmlFor="div--repeat-week-days">Repetir nos dias:</InputLabel>
                                            <div className="div--repeat-week-days">
                                                <Button
                                                    onClick={(e) => this.changeRepeatWeekDay(e, "sunday") }
                                                    className = { this.state.eventWeekSundayCheck ? "day-selected" : ""}
                                                >D</Button>
                                                <Button 
                                                    onClick={(e) => this.changeRepeatWeekDay(e, "monday") }
                                                    className = { this.state.eventWeekMondayCheck ? "day-selected" : ""}
                                                >S</Button>
                                                <Button 
                                                    onClick={(e) => this.changeRepeatWeekDay(e, "tuesday") }
                                                    className = { this.state.eventWeekTuesdayCheck ? "day-selected" : ""}
                                                >T</Button>
                                                <Button 
                                                    onClick={(e) => this.changeRepeatWeekDay(e, "wednesday") }
                                                    className = { this.state.eventWeekWednesdayCheck ? "day-selected" : ""}
                                                >Q</Button>
                                                <Button 
                                                    onClick={(e) => this.changeRepeatWeekDay(e, "thursday") }
                                                    className = { this.state.eventWeekThursdayCheck ? "day-selected" : ""}
                                                >Q</Button>
                                                <Button 
                                                    onClick={(e) => this.changeRepeatWeekDay(e, "friday") }
                                                    className = { this.state.eventWeekFridayCheck ? "day-selected" : ""}
                                                >S</Button>
                                                <Button
                                                    onClick={(e) => this.changeRepeatWeekDay(e, "saturday") }
                                                    className = { this.state.eventWeekSaturdayCheck ? "day-selected" : ""}
                                                >S</Button>
                                            </div>
                                        </div>

                                        <div className="div--endrepeat-mode">                                            
                                            <InputLabel htmlFor="checkbox--endrepeat-mode">Quando encerra a repetição?</InputLabel>
                                            <div className="div--endrepeat-mode-chosen-firstdiv">
                                                <FormControlLabel
                                                    value="end"
                                                    control={
                                                        <Checkbox
                                                            checked={ this.state.eventRepeatNeverCheck } 
                                                            icon={<RadioButtonUncheckedIcon />}
                                                            checkedIcon={< CheckCircleIcon />}
                                                            onChange={ this.changeEventRepeatNeverCheck }
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
                                                                checked={ this.state.eventRepeatInCheck } 
                                                                icon={<RadioButtonUncheckedIcon />}
                                                                checkedIcon={< CheckCircleIcon />}
                                                                onChange={ this.changeEventRepeatInCheck }
                                                            />
                                                        }
                                                        label="Em:"
                                                        labelPlacement="end"
                                                    />
                                                </div>
                                                <div>
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        format="DD/MM/YYYY"
                                                        margin="normal"
                                                        id="date-picker-repeat"
                                                        autoOk = { true }
                                                        disabled = { !this.state.eventRepeatInCheck }
                                                        value={ this.state.eventInDateValue }
                                                        onChange={ this.changeInDate }
                                                        KeyboardButtonProps={{
                                                        'aria-label': 'change date',
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
                                                                checked={ this.state.eventRepeatAfterCheck } 
                                                                icon={<RadioButtonUncheckedIcon />}
                                                                checkedIcon={< CheckCircleIcon />}
                                                                onChange={ this.changeEventRepeatAfterCheck }
                                                            />
                                                        }
                                                        label="Depois de:"
                                                        labelPlacement="end"
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        id="input--repeat-number"
                                                        type="number"
                                                        disabled = { !this.state.eventRepeatAfterCheck }
                                                        onChange = { this.changeEventRepeatAfterValue }
                                                        value = { this.state.eventRepeatAfterValue }
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </div>                                                
                                                <div 
                                                    className= { this.state.eventRepeatAfterCheck ? "div--repeat-occurrency" : "div--repeat-occurrency-disabled" }
                                                >
                                                    <p>Ocorrências</p>
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
                                    className={ this.state.agendaCRUDMode === "insert" ? "hideComponent": "" }
                                    onClick={ this.deleteEvent }
                                >
                                    Excluir
                                </Button>
                                <Button id="cancelEventButton" onClick={ this.closeCrudModal }>Cancelar</Button>
                                <Button id="saveEventButton" onClick = { this.saveEvent } >Salvar</Button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default withStyles(useStyles)(Agenda);
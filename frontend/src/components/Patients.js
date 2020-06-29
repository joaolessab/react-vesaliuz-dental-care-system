import React from 'react';
import 'react-responsive-modal/styles.css';

import moment from 'moment';
import MomentUtils from "@date-io/moment";
import 'moment/locale/pt-br';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

// ================ COMPONENTES ===============

import AutoCompleteSuggest from './AutoCompleteSuggest';
import { Modal } from 'react-responsive-modal';
import Button from '@material-ui/core/Button';
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
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import cogoToast from 'cogo-toast';

// ================ ESTILOS ===============

import '../assets/css/Patients.css';
import '../assets/css/Animations/Patients--Animations.css';
import '../assets/css/Responsive/Patients--Reponsive.css';

// ================ PHOTOS ===============

import clarkPhoto from '../assets/images/patients/clark.jpg';
import dianaPhoto from '../assets/images/patients/diana.jpg';
import oliverPhoto from '../assets/images/patients/oliver.jpg';
import brucePhoto from '../assets/images/patients/bruce.jpg';

const momentLocale = moment.locale('pt-br');

const useStyles = theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
});

class Patients extends React.Component{    
    constructor(props){         
        super(props);

        this.state = {
            clientCRUDVisibility: false,
            patients: [
                {
                    id: 1,
                    name: "Clark Cold",
                    phone: "(12) 99088-4140",
                    email: "clarkcold@gmail.com",
                    address: "Avenida Brasil, 21",
                    photo: clarkPhoto
                },
                {
                    id: 2,
                    name: "Diana Mendes",
                    phone: "(12) 87995-1105",
                    email: "dianamendes@gmail.com",
                    address: "Rua Monsenhor Dutra, 43",
                    photo: dianaPhoto
                },
                {
                    id: 3,
                    name: "Oliver Queen",
                    phone: "(12) 97865-2141",
                    email: "oliverthekey@gmail.com",
                    address: "Avenida JK, 110",
                    photo: oliverPhoto
                },
                {
                    id: 4,
                    name: "Bruce Wayne da Silva",
                    phone: "(12) 99065-4040",
                    email: "brucesilva@gmail.com",
                    address: "Rua Jacareí, 230",
                    photo: brucePhoto
                }
            ],
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
            eventClientList: [
                { name: "Selecione...", id: 0 },
                { name: "Andreas Pirlo", id: 1 },
                { name: "Paulo Dybala", id: 2 },
                { name: "Travis Scott", id: 3 },
                { name: "Cristiano Ronaldo", id: 4 }
            ],
            eventRepeatMode: [
                { option: "Selecione...", id: 0 },
                { option: "Dia(s)", id: 1 },
                { option: "Semana(s)", id: 2 },
                { option: "Mes(es)", id: 3 },
                { option: "Ano(s)", id: 4 }
            ]
        };
    };
    
    // ================ CRUD EVENTS ===============

    openCRUDPatientsModal = (mode) => {
        this.setState({
            clientCRUDVisibility: true
        });
    };

    closeCrudModal = () => {
        this.setState({ clientCRUDVisibility: false });
    };

    triedToDeleteClient = (clientId) => {
        cogoToast.info(
            <div>
                <div>Tem certeza que deseja excluir esse paciente?</div>
                <button className="button--confirmation" onClick = {() => this.deleteClient(clientId)}>Sim</button>
                <button className="button--cancel" onClick = { this.destroyCogoToastInfo }>Não</button>
            </div>,
            { heading: 'Confirmação', position: 'top-center', hideAfter: 0 }
        );
    };

    deleteClient = (clientId) => {
        var newPatients = [];
        for (var i = 0; i < this.state.patients.length; i++){
            if (this.state.patients[i].id !== clientId)
                newPatients.push(this.state.patients[i]);
        }

        // Salvando     
        this.setState({
            patients: newPatients
        });
        
        this.destroyCogoToastInfo();
        cogoToast.success('Paciente excluído com sucesso.', { heading: 'Sucesso!', position: 'top-center', hideAfter: 3 });
    };

    destroyCogoToastInfo = () => {
        var ctToasts = document.getElementsByClassName("ct-toast");
        for (var i = 0; i < ctToasts.length; i++){
            ctToasts[i].remove();
        }
    };

    // ================ RENDERIZAÇÃO DO CONTEÚDO HTML ===============
    
    render(){
        const { classes } = this.props;

        // LISTAGEM DE PACIENTES
        const listPatients = this.state.patients.map((client) => {
            return (
                <div className="div--individual-card" key={client.id}>
                    <Button className="button--card-delete" onClick={() => this.triedToDeleteClient(client.id) }><DeleteForeverIcon /></Button>
                    <div className="div--card-background" onClick={() => this.openCRUDPatientsModal("edit")}>
                        <div className="div--card-picture">
                            <img src={ client.photo }></img>
                        </div>
                        <div className="div--card-name">{ client.name }</div>
                        <div className="div--card-contact">{ client.email }<br/>{ client.phone }</div>
                        <div className="div--card-address">{ client.address }</div>
                    </div>
                </div>
            );
        });

        // RETORNO BÁSICO DO HTML
        return (
            <div className="container--miolo-main">
                <div className="container--content-patients">
                    <div className="div--content-title">
                        <h1>Pacientes</h1>
                    </div>

                    <div className="container--patients-toolbar">
                        <div>
                            {/* Auto Suggest */}
                            < AutoCompleteSuggest source = "patients" />
                        </div>
                        <div>
                            <button className="button--blue-casual" onClick={() => this.openCRUDPatientsModal("insert")}>Novo Paciente</button>
                        </div>
                    </div>

                    <div className="container--patients-card">
                        { listPatients }                        
                    </div>
                </div>

                {/* Modal de Pacientes */}
                <Modal open={ this.state.clientCRUDVisibility } onClose={ this.closeCrudModal } center>
                    <div className="div--modalAgenda-body">
                        <div className="div--patients-information-body">
                            <div 
                                className={ this.state.eventRepeatCheck === true ? "div--patients-information div--patients-information--opened" : "div--patients-information" }
                            >
                                <form className={classes.root} noValidate autoComplete="off">
                                    <MuiPickersUtilsProvider libInstance={ moment } utils={ MomentUtils } locale={ momentLocale }>                                
                                        <div className="modal--split-columnar">
                                            
                                            <div className="modal--split-one">
                                                <TextField 
                                                    label="Nome do Paciente:" 
                                                    value = { this.state.eventTitle } 
                                                    onChange = { this.changeEventTitle }
                                                />
                                            </div>

                                            <div className="modal--split-two">
                                                <TextField 
                                                    label="Data de Nascimento:" 
                                                    value = { this.state.eventTitle } 
                                                    onChange = { this.changeEventTitle }
                                                />
                                                <div className="modal--split-children">
                                                    <InputLabel htmlFor="checkbox--sex" className="input--agendaForm-client">Sexo:</InputLabel>
                                                    <Select
                                                        labelId="checkbox--sex"
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
                                            </div>

                                            <div className="modal--split-one">
                                                <TextField 
                                                    label="Profissão:" 
                                                    value = { this.state.eventTitle } 
                                                    onChange = { this.changeEventTitle }
                                                />
                                            </div>

                                            <div className="modal--split-one">
                                                <TextField 
                                                    label="CPF ou CNPJ:" 
                                                    value = { this.state.eventTitle } 
                                                    onChange = { this.changeEventTitle }
                                                />
                                            </div>

                                            <div className="modal--split-one">
                                                <TextField 
                                                    label="Endereço:" 
                                                    value = { this.state.eventTitle } 
                                                    onChange = { this.changeEventTitle }
                                                />
                                            </div>

                                            <div className="modal--split-two">
                                                <TextField 
                                                    label="CEP:" 
                                                    value = { this.state.eventTitle } 
                                                    onChange = { this.changeEventTitle }
                                                />
                                                
                                                <TextField 
                                                    id="title-event" 
                                                    label="Estado:" 
                                                    value = { this.state.eventTitle } 
                                                    onChange = { this.changeEventTitle }
                                                />
                                            </div>
                                        </div>

                                        <div className="modal--split-columnar">

                                            <div className="modal--split-one">
                                                <TextField 
                                                    label="Cidade:" 
                                                    value = { this.state.eventTitle } 
                                                    onChange = { this.changeEventTitle }
                                                />
                                            </div>

                                            <div className="modal--split-one">
                                                <TextField 
                                                    label="E-mail:" 
                                                    value = { this.state.eventTitle } 
                                                    onChange = { this.changeEventTitle }
                                                />
                                            </div>

                                            <div className="modal--split-one">
                                                <TextField 
                                                    label="Telefone Principal:" 
                                                    value = { this.state.eventTitle } 
                                                    onChange = { this.changeEventTitle }
                                                />
                                            </div>

                                            <div className="modal--split-one">
                                                <TextField 
                                                    label="Telefone Secundário:" 
                                                    value = { this.state.eventTitle } 
                                                    onChange = { this.changeEventTitle }
                                                />
                                            </div>

                                            <div className="modal--split-two">
                                                <div className="modal--split-datetime">
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        format="DD/MM/YYYY"
                                                        margin="normal"
                                                        id="date-picker-initial"
                                                        label="Início do Tratamento:"
                                                        value={ this.state.eventInitialDate }
                                                        autoOk = { true }
                                                        onChange={ this.changeInitialDate }
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                </div>
                                                
                                                <TextField 
                                                    id="title-event" 
                                                    label="Estado Civil:" 
                                                    value = { this.state.eventTitle } 
                                                    onChange = { this.changeEventTitle }
                                                />
                                            </div>

                                            <div className="modal--split-one">
                                                <InputLabel htmlFor="checkbox--agenda-client" className="input--agendaForm-client">Indicado por:</InputLabel>
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
                                        </div>
                                    
                                        <div className="modal--split-columnar div--patients-information-details">
                                            <Button>Cadastrar Anamnese</Button>
                                            <Button>Exame Intra-Oral</Button>
                                        </div>
                                    </MuiPickersUtilsProvider>
                                </form>
                            </div>
                        </div>

                        <div className="custom--modal-footer">
                            <div className="buttons--bar patients--component">
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

export default withStyles(useStyles)(Patients);
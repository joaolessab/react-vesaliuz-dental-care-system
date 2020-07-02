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

            patientName: "",
            patientBirthday: "",
            genreList: [
                { name: "Selecione...", id: 0 },
                { name: "Masculino", id: 1 },
                { name: "Feminino", id: 2 },
                { name: "Não informar", id: 3 }
            ],
            patientGenreValue: 0,
            patientOccupation: "",
            patientDocument: "",
            patientAddress: "",
            patientZipCode: "",
            patientState: "",

            patientCity: "",
            patientEmail: "",
            patientMainPhone: "",
            patientSecondaryPhone: "",
            patientInitialDate: moment().toDate(),
            civilStatusList: [
                { name: "Selecione...", id: 0 },
                { name: "Solteiro(a)", id: 1 },
                { name: "Casado(a)", id: 2 },
                { name: "Divorciado(a)", id: 3 },
                { name: "Viúvo(a)", id: 4 },
                { name: "Não informar", id: 5 } 
            ],
            patientCivilStatus: 0
        };
    };

    // ================ CHANGE EVENTS ==============
    changeSimpleValue = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    };

    changeSimpleDate = (name, value) => {
        this.setState({
            [name]: value
        });
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
                        <div className="custom--modal-header-patient">
                            <Button className="icon--anamnese selected">Anamnese</Button>
                            <Button className="icon--agendamentos"><span>Agendas</span></Button>
                            <Button className="icon--financas"><span>Financeiro</span></Button>
                            <Button className="icon--exams"><span>Exames</span></Button>
                            <Button className="icon--procedure"><span>Tratamentos</span></Button>
                        </div>
                        <div className="div--patients-information-body">
                            <div 
                                className={ this.state.eventRepeatCheck === true ? "div--patients-information div--patients-information--opened" : "div--patients-information" }
                            >
                                <form className={classes.root} noValidate autoComplete="off">
                                    <MuiPickersUtilsProvider libInstance={ moment } utils={ MomentUtils } locale={ momentLocale }>
                                        <div className="modal--split-columnar">
                                            <div className="modal--split-one">
                                                <TextField 
                                                    label="Nome do Paciente" 
                                                    value = { this.state.patientName }
                                                    name = "patientName"
                                                    onChange={ this.changeSimpleValue } 
                                                />
                                            </div>

                                            <div className="modal--split-two">
                                                <TextField 
                                                    label="Nascimento" 
                                                    value = { this.state.patientBirthday }
                                                    name = "patientBirthday"
                                                    onChange={ this.changeSimpleValue }                                               
                                                />
                                                <div className="modal--split-children">
                                                    <InputLabel htmlFor="checkbox--genre">Sexo:</InputLabel>
                                                    <Select
                                                        labelId="checkbox--genre"
                                                        value = { this.state.patientGenreValue }
                                                        name = "patientGenreValue"
                                                        onChange={ this.changeSimpleValue }
                                                        input={ <Input /> }
                                                    >
                                                        { this.state.genreList.map((genreItem) => (
                                                            <MenuItem key={ genreItem.name } value={ genreItem.id }>
                                                                <ListItemText primary={ genreItem.name } />
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className="modal--split-one">
                                                <TextField 
                                                    label="Profissão" 
                                                    value = { this.state.patientOccupation }
                                                    name = "patientOccupation"
                                                    onChange={ this.changeSimpleValue }                                               
                                                />
                                            </div>

                                            <div className="modal--split-one">
                                                <TextField 
                                                    label="CPF ou CNPJ:" 
                                                    value = { this.state.patientDocument }
                                                    name = "patientDocument"
                                                    onChange={ this.changeSimpleValue }                                               
                                                />
                                            </div>

                                            <div className="modal--split-one">
                                                <TextField 
                                                    label="Endereço:" 
                                                    value = { this.state.patientAddress }
                                                    name = "patientAddress"
                                                    onChange={ this.changeSimpleValue }                                               
                                                />
                                            </div>

                                            <div className="modal--split-two">
                                                <TextField 
                                                    label="CEP:" 
                                                    value = { this.state.patientZipCode }
                                                    name = "patientZipCode"
                                                    onChange={ this.changeSimpleValue }                                               
                                                />

                                                <TextField 
                                                    label="Estado:" 
                                                    value = { this.state.patientState }
                                                    name = "patientState"
                                                    onChange={ this.changeSimpleValue }                                               
                                                />
                                            </div>
                                        </div>

                                        <div className="modal--split-columnar">

                                            <div className="modal--split-one">
                                                <TextField 
                                                    label="Cidade:" 
                                                    value = { this.state.patientCity }
                                                    name = "patientCity"
                                                    onChange={ this.changeSimpleValue }                                               
                                                />
                                            </div>

                                            <div className="modal--split-one">
                                                <TextField 
                                                    label="E-mail:" 
                                                    value = { this.state.patientEmail }
                                                    name = "patientEmail"
                                                    onChange={ this.changeSimpleValue }                                               
                                                />
                                            </div>

                                            <div className="modal--split-one">
                                                <TextField 
                                                    label="Telefone Principal:" 
                                                    value = { this.state.patientMainPhone }
                                                    name = "patientMainPhone"
                                                    onChange={ this.changeSimpleValue }                                               
                                                />
                                            </div>

                                            <div className="modal--split-one">
                                                <TextField 
                                                    label="Telefone Secundário:" 
                                                    value = { this.state.patientSecondaryPhone }
                                                    name = "patientSecondaryPhone"
                                                    onChange={ this.changeSimpleValue }                                               
                                                />
                                            </div>

                                            <div className="modal--split-one">
                                                <div className="modal--split-datetime">
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        format="DD/MM/YYYY"
                                                        margin="normal"
                                                        label="Início do Tratamento:"
                                                        value={ this.state.patientInitialDate }
                                                        autoOk = { true }
                                                        onChange={(e) => this.changeSimpleDate("patientInitialDate", e) }
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="modal--split-one">
                                                <div className="modal--split-children">
                                                    <InputLabel htmlFor="checkbox--civilStatus">Status Civil:</InputLabel>
                                                    <Select
                                                        labelId="checkbox--civilStatus"
                                                        value = { this.state.patientCivilStatus }
                                                        name = "patientCivilStatus"
                                                        onChange={ this.changeSimpleValue }
                                                        input={ <Input /> }
                                                    >
                                                        { this.state.civilStatusList.map((civilStatusItem) => (
                                                            <MenuItem key={ civilStatusItem.name } value={ civilStatusItem.id }>
                                                                <ListItemText primary={ civilStatusItem.name } />
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </div>
                                            </div> 
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
import React from 'react';
import 'react-responsive-modal/styles.css';
import InputMask from "react-input-mask";

import moment from 'moment';
import MomentUtils from "@date-io/moment";
import 'moment/locale/pt-br';

// ================ COMPONENTES ===============

import AutoCompleteSuggest from './AutoCompleteSuggest';
import { Modal } from 'react-responsive-modal';
import Button from '@material-ui/core/Button';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import cogoToast from 'cogo-toast';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// ================ ESTILOS ===============

import '../assets/css/Patients.css';
import '../assets/css/Animations/Patients--Animations.css';
import '../assets/css/Responsive/Patients--Reponsive.css';

// ================ JS UTILS ===============
import { 
    base64StringtoFile, 
    downloadBase64File,
    extractImageFileExtensionFromBase64 
} from '../assets/external_libs/react-easy-copy/ResuableUtils';

// ================ REACT EASY CROP ===============
import Cropper from 'react-easy-crop';
import Typography from '@material-ui/core/Typography';
import { getOrientation } from 'get-orientation/browser';
import Slider from '@material-ui/core/Slider';
import { getCroppedImg, getRotatedImage } from '../assets/external_libs/react-easy-copy/canvasUtils';
import { styles } from '../assets/external_libs/react-easy-copy/styles';

const ORIENTATION_TO_ANGLE = {
    '3': 180,
    '6': 90,
    '8': -90,
};

const momentLocale = moment.locale('pt-br');

const useStyles = theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    }
});

class Patients extends React.Component{    
    constructor(props){
        super(props);

        this.imagePreviewCanvasRef = React.createRef(); // Importante

        this.state = {
            /* MODAL */
            patientCrudVisibility: false,
            patientCrudMode: "insert",
            patientCrudView: "dados_gerais",

            /* PATIENT LIST */
            patients: this.getLocalStoragePatients(),

            /* PATIENT INPUTS */
            patientIdSelected: null,
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
            patientStateValue: 0,
            stateList: [
                { name: "Selecione...", id: 0 },
                { name: "Acre", id: 1 },
                { name: "Alagoas", id: 2 },
                { name: "Amapá", id: 3 },
                { name: "Amazonas", id: 4 },
                { name: "Bahia", id: 5 },
                { name: "Ceará", id: 6 },
                { name: "Distrito Federal", id: 7 },
                { name: "Espírito Santo", id: 8 },
                { name: "Goiás", id: 9 },
                { name: "Maranhão", id: 10 },
                { name: "Mato Grosso", id: 11 },
                { name: "Mato Grosso do Sul", id: 12 },
                { name: "Minas Gerais", id: 13 },
                { name: "Pará", id: 14 },
                { name: "Paraíba", id: 15 },
                { name: "Paraná", id: 16 },
                { name: "Pernambuco", id: 17 },
                { name: "Piauí", id: 18 },
                { name: "Rio de Janeiro", id: 19 },
                { name: "Rio Grande do Norte", id: 20 },
                { name: "Rio Grande do Sul", id: 21 },
                { name: "Rondônia", id: 22 },
                { name: "Roraima", id: 23 },
                { name: "Santa Catarina", id: 24 },
                { name: "São Paulo", id: 25 },
                { name: "Sergipe", id: 26 },
                { name: "Tocantins", id: 27 }
            ],
            patientCity: "",
            patientEmail: "",
            patientMainPhone: "",
            patientSecondaryPhone: "",
            patientInitialTreatment: moment().toDate(),
            civilStatusList: [
                { name: "Selecione...", id: 0 },
                { name: "Solteiro(a)", id: 1 },
                { name: "Casado(a)", id: 2 },
                { name: "Divorciado(a)", id: 3 },
                { name: "Viúvo(a)", id: 4 },
                { name: "Não informar", id: 5 } 
            ],
            patientCivilStatus: 0,

            /* MASKS */
            telephonePrimaryMask: "(99) 9999-9999",
            telephoneSecondaryMask: "(99) 9999-9999",
            patientDocumentMask: "999.999.999-99",

            /* ANAMNESE */
            anamneseSections:   [
                                    { 
                                        id: 1, label: "Seção 1", optional: false, questions:
                                                                                                [
                                                                                                    {
                                                                                                        id: 1,
                                                                                                        question: "É alérgico a algum medicamento? Qual?",
                                                                                                        boolAnswer: { fieldName: "section_1--question_1-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_1--question_1-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 2,
                                                                                                        question: "Tem boa saúde? Caso negativo, que doenças apresenta?",
                                                                                                        boolAnswer: { fieldName: "section_1--question_2-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_1--question_2-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 3,
                                                                                                        question: "Apresenta algum problema respiratório? Sinusite, renite ou bronquite?",
                                                                                                        boolAnswer: { fieldName: "section_1--question_3-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_1--question_3-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 4,
                                                                                                        question: "Possui dor de garganta frequente? Que medicação usa?",
                                                                                                        boolAnswer: { fieldName: "section_1--question_4-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_1--question_4-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 5,
                                                                                                        question: "Azia, má digestão, refluxo, úlcera ou gastrite?",
                                                                                                        boolAnswer: { fieldName: "section_1--question_5-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_1--question_5-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 9,
                                                                                                        question: "Tem o hábito de levar objetos à boca?",
                                                                                                        boolAnswer: { fieldName: "section_1--question_9-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_1--question_9-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 10,
                                                                                                        question: "Possui temperamento calmo?",
                                                                                                        boolAnswer: { fieldName: "section_1--question_10-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_1--question_10-moreinfo", value: "" }
                                                                                                    }
                                                                                                ] 
                                    },
                                    { 
                                        id: 2, label: "Seção 2", optional: false, questions: 
                                                                                                [
                                                                                                    {
                                                                                                        id: 11,
                                                                                                        question: "Dorme bem? Quantas horas por dia? Faz uso de medicação para dormir?",
                                                                                                        boolAnswer: { fieldName: "section_2--question_11-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_2--question_11-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 12,
                                                                                                        question: "Possui manchas nos dentes?",
                                                                                                        boolAnswer: { fieldName: "section_2--question_12-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_2--question_12-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 13,
                                                                                                        question: "Respirador bucal? Se sim, alguma obstrução nasal?",
                                                                                                        boolAnswer: { fieldName: "section_2--question_13-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_2--question_13-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 14,
                                                                                                        question: "Dor de cabeça frequente? Que medicação usa?",
                                                                                                        boolAnswer: { fieldName: "section_2--question_14-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_2--question_14-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 15,
                                                                                                        question: "Dor de dente? Quais?",
                                                                                                        boolAnswer: { fieldName: "section_2--question_15-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_2--question_15-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 16,
                                                                                                        question: "Anemia?",
                                                                                                        boolAnswer: { fieldName: "section_2--question_16-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_2--question_16-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 17,
                                                                                                        question: "Inflamações Bucais? Quais?",
                                                                                                        boolAnswer: { fieldName: "section_2--question_17-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_2--question_17-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 18,
                                                                                                        question: "Dificuldade para mastigação? Que tipo de alimento?",
                                                                                                        boolAnswer: { fieldName: "section_2--question_18-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_2--question_18-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 19,
                                                                                                        question: "Habito de bruxismo ou apertamento dos dentes?",
                                                                                                        boolAnswer: { fieldName: "section_2--question_19-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_2--question_19-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 20,
                                                                                                        question: "Cansaço fácil?",
                                                                                                        boolAnswer: { fieldName: "section_2--question_20-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_2--question_20-moreinfo", value: "" }
                                                                                                    }
                                                                                                ]
                                    },
                                    { 
                                        id: 3, label: "Seção 3", optional: false, questions:
                                                                                                [
                                                                                                    {
                                                                                                        id: 21,
                                                                                                        question: "Pus nas gengivas?",
                                                                                                        boolAnswer: { fieldName: "section_3--question_21-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_3--question_21-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 22,
                                                                                                        question: "Estalos da ATM?",
                                                                                                        boolAnswer: { fieldName: "section_3--question_22-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_3--question_22-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 23,
                                                                                                        question: "Temor por tratamento dentário? Houve alguma problema?",
                                                                                                        boolAnswer: { fieldName: "section_3--question_23-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_3--question_23-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 24,
                                                                                                        question: "Dentes moles? Quais?",
                                                                                                        boolAnswer: { fieldName: "section_3--question_24-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_3--question_24-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 25,
                                                                                                        question: "Fumante? Há quanto tempo?",
                                                                                                        boolAnswer: { fieldName: "section_3--question_25-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_3--question_25-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 26,
                                                                                                        question: "Usava aparelho ortodôntico? Por quanto tempo? Motivo? Tipo? Nome e telefone do ortodentista.",
                                                                                                        boolAnswer: { fieldName: "section_3--question_26-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_3--question_26-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 27,
                                                                                                        question: "Faz tratamento de Canal? Quais dentes? Apresenta alguma sintomalogia?",
                                                                                                        boolAnswer: { fieldName: "section_3--question_27-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_3--question_27-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 28,
                                                                                                        question: "Usa ou usou protetor bucal para a prática esportiva? Que tipo? Se adaptou? Por que?",
                                                                                                        boolAnswer: { fieldName: "section_3--question_28-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_3--question_28-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 29,
                                                                                                        question: "Faz uso de prótese? Que tipo? Há quanto tempo? Alguma queixa?",
                                                                                                        boolAnswer: { fieldName: "section_3--question_29-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_3--question_29-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 30,
                                                                                                        question: "Qual sua frequência de tratamento dentário?",
                                                                                                        boolAnswer: { fieldName: "section_3--question_30-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_3--question_30-moreinfo", value: "" }
                                                                                                    }
                                                                                                ]
                                    },
                                    { 
                                        id: 4, label: "Seção 4", optional: false, questions:
                                                                                                [
                                                                                                    {
                                                                                                        id: 31,
                                                                                                        question: "Apresenta desgaste dental? Quais dentes?",
                                                                                                        boolAnswer: { fieldName: "section_4--question_31-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_4--question_31-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 32,
                                                                                                        question: "Já esteve internado? Quando? Qual motivo?",
                                                                                                        boolAnswer: { fieldName: "section_4--question_32-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_4--question_32-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 33,
                                                                                                        question: "Está tomando algum medicamento? Qual? Há quanto tempo?",
                                                                                                        boolAnswer: { fieldName: "section_4--question_33-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_4--question_33-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 34,
                                                                                                        question: "Sofreu trauma na região dos dentes? Quais?",
                                                                                                        boolAnswer: { fieldName: "section_4--question_34-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_4--question_34-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 35,
                                                                                                        question: "Sofreu algum trauma na região da face? Onde? Sequelas? Escreva o histórico.",
                                                                                                        boolAnswer: { fieldName: "section_4--question_35-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_4--question_35-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 36,
                                                                                                        question: "Doenças familiares? Quais?",
                                                                                                        boolAnswer: { fieldName: "section_4--question_36-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_4--question_36-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 37,
                                                                                                        question: "Sofreu alguma intervenção cirurgica bucal? Qual?",
                                                                                                        boolAnswer: { fieldName: "section_4--question_37-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_4--question_37-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 38,
                                                                                                        question: "Faz uso de chupeta? Quanto tempo?",
                                                                                                        boolAnswer: { fieldName: "section_4--question_38-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_4--question_38-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 39,
                                                                                                        question: "Alimentação boa? Que tipo?",
                                                                                                        boolAnswer: { fieldName: "section_4--question_39-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_4--question_39-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 40,
                                                                                                        question: "Roeu ou rói as unhas?",
                                                                                                        boolAnswer: { fieldName: "section_4--question_40-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_4--question_40-moreinfo", value: "" }
                                                                                                    }
                                                                                                ]
                                    },
                                    {
                                        id: 5, label: "Seção 5", optional: false, questions:
                                                                                                [
                                                                                                    {
                                                                                                        id: 41,
                                                                                                        question: "Tem ou teve o hábito de sucção digital? Quanto tempo?",
                                                                                                        boolAnswer: { fieldName: "section_5--question_41-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_5--question_41-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 42,
                                                                                                        question: "Foi amamentado? Fez uso de mamadeira? Por quanto tempo?",
                                                                                                        boolAnswer: { fieldName: "section_5--question_42-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_5--question_42-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 43,
                                                                                                        question: "Qual a frequência de escovação dental? Técnica? Tipo de escova? Troca de quanto em quanto tempo?",
                                                                                                        boolAnswer: { fieldName: "section_5--question_43-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_5--question_43-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 44,
                                                                                                        question: "Usa fio dental? Qual frequência?",
                                                                                                        boolAnswer: { fieldName: "section_5--question_44-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_5--question_44-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 45,
                                                                                                        question: "Faz uso de antisséptico bucal? Qual? Frequência? Motivo?",
                                                                                                        boolAnswer: { fieldName: "section_5--question_45-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_5--question_45-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 46,
                                                                                                        question: "Quais problemas odontológicos já teve?",
                                                                                                        boolAnswer: { fieldName: "section_5--question_46-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_5--question_46-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 47,
                                                                                                        question: "Faz ou fez uso de bochechos com fluor? Com qual frequência?",
                                                                                                        boolAnswer: { fieldName: "section_5--question_47-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_5--question_47-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 48,
                                                                                                        question: "Dificuldade de fonação?",
                                                                                                        boolAnswer: { fieldName: "section_5--question_48-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_5--question_48-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 49,
                                                                                                        question: "Peso e altura de acordo com a idade? Faz algum tratamento?",
                                                                                                        boolAnswer: { fieldName: "section_5--question_49-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_5--question_49-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 50,
                                                                                                        question: "Diabetes? Que medicação usa?",
                                                                                                        boolAnswer: { fieldName: "section_5--question_50-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_5--question_50-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 51,
                                                                                                        question: "Hipertensão? Que medicação usa?",
                                                                                                        boolAnswer: { fieldName: "section_5--question_51-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_5--question_51-moreinfo", value: "" }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 52,
                                                                                                        question: "Problemas cardíacos? Quais? Que medicação ingere?",
                                                                                                        boolAnswer: { fieldName: "section_5--question_52-bool", value: null },
                                                                                                        moreInfoAnswer: { fieldName: "section_5--question_52-moreinfo", value: "" }
                                                                                                    }
                                                                                                ]
                                    }
                                ],
            anamnseSectionActive: 1,

            /* PROFILE PIC: REACT EASY CROP */
            imgSrc: null,
            crop: { x: 0, y: 0 },
            rotation: 0,
            zoom: 1,
            aspect: 1 / 1,
            croppedAreaPixels: null,
            croppedImage: null
        };
    };

    getLocalStoragePatients = () => {
        this.insertBasePatients();

        /* LENDO LISTA DE PACIENTES DO STORAGE */
        var newPatients = [];
        if (localStorage.getItem("patientsList") !== null){
            newPatients = Object.assign([], JSON.parse(localStorage.getItem("patientsList")), {});
        }
        return newPatients;
    };

    insertBasePatients = () => {
        localStorage.clear();
        
        var basePatients = [
            {
                id: "e6929a98_2bc0-b29e-189b0cca7aae",
                photo: "data:image/jpeg;base64,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AE5ndHZib29sAAAAAABFbWxEYm9vbAAAAAAASW50cmJvb2wAAAAAAEJja2dPYmpjAAAAAQAAAAAAAFJHQkMAAAADAAAAAFJkICBkb3ViQG/gAAAAAAAAAAAAR3JuIGRvdWJAb+AAAAAAAAAAAABCbCAgZG91YkBv4AAAAAAAAAAAAEJyZFRVbnRGI1JsdAAAAAAAAAAAAAAAAEJsZCBVbnRGI1JsdAAAAAAAAAAAAAAAAFJzbHRVbnRGI1B4bEBSAAAAAAAAAAAACnZlY3RvckRhdGFib29sAQAAAABQZ1BzZW51bQAAAABQZ1BzAAAAAFBnUEMAAAAATGVmdFVudEYjUmx0AAAAAAAAAAAAAAAAVG9wIFVudEYjUmx0AAAAAAAAAAAAAAAAU2NsIFVudEYjUHJjQFkAAAAAAAAAAAAQY3JvcFdoZW5QcmludGluZ2Jvb2wAAAAADmNyb3BSZWN0Qm90dG9tbG9uZwAAAAAAAAAMY3JvcFJlY3RMZWZ0bG9uZwAAAAAAAAANY3JvcFJlY3RSaWdodGxvbmcAAAAAAAAAC2Nyb3BSZWN0VG9wbG9uZwAAAAAAOEJJTQPtAAAAAAAQAEgAAAABAAIASAAAAAEAAjhCSU0EJgAAAAAADgAAAAAAAAAAAAA/gAAAOEJJTQQNAAAAAAAEAAAAeDhCSU0EGQAAAAAABAAAAB44QklNA/MAAAAAAAkAAAAAAAAAAAEAOEJJTScQAAAAAAAKAAEAAAAAAAAAAjhCSU0D9QAAAAAASAAvZmYAAQBsZmYABgAAAAAAAQAvZmYAAQChmZoABgAAAAAAAQAyAAAAAQBaAAAABgAAAAAAAQA1AAAAAQAtAAAABgAAAAAAAThCSU0D+AAAAAAAcAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAA4QklNBAAAAAAAAAIAAThCSU0EAgAAAAAABAAAAAA4QklNBDAAAAAAAAIBAThCSU0ELQAAAAAABgABAAAAAjhCSU0ECAAAAAAAEAAAAAEAAAJAAAACQAAAAAA4QklNBB4AAAAAAAQAAAAAOEJJTQQaAAAAAANJAAAABgAAAAAAAAAAAAAAZAAAAGQAAAAKAFUAbgB0AGkAdABsAGUAZAAtADEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAGQAAABkAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAEAAAAAAABudWxsAAAAAgAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABMZWZ0bG9uZwAAAAAAAAAAQnRvbWxvbmcAAABkAAAAAFJnaHRsb25nAAAAZAAAAAZzbGljZXNWbExzAAAAAU9iamMAAAABAAAAAAAFc2xpY2UAAAASAAAAB3NsaWNlSURsb25nAAAAAAAAAAdncm91cElEbG9uZwAAAAAAAAAGb3JpZ2luZW51bQAAAAxFU2xpY2VPcmlnaW4AAAANYXV0b0dlbmVyYXRlZAAAAABUeXBlZW51bQAAAApFU2xpY2VUeXBlAAAAAEltZyAAAAAGYm91bmRzT2JqYwAAAAEAAAAAAABSY3QxAAAABAAAAABUb3AgbG9uZwAAAAAAAAAATGVmdGxvbmcAAAAAAAAAAEJ0b21sb25nAAAAZAAAAABSZ2h0bG9uZwAAAGQAAAADdXJsVEVYVAAAAAEAAAAAAABudWxsVEVYVAAAAAEAAAAAAABNc2dlVEVYVAAAAAEAAAAAAAZhbHRUYWdURVhUAAAAAQAAAAAADmNlbGxUZXh0SXNIVE1MYm9vbAEAAAAIY2VsbFRleHRURVhUAAAAAQAAAAAACWhvcnpBbGlnbmVudW0AAAAPRVNsaWNlSG9yekFsaWduAAAAB2RlZmF1bHQAAAAJdmVydEFsaWduZW51bQAAAA9FU2xpY2VWZXJ0QWxpZ24AAAAHZGVmYXVsdAAAAAtiZ0NvbG9yVHlwZWVudW0AAAARRVNsaWNlQkdDb2xvclR5cGUAAAAATm9uZQAAAAl0b3BPdXRzZXRsb25nAAAAAAAAAApsZWZ0T3V0c2V0bG9uZwAAAAAAAAAMYm90dG9tT3V0c2V0bG9uZwAAAAAAAAALcmlnaHRPdXRzZXRsb25nAAAAAAA4QklNBCgAAAAAAAwAAAACP/AAAAAAAAA4QklNBBQAAAAAAAQAAAACOEJJTQQMAAAAAAtRAAAAAQAAAGQAAABkAAABLAAAdTAAAAs1ABgAAf/Y/+0ADEFkb2JlX0NNAAH/7gAOQWRvYmUAZIAAAAAB/9sAhAAMCAgICQgMCQkMEQsKCxEVDwwMDxUYExMVExMYEQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAQ0LCw0ODRAODhAUDg4OFBQODg4OFBEMDAwMDBERDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCABkAGQDASIAAhEBAxEB/90ABAAH/8QBPwAAAQUBAQEBAQEAAAAAAAAAAwABAgQFBgcICQoLAQABBQEBAQEBAQAAAAAAAAABAAIDBAUGBwgJCgsQAAEEAQMCBAIFBwYIBQMMMwEAAhEDBCESMQVBUWETInGBMgYUkaGxQiMkFVLBYjM0coLRQwclklPw4fFjczUWorKDJkSTVGRFwqN0NhfSVeJl8rOEw9N14/NGJ5SkhbSVxNTk9KW1xdXl9VZmdoaWprbG1ub2N0dXZ3eHl6e3x9fn9xEAAgIBAgQEAwQFBgcHBgU1AQACEQMhMRIEQVFhcSITBTKBkRShsUIjwVLR8DMkYuFygpJDUxVjczTxJQYWorKDByY1wtJEk1SjF2RFVTZ0ZeLys4TD03Xj80aUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9ic3R1dnd4eXp7fH/9oADAMBAAIRAxEAPwCi4e4/FKFNw9x+KaFsNNaEjAEnQeaVj2VVuteYYwFzj5Bcj1HreVmPLWE10fmsHJ/rKPLlGMa6k7BdCBkXey+rVUtPpNNhH53Df85ZQ6/1K1x9Njdg5gRA/rOKx9z3jUOdHmVaovvqrLCxvpu0IkA/lVCfMZTZ4q8B6WxHFAdG67qVrC2xl7/UP0mu9zfyq8zrVjGA5LA13bb7pHwH0VlY9VmrnWkMHI9pP4KGTfk3v2Nd7SdZ08kyGfJE6S871XSxwI1H2PU4uVXk1h7O4kjw8keFzWDfkYE1t22AakTOhXSUWNvpba3hwV/BnGQf1hu1smMwPgqEoU4TQp2NhCSnCSSn/9Cu4e4/FNtRHD3H4pQte2k4X1oyH1YbKWmPVPuPeB+auUDi1dL9b7Gfq1X53ucfhoFzPmVQ5g3kPg2cQ9AZgzoNB95RfQeGh7mwDxPePJMyt5rBYCXPdAjwCvYvTci9zWPJAniCT8mqrKQHVnjEnYWnwqmXVCsuLS4axoArjenB7QwAFo4dAEjxcVdxsPFwawb6rXtn6IgAn+WQt/o2F0/LBvyA5zhqK5G0Dt7W/wDflVnmrXo3MfLitd+rz3VOkinBGZWAWVBtbz4z+d/r++j9IY4YLHOEB5c5o/kk+1bHXOoVX4mRgsx4qDfpyAIb7yW1/nfRVWsA1tIECBAV/wCFkniken/dNP4iBGUQBv8AmGMJoRCE0LUtzmG1JThJK1P/0Yke4/FKFMj3H4pQtS2k8l9b64y6HdnMj7isL0XgCwt9h7rtPrH08ZOC65om2gSPHbPvC53pFuDYfsee411kzVb2ae7Xf1/3lQ5q4yMt71bfLgTAjdHbVl0SphfusM7fotXZdOw6LGEgw93cLl3UY+NlFtD22DgvaZmfgug6Q+2se4/A+Sz8+o4h1dLlBUjAjbq7mL0KnaDYJiYd3181FrKcPOmqGtILXMHcFW8DNLhtKoZWDnPyrbMayv3mWh4JAaB/N6fR9356rXe5bYjwk6aeCTqXSse9j8gAEhnhyBzP9lZwaAIGgC2Mp91eFtt2+oQGkN44WXC2Phd+1In97Q/RxvinD7sQP3df8ZHCUKcJQtC3PRwkpwklan//0iEe4/FLapke4qvfnYeO5rbrA1zjAHmtAzA3NNSiUr6m2MdW8S14LXDyK8+6p0rK6fkOqsaSySa7APa5q7w9QwQ7Z67C8/RaDJJ/d0Wb1sW53Rb7QNja3sZtn84n6TlX5jJCtTr0r+szYITJ0GnX6PP06NY7xAK6bpt7LKBB1j8VldLwBmYrWnRzABPeQpXYebgu9pJCzMpEjw3qHUwcWMCdaEPSdOt9zgXbeQj1V5+87n2Pb2czaPvELmsTrORS8etUT8jquowOsOtY306ne+Q3SJIG5zfd/JUEoyB23bcM0SLG/wDWVkCwMa2xznOJ3Q4gwBp2VaEe+51z97hHYBCW1ysTjwxidJby85ODzmQZc85jUbDyixhNtUnEASeFWszamGBqpzMDcsAiSn2pIf2hvpep+CSPGO6uEv8A/9PMHX8zJsc3AwnPE6PsO0LGtxci7qW6zZddZYDbRTLiP3htXVdN6VkueXZF0An+br/788/99Wxj9PxqBYaqm1y0l7gNXR3e785Mzc0AKviP/NX4uWkda4R+Lk4nT8exvq1Y7amsjZ7RMmfdP9VRwcX7Z0TqGG76R3x5OHvZ/wBJq0cclmPW3vp+DQg4QGJ1d7B/NZTC8D+UOVWyZZTMid9x/gtqGIQEQNtpf4Tz31czaWv9B8Nc76PgV0mRi15FMuGo7rkPrD0yzpnU3Boim0m3HcOIJ+h/WrWt0brx9MUZhLm8Cz84f1v30zJGwJx6trBkv9WRtt/B2sTp9TW/RBHmqnXMgYB6e6uG7bi4/AD3T/nLZxx6jGurcHsdw4ayuS+tGax3VRW97TRU0Vs2ncA92r5LVHjBlLuvyEVViPj2emzcYgDJqG6qwBx26wT/AN8VEWMJgOBPgtzprg7p+Pa36Lq27gPGIVbN6Fh5L3Wsmi8/4SvTX+Uz6Dldw86YgRmLrTi/i5ebkwSZQNX+i4efcaqpkR3WA3Pl7g/UHgrU61gdSwcZ3rD1qR/h2CRH8tv0q1zBsJdx8Cp55eIgxOjAMXDYkKLs/tJnoRGu6ISWLvdPCSHuyVwB/9Tbxg1zA9vfXRHudsxrSP3HfkKy/qxeb+na81ucw/IrQy2XvYGVFok+8OkS2PoghZktJEF0hrEHwc6uz9TFw1LwSI8ewCIxrbLsasRvY0uJ7jhv/TUOpYmeMTbibKnN/cEkfym7vb/0Vybbev8ASr35VdjrC4g2h/uD4/f3J8QJXRRKXDWhPi9j1jpdXV+m2UMIfc0l9Lx2sb+Z/a/m156wvqDwZa9hIM9o7H+0ux6T9eMPJAZnM+y2AgGz6Vfl/KrWd9ben1YmeM+uDjZ4B3t+iH/nH/rvtcjC4kxkPJUSJagjxKf6o5N1zszDpeGttwrnW6yQ5jdHs/lfmO2fvrl+pOc6tj2sAax86jXhdF9V+o0YHWKr7S0VWNdTc46AB42PP+dtesTqwY2u9jdQ10tI8AYUorTzVOJ4J2egl/eMX0boL56ZjtBj2D5CFYyWZe5jsVzBBl7bAYc0/m7mfQcsr6tZHqYFLRy9rQPEQFunkqtLQkeKtwD4MHVhzdR21HK4D63fVirBf9vxGubi2H9IxvFb/wD0k9egtJhDurrtrdVawWVvBDmOEgjwcnQyGBsfULcmMTFfYXx3Y3j1D8I1SW3/AM3R+3/ssfqkfaJnX0I3xP8AW/QpK17se/TiantS7fpcH+E//9Uv1N3fZsmfo+sdv3ardumRHjqvCElmZPnLo4/kD72eNfBUb/sUH19uyNZXiSSaF72N37O/auTs/oke7x3fyVdp9b/m3mfbd37LkfYN/wBP1Z/wP/A7N3qf+BrgUlaOw/wd/wCXzNaPzHb9Lbb/AAv6j13Sfsvpu/aG/wCj7In6Wuz6P5//AEEDP/oz52TH5sLmEk79ILv0Jb7dX1z6m7vs9O7j0ht/rfnLpnfSC+fUlVyfMfNkh8o8n6DHeFAxPkvn9JA9Ejq+wfo/sXb7Vs/tfZvU/wDJpLx9JFP2bv8A/9kAOEJJTQQhAAAAAABVAAAAAQEAAAAPAEEAZABvAGIAZQAgAFAAaABvAHQAbwBzAGgAbwBwAAAAEwBBAGQAbwBiAGUAIABQAGgAbwB0AG8AcwBoAG8AcAAgAEMAUwA2AAAAAQA4QklNBAYAAAAAAAcACAEBAAEBAP/hDlpodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTA2LTIxVDE4OjU1OjQwLTAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTA2LTIxVDE4OjU1OjQwLTAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wNi0yMVQxODo1NTo0MC0wMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMjlBQTdGMjA5QjRFQTExQUZCREIyMUZGMTI2RDFDMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMTlBQTdGMjA5QjRFQTExQUZCREIyMUZGMTI2RDFDMCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjIxOUFBN0YyMDlCNEVBMTFBRkJEQjIxRkYxMjZEMUMwIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MjE5QUE3RjIwOUI0RUExMUFGQkRCMjFGRjEyNkQxQzAiIHN0RXZ0OndoZW49IjIwMjAtMDYtMjFUMTg6NTU6NDAtMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyMjlBQTdGMjA5QjRFQTExQUZCREIyMUZGMTI2RDFDMCIgc3RFdnQ6d2hlbj0iMjAyMC0wNi0yMVQxODo1NTo0MC0wMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPkIyQkQzMDk0MDE4ODlCRDM2QTA5RDJDRDQ2MTgzQjI3PC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz7/4gxYSUNDX1BST0ZJTEUAAQEAAAxITGlubwIQAABtbnRyUkdCIFhZWiAHzgACAAkABgAxAABhY3NwTVNGVAAAAABJRUMgc1JHQgAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLUhQICAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFjcHJ0AAABUAAAADNkZXNjAAABhAAAAGx3dHB0AAAB8AAAABRia3B0AAACBAAAABRyWFlaAAACGAAAABRnWFlaAAACLAAAABRiWFlaAAACQAAAABRkbW5kAAACVAAAAHBkbWRkAAACxAAAAIh2dWVkAAADTAAAAIZ2aWV3AAAD1AAAACRsdW1pAAAD+AAAABRtZWFzAAAEDAAAACR0ZWNoAAAEMAAAAAxyVFJDAAAEPAAACAxnVFJDAAAEPAAACAxiVFJDAAAEPAAACAx0ZXh0AAAAAENvcHlyaWdodCAoYykgMTk5OCBIZXdsZXR0LVBhY2thcmQgQ29tcGFueQAAZGVzYwAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAABJzUkdCIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFla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",
                name: "Clark Cold",
                birthday: "12/12/1993",
                genre: 1,
                occupation: "Advogado",
                documentId: "774.897.489-22",                    
                address: "Avenida Brasil, 21",
                zipcode: "56.248-00",
                state: 3,
                city: "Paraibuna",                    
                email: "clarkcold@gmail.com",
                mainPhone: "(12) 99088-4140",
                secondaryPhone: "(12) 99088-4142",
                initialTreatment: moment().toDate(),
                civilStatus: 2,
        
                anamnese: {
                    filled: true,
                    sections: [
                        {
                            id: 1,
                            questions: [
                                { id: 1, boolValue: true, moreInfoValue: "Dipirona." },
                                { id: 2, boolValue: false, moreInfoValue: "" },
                                { id: 3, boolValue: true, moreInfoValue: "Bronquite." },
                                { id: 4, boolValue: false, moreInfoValue: "" },
                                { id: 5, boolValue: false, moreInfoValue: "" },
                                { id: 9, boolValue: true, moreInfoValue: "" },
                                { id: 10, boolValue: true, moreInfoValue: "" }
                            ]
                        },
                        {
                            id: 2,
                            questions: [
                                { id: 11, boolValue: true, moreInfoValue: "8 horas." },
                                { id: 12, boolValue: false, moreInfoValue: "" },
                                { id: 13, boolValue: true, moreInfoValue: "Não." },
                                { id: 14, boolValue: false, moreInfoValue: "" },
                                { id: 15, boolValue: false, moreInfoValue: "" },
                                { id: 16, boolValue: true, moreInfoValue: "" },
                                { id: 17, boolValue: true, moreInfoValue: "" },
                                { id: 18, boolValue: true, moreInfoValue: "" },
                                { id: 19, boolValue: true, moreInfoValue: "" },
                                { id: 20, boolValue: true, moreInfoValue: "Muito" }
                            ]
                        },
                        {
                            id: 3,
                            questions: [
                                { id: 21, boolValue: true, moreInfoValue: "" },
                                { id: 22, boolValue: false, moreInfoValue: "" },
                                { id: 23, boolValue: true, moreInfoValue: "" },
                                { id: 24, boolValue: false, moreInfoValue: "Todos" },
                                { id: 25, boolValue: false, moreInfoValue: "" },
                                { id: 26, boolValue: true, moreInfoValue: "" },
                                { id: 27, boolValue: false, moreInfoValue: "" },
                                { id: 28, boolValue: false, moreInfoValue: "" },
                                { id: 29, boolValue: true, moreInfoValue: "" },
                                { id: 30, boolValue: true, moreInfoValue: "1 vez por mês" }
                            ]
                        },
                        {
                            id: 4,
                            questions: [
                                { id: 31, boolValue: true, moreInfoValue: "" },
                                { id: 32, boolValue: false, moreInfoValue: "" },
                                { id: 33, boolValue: true, moreInfoValue: "" },
                                { id: 34, boolValue: false, moreInfoValue: "Dipirona" },
                                { id: 35, boolValue: false, moreInfoValue: "" },
                                { id: 36, boolValue: true, moreInfoValue: "" },
                                { id: 37, boolValue: false, moreInfoValue: "" },
                                { id: 38, boolValue: false, moreInfoValue: "" },
                                { id: 39, boolValue: true, moreInfoValue: "" },
                                { id: 40, boolValue: true, moreInfoValue: "1 vez por mês" }
                            ]
                        },
                        {
                            id: 5,
                            questions: [
                                { id: 41, boolValue: true, moreInfoValue: "" },
                                { id: 42, boolValue: false, moreInfoValue: "" },
                                { id: 43, boolValue: true, moreInfoValue: "" },
                                { id: 44, boolValue: false, moreInfoValue: "Dipirona" },
                                { id: 45, boolValue: false, moreInfoValue: "" },
                                { id: 46, boolValue: true, moreInfoValue: "" },
                                { id: 47, boolValue: false, moreInfoValue: "" },
                                { id: 48, boolValue: false, moreInfoValue: "" },
                                { id: 49, boolValue: true, moreInfoValue: "" },
                                { id: 50, boolValue: true, moreInfoValue: "Nenhum" },
                                { id: 51, boolValue: true, moreInfoValue: "Nenhum" },
                                { id: 52, boolValue: true, moreInfoValue: "Nenhuma" }
                            ]
                        }
                    ]
                }
            },
            {
                id: "76c0137f_4f24-d016-3cd087535791",
                photo: "data:image/jpeg;base64,/9j/4QuDRXhpZgAATU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAIAAAExAAIAAAAeAAAAcgEyAAIAAAAUAAAAkIdpAAQAAAABAAAApAAAANAACvyAAAAnEAAK/IAAACcQQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykAMjAyMDowNjoyMSAxODo1NzoxOQAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAZKADAAQAAAABAAAAZAAAAAAAAAAGAQMAAwAAAAEABgAAARoABQAAAAEAAAEeARsABQAAAAEAAAEmASgAAwAAAAEAAgAAAgEABAAAAAEAAAEuAgIABAAAAAEAAApNAAAAAAAAAEgAAAABAAAASAAAAAH/2P/tAAxBZG9iZV9DTQAB/+4ADkFkb2JlAGSAAAAAAf/bAIQADAgICAkIDAkJDBELCgsRFQ8MDA8VGBMTFRMTGBEMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAENCwsNDg0QDg4QFA4ODhQUDg4ODhQRDAwMDAwREQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAZABkAwEiAAIRAQMRAf/dAAQAB//EAT8AAAEFAQEBAQEBAAAAAAAAAAMAAQIEBQYHCAkKCwEAAQUBAQEBAQEAAAAAAAAAAQACAwQFBgcICQoLEAABBAEDAgQCBQcGCAUDDDMBAAIRAwQhEjEFQVFhEyJxgTIGFJGhsUIjJBVSwWIzNHKC0UMHJZJT8OHxY3M1FqKygyZEk1RkRcKjdDYX0lXiZfKzhMPTdePzRieUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9jdHV2d3h5ent8fX5/cRAAICAQIEBAMEBQYHBwYFNQEAAhEDITESBEFRYXEiEwUygZEUobFCI8FS0fAzJGLhcoKSQ1MVY3M08SUGFqKygwcmNcLSRJNUoxdkRVU2dGXi8rOEw9N14/NGlKSFtJXE1OT0pbXF1eX1VmZ2hpamtsbW5vYnN0dXZ3eHl6e3x//aAAwDAQACEQMRAD8A3TWXH2jRGZiv2yQterpzQJPKP9kAHCk4lj4j9YWbOtZLf5SqB7K27nH4DlaX1srDfrHlt8HDT5Ln8m8vdA0aNNO6il2DJHuU9vUrJIrYPi7U/d9FVzkWPOpE/AK10nomb1WzZSNrB9J5+iF1FP1FrY2bLgX+IBUUp44GjuzxxZZiwNHk2UOeAXcfgrONb6Ihr5B02nUarsKfqthNb+nO+Ow4VDP+rOJWd2PLfEdkz34HRf8Adsg10cFmSPU9F4jwdMqT4VXNb6D9jhwfDgo9e2yltk6nQx4qaB0a8xq2ejO29Vx/6y9GcF5r03a3qWOR++F6bEgHyU0Nixlwv/Wij+Qkn2/9kv8A1tJH+KP4P//Q9NraIU9oVau/TVEdaOQitfFP8YLPR+secRpO2PmFzeBiPzMhtTeCRPwXTf4wg7I+sltNWtlrmNaOJMQFV+qOHGTebmw6t2yD2cPpKPJLhEj1Z8MOIxHR7DpWHTi0NpqaGtA7LYqxC5s9lSx2Q5o7kcLVpFrW6jRUNzq6Y0GjUtwXN+CzMyrQjwXQWte5ugJWR1Ck1tL3naPE6JEIvTV4jrvTmuBuHEHcI/FY2C+a3MPLSuvzXY9tTgx7X6GdpBj4rlMLGduzHbgG0QS3uZP5qtYJaEHpTS5iGoI63+CbC0zqD/LH5V6kwexvwC8pZYWWNsb9JpkfJbzPrp1QMDQ1mghWommoQ723/sn/AOtpLmv+cOd9r+36er9GO0JJcX5qp//R7AZkDlEGWT3WTuKkyxylpY+ffWu9v/PFljhubXbVub4y4af5qu9OwLsV/U2vLg4ZDyHN52nXc1Yv1vk9dvc06lwM+BHH5F1fTHtNounczLrbcD2JcAH/APTCp8wSPq3eWAOnbX7XByerdPa4/Y6srewgWXtedHHjdu/O0W30L6wdTcKw+11tLyI9Ye4A/R938pX7OgY1znPaxoFkF7CPaSO5b9FWB0ynDxyYEkBo07D6LW/yWqEyiY0AWeMJiVk6eDY6l1K/Fw3W7tpIhpidSuD6r1G63JY7LbZkCzRjC4gHXbDf3vd+6uw6nc51eMX/AEA4HXyUcnotWQxkENrAlgiQJ/c/dQgQNSnLEy0Bp5LGuxcyxrKMQ411JLXgEz4EPlVqsd9N2dfANbwKR/WeW6/2dq6qzp9GBS/ZqSCZ81z+Wa6+ntJMW5GQCwTyGD3KSErlp1piyQqOu9FoegfBSbSRyjNTwFZaTD0v0ceaSLHs+aSSn//S3E5cGsLvAKBKT2l9bm/vAj7wplr5X1TL+1dQvvPDnHaPKVq/V3Jcy70t5LWtkNPA1/N+9YGWx1WVbW7mt5H3FWuk5jaOp0l+jHg1vJ/lfnf5yq5I3EhsYpcMonxfUsHIBrGsqPVcloqD3ENY0wXHgKlhS0ewyQJAUj1OlrTXk1vZP5rmEz56SqQdK7RdWy8M4FJ9Zm7TZB8Vo4d7XYbf6oWRfk9BAdbW0m50CGt1Ec6fRU8HLty3xj1u9Ec2O9oROyDYOqDreXPsbydFxGW42ZgBfJY4tbPA1gNC6TrOSyn1chx0Zo3zK402SA6feXbifMqxgjoS0+ZlqA6vpZ/YhL0OofvhXanl1bXHkgEqUqe2qWl6Gfs+mOUlf/M+aSVqf//T2Ap7trS7wEqEpWEBmvHJ+5TLXynrlnqdWyXAQC8wFSP8IWt9ZqWUdVuaBBmT89VkkwPxUB3Zej2/1T6pdZhMded3ouNe/vAjbuXUXYwzWb63AP7OXO/VXpzsfplQtEPvBtcD/K+iP8xanqZPTnbq2+pUea+4/qKlOuI13dDESIRvsyt6R1Gz23W1is87SZPx0CDl5NPTcb0WO5EaIOV9aLCDVVQ/e7STACqU4l+QTk5Zlx+i3sEKPVdKd7avK/WDIvtvY18trglrPOeSs6hrTa3f9Hv8l0f1lwCcZuUwSaj7v6p5WVgUsdktJAczbP4K1jIMBTQzRImbbo6hjAQDwl+0aFZFGP8A6Mfcn9Gj/Rj7lIxNb9pU7e/KStelTxsb9ySSn//U101g3NhO1j3ahvPjopOrge4/dqnSy447yH5pjinLaJfMPrPVcOsWyC/eZbAk8cQrXRPqxkXsZ1HOZswwQ5tZ+k9s/T2/6NdZ1ivGsurw6Gfp8gg5VoHubQD79R/pv5paT8vFjbo1gG0MjtxCqTzX8oq/tbkOXoeo2e3RTaQ14A4a3SFbbj03V+8cLOoyHUENY03UDRsfTZ5a/TYr2LlU2tcanB2vHcf1mqAhsA3odCid0jCDpaz3HmUDMxxWA1ogLTFjDLjys3Py2PcG1A2vBmGagf1n/QakLKiAN3Nsx22Y1jbR7ADuniFzln1Z6g1oyunAHTccdxg/2N3737i6myq/ILPWZFTIPogyC4cF5/OV7H9KN10sPYNEp8ZmOzHLGJbj+LwGLlPeHMvHp3McWvrcCHAj95rlY9VviuozDhDqlNN1Iuo6gTW9r2gxYwb6rGu+l7m+x6hmfUnouQC7GyLsKw/m/wA5X/mvO/8A8EUwzx/SBH4tefLSGsSJfg816rZ5SWl/zAyPV2/tSrZE7tj5/wAz/wAzST/dx/vMfs5P3S//1dgTtb8FYr9ONYleFJLOdV9abv8A+c+R6XH2Wvw/fetYehH6XbPeV4ekiVz7g77LH6PnyUHfZo90b+236c/JeJJJDf8Agtlt0/wn2CrbLvtnqbdx2b52/wBrarQ9PYPT2+n22xH4LxVJOn/L91bj2/j8/wDhPtbYjSEO7b3+S8YSQC59S6p/Selx9L7W2PhDty23c+a8SSROwQ+0a+p8kl4ukmpf/9n/7ROEUGhvdG9zaG9wIDMuMAA4QklNBCUAAAAAABAAAAAAAAAAAAAAAAAAAAAAOEJJTQQ6AAAAAADlAAAAEAAAAAEAAAAAAAtwcmludE91dHB1dAAAAAUAAAAAUHN0U2Jvb2wBAAAAAEludGVlbnVtAAAAAEludGUAAAAAQ2xybQAAAA9wcmludFNpeHRlZW5CaXRib29sAAAAAAtwcmludGVyTmFtZVRFWFQAAAABAAAAAAAPcHJpbnRQcm9vZlNldHVwT2JqYwAAAAwAUAByAG8AbwBmACAAUwBlAHQAdQBwAAAAAAAKcHJvb2ZTZXR1cAAAAAEAAAAAQmx0bmVudW0AAAAMYnVpbHRpblByb29mAAAACXByb29mQ01ZSwA4QklNBDsAAAAAAi0AAAAQAAAAAQAAAAAAEnByaW50T3V0cHV0T3B0aW9ucwAAABcAAAAAQ3B0bmJvb2wAAAAAAENsYnJib29sAAAAAABSZ3NNYm9vbAAAAAAAQ3JuQ2Jvb2wAAAAAAENudENib29sAAAAAABMYmxzYm9vbAAAAAAATmd0dmJvb2wAAAAAAEVtbERib29sAAAAAABJbnRyYm9vbAAAAAAAQmNrZ09iamMAAAABAAAAAAAAUkdCQwAAAAMAAAAAUmQgIGRvdWJAb+AAAAAAAAAAAABHcm4gZG91YkBv4AAAAAAAAAAAAEJsICBkb3ViQG/gAAAAAAAAAAAAQnJkVFVudEYjUmx0AAAAAAAAAAAAAAAAQmxkIFVudEYjUmx0AAAAAAAAAAAAAAAAUnNsdFVudEYjUHhsQFIAAAAAAAAAAAAKdmVjdG9yRGF0YWJvb2wBAAAAAFBnUHNlbnVtAAAAAFBnUHMAAAAAUGdQQwAAAABMZWZ0VW50RiNSbHQAAAAAAAAAAAAAAABUb3AgVW50RiNSbHQAAAAAAAAAAAAAAABTY2wgVW50RiNQcmNAWQAAAAAAAAAAABBjcm9wV2hlblByaW50aW5nYm9vbAAAAAAOY3JvcFJlY3RCb3R0b21sb25nAAAAAAAAAAxjcm9wUmVjdExlZnRsb25nAAAAAAAAAA1jcm9wUmVjdFJpZ2h0bG9uZwAAAAAAAAALY3JvcFJlY3RUb3Bsb25nAAAAAAA4QklNA+0AAAAAABAASAAAAAEAAgBIAAAAAQACOEJJTQQmAAAAAAAOAAAAAAAAAAAAAD+AAAA4QklNBA0AAAAAAAQAAAB4OEJJTQQZAAAAAAAEAAAAHjhCSU0D8wAAAAAACQAAAAAAAAAAAQA4QklNJxAAAAAAAAoAAQAAAAAAAAACOEJJTQP1AAAAAABIAC9mZgABAGxmZgAGAAAAAAABAC9mZgABAKGZmgAGAAAAAAABADIAAAABAFoAAAAGAAAAAAABADUAAAABAC0AAAAGAAAAAAABOEJJTQP4AAAAAABwAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAADhCSU0EAAAAAAAAAgADOEJJTQQCAAAAAAAIAAAAAAAAAAA4QklNBDAAAAAAAAQBAQEBOEJJTQQtAAAAAAAGAAEAAAAEOEJJTQQIAAAAAAAQAAAAAQAAAkAAAAJAAAAAADhCSU0EHgAAAAAABAAAAAA4QklNBBoAAAAAA0kAAAAGAAAAAAAAAAAAAABkAAAAZAAAAAoAVQBuAHQAaQB0AGwAZQBkAC0AMQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAZAAAAGQAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAG51bGwAAAACAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAAGQAAAAAUmdodGxv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YzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMC0wNi0yMVQxODo1NzoxOS0wMzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMC0wNi0yMVQxODo1NzoxOS0wMzowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDYtMjFUMTg6NTc6MTktMDM6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjY5QUE3RjIwOUI0RUExMUFGQkRCMjFGRjEyNkQxQzAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjU5QUE3RjIwOUI0RUExMUFGQkRCMjFGRjEyNkQxQzAiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyNTlBQTdGMjA5QjRFQTExQUZCREIyMUZGMTI2RDFDMCIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiBkYzpmb3JtYXQ9ImltYWdlL2pwZWciPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjI1OUFBN0YyMDlCNEVBMTFBRkJEQjIxRkYxMjZEMUMwIiBzdEV2dDp3aGVuPSIyMDIwLTA2LTIxVDE4OjU3OjE5LTAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MjY5QUE3RjIwOUI0RUExMUFGQkRCMjFGRjEyNkQxQzAiIHN0RXZ0OndoZW49IjIwMjAtMDYtMjFUMTg6NTc6MTktMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8cmRmOkJhZz4gPHJkZjpsaT4zMjI4QUY1Qzg2MTEwMkUwNzY4MzEwNzQ2MzQwREY0MDwvcmRmOmxpPiA8cmRmOmxpPjczMTJDQjYzMEFFRkNENDFGNkMwNTBCM0RDQURDOEE1PC9yZGY6bGk+IDxyZGY6bGk+QjJCRDMwOTQwMTg4OUJEMzZBMDlEMkNENDYxODNCMjc8L3JkZjpsaT4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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",        
                name: "Diana Mendes",
                birthday: "12/12/1992",
                genre: 1,
                occupation: "Advogado",
                documentId: "774.897.489-22",                    
                address: "Rua Monsenhor Dutra, 43",
                zipcode: "56.248-00",
                state: 10,
                city: "Paraibuna",                    
                email: "dianamendes@gmail.com",
                mainPhone: "(12) 87995-1105",
                secondaryPhone: "(12) 99088-4142",
                initialTreatment: moment().toDate(),
                civilStatus: 2,
        
                anamnese: {
                    filled: false,
                    sections: [
                        {
                            id: 1,
                            questions: [
                                { id: 1, boolValue: true, moreInfoValue: "Dipirona." },
                                { id: 2, boolValue: null, moreInfoValue: "" },
                                { id: 3, boolValue: true, moreInfoValue: "Bronquite." },
                                { id: 4, boolValue: false, moreInfoValue: "" },
                                { id: 5, boolValue: false, moreInfoValue: "" },
                                { id: 9, boolValue: true, moreInfoValue: "" },
                                { id: 10, boolValue: true, moreInfoValue: "" }
                            ]
                        },
                        {
                            id: 2,
                            questions: [
                                { id: 11, boolValue: true, moreInfoValue: "8 horas." },
                                { id: 12, boolValue: false, moreInfoValue: "" },
                                { id: 13, boolValue: true, moreInfoValue: "Não." },
                                { id: 14, boolValue: false, moreInfoValue: "" },
                                { id: 15, boolValue: false, moreInfoValue: "" },
                                { id: 16, boolValue: true, moreInfoValue: "" },
                                { id: 17, boolValue: true, moreInfoValue: "" },
                                { id: 18, boolValue: null, moreInfoValue: "" },
                                { id: 19, boolValue: true, moreInfoValue: "" },
                                { id: 20, boolValue: true, moreInfoValue: "Muito" }
                            ]
                        },
                        {
                            id: 3,
                            questions: [
                                { id: 21, boolValue: true, moreInfoValue: "" },
                                { id: 22, boolValue: false, moreInfoValue: "" },
                                { id: 23, boolValue: true, moreInfoValue: "" },
                                { id: 24, boolValue: false, moreInfoValue: "Todos" },
                                { id: 25, boolValue: false, moreInfoValue: "" },
                                { id: 26, boolValue: true, moreInfoValue: "" },
                                { id: 27, boolValue: false, moreInfoValue: "" },
                                { id: 28, boolValue: false, moreInfoValue: "" },
                                { id: 29, boolValue: true, moreInfoValue: "" },
                                { id: 30, boolValue: true, moreInfoValue: "1 vez por mês" }
                            ]
                        },
                        {
                            id: 4,
                            questions: [
                                { id: 31, boolValue: true, moreInfoValue: "" },
                                { id: 32, boolValue: false, moreInfoValue: "" },
                                { id: 33, boolValue: true, moreInfoValue: "" },
                                { id: 34, boolValue: null, moreInfoValue: "Dipirona" },
                                { id: 35, boolValue: false, moreInfoValue: "" },
                                { id: 36, boolValue: true, moreInfoValue: "" },
                                { id: 37, boolValue: false, moreInfoValue: "" },
                                { id: 38, boolValue: false, moreInfoValue: "" },
                                { id: 39, boolValue: true, moreInfoValue: "" },
                                { id: 40, boolValue: true, moreInfoValue: "1 vez por mês" }
                            ]
                        },
                        {
                            id: 5,
                            questions: [
                                { id: 41, boolValue: true, moreInfoValue: "" },
                                { id: 42, boolValue: false, moreInfoValue: "" },
                                { id: 43, boolValue: true, moreInfoValue: "" },
                                { id: 44, boolValue: false, moreInfoValue: "Dipirona" },
                                { id: 45, boolValue: false, moreInfoValue: "" },
                                { id: 46, boolValue: true, moreInfoValue: "" },
                                { id: 47, boolValue: false, moreInfoValue: "" },
                                { id: 48, boolValue: false, moreInfoValue: "" },
                                { id: 49, boolValue: true, moreInfoValue: "" },
                                { id: 50, boolValue: true, moreInfoValue: "Nenhum" },
                                { id: 51, boolValue: true, moreInfoValue: "Nenhum" },
                                { id: 52, boolValue: true, moreInfoValue: "Nenhuma" }
                            ]
                        }
                    ]
                }
            },
            {
                id: "18436ee8_8942-8930-64b20706600e",
                photo: "data:image/jpeg;base64,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ICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTA2LTIxVDE4OjU4OjA1LTAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTA2LTIxVDE4OjU4OjA1LTAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wNi0yMVQxODo1ODowNS0wMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyODlBQTdGMjA5QjRFQTExQUZCREIyMUZGMTI2RDFDMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyNzlBQTdGMjA5QjRFQTExQUZCREIyMUZGMTI2RDFDMCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjI3OUFBN0YyMDlCNEVBMTFBRkJEQjIxRkYxMjZEMUMwIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Mjc5QUE3RjIwOUI0RUExMUFGQkRCMjFGRjEyNkQxQzAiIHN0RXZ0OndoZW49IjIwMjAtMDYtMjFUMTg6NTg6MDUtMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyODlBQTdGMjA5QjRFQTExQUZCREIyMUZGMTI2RDFDMCIgc3RFdnQ6d2hlbj0iMjAyMC0wNi0yMVQxODo1ODowNS0wMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPjMyMjhBRjVDODYxMTAyRTA3NjgzMTA3NDYzNDBERjQwPC9yZGY6bGk+IDxyZGY6bGk+NzMxMkNCNjMwQUVGQ0Q0MUY2QzA1MEIzRENBREM4QTU8L3JkZjpsaT4gPHJkZjpsaT5CMkJEMzA5NDAxODg5QkQzNkEwOUQyQ0Q0NjE4M0IyNzwvcmRmOmxpPiA8cmRmOmxpPkJGQkZCQ0I0RTA5MkVBRkQ4RDc2ODFGNTQzMTFFOTAwPC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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",        
                name: "Oliver Queen",
                birthday: "12/12/1992",
                genre: 1,
                occupation: "Advogado",
                documentId: "774.897.489-22",                    
                address: "Avenida JK, 110",
                zipcode: "56.248-00",
                state: 12,
                city: "Paraibuna",                    
                email: "oliverthekey@gmail.com",
                mainPhone: "(12) 97865-2141",
                secondaryPhone: "(12) 99088-4142",
                initialTreatment: moment().toDate(),
                civilStatus: 2,
        
                anamnese: {
                    filled: true,
                    sections: [
                        {
                            id: 1,
                            questions: [
                                { id: 1, boolValue: true, moreInfoValue: "Dipirona." },
                                { id: 2, boolValue: true, moreInfoValue: "" },
                                { id: 3, boolValue: true, moreInfoValue: "Bronquite." },
                                { id: 4, boolValue: false, moreInfoValue: "" },
                                { id: 5, boolValue: false, moreInfoValue: "" },
                                { id: 9, boolValue: true, moreInfoValue: "" },
                                { id: 10, boolValue: true, moreInfoValue: "" }
                            ]
                        },
                        {
                            id: 2,
                            questions: [
                                { id: 11, boolValue: true, moreInfoValue: "8 horas." },
                                { id: 12, boolValue: false, moreInfoValue: "" },
                                { id: 13, boolValue: true, moreInfoValue: "Não." },
                                { id: 14, boolValue: false, moreInfoValue: "" },
                                { id: 15, boolValue: false, moreInfoValue: "" },
                                { id: 16, boolValue: true, moreInfoValue: "" },
                                { id: 17, boolValue: true, moreInfoValue: "" },
                                { id: 18, boolValue: true, moreInfoValue: "" },
                                { id: 19, boolValue: true, moreInfoValue: "" },
                                { id: 20, boolValue: true, moreInfoValue: "Muito" }
                            ]
                        },
                        {
                            id: 3,
                            questions: [
                                { id: 21, boolValue: true, moreInfoValue: "" },
                                { id: 22, boolValue: false, moreInfoValue: "" },
                                { id: 23, boolValue: true, moreInfoValue: "" },
                                { id: 24, boolValue: false, moreInfoValue: "Todos" },
                                { id: 25, boolValue: false, moreInfoValue: "" },
                                { id: 26, boolValue: true, moreInfoValue: "" },
                                { id: 27, boolValue: false, moreInfoValue: "" },
                                { id: 28, boolValue: false, moreInfoValue: "" },
                                { id: 29, boolValue: true, moreInfoValue: "" },
                                { id: 30, boolValue: true, moreInfoValue: "1 vez por mês" }
                            ]
                        },
                        {
                            id: 4,
                            questions: [
                                { id: 31, boolValue: true, moreInfoValue: "" },
                                { id: 32, boolValue: false, moreInfoValue: "" },
                                { id: 33, boolValue: true, moreInfoValue: "" },
                                { id: 34, boolValue: false, moreInfoValue: "Dipirona" },
                                { id: 35, boolValue: false, moreInfoValue: "" },
                                { id: 36, boolValue: true, moreInfoValue: "" },
                                { id: 37, boolValue: false, moreInfoValue: "" },
                                { id: 38, boolValue: false, moreInfoValue: "" },
                                { id: 39, boolValue: true, moreInfoValue: "" },
                                { id: 40, boolValue: true, moreInfoValue: "1 vez por mês" }
                            ]
                        },
                        {
                            id: 5,
                            questions: [
                                { id: 41, boolValue: true, moreInfoValue: "" },
                                { id: 42, boolValue: false, moreInfoValue: "" },
                                { id: 43, boolValue: true, moreInfoValue: "" },
                                { id: 44, boolValue: false, moreInfoValue: "Dipirona" },
                                { id: 45, boolValue: false, moreInfoValue: "" },
                                { id: 46, boolValue: true, moreInfoValue: "" },
                                { id: 47, boolValue: false, moreInfoValue: "" },
                                { id: 48, boolValue: false, moreInfoValue: "" },
                                { id: 49, boolValue: true, moreInfoValue: "" },
                                { id: 50, boolValue: true, moreInfoValue: "Nenhum" },
                                { id: 51, boolValue: true, moreInfoValue: "Nenhum" },
                                { id: 52, boolValue: true, moreInfoValue: "Nenhuma" }
                            ]
                        }
                    ]
                }
            },
            {
                id: "bc918484_a3cb-9499-72890fcc6fd3",
                photo: "data:image/jpeg;base64,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dEYjUmx0AAAAAAAAAAAAAAAAUnNsdFVudEYjUHhsQFIAAAAAAAAAAAAKdmVjdG9yRGF0YWJvb2wBAAAAAFBnUHNlbnVtAAAAAFBnUHMAAAAAUGdQQwAAAABMZWZ0VW50RiNSbHQAAAAAAAAAAAAAAABUb3AgVW50RiNSbHQAAAAAAAAAAAAAAABTY2wgVW50RiNQcmNAWQAAAAAAAAAAABBjcm9wV2hlblByaW50aW5nYm9vbAAAAAAOY3JvcFJlY3RCb3R0b21sb25nAAAAAAAAAAxjcm9wUmVjdExlZnRsb25nAAAAAAAAAA1jcm9wUmVjdFJpZ2h0bG9uZwAAAAAAAAALY3JvcFJlY3RUb3Bsb25nAAAAAAA4QklNA+0AAAAAABAASAAAAAEAAgBIAAAAAQACOEJJTQQmAAAAAAAOAAAAAAAAAAAAAD+AAAA4QklNBA0AAAAAAAQAAAB4OEJJTQQZAAAAAAAEAAAAHjhCSU0D8wAAAAAACQAAAAAAAAAAAQA4QklNJxAAAAAAAAoAAQAAAAAAAAACOEJJTQP1AAAAAABIAC9mZgABAGxmZgAGAAAAAAABAC9mZgABAKGZmgAGAAAAAAABADIAAAABAFoAAAAGAAAAAAABADUAAAABAC0AAAAGAAAAAAABOEJJTQP4AAAAAABwAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAADhCSU0EAAAAAAAAAgACOEJJTQQCAAAAAAAGAAAAAAAAOEJJTQQwAAAAAAADAQEBADhCSU0ELQAAAAAABgABAAAAAzhCSU0ECAAAAAAAEAAAAAEAAAJAAAACQAAAAAA4QklNBB4AAAAAAAQAAAAAOEJJTQQaAAAAAANJAAAABgAAAAAAAAAAAAAAZAAAAGQAAAAKAFUAbgB0AGkAdABsAGUAZAAtADEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAGQAAABkAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAEAAAAAAABudWxsAAAAAgAAAAZib3VuZHNPYmpjAAAAAQAA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Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMDYtMjFUMTg6NTY6MzQtMDM6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDYtMjFUMTg6NTY6MzQtMDM6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIwLTA2LTIxVDE4OjU2OjM0LTAzOjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI0OUFBN0YyMDlCNEVBMTFBRkJEQjIxRkYxMjZEMUMwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjIzOUFBN0YyMDlCNEVBMTFBRkJEQjIxRkYxMjZEMUMwIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MjM5QUE3RjIwOUI0RUExMUFGQkRCMjFGRjEyNkQxQzAiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgZGM6Zm9ybWF0PSJpbWFnZS9qcGVnIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyMzlBQTdGMjA5QjRFQTExQUZCREIyMUZGMTI2RDFDMCIgc3RFdnQ6d2hlbj0iMjAyMC0wNi0yMVQxODo1NjozNC0wMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjI0OUFBN0YyMDlCNEVBMTFBRkJEQjIxRkYxMjZEMUMwIiBzdEV2dDp3aGVuPSIyMDIwLTA2LTIxVDE4OjU2OjM0LTAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHJkZjpCYWc+IDxyZGY6bGk+MzIyOEFGNUM4NjExMDJFMDc2ODMxMDc0NjM0MERGNDA8L3JkZjpsaT4gPHJkZjpsaT5CMkJEMzA5NDAxODg5QkQzNkEwOUQyQ0Q0NjE4M0IyNzwvcmRmOmxpPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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",
                name: "Bruce Wayne da Silva",
                birthday: "12/12/1992",
                genre: 1,
                occupation: "Advogado",
                documentId: "774.897.489-22",                    
                address: "Rua Jacareí, 230",
                zipcode: "56.248-00",
                state: 17,
                city: "Paraibuna",                    
                email: "brucesilva@gmail.com",
                mainPhone: "(12) 99065-4040",
                secondaryPhone: "(12) 99088-4142",
                initialTreatment: moment().toDate(),
                civilStatus: 2,
        
                anamnese: {
                    filled: false,
                    sections: [
                        {
                            id: 1,
                            questions: [
                                { id: 1, boolValue: true, moreInfoValue: "Dipirona." },
                                { id: 2, boolValue: null, moreInfoValue: "" },
                                { id: 3, boolValue: true, moreInfoValue: "Bronquite." },
                                { id: 4, boolValue: false, moreInfoValue: "" },
                                { id: 5, boolValue: false, moreInfoValue: "" },
                                { id: 9, boolValue: true, moreInfoValue: "" },
                                { id: 10, boolValue: true, moreInfoValue: "" }
                            ]
                        },
                        {
                            id: 2,
                            questions: [
                                { id: 11, boolValue: true, moreInfoValue: "8 horas." },
                                { id: 12, boolValue: false, moreInfoValue: "" },
                                { id: 13, boolValue: true, moreInfoValue: "Não." },
                                { id: 14, boolValue: false, moreInfoValue: "" },
                                { id: 15, boolValue: false, moreInfoValue: "" },
                                { id: 16, boolValue: true, moreInfoValue: "" },
                                { id: 17, boolValue: true, moreInfoValue: "" },
                                { id: 18, boolValue: true, moreInfoValue: "" },
                                { id: 19, boolValue: true, moreInfoValue: "" },
                                { id: 20, boolValue: true, moreInfoValue: "Muito" }
                            ]
                        },
                        {
                            id: 3,
                            questions: [
                                { id: 21, boolValue: true, moreInfoValue: "" },
                                { id: 22, boolValue: false, moreInfoValue: "" },
                                { id: 23, boolValue: true, moreInfoValue: "" },
                                { id: 24, boolValue: false, moreInfoValue: "Todos" },
                                { id: 25, boolValue: false, moreInfoValue: "" },
                                { id: 26, boolValue: true, moreInfoValue: "" },
                                { id: 27, boolValue: false, moreInfoValue: "" },
                                { id: 28, boolValue: false, moreInfoValue: "" },
                                { id: 29, boolValue: true, moreInfoValue: "" },
                                { id: 30, boolValue: true, moreInfoValue: "1 vez por mês" }
                            ]
                        },
                        {
                            id: 4,
                            questions: [
                                { id: 31, boolValue: true, moreInfoValue: "" },
                                { id: 32, boolValue: false, moreInfoValue: "" },
                                { id: 33, boolValue: true, moreInfoValue: "" },
                                { id: 34, boolValue: false, moreInfoValue: "Dipirona" },
                                { id: 35, boolValue: false, moreInfoValue: "" },
                                { id: 36, boolValue: true, moreInfoValue: "" },
                                { id: 37, boolValue: false, moreInfoValue: "" },
                                { id: 38, boolValue: false, moreInfoValue: "" },
                                { id: 39, boolValue: true, moreInfoValue: "" },
                                { id: 40, boolValue: true, moreInfoValue: "1 vez por mês" }
                            ]
                        },
                        {
                            id: 5,
                            questions: [
                                { id: 41, boolValue: true, moreInfoValue: "" },
                                { id: 42, boolValue: false, moreInfoValue: "" },
                                { id: 43, boolValue: true, moreInfoValue: "" },
                                { id: 44, boolValue: false, moreInfoValue: "Dipirona" },
                                { id: 45, boolValue: false, moreInfoValue: "" },
                                { id: 46, boolValue: true, moreInfoValue: "" },
                                { id: 47, boolValue: false, moreInfoValue: "" },
                                { id: 48, boolValue: false, moreInfoValue: "" },
                                { id: 49, boolValue: true, moreInfoValue: "" },
                                { id: 50, boolValue: true, moreInfoValue: "Nenhum" },
                                { id: 51, boolValue: true, moreInfoValue: "Nenhum" },
                                { id: 52, boolValue: true, moreInfoValue: "Nenhuma" }
                            ]
                        }
                    ]
                }
            }
        ];

        localStorage.setItem("patientsList", JSON.stringify(basePatients));
    };

    // ================ CHANGE EVENTS ==============
    goToPreviousAnamneseSection = () => {
        var previousSection = this.state.anamnseSectionActive - 1;
        this.setState({
            anamnseSectionActive: previousSection
        });
    };
    goToNextAnamneseSection = () => {
        var nextSection = this.state.anamnseSectionActive + 1;
        this.setState({
            anamnseSectionActive: nextSection
        });
    };
    changeAnamneseSection = (index) => {
        this.setState({
            anamnseSectionActive: index
        });
    };

    changeSimpleValue = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    };

    changeAnamneseSimpleMoreInfo = (evt, sectionId, questionId) => {
        const sectionArrayIndex = this.state.anamneseSections.findIndex( element => element.id === sectionId );
        const questionArrayIndex = this.state.anamneseSections[sectionArrayIndex].questions.findIndex( element => element.id === questionId );
        let newAnamneseSections = [...this.state.anamneseSections];

        newAnamneseSections[sectionArrayIndex].questions[questionArrayIndex].moreInfoAnswer.value = evt.target.value;

        this.setState({
            anamneseSections: newAnamneseSections
        });
        console.log("Recheck Section Status");
    };

    changeAnamneseSimpleBool = (evt, sectionId, questionId) => {
        const sectionArrayIndex = this.state.anamneseSections.findIndex( element => element.id === sectionId );
        const questionArrayIndex = this.state.anamneseSections[sectionArrayIndex].questions.findIndex( element => element.id === questionId );
        let newAnamneseSections = [...this.state.anamneseSections];

        if (evt.target.value === "Sim"){
            newAnamneseSections[sectionArrayIndex].questions[questionArrayIndex].boolAnswer.value = true;
        }
        else{
            newAnamneseSections[sectionArrayIndex].questions[questionArrayIndex].boolAnswer.value = false;
        }
                
        this.setState({
            anamneseSections: newAnamneseSections
        });
        console.log("Recheck Section Status");
    };

    changeDocument = (evt) => {
        var regex = /\d+/g;

        var finalValue = evt.target.value.match(regex);        
        if (finalValue === null){
            finalValue = "";
        }
        else{            
            finalValue = finalValue.join().replace(/,/g, '');
        }

        var finalMask = "";
        
        if (this.state[evt.target.name].length < 11){
            finalMask = "999.999.999-99";
        }
        else{
            if (evt.nativeEvent.data === null && this.state[evt.target.name].length === 11){
                finalMask = "999.999.999-99";
            }
            else{
                finalMask = "99.999.999/9999-99";
            }
        }

        this.setState({
            patientDocumentMask: finalMask,
            [evt.target.name]: finalValue
        });
    };

    changePhone = (evt) => {
        // Setando máscara (caso seja telefone primário)
        if (evt.target.name === "patientMainPhone" || evt.target.name === "patientSecondaryPhone"){
            var regex = /[\d|,|.|e|E|]+/g;
            var matches = evt.target.value.match(regex);
            var finalValue = "";
            var finalMask = "";

            if (matches !== null)
                finalValue = matches.join().replace(/,/g, '');

            // Final Value
            if (finalValue !== "" && evt.nativeEvent.data !== null){
                if (this.state[evt.target.name].length === 10 && evt.nativeEvent.data.length === 1){
                    finalMask = "(99) 99999-9999";
                    finalValue = this.state[evt.target.name] + evt.nativeEvent.data;
                }
                else if (this.state[evt.target.name].length > 10){
                    finalMask = "(99) 99999-9999";
                }
                else{
                    finalMask = "(99) 9999-9999";
                }
            }
            else{
                finalMask = "(99) 9999-9999";
            }

            // Final State
            var finalState = "";
            var finalValueIndex = "";
            if (evt.target.name  === "patientMainPhone"){
                finalState = "telephonePrimaryMask";
                finalValueIndex = "patientMainPhone";
            }
            else{
                finalState = "telephoneSecondaryMask";                
                finalValueIndex = "patientSecondaryPhone";
            }
            
            this.setState({
                [finalState]: finalMask,
                [finalValueIndex]: finalValue
            });
        }
    };

    changeSimpleDate = (name, value) => {
        this.setState({
            [name]: value
        });
    };

    insertFillLabel = (evt) => {
        var label = evt.target.parentElement.previousElementSibling;
        label.classList.add("label--focused");
    };

    removeFillLabel = (evt) => {
        var label = evt.currentTarget.parentElement.previousSibling;
        label.classList.remove("label--focused");
    };
        
    // ================ CRUD EVENTS ===============
    findPatientInfo = (patientId) => {
        for (var p = 0; p < this.state.patients.length; p++){
            if (this.state.patients[p].id === patientId){
                return this.state.patients[p]
            }
        }
        return null;
    };

    getPatientGeneralInfo = (patientInfo, fieldName) => {
        // Exceções de campo de data
        if (fieldName === "initialTreatment"){
            if (patientInfo === null)
                return moment().toDate()
        }

        // Exceções de campo lista
        if (fieldName === "genre" || fieldName === "civilStatus" || fieldName === "state"){
            if (patientInfo === null)
                return 0
        }

        // Sem exceções de campos
        if (patientInfo === null)
            return ""

        if (patientInfo[fieldName] === null || fieldName[fieldName] === "")
            return ""

        // Valor final
        return patientInfo[fieldName]
    };

    changeAnamneseQuestionAnswer = (patientInfo, sectionId, question) => {
        const sectionArrayIndex = this.state.anamneseSections.findIndex( element => element.id === sectionId );
        const questionArrayIndex = this.state.anamneseSections[sectionArrayIndex].questions.findIndex( element => element.id === question.id );
        let newAnamneseSections = [...this.state.anamneseSections];

        if (patientInfo === null){
            newAnamneseSections[sectionArrayIndex].questions[questionArrayIndex].boolAnswer.value = null;
            newAnamneseSections[sectionArrayIndex].questions[questionArrayIndex].moreInfoAnswer.value = "";
        }
        else{
            newAnamneseSections[sectionArrayIndex].questions[questionArrayIndex].boolAnswer.value = patientInfo.anamnese.sections[sectionArrayIndex].questions[questionArrayIndex].boolValue;
            newAnamneseSections[sectionArrayIndex].questions[questionArrayIndex].moreInfoAnswer.value = patientInfo.anamnese.sections[sectionArrayIndex].questions[questionArrayIndex].moreInfoValue;
        }       
                
        this.setState({
            anamneseSections: newAnamneseSections
        });
    };

    openCRUDPatientsModal = (mode, patientId, IsAnamnseSectionMode) => {
        // Zerando "DADOS GERAIS"
        this.setState({
            patientIdSelected: null,
            patientName: "",
            patientBirthday: "",
            patientGenreValue: 0,
            patientOccupation: "",
            patientDocument: "",
            patientAddress: "",
            patientZipCode: "",
            patientStateValue: 0,
            patientCity: "",
            patientEmail: "",
            patientMainPhone: "",
            patientSecondaryPhone: "",
            patientInitialTreatment: moment().toDate(),
            patientCivilStatus: 0
        });
        
        // Zerando "ANAMNESE"
        for (var s = 0; s < this.state.anamneseSections.length; s++){
            for (var q = 0; q < this.state.anamneseSections[s].questions.length; q++){
                var section = this.state.anamneseSections[s];
                var question = section.questions[q];
                //this.changeAnamneseQuestionAnswer(patientInfo, section.id, question); // descomentar essa linha
                this.changeAnamneseQuestionAnswer(null, section.id, question); // comentar essa linha
            }
        }

        // Zerando "FOTO DO PACIENTE"
        this.setState({
            imgSrc: null,
            crop: { x: 0, y: 0 },
            rotation: 0,
            zoom: 1,
            aspect: 1 / 1,
            croppedAreaPixels: null,
            croppedImage: null
        });

        // Zerando Modal Options
        this.setState({
            patientCrudMode: mode,
            patientCrudView: "dados_gerais",
            patientCrudVisibility: true
        });

        /* Is Anamnese */
        if (IsAnamnseSectionMode)
            this.openAnamnseSectionMode();
    };

    savePatient = () => {
        /* MONTANDO PACIENTE */
        var json = {
            id: this.getHashID(),
            photo: this.state.croppedImage,

            name: this.state.patientName,
            birthday: this.state.patientBirthday,
            genre: this.state.patientGenreValue,
            occupation: this.state.patientOccupation,
            documentId: this.state.patientDocument,         
            address: this.state.patientAddress,
            zipcode: this.state.patientZipCode,
            state: this.state.patientStateValue,
            city: this.state.patientCity,                    
            email: this.state.patientEmail,
            mainPhone: this.state.patientMainPhone,
            secondaryPhone: this.state.secondaryPhone,
            initialTreatment: this.state.patientInitialTreatment,
            civilStatus: this.state.patientCivilStatus,
            anamnese: {
                filled: this.checkFilledAnamneseForInput(),
                sections: [
                    {
                        id: 1,
                        questions: this.getPatientAnswerFromSection(1)
                    },
                    {
                        id: 2,
                        questions: this.getPatientAnswerFromSection(2)
                    },
                    {
                        id: 3,
                        questions: this.getPatientAnswerFromSection(3)
                    },
                    {
                        id: 4,
                        questions: this.getPatientAnswerFromSection(4)
                    },
                    {
                        id: 5,
                        questions: this.getPatientAnswerFromSection(5)
                    }
                ]
            }
        };

        /* LENDO LISTA DE PACIENTES DO STORAGE */  
        var newPatients = [];
        if (localStorage.getItem("patientsList") !== null){
            debugger
            newPatients = Object.assign([], JSON.parse(localStorage.getItem("patientsList")), {});
        }
        /* SALVANDO QUANDO FOR NOVO PACIENTE  */
        if (this.state.patientCrudMode === "insert"){
            //debugger
            newPatients.push(json);
        }
        else{
            debugger
        }
        debugger
        /* PERSISTINDO NO LOCAL STORE E ATUALIZANDO ESTADO COM JSON */
        localStorage.setItem("patientsList", JSON.stringify(newPatients));

        this.setState({
            patients: newPatients,
            patientCrudVisibility: false
        });

        cogoToast.success('Paciente cadastrado.', { heading: 'Sucesso!', position: 'top-center', hideAfter: 3 });

        
        // Editando existente
        /*else if (this.state.patientCrudMode === "edit"){
            for (var i = 0; i < newPatients.length; i++){
                if (newPatients[i].id === this.state.patientIdSelected)
                    newPatients[i] = json;
            }

            this.setState({
                patients: newPatients,
                patientCrudVisibility: false
            });

            cogoToast.success('Paciente editado.', { heading: 'Sucesso!', position: 'top-center', hideAfter: 3 });
        }*/
    };


    openCRUDPatientsModal_ORIGINAL = (mode, patientId, IsAnamnseSectionMode) => {
        var patientInfo = this.findPatientInfo(patientId);

        /* Patient General Info*/
        this.setState({
            patientIdSelected: this.getPatientGeneralInfo(patientInfo, "id"),
            patientName: this.getPatientGeneralInfo(patientInfo, "name"),
            patientBirthday: this.getPatientGeneralInfo(patientInfo, "birthday"),
            patientGenreValue: this.getPatientGeneralInfo(patientInfo, "genre"),
            patientOccupation: this.getPatientGeneralInfo(patientInfo, "occupation"),
            patientDocument: this.getPatientGeneralInfo(patientInfo, "documentId"),
            patientAddress: this.getPatientGeneralInfo(patientInfo, "address"),
            patientZipCode: this.getPatientGeneralInfo(patientInfo, "zipcode"),
            patientStateValue: this.getPatientGeneralInfo(patientInfo, "state"),
            patientCity: this.getPatientGeneralInfo(patientInfo, "city"),
            patientEmail: this.getPatientGeneralInfo(patientInfo, "email"),
            patientMainPhone: this.getPatientGeneralInfo(patientInfo, "mainPhone"),
            patientSecondaryPhone: this.getPatientGeneralInfo(patientInfo, "secondaryPhone"),
            patientInitialTreatment: this.getPatientGeneralInfo(patientInfo, "initialTreatment"),
            patientCivilStatus: this.getPatientGeneralInfo(patientInfo, "civilStatus")
        });

        /* Anamnese */
        for (var s = 0; s < this.state.anamneseSections.length; s++){
            for (var q = 0; q < this.state.anamneseSections[s].questions.length; q++){
                var section = this.state.anamneseSections[s];
                var question = section.questions[q];
                this.changeAnamneseQuestionAnswer(patientInfo, section.id, question);
            }
        }

        /* Modal Options */
        this.setState({
            patientCrudMode: mode,
            patientCrudView: "dados_gerais",
            patientCrudVisibility: true
        });

        /* Is Anamnese */
        if (IsAnamnseSectionMode)
            this.openAnamnseSectionMode();
    };

    closePatientCrudModal = () => {
        this.setState({ patientCrudVisibility: false });
    };

    openAnamnseSectionMode = () => {
        this.setState({
            patientCrudView: "anamnese",
            anamnseSectionActive: 1
        });
    };
    
    goBackToGeneralData = () => {
        this.setState({
            patientCrudView: "dados_gerais"
        });
    };

    triedToDeletePatient = (patientId) => {
        cogoToast.info(
            <div>
                <div>Tem certeza que deseja excluir esse paciente?</div>
                <button className="button--confirmation" onClick = {() => this.deletePatient(patientId)}>Sim</button>
                <button className="button--cancel" onClick = { this.destroyCogoToastInfo }>Não</button>
            </div>,
            { heading: 'Confirmação', position: 'top-center', hideAfter: 0 }
        );
    };

    deletePatient = (patientId) => {
        var newPatients = [];
        for (var i = 0; i < this.state.patients.length; i++){
            if (this.state.patients[i].id !== patientId)
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

    checkPendingModalSection = (sectionId) => {
        const sectionIndex = this.state.anamneseSections.findIndex(element => element.id === sectionId);
        const section = this.state.anamneseSections[sectionIndex];
        const questions = section.questions;

        for (var q = 0; q < questions.length; q++){
            var question = questions[q];
            if (question.boolAnswer.value === null){
                return true; // Not Pending
            }
        }
        return false;
    };

    checkFilledAnamneseForInput = () => {
        const modalSections = this.state.anamneseSections;
        for (var s = 0; s < modalSections.length; s++){
            for (var q = 0; q < modalSections[s].questions.length; q++){
                var question = modalSections[s].questions[q];
                if (question.boolAnswer.value === null)
                    return false; // Not Filled
            }
        }
        return true;
    };

    generatePieceHashCode = function (){
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };

    getHashID = (cropper) => {
        if (this.state.patientCrudMode === "insert" || cropper === "cropper"){
            return this.generatePieceHashCode() + this.generatePieceHashCode()  + '_' + this.generatePieceHashCode() + '-' + this.generatePieceHashCode() + '-' + this.generatePieceHashCode() + this.generatePieceHashCode() +this.generatePieceHashCode();
        }
        else{
            return this.state.patientIdSelected;
        }
    };

    getPatientAnswerFromSection = (sectionId) => {
        var sectionWithAnswers = [];

        const sectionArrayIndex = this.state.anamneseSections.findIndex( element => element.id === sectionId );
        const questions = this.state.anamneseSections[sectionArrayIndex].questions;
        for (var q = 0; q < questions.length; q++){
            var newQuestion = {"id": questions[q].id, "boolValue": questions[q].boolAnswer.value, "moreInfo": questions[q].moreInfoAnswer.value};
            sectionWithAnswers.push(newQuestion);
        }
        return sectionWithAnswers;
    };

    savePatient_ORIGINAL = () => {
        var json = {
            id: this.getHashID(),
            photo: "",
            name: this.state.patientName,
            birthday: this.state.patientBirthday,
            genre: this.state.patientGenreValue,
            occupation: this.state.patientOccupation,
            documentId: this.state.patientDocument,         
            address: this.state.patientAddress,
            zipcode: this.state.patientZipCode,
            state: this.state.patientStateValue,
            city: this.state.patientCity,                    
            email: this.state.patientEmail,
            mainPhone: this.state.patientMainPhone,
            secondaryPhone: this.state.secondaryPhone,
            initialTreatment: this.state.patientInitialTreatment,
            civilStatus: this.state.patientCivilStatus,
            anamnese: {
                filled: this.checkFilledAnamneseForInput(),
                sections: [
                    {
                        id: 1,
                        questions: this.getPatientAnswerFromSection(1)
                    },
                    {
                        id: 2,
                        questions: this.getPatientAnswerFromSection(2)
                    },
                    {
                        id: 3,
                        questions: this.getPatientAnswerFromSection(3)
                    },
                    {
                        id: 4,
                        questions: this.getPatientAnswerFromSection(4)
                    },
                    {
                        id: 5,
                        questions: this.getPatientAnswerFromSection(5)
                    }
                ]
            }
        };

        var newPatients = Object.assign([], this.state.patients, {});

        // Salvando novo
        if (this.state.patientCrudMode === "insert"){
            newPatients.push(json);
            this.setState({
                patients: newPatients,
                patientCrudVisibility: false
            });

            cogoToast.success('Paciente cadastrado.', { heading: 'Sucesso!', position: 'top-center', hideAfter: 3 });
        }
        // Editando existente
        else if (this.state.patientCrudMode === "edit"){
            for (var i = 0; i < newPatients.length; i++){
                if (newPatients[i].id === this.state.patientIdSelected)
                    newPatients[i] = json;
            }

            this.setState({
                patients: newPatients,
                patientCrudVisibility: false
            });

            cogoToast.success('Paciente editado.', { heading: 'Sucesso!', position: 'top-center', hideAfter: 3 });
        }
    };

    /* PROFILE PIC: REACT EASY CROP */
    onFileChange = async e => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            let imageDataUrl = await this.readFile(file);
    
            // apply rotation if needed
            const orientation = await getOrientation(file);
            const rotation = ORIENTATION_TO_ANGLE[orientation];
            if (rotation) {
                imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
            }
    
            this.setState({
                imgSrc: imageDataUrl,
                patientCrudView: "crop",
                rotation: 0,
                zoom: 1
            });
        }
    };

    readFile(file) {
        return new Promise(resolve => {
            const reader = new FileReader()
            reader.addEventListener('load', () => resolve(reader.result), false)
            reader.readAsDataURL(file)
        });
    };

    setCrop = crop => {
        this.setState({ crop })
    };

    setRotation = rotation => {
        this.setState({ rotation })
    };

    onCropComplete = (croppedArea, croppedAreaPixels) => {
        this.setState({croppedAreaPixels: croppedAreaPixels});
    };

    setZoom = zoom => {
        this.setState({ zoom });
    };

    recordPatientPicture = async e => {
        const croppedImage = await getCroppedImg(this.state.imgSrc, this.state.croppedAreaPixels, this.state.rotation);
        this.setState({ croppedImage: croppedImage }, function () {
            this.setState({patientCrudView: "dados_gerais"});
        });
    };

    recordPatientPicture_ORIGINAL = async e => {
        try {
            const croppedImage = await getCroppedImg(this.state.imgSrc, this.state.croppedAreaPixels, this.state.rotation);
            this.setState({ croppedImage: croppedImage }, function () {
                
                //Depois de setar o crop da Imagem
                const fileExtension = extractImageFileExtensionFromBase64(this.state.croppedImage);
                const myFilename = "previewFile." + fileExtension;

                // Transforma o Cropped64 em arquivo
                const myNewCroppedFile = base64StringtoFile(this.state.croppedImage, myFilename);
                console.log("Novo arquivo: " + myNewCroppedFile);
                
                // Caso não haja patientId, gera um
                if (this.state.patientIdSelected === null || this.state.patientIdSelected === ""){
                    var newPatId = this.getHashID('cropper');
                    this.setState({ patientIdSelected: newPatId }, function () {
                        var pictureId = this.state.patientIdSelected + "%picture%";
                        var pictureImage64 = this.state.croppedImage;
                        localStorage.setItem(pictureId, pictureImage64);
                        this.setState({patientCrudView: "dados_gerais"});
                    });
                }
                else{
                    var pictureId = this.state.patientIdSelected + "%picture%";
                    var pictureImage64 = this.state.croppedImage;
                    localStorage.setItem(pictureId, pictureImage64);                    
                    this.setState({patientCrudView: "dados_gerais"});
                }
            });
          }
        catch (e) {
            //console.error(e);
        }
    };
    
    // ================ RENDERIZAÇÃO DO CONTEÚDO HTML ===============
    render(){
        const { classes } = this.props;

        // LISTAGEM DE PACIENTES
        const listPatients = this.state.patients.map((patient) => {
            return (
                <div className="div--individual-card" key={patient.id}>

                    {/* Eliminar repetição indevida */}
                    {   patient.anamnese.filled === false ?
                        
                        <div className="div--card-toolbar-onlydelete">
                            <Button className="button--card-anamnese" onClick={() => this.openCRUDPatientsModal("edit", patient.id, true) }><MenuBookIcon /></Button>
                            <Button className="button--card-delete" onClick={() => this.triedToDeletePatient(patient.id) }><DeleteForeverIcon /></Button>
                        </div>
                        
                        :
                        
                        <div className="div--card-toolbar-anamnese">
                            <Button className="button--card-delete" onClick={() => this.triedToDeletePatient(patient.id) }><DeleteForeverIcon /></Button>
                        </div>
                    }

                    {/* Eliminar repetição indevida acima */}
                    <div className="div--card-background" onClick={() => this.openCRUDPatientsModal("edit", patient.id)}>
                        <div className="div--card-picture">
                            <img alt = { patient.name } src={ patient.photo }></img>
                        </div>
                        <div className="div--card-name">{ patient.name }</div>
                        <div className="div--card-contact">{ patient.email }<br/>{ patient.phone }</div>
                        <div className="div--card-address">{ patient.address }</div>
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
                            <button className="button--blue-casual" onClick={() => this.openCRUDPatientsModal("insert", null)}>Novo Paciente</button>
                        </div>
                    </div>

                    <div className="container--patients-card">
                        { listPatients }                        
                    </div>
                </div>

                {/* Modal de Pacientes */}
                <Modal open={ this.state.patientCrudVisibility } onClose={ this.closePatientCrudModal } center>
                    
                    {/* Superior Toolbar */}
                    <div className="custom--modal-header-patient">
                        <Button className="icon--agendamentos"><span>Agendas</span></Button>
                        <Button className="icon--financas"><span>Financeiro</span></Button>
                        <Button className="icon--exams"><span>Exames</span></Button>
                        <Button className="icon--procedure"><span>Tratamentos</span></Button>
                    </div>
                                        
                    {/* Dados Gerais */}
                    { this.state.patientCrudView === "dados_gerais" ?
                        <div className="div--modalPatient-body">
                        <p className="modal--title-divisor">Dados Gerais</p>
                        <div className="div--patients-information">
                            <form className={classes.root} noValidate autoComplete="off">
                                <MuiPickersUtilsProvider libInstance={ moment } utils={ MomentUtils } locale={ momentLocale }>
                                    
                                    {/* Foto do Paciente */}
                                    { this.state.croppedImage === null ?
                                        <div className="modal--pic-row">
                                            <div className="div--pic-upbutton">
                                                <input 
                                                    className="input--picture" 
                                                    type='file' 
                                                    accept="image/*"                                       
                                                    onChange={this.onFileChange} 
                                                />                                                
                                            </div>

                                            <div className="div--pic-text patient-pic--textneed">
                                                <h1>Seu paciente precisa de uma foto!</h1>
                                                <p>Clique na imagem para escolher</p>
                                                <div className="div--point-left"></div>
                                            </div>
                                        </div>
                                    :
                                        <div className="modal--pic-row">
                                            <div className="div--pic-upbutton">
                                                <img src={this.state.croppedImage} className="img--selected-pic" />
                                                <input 
                                                    className="input--picture-invisible" 
                                                    type='file'
                                                    accept="image/*"                                       
                                                    onChange={this.onFileChange} 
                                                />
                                            </div>

                                            <div className="div--pic-text patient-pic--textneed">
                                                <h1>Essa é a foto do seu paciente!</h1>
                                                <p>Caso queira trocar, clique na imagem</p>
                                                <div className="div--point-left"></div>
                                            </div>                                                                       
                                        </div>
                                    }

                                    {/* Dados do Paciente */}
                                    <div className="modal--text-row">
                                        <div className="modal--split-columnar">
                                            <div className="modal--split-one">
                                                <TextField 
                                                    label="Nome do Paciente" 
                                                    value = { this.state.patientName }
                                                    name = "patientName"
                                                    onChange={ this.changeSimpleValue } 
                                                    required
                                                />
                                            </div>

                                            <div className="modal--split-two">    
                                                <InputMask
                                                    mask="99/99/9999"
                                                    name = "patientBirthday"
                                                    value = { this.state.patientBirthday }
                                                    onChange={ this.changeSimpleValue }
                                                >
                                                    {() => <TextField
                                                                label="Nascimento" 
                                                                name = "patientBirthday"
                                                                type="text"
                                                    />}
                                                </InputMask>

                                                <div className="modal--split-children">
                                                    <InputLabel htmlFor="checkbox--genre">Sexo:</InputLabel>
                                                    <Select
                                                        labelId="checkbox--genre"
                                                        value = { this.state.patientGenreValue }
                                                        name = "patientGenreValue"
                                                        onChange={ this.changeSimpleValue }
                                                        onFocus = { this.insertFillLabel }
                                                        onBlur = {(e) => this.removeFillLabel(e) }
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
                                                <InputMask
                                                    mask = { this.state.patientDocumentMask }
                                                    name = "patientDocument"
                                                    value = { this.state.patientDocument }
                                                    onChange={ this.changeDocument }
                                                >
                                                    {() => <TextField
                                                                label="CPF ou CNPJ:" 
                                                                name = "patientDocument"
                                                                type="text"
                                                    />}
                                                </InputMask>
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

                                                <div className="modal--split-children">
                                                    <InputLabel htmlFor="checkbox--state">Estado:</InputLabel>
                                                    <Select
                                                        labelId="checkbox--state"
                                                        value = { this.state.patientStateValue }
                                                        name = "patientStateValue"
                                                        onChange={ this.changeSimpleValue }
                                                        onFocus = { this.insertFillLabel }
                                                        onBlur = {(e) => this.removeFillLabel(e) }
                                                        input={ <Input /> }
                                                    >
                                                        { this.state.stateList.map((stateItem) => (
                                                            <MenuItem key={ stateItem.name } value={ stateItem.id }>
                                                                <ListItemText primary={ stateItem.name } />
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </div>
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
                                                <InputMask                                               
                                                    value = { this.state.patientMainPhone }
                                                    mask = { this.state.telephonePrimaryMask }
                                                    name = "patientMainPhone"
                                                    onChange={ this.changePhone }
                                                >
                                                    {() => <TextField
                                                                label="Telefone Principal:" 
                                                                name = "patientMainPhone"
                                                                type="text"
                                                    />}
                                                </InputMask>
                                            </div>

                                            <div className="modal--split-one">
                                                <InputMask                                     
                                                    value = { this.state.patientSecondaryPhone }
                                                    mask = { this.state.telephoneSecondaryMask }
                                                    name = "patientSecondaryPhone"
                                                    onChange={ this.changePhone }
                                                >
                                                    {() => <TextField
                                                                label="Telefone Secundário:" 
                                                                name = "patientSecondaryPhone"
                                                                type="text"
                                                    />}
                                                </InputMask>
                                            </div>

                                            <div className="modal--split-one">
                                                <div className="modal--split-datetime">
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        format="DD/MM/YYYY"
                                                        margin="normal"
                                                        label="Início do Tratamento:"
                                                        value={ this.state.patientInitialTreatment }
                                                        autoOk = { true }
                                                        onChange={(e) => this.changeSimpleDate("patientInitialTreatment", e) }
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
                                                        onFocus = { this.insertFillLabel }
                                                        onBlur = {(e) => this.removeFillLabel(e) }
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
                                    </div>
                                </MuiPickersUtilsProvider>
                            </form>
                        </div>
                    </div>             
                    : null }
                                        
                    {/* Anamnese */}
                    { this.state.patientCrudView === "anamnese" ?
                        <div className="div--modalAnamnese-body">
                            <div>
                                <p className="modal--title-divisor">Anamnese - Detalhamento</p>
                            </div>
                            <div className="div--patients-anamneseinfo">

                                {/* section HTML Component */}                              
                                <div className="div--anamneseinfo-toolbar">
                                    <div>
                                        { this.state.anamnseSectionActive === 1 ? 
                                            <Button className="section--previous" disabled>
                                                <SkipPreviousIcon onClick={ this.goToPreviousAnamneseSection } /> 
                                            </Button>
                                            :
                                            <Button className="section--previous">
                                                <SkipPreviousIcon onClick={ this.goToPreviousAnamneseSection } /> 
                                            </Button>
                                        }
                                    </div>
                                    { this.state.anamneseSections.map((section) => {
                                        return (
                                            <div key={section.id}>
                                                <div className="section--label" onClick={() => this.changeAnamneseSection(section.id) } >
                                                    Seção

                                                    {   this.state.anamnseSectionActive === section.id ?
                                                        
                                                        <div className="section--counter selected">
                                                            {section.id}
                                                        </div>
                                                        :
                                                        [
                                                            ( this.state.patientIdSelected === null ?
                                                                <div key={section.id + "_section"} className="section--counter">
                                                                    {section.id}
                                                                </div>
                                                                :
                                                                ( this.checkPendingModalSection(section.id) === true ?
                                                                    <div key={section.id + "_section"} className="section--counter pending">
                                                                        {section.id}
                                                                    </div>
                                                                    :
                                                                    <div key={section.id + "_section"} className="section--counter success">
                                                                        {section.id}
                                                                    </div>
                                                                )
                                                            )
                                                        ]
                                                    }                                                                                                     

                                                </div>
                                            </div>                                                
                                        );
                                    }) }
                                    <div>
                                        { this.state.anamnseSectionActive === 5 ? 
                                            <Button className="section--next" disabled>
                                                <SkipNextIcon onClick={ this.goToNextAnamneseSection } /> 
                                            </Button>
                                            :
                                            <Button className="section--next">
                                                <SkipNextIcon onClick={ this.goToNextAnamneseSection } /> 
                                            </Button>
                                        }
                                    </div>
                                </div>

                                
                                {/* Questions */}                        
                                <div className="div--anamneseinfo-questions">
                                    {/* Sections */}
                                    { this.state.anamneseSections.map((section) => {
                                        return (
                                            <div key={ "section-" + section.id}>
                                                { 
                                                    this.state.anamnseSectionActive === section.id ?
                                                    section.questions.map((questions) =>
                                                        {
                                                            return (
                                                                <div key={ "section--" + section.id + "-question-" + questions.id} id={ "section--" + section.id + "-question-" + questions.id} className="div--question-block">
                                                                    <p>{questions.id + ". " + questions.question }</p>
                                                                    
                                                                    {/* Booleano - Sim / Não */}
                                                                    { questions.boolAnswer !== null && questions.boolAnswer !== undefined ?
                                                                        <div className="div--question-booleano">
                                                                            <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                                                                <FormControlLabel
                                                                                    value="Sim"
                                                                                    control={<Radio color="primary" />}
                                                                                    label="Sim"
                                                                                    labelPlacement="end"
                                                                                    name = { questions.boolAnswer.fieldName }
                                                                                    checked = { questions.boolAnswer.value === true }
                                                                                    onChange = {(e) => this.changeAnamneseSimpleBool(e, section.id, questions.id) }
                                                                                />
                                                                
                                                                                <FormControlLabel
                                                                                    value="Não"
                                                                                    control={<Radio color="primary" />}
                                                                                    label="Não"
                                                                                    labelPlacement="end"
                                                                                    name = { questions.boolAnswer.fieldName }
                                                                                    checked = { questions.boolAnswer.value === false }
                                                                                    onChange = {(e) => this.changeAnamneseSimpleBool(e, section.id, questions.id) }
                                                                                />
                                                                            </RadioGroup>
                                                                        </div>
                                                                    : null }

                                                                    {/* Texto Adicional - Observação */}
                                                                    { questions.moreInfoAnswer !== null && questions.moreInfoAnswer !== undefined ?
                                                                        <div className="div--anamnese-moreInfoInput">
                                                                            <input 
                                                                                type = "text" 
                                                                                placeholder="Informação adicional"
                                                                                name = { questions.moreInfoAnswer.fieldName }
                                                                                defaultValue = { questions.moreInfoAnswer.value }
                                                                                onChange={(e) => this.changeAnamneseSimpleMoreInfo(e, section.id, questions.id) }
                                                                            />
                                                                        </div>
                                                                    : null }
                                                                </div>
                                                            );
                                                        })
                                                    : 
                                                null }
                                            </div>                                                
                                        );
                                    }) }
                                </div>

                            </div>
                        </div>
                    : null }

                    {/* Profile Pic */}
                    { this.state.patientCrudView === "crop" ?
                        <div className="div--modalAnamnese-body">
                            <div>
                                <p className="modal--title-divisor">Edição de Foto do usuário</p>
                            </div>
                            <div className="div--patients-profilepic">
                                <div className="crop-container">
                                    <Cropper
                                        image={this.state.imgSrc}
                                        crop={this.state.crop}                                        
                                        rotation={this.state.rotation}
                                        zoom={this.state.zoom}
                                        aspect={this.state.aspect}
                                        onCropChange={this.setCrop}
                                        onRotationChange={this.setRotation}
                                        onCropComplete={this.onCropComplete}
                                        onZoomChange={this.setZoom}
                                    />
                                </div>
                                <div className="controls">
                                    <Typography
                                        variant="overline"
                                        classes={{ root: classes.sliderLabel }}
                                    >
                                        Zoom
                                    </Typography>
                                    <Slider
                                        value={this.state.zoom}
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        aria-labelledby="Zoom"
                                        onChange={(e, zoom) => this.setZoom(zoom)}
                                    />
                                </div>
                                <div className="controls">
                                    <Typography
                                        variant="overline"
                                        classes={{ root: classes.sliderLabel }}
                                    >
                                        Girar
                                    </Typography>
                                    <Slider
                                        value={this.state.rotation}
                                        min={0}
                                        max={360}
                                        step={1}
                                        aria-labelledby="Rotation"
                                        classes={{ container: classes.slider }}
                                        onChange={(e, rotation) => this.setRotation(rotation)}
                                    />
                                </div>
                            </div>
                        </div>
                    : null }

                    {/* Bottom ToolBar */}
                    <div className="custom--modal-footer">
                        <div className="buttons--bar patients--component">

                            {this.state.patientCrudMode === "edit" ? 
                                <Button
                                    className="white"
                                    onClick={ this.deleteEvent }
                                >
                                    Excluir
                                </Button>
                            : null }

                            { this.state.patientCrudView !== "crop" ?
                                <Button className="white" onClick={ this.closePatientCrudModal }>Cancelar</Button>
                                :
                                null
                            }                            
                                
                            { this.state.patientCrudView === "dados_gerais" ?
                                <Button className="anamnese blue" onClick = { this.openAnamnseSectionMode } >
                                    Anamnese
                                    <MenuBookIcon />
                                </Button>
                            : null }

                            { this.state.patientCrudView === "anamnese" ?
                                <Button className="anamnese blue" onClick = { this.goBackToGeneralData }>Dados Gerais</Button>
                            : null }

                            { this.state.patientCrudView !== "crop" ?
                                <Button className="blue" onClick = { this.savePatient } >Salvar</Button>
                                :
                                null
                            }
                            
                            {/* Profile Picture */}
                            { this.state.patientCrudView === "crop" ?
                                <div style={{display: "flex"}}>
                                    <input 
                                            className="input--picture-changer"
                                            type='file' 
                                            accept="image/*"                                       
                                            onChange={this.onFileChange}
                                    />                       
                                    <Button className="blue" onClick = { this.recordPatientPicture }>Gravar Foto</Button>
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>  
                </Modal>
            </div>            
        );
    }
}

export default withStyles(useStyles)(Patients);
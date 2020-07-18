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

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
    }
});

class Patients extends React.Component{    
    constructor(props){
        super(props);

        this.state = {
            patientCrudVisibility: false,
            patientCrudMode: "insert",
            patientCrudView: "dados_gerais",
            patients: [
                {
                    id: 1,
                    photo: clarkPhoto,

                    name: "Clark Cold",
                    birthday: "12/12/1993",
                    genre: 1,
                    occupation: "Advogado",
                    documentId: "774.897.489-22",                    
                    address: "Avenida Brasil, 21",
                    zipcode: "56.248-00",
                    state: "SP",
                    city: "Paraibuna",                    
                    email: "clarkcold@gmail.com",
                    mainPhone: "(12) 99088-4140",
                    secondaryPhone: "(12) 99088-4142",
                    initialTreatment: moment().toDate(),
                    civilStatus: 2,

                    anamnese: {
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
                    id: 2,
                    photo: dianaPhoto,

                    name: "Diana Mendes",
                    birthday: "12/12/1992",
                    genre: 1,
                    occupation: "Advogado",
                    documentId: "774.897.489-22",                    
                    address: "Rua Monsenhor Dutra, 43",
                    zipcode: "56.248-00",
                    state: "SP",
                    city: "Paraibuna",                    
                    email: "dianamendes@gmail.com",
                    mainPhone: "(12) 87995-1105",
                    secondaryPhone: "(12) 99088-4142",
                    initialTreatment: moment().toDate(),
                    civilStatus: 2,

                    anamnese: {
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
                    id: 3,
                    photo: oliverPhoto,

                    name: "Oliver Queen",
                    birthday: "12/12/1992",
                    genre: 1,
                    occupation: "Advogado",
                    documentId: "774.897.489-22",                    
                    address: "Avenida JK, 110",
                    zipcode: "56.248-00",
                    state: "SP",
                    city: "Paraibuna",                    
                    email: "oliverthekey@gmail.com",
                    mainPhone: "(12) 97865-2141",
                    secondaryPhone: "(12) 99088-4142",
                    initialTreatment: moment().toDate(),
                    civilStatus: 2,

                    anamnese: {
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
                    id: 4,
                    photo: brucePhoto,

                    name: "Bruce Wayne da Silva",
                    birthday: "12/12/1992",
                    genre: 1,
                    occupation: "Advogado",
                    documentId: "774.897.489-22",                    
                    address: "Rua Jacareí, 230",
                    zipcode: "56.248-00",
                    state: "SP",
                    city: "Paraibuna",                    
                    email: "brucesilva@gmail.com",
                    mainPhone: "(12) 99065-4040",
                    secondaryPhone: "(12) 99088-4142",
                    initialTreatment: moment().toDate(),
                    civilStatus: 2,

                    anamnese: {
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
            ],

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
            patientState: "",

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

            telephonePrimaryMask: "(99) 9999-9999",
            telephoneSecondaryMask: "(99) 9999-9999",
            patientDocumentMask: "999.999.999-99",

            anamnseSectionMode: false,
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
            anamnseSectionActive: 1
        };
    };

    // ================ CHANGE EVENTS ==============
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

        if (evt.target.value == "Sim"){
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
        if (fieldName === "genre" || fieldName === "civilStatus"){
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

    openCRUDPatientsModal = (mode, patientId) => {
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
            patientState: this.getPatientGeneralInfo(patientInfo, "state"),
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

    checkPendingPatientSectionOfAnamnese = (patientIdSelected, sectionId) => {
        const patientIndex = this.state.patients.findIndex(element => element.id === patientIdSelected);
        const patient = this.state.patients[patientIndex];
        const sectionIndex = patient.anamnese.sections.findIndex(element => element.id === sectionId);
        const section = patient.anamnese.sections[sectionIndex];
        const questions = section.questions;

        for (var q = 0; q < questions.length; q++){
            var question = questions[q];
            if (question.boolValue === null){
                return true;
            }
        }
        return false;
    };

    checkPendingPatientAnamnese = (patientId) => {
        const patientIndex = this.state.patients.findIndex(element => element.id === patientId);
        const patient = this.state.patients[patientIndex];

        for (var s = 0; s < patient.anamnese.sections.length; s++){
            for (var q = 0; q < patient.anamnese.sections[s].questions.length; q++){
                var question = patient.anamnese.sections[s].questions[q];
                if (question.boolValue === null)
                    return true;
            }
        }

        return false;
    };

    // ================ RENDERIZAÇÃO DO CONTEÚDO HTML ===============
    
    render(){
        const { classes } = this.props;

        // LISTAGEM DE PACIENTES
        const listPatients = this.state.patients.map((patient) => {
            return (
                <div className="div--individual-card" key={patient.id}>

                    {/* Eliminar repetição indevida */}
                    {   this.checkPendingPatientAnamnese(patient.id) === true ?
                        
                        <div className="div--card-toolbar-onlydelete">
                            <Button className="button--card-anamnese" onClick={() => this.fillPatientAnamnese(patient.id) }><MenuBookIcon /></Button>
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

                                {/* Step HTML Component */}                              
                                <div className="div--anamneseinfo-toolbar">
                                    { this.state.anamneseSections.map((step) => {
                                        return (
                                            <div key={step.id}>
                                                <div className="section--label" onClick={() => this.changeAnamneseSection(step.id) } >
                                                    Seção

                                                    {   this.state.anamnseSectionActive === step.id ?
                                                        
                                                        <div className="section--counter selected">
                                                            {step.id}
                                                        </div>
                                                        : 
                                                        [
                                                            ( this.state.patientIdSelected === null ?
                                                                <div className="section--counter">
                                                                    {step.id}
                                                                </div>
                                                                :
                                                                ( this.checkPendingPatientSectionOfAnamnese(this.state.patientIdSelected, step.id) === true ?
                                                                    <div className="section--counter pending">
                                                                        {step.id}
                                                                    </div>
                                                                    :
                                                                    <div className="section--counter success">
                                                                        {step.id}
                                                                    </div>
                                                                )
                                                            )
                                                        ]
                                                    }                                                                                                     

                                                </div>
                                            </div>                                                
                                        );
                                    }) }
                                </div>

                                
                                {/* Questions */}                        
                                <div className="div--anamneseinfo-questions">
                                    {/* Sections */}
                                    { this.state.anamneseSections.map((step) => {
                                        return (
                                            <div key={ "section-" + step.id}>
                                                { 
                                                    this.state.anamnseSectionActive === step.id ?
                                                    step.questions.map((questions) =>
                                                        {
                                                            return (
                                                                <div key={ "section--" + step.id + "-question-" + questions.id} id={ "section--" + step.id + "-question-" + questions.id} className="div--question-block">
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
                                                                                    onChange = {(e) => this.changeAnamneseSimpleBool(e, step.id, questions.id) }
                                                                                />
                                                                
                                                                                <FormControlLabel
                                                                                    value="Não"
                                                                                    control={<Radio color="primary" />}
                                                                                    label="Não"
                                                                                    labelPlacement="end"
                                                                                    name = { questions.boolAnswer.fieldName }
                                                                                    checked = { questions.boolAnswer.value === false }
                                                                                    onChange = {(e) => this.changeAnamneseSimpleBool(e, step.id, questions.id) }
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
                                                                                onChange={(e) => this.changeAnamneseSimpleMoreInfo(e, step.id, questions.id) }
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

                            <Button className="white" onClick={ this.closePatientCrudModal }>Cancelar</Button>
                                
                            { this.state.patientCrudView === "dados_gerais" ?
                                <Button className="anamnese blue" onClick = { this.openAnamnseSectionMode } >
                                    Anamnese
                                    <MenuBookIcon />
                                </Button>
                            : null }

                            { this.state.patientCrudView === "anamnese" ?
                                <Button className="anamnese blue" onClick = { this.goBackToGeneralData } >Dados Gerais</Button>
                            : null }

                            <Button className="blue" onClick = { this.saveEvent } >Salvar</Button>
                        </div>
                    </div>  
                </Modal>
            </div>            
        );
    }
}

export default withStyles(useStyles)(Patients);
import React from 'react';
import _ from 'lodash';
import classList from 'react-classlist-helper';
import { defaults } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';

import moment from 'moment';
import MomentUtils from "@date-io/moment";

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI

import '../assets/css/Finances.css';
import '../assets/css/Responsive/Resume--Responsive.css';

// ================ COMPONENTES ===============
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Modal } from 'react-responsive-modal';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import InputMask from "react-input-mask";
import InputLabel from "@material-ui/core/InputLabel";
import Input from '@material-ui/core/Input';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import IntlCurrencyInput from "react-intl-currency-input";
import cogoToast from 'cogo-toast';
import Autocomplete from '@material-ui/lab/Autocomplete';

// ================ ÍCONES ===============

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AutoCompleteSuggest from './AutoCompleteSuggest';

// ================ ACESSO RÁPIDO ===============

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import SendIcon from '@material-ui/icons/Send';

// ================ CHARTS ===============

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { NewReleases } from '@material-ui/icons';

defaults.global.defaultFontFamily = 'Averta';

const momentLocale = moment.locale('pt-br');

const mixedChartData = {
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março'],
        datasets: [
            {
                label: 'Faturamento',
                type:'line',
                data: [250, 120, 340],
                fill: false,
                borderColor: '#efdc4c',
                backgroundColor: '#efdc4c',
                pointBorderColor: '#efdc4c',
                pointBackgroundColor: '#efdc4c',
                pointHoverBackgroundColor: '#efdc4c',
                pointHoverBorderColor: '#efdc4c',
            },
            {
                type: 'bar',
                label: 'Receita',
                data: [200, 20, 300],
                fill: false,
                backgroundColor: '#32cc77',
                borderColor: '#32cc77',
                /*hoverBackgroundColor: '#2386fd',
                hoverBorderColor: '#2386fd',*/
            },
            {
                type: 'bar',
                label: 'Despesa',
                data: [50, 100, 40],
                fill: false,
                backgroundColor: '#e47474',
                borderColor: '#e47474',
                /*hoverBackgroundColor: '#71B37C',
                hoverBorderColor: '#71B37C',*/
            }
        ]
    },
    options: {
        responsive: true,
        tooltips: {
            mode: 'label'
        },
        elements: {
            line: {
                fill: false
            }
        },
        /*scales: {
            xAxes: [
                {
                    display: true,
                    gridLines: {
                        display: false
                    },
                    labels: {
                        show: true
                    }
                }
            ],
            yAxes: [
                {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    gridLines: {
                        display: false
                    },
                    labels: {
                        show: true
                    }
                },
                {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {
                        display: false
                    },
                    labels: {
                        show: true
                    }
                }
            ]
        }*/
    }
};

const donutChartData = {
    data: {
        labels: ["Infraestrutura", "Tratamentos", "Consultas", "Investimento"],
        datasets: [
            {
                backgroundColor: [
                    "#5D001E",
                    "#E3E2DF",
                    "#E3AFBC",
                    "#9A1750",
                    "#EE4C7C"
                ],
                borderColor: "white",
                borderWidth: 2,
                data: [14, 15, 4, 20]
            }
        ]
    },
    options: {
        legend: {
            display: true,
            labels: {fontFamily: 'Averta'}
        },
        responsive: true
    }
};

const useStyles = theme => ({
    root: {
        height: 45,
    },
    speedDial: {
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(2),
            left: theme.spacing(2),
        },
    },
});

const shortCutActions = [
    { 
        icon:   <div className="div--speedial-content div--speedial-green">
                    <p>Nova Receita</p>
                </div>,
        type: 1,
        id: 1
    },
    { 
        icon:   <div className="div--speedial-content div--speedial-red">
                    <p>Nova Despesa</p>
                </div>,
        type: 0,
        id: 2
    },
    { 
        icon:   <div className="div--speedial-content div--speedial-blue">
                    <p>Importar dados</p>
                </div>,
        type: 2,
        id: 3
    }
];

// ================ CLASS ===============

class Finances extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            // Speed Dial
            open: false,
            hidden: false,

            // Charts
            summaryChartView: true,
            mixedChartOpenned: true,
            
            // Transactions Items
            transactions: this.getLocalStorageTransactions(),
            transactionsFilterBy: {
                "field": "date",
                "isAscOrder": true
            },

            // Modal
            isModalOpen: false,
            modalMode: "insert",
            
            // Modal Fields
            modalIdSelected: null,
            modalDescriptionValue: "",
            modalTypeValue: "Receita",
            modalDateValue: moment().toDate(),
            modalPriceValue: 0,
            modalCategoriesSuggest : this.getTagSuggestions(),

            modalCategoriesSelected: [],
            modalCategoriasNewSelection: [],

            modalObservationValue: "",
            modalCurrencyConfig: {
                locale: "pt-BR",
                formats: {
                    number: {
                        BRL: {
                            style: "currency",
                            currency: "BRL",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        },
                    },
                },
            }
        };
    };

    getTagSuggestions = () => {
        if (localStorage.getItem("transactionsList") !== null){
            var tagSuggestions = [];
            var transactions = Object.assign([], JSON.parse(localStorage.getItem("transactionsList")), {});
            
            for (var t = 0; t < transactions.length; t++){
                for (var ta = 0; ta < transactions[t].tags.length; ta++){
                    var tag = transactions[t].tags[ta];
                    tagSuggestions.indexOf(tag) === -1 && tagSuggestions.push(tag);
                }
            }
            return tagSuggestions;
        }
        else{
            return [];
        }
    };

    getLocalStorageTransactions = () => {
        this.insertBaseTransactions();

        /* LENDO LISTA DE TRANSACTIONS DO STORAGE */
        var newTransactions = [];
        if (localStorage.getItem("transactionsList") !== null){
            newTransactions = Object.assign([], JSON.parse(localStorage.getItem("transactionsList")), {});
        }
        
        var newArray = _.sortBy(newTransactions, 'date').reverse();

        return newArray;
    };

    insertBaseTransactions = () => {
        localStorage.clear();
        
        var baseTransactions = [
            { 
                id: "e6929a98_2bc0-b29e-189b0cc3212ae",
                type: 0,
                description: "Cadeira para recepcionista",
                price: 279.50,
                date: moment("11/02/2020", 'DD-MM-YYYY'),
                tags: ["Infraestrutura", "Tratamentos"],
                observation: "Teste",
                attaches: []
            },
            {
                id: "e6929456_2bc0-b29e-456b0cc3212ae",
                type: 1,
                description: "Clareamento do João",
                price: 500.00,
                date: moment("12/02/2020", 'DD-MM-YYYY'),
                tags: ["Infraestrutura"],
                observation: "Teste",
                attaches: []
            },
            { 
                id: "e6334a98_2bc0-b29e-456b0cc3212ae",
                type: 1,
                description: "Limpeza rápida do Marcus",
                price: 105.00,
                date: moment("02/03/2020", 'DD-MM-YYYY'),
                tags: ["Infraestrutura"],
                observation: "Teste",
                attaches: []
            },
            { 
                id: "e6998798_2bc0-b29e-456b0cc3212ae",
                type: 1,
                description: "Clareamento do João",
                price: 500.00,
                date: moment("01/12/2019", 'DD-MM-YYYY'),
                tags: ["Infraestrutura"],
                observation: "Teste",
                attaches: []
            },
            
            { 
                id: "e7899a98_2bc0-b29e-456b0cc3212ae",
                type: 0,
                description: "Lâmpadas para escritório",
                price: 89.00,
                date: moment("17/06/2020", 'DD-MM-YYYY'),
                tags: ["Infraestrutura"],
                observation: "Teste",
                attaches: []
            },
            { 
                id: "e6567a98_2bc0-b29e-456b0cc3212ae",
                type: 1,
                description: "Limpeza rápida do Cláudio",
                price: 105.00,
                date: moment("03/04/2020", 'DD-MM-YYYY'),
                tags: ["Infraestrutura"],
                observation: "Teste",
                attaches: []
            },
            { 
                id: "e6456a98_2bc0-b29e-456b0cc3212ae",
                type: 0,
                description: "Enxaguante bucal 2L",
                price: 50.00,
                date: moment("19/09/2020", 'DD-MM-YYYY'),
                tags: ["Tratamentos"],
                observation: "Teste",
                attaches: []
            }
        ];

        localStorage.setItem("transactionsList", JSON.stringify(baseTransactions));
    };

    changeBoolEvent = (evtName) => {
        this.setState({
            [evtName]: !this.state[evtName]
        });
    };

    /*handleVisibility = () => {
        this.setState(state => ({
            open: false,
            hidden: !state.hidden,
        }));
    };*/

    handleClick = () => {
        this.setState(state => ({
            open: !state.open,
        }));
    };
    
    handleOpen = () => {
        if (!this.state.hidden) {
            this.setState({
                open: true,
            });
        }
    };
    
    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    findTransactionInfo = (transactionId) => {
        for (var p = 0; p < this.state.transactions.length; p++){
            if (this.state.transactions[p].id === transactionId){
                return this.state.transactions[p]
            }
        }
        return null;
    };

    getTransactionGeneralInfo = (transactionInfo, fieldName) => {
        // Exceções de campo de data
        if (fieldName === "date"){
            if (transactionInfo === null){
                return moment().toDate()
            }
            /*else{
                return moment(transactionInfo[fieldName], 'DD-MM-YYYY')
            }*/
        }

        if (fieldName === "price"){
            if (transactionInfo === null)
                return 0
        }

        if (fieldName === "tags"){
            if (transactionInfo === null)
                return []
        }

        // Sem exceções de campos
        if (transactionInfo === null)
            return ""

        if (transactionInfo[fieldName] === null || fieldName[fieldName] === "")
            return ""

        // Valor final
        return transactionInfo[fieldName]
    };

    openModal = (transactionType, transactionId) => {
        var transactionInfo = this.findTransactionInfo(transactionId);
        
        if (transactionType === 1)
            {transactionType = "Receita";}
        else
            {transactionType = "Despesa";} 
        
        // Zerando "DADOS GERAIS"
        this.setState({
            modalIdSelected: transactionId,
            modalDescriptionValue: this.getTransactionGeneralInfo(transactionInfo, "description"),
            modalTypeValue: transactionType,
            modalDateValue: this.getTransactionGeneralInfo(transactionInfo, "date"),
            modalPriceValue: this.getTransactionGeneralInfo(transactionInfo, "price"),
            modalCategoriesSelected: this.getTransactionGeneralInfo(transactionInfo, "tags"),
            modalObservationValue: this.getTransactionGeneralInfo(transactionInfo, "observation")
        });

        if (transactionId === null)
            {var myModalMode = "insert";}
        else
            {var myModalMode = "edit";}
        
        this.setState({
            modalMode: myModalMode,
            isModalOpen: true
        });
    };

    closeModal = () => {
        this.setState({ isModalOpen: false });
    };

    generatePieceHashCode = function (){
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };

    getHashID = () => {
        if (this.state.modalMode === "insert"){
            return this.generatePieceHashCode() + this.generatePieceHashCode()  + '_' + this.generatePieceHashCode() + '-' + this.generatePieceHashCode() + '-' + this.generatePieceHashCode() + this.generatePieceHashCode() +this.generatePieceHashCode();
        }
        else{
            return this.state.modalIdSelected;
        }
    };

    verifyRequiredFields = (json) => {
        var missingFields = [];

        if (json.description.length === 0)
            missingFields.push(<p>Descrição</p>);

        return missingFields;
    };

    saveModalItem = () => {
        /* MONTANDO PACIENTE */
        var json = {
            id: this.getHashID(),
            type: this.state.modalTypeValue,
            description: this.state.modalDescriptionValue,
            price: this.state.modalPriceValue,
            date: this.state.modalDateValue,
            tags: this.state.modalCategoriasNewSelection,
            observation: this.state.modalObservationValue,
            attaches: []
        };

        // VERIFICANDO CAMPOS VALIDOS
        var missingFields = this.verifyRequiredFields(json);

        if (missingFields.length === 0){
            // LENDO LISTA DE PACIENTES DO STORAGE
            var newTransactions = [];
            if (localStorage.getItem("transactionsList") !== null){
                newTransactions = Object.assign([], JSON.parse(localStorage.getItem("transactionsList")), {});
            }
            
            // SALVANDO QUANDO FOR NOVO PACIENTE
            if (this.state.modalMode === "insert"){
                newTransactions.push(json);
                cogoToast.success('Transação cadastrada.', { heading: 'Sucesso!', position: 'top-center', hideAfter: 3 });
            }
            else if (this.state.modalMode === "edit"){
                for (var i = 0; i < newTransactions.length; i++){
                    if (newTransactions[i].id === this.state.modalIdSelected)
                        newTransactions[i] = json;
                }            
                cogoToast.success('Transação editada.', { heading: 'Sucesso!', position: 'top-center', hideAfter: 3 });
            }

            // PERSISTINDO NO LOCAL STORE E ATUALIZANDO ESTADO COM JSON
            newTransactions = this.giveBackFilteredBy(newTransactions);

            localStorage.setItem("transactionsList", JSON.stringify(newTransactions));

            this.setState({
                transactions: newTransactions,
                isModalOpen: false
            });

            // Adicionando TAG para a lista de Tags
            this.refreshTagSuggestions(json.tags);
        }
        else{
            cogoToast.warn(
                <div>
                    <p>Preencha os campos a seguir:</p>
                    <ul className="cogotoast--patient-missing">
                        {missingFields.map((value, index) => {
                            return <li key={index}>{value}</li>
                        })}
                    </ul>
                    <button className="button--cancel" onClick = { this.destroyCogoToastInfo }>Entendi</button>
                </div>, 
                { heading: 'Ops! Infelizmente faltam informações', position: 'top-center', hideAfter: 0 }
            );            
        }
    };

    refreshTagSuggestions = (newTags) => {
        var oldTags = this.state.modalCategoriesSuggest;

        for (var n = 0; n < newTags.length; n++){
            var newTag = newTags[n];
            oldTags.indexOf(newTag) === -1 && oldTags.push(newTag);
        }
        
        this.setState({modalCategoriesSuggest: oldTags});
    };

    deleteModalItem = () => {
        var newTransactions = [];
        for (var i = 0; i < this.state.transactions.length; i++){
            if (this.state.transactions[i].id !== this.state.modalIdSelected)
                newTransactions.push(this.state.transactions[i]);
        }

        newTransactions = this.giveBackFilteredBy(newTransactions);

        // Salvando
        this.setState({
            transactions: newTransactions,
            isModalOpen: false
        });
        
        this.destroyCogoToastInfo();
        cogoToast.success('Transação excluída com sucesso.', { heading: 'Sucesso!', position: 'top-center', hideAfter: 3 });
    };

    convertDateToString = (dateMoment) => {        
        return moment(dateMoment).format('DD/MM/YYYY');
    };

    findTagText = (array) => {
        if (array.length == 0)
            return ""
        if (array.length == 1)
            return array[0]
        return "+ 1"
    };

    convertPriceCurrency = (intPrice) => {
        return intPrice.toLocaleString('pt-br', {minimumFractionDigits: 2});
    };

    destroyCogoToastInfo = () => {
        var ctToasts = document.getElementsByClassName("ct-toast");
        for (var i = 0; i < ctToasts.length; i++){
            ctToasts[i].remove();
        }
    };

    changeModalSimpleValue = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    };

    changeDate = (date) => {
        this.setState({ modalDateValue: date });
    };

    changeCurrencyValue = (event, value, maskedValue) => {
        event.preventDefault();
        this.setState({ modalPriceValue: value }, function () {
            console.log(this.state.modalPriceValue);
        });        
    };

    giveBackFilteredBy = (array) => {
        var newArray = _.sortBy(array, [this.state.transactionsFilterBy.field]);
        if (this.state.transactionsFilterBy.isAscOrder == false)
            newArray = newArray.reverse();

        return newArray;
    };

    filterBy = (evt) => {
        var field = evt.currentTarget.name;

        var newList = _.sortBy(this.state.transactions, [field]);
        var isAscOrder = this.state.transactionsFilterBy.isAscOrder;

        if (field === this.state.transactionsFilterBy.field){
            if (isAscOrder == true)
                newList = newList.reverse();
            isAscOrder = !isAscOrder
        }           
        else{
            isAscOrder = true
        }
        
        this.setState({
            transactions: newList,
            transactionsFilterBy: {
                "field": field,
                "isAscOrder": isAscOrder
            }
        });
    };

    changeCurrentModalCategories = (values) => {
        this.setState({modalCategoriasNewSelection: values});
    };

    render(){
        // LISTAGEM DE PACIENTES
        const listTransactions = this.state.transactions.map((transaction) => {
            return (
                    <div 
                        className="div--grid_item" 
                        key={transaction.id}
                        onClick={() => this.openModal(transaction.type, transaction.id)}
                    >
                        <div className="div--grid_item_left">
                            <Checkbox
                                className="checkbox--list-selection"
                                checked={ this.state.eventAllDayCheck } 
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={< CheckCircleIcon />}
                                onChange={ this.changeAllDayCheck }
                            />                   
                            <div>{transaction.description}</div>
                        </div>
                        <div className="div--grid_item_right">
                            <div className="div--grid_item_right_each">
                                <p><em>{this.convertDateToString(transaction.date)}</em></p>
                            </div>
                            <div className="div--grid_item_right_each">
                                <p className="financial--tag"><em>{this.findTagText(transaction.tags)}</em></p>
                            </div>
                            <div className="div--grid_item_right_each">
                                <div className={transaction.type === 1 ? "financial--revenue-icon" : "financial--expense-icon"}></div>
                            </div>
                            <div className="div--grid_item_right_each">
                                <p className="item--price">R$ <em>{this.convertPriceCurrency(transaction.price)}</em></p>
                            </div>
                        </div>
                    </div>
            );
        });
        
        const { classes } = this.props;
        const { hidden, open } = this.state;

        // RETORNO BÁSICO DO HTML
        return (
            <div className="container--miolo-main">
                <div className="container--content-resume">
                    <div className="div--content-header">
                        <div className="div--content-title">
                            <h1>Finanças</h1>
                        </div>
                        <div className="div--financial-utilities">

                            {/* Speed Dial */}
                            <div className={classes.root}>
                                <SpeedDial
                                    ariaLabel="SpeedDial tooltip example"
                                    className={classes.speedDial}
                                    hidden={hidden}
                                    icon={<SpeedDialIcon />}
                                    onBlur={this.handleClose}
                                    onClick={this.handleClick}
                                    onClose={this.handleClose}
                                    onFocus={this.handleOpen}
                                    onMouseEnter={this.handleOpen}
                                    onMouseLeave={this.handleClose}
                                    open={open}
                                    direction = {"left"}
                                >
                                {shortCutActions.map(action => (
                                    <SpeedDialAction
                                        key = {action.id}
                                        icon={action.icon}
                                        open = {true}
                                        tooltipOpen = {true}
                                        onClick={() => this.openModal(action.type, null)}
                                    />
                                ))}
                                </SpeedDial>
                            </div>

                            <Button 
                                className="button--financial-toggle button--financial-donut"
                                onClick = { () => this.changeBoolEvent("summaryChartView") }>                                    
                                { this.state.summaryChartView ? 
                                    <VisibilityIcon/>
                                    :
                                    <VisibilityOffIcon/>
                                }
                            </Button>
                            <Button 
                                className="button--financial-toggle button--financial-eyeview"
                                onClick = { () => this.changeBoolEvent("mixedChartOpenned") }> 
                                { this.state.mixedChartOpenned === true ?
                                    <DonutSmallIcon/>
                                    :
                                    <EqualizerIcon/>
                                }
                            </Button>
                        </div>
                    </div>

                    <div className="div--content-body mt20">
                        {/* Div com Resumo */}
                        <div className="div--content-row">                            
                            { this.state.summaryChartView ?
                            <div className="div--summaryChart">
                                <div className="div--content-summary">
                                    <h1>R$ 2.015,10</h1>
                                    <p>Seu saldo geral está positivo</p>

                                </div>

                                <div className="div--content-actions">
                                    { this.state.mixedChartOpenned === true ?
                                    <Bar
                                        options = {mixedChartData.options}
                                        data = {mixedChartData.data}
                                        height = {80}
                                    />
                                    :
                                    <Doughnut
                                        options = {donutChartData.options}
                                        data = {donutChartData.data}
                                        height = {75}
                                    />
                                    }
                                </div>
                            </div>
                            : null 
                            }
                        </div>                       

                        {/* Div com filtros */}
                        <div className="div--grid_filter_item mt20">
                            <div className="div--grid_item_left pl0">
                                <div className="div--grid_item_left_each">
                                    <div>
                                        <button 
                                            name = "description"
                                            onClick = { this.filterBy }
                                            className={classList({
                                                'button--filter': this.state.transactionsFilterBy.field !== "description",
                                                'button--filter button--filter-asc': this.state.transactionsFilterBy.field === "description" && this.state.transactionsFilterBy.isAscOrder,
                                                'button--filter button--filter-desc': this.state.transactionsFilterBy.field === "description" && !this.state.transactionsFilterBy.isAscOrder
                                            })}
                                        >
                                            <div className="button--filter-paragraph">
                                                <p>Descrição</p>
                                            </div>
                                            <div className="button--filter-arrows">
                                                <ArrowDropUpIcon/>
                                                <ArrowDropDownIcon/>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="div--grid_item_right">

                                <div className="div--grid_item_right_each">
                                    <div>
                                        <button 
                                            name = "date"
                                            onClick = { this.filterBy }
                                            className={classList({
                                                'button--filter': this.state.transactionsFilterBy.field !== "date",
                                                'button--filter button--filter-asc': this.state.transactionsFilterBy.field === "date" && this.state.transactionsFilterBy.isAscOrder,
                                                'button--filter button--filter-desc': this.state.transactionsFilterBy.field === "date" && !this.state.transactionsFilterBy.isAscOrder
                                            })}
                                        >
                                            <div className="button--filter-paragraph">
                                                <p>Data</p>
                                            </div>
                                            <div className="button--filter-arrows">
                                                <ArrowDropUpIcon/>
                                                <ArrowDropDownIcon/>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div className="div--grid_item_right_each">
                                    <div>
                                        <button 
                                            name = "tag"
                                            onClick = { this.filterBy }
                                            className={classList({
                                                'button--filter': this.state.transactionsFilterBy.field !== "tag",
                                                'button--filter button--filter-asc': this.state.transactionsFilterBy.field === "tag" && this.state.transactionsFilterBy.isAscOrder,
                                                'button--filter button--filter-desc': this.state.transactionsFilterBy.field === "tag" && !this.state.transactionsFilterBy.isAscOrder
                                            })}
                                        >
                                            <div className="button--filter-paragraph">
                                                <p>Categoria</p>
                                            </div>
                                            <div className="button--filter-arrows">
                                                <ArrowDropUpIcon/>
                                                <ArrowDropDownIcon/>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div className="div--grid_item_right_each">
                                    <div>
                                        <button 
                                            name = "type"
                                            onClick = { this.filterBy }
                                            className={classList({
                                                'button--filter': this.state.transactionsFilterBy.field !== "type",
                                                'button--filter button--filter-asc': this.state.transactionsFilterBy.field === "type" && this.state.transactionsFilterBy.isAscOrder,
                                                'button--filter button--filter-desc': this.state.transactionsFilterBy.field === "type" && !this.state.transactionsFilterBy.isAscOrder
                                            })}
                                        >
                                            <div className="button--filter-paragraph">
                                                <p>Tipo</p>
                                            </div>
                                            <div className="button--filter-arrows">
                                                <ArrowDropUpIcon/>
                                                <ArrowDropDownIcon/>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div className="div--grid_item_right_each">
                                    <div>
                                        <button 
                                            name = "price"
                                            onClick = { this.filterBy }
                                            className={classList({
                                                'button--filter': this.state.transactionsFilterBy.field !== "price",
                                                'button--filter button--filter-asc': this.state.transactionsFilterBy.field === "price" && this.state.transactionsFilterBy.isAscOrder,
                                                'button--filter button--filter-desc': this.state.transactionsFilterBy.field === "price" && !this.state.transactionsFilterBy.isAscOrder
                                            })}
                                        >
                                            <div className="button--filter-paragraph">
                                                <p>Preço</p>
                                            </div>
                                            <div className="button--filter-arrows">
                                                <ArrowDropUpIcon/>
                                                <ArrowDropDownIcon/>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        
                        {/* Div de pesquisa e botões rápidos */}
                        <div className="div--content-row mt20">
                            {/* Auto Suggest */}
                            < AutoCompleteSuggest source = "transactions" />
                        </div>

                        {/* Div com itens */}
                        <div className="div--content-row mt10 div--financial-grid">
                            <div className="div--financial-row">
                                { listTransactions }
                            </div>
                        </div>
                    </div>
                </div>


                



                {/* Modal de Transações */}
                <Modal open={ this.state.isModalOpen } onClose={ this.closeModal } center>

                    {/* Dados Gerais */}
                    <div className="modal--body-custom">
                        { this.state.modalMode === "insert" ?
                            <p className="modal--body-custom-title">Nova {this.state.modalTypeValue}</p>
                            :
                            <p className="modal--body-custom-title">Editar {this.state.modalTypeValue}</p>
                        }

                        <div className="modal--body-custom-content">
                            <form noValidate autoComplete="off">
                                <MuiPickersUtilsProvider libInstance={ moment } utils={ MomentUtils } locale={ momentLocale }>                                        
                                    {/* Dados da Transação */}
                                    <div className="modal--fields-container">
                                        <div className="modal--field mt5">                                            
                                            <TextField 
                                                label="Descrição" 
                                                value = { this.state.modalDescriptionValue }
                                                name = "modalDescriptionValue"
                                                onChange={ this.changeModalSimpleValue } 
                                                required
                                            />
                                        </div>

                                        <div className="modal--field modal--field-intlcurrencyinput">
                                            <InputLabel htmlFor="checkbox--transaction-price">Preço:</InputLabel>
                                            <IntlCurrencyInput 
                                                currency="BRL" 
                                                config={ this.state.modalCurrencyConfig }
                                                onChange={ this.changeCurrencyValue }
                                                value = { this.state.modalPriceValue }
                                                id="checkbox--transaction-price"
                                            />
                                        </div>

                                        <div className="modal--field modal--field_special_legend">
                                            <KeyboardDatePicker
                                                disableToolbar
                                                variant="inline"
                                                format="DD/MM/YYYY"
                                                margin="normal"
                                                id="date-picker-initial"
                                                label="Data:"
                                                value={ this.state.modalDateValue }
                                                autoOk = { true }
                                                onChange={ this.changeDate }
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </div>

                                        <div className="modal--field modal--field_special_legend">
                                            <InputLabel htmlFor="checkbox--transaction-category">Categoria:</InputLabel>

                                            <Autocomplete
                                                multiple
                                                freeSolo
                                                limitTags = {2}
                                                defaultValue = {this.state.modalCategoriesSelected}
                                                //options={this.state.modalCategoriesSuggest}
                                                options={this.state.modalCategoriesSuggest.map((option) => option)}
                                                onChange = { (event, value) => this.changeCurrentModalCategories(value) }
                                                renderInput={params => (                                          
                                                    <TextField
                                                        {...params}
                                                        variant="standard"
                                                        margin="normal"
                                                        fullWidth
                                                    />
                                                )}              
                                            />
                                        </div>

                                        <div className="modal--field modal--field_special_legend">
                                            <InputLabel htmlFor="textarea-observation">Observações:</InputLabel>
                                            <TextareaAutosize 
                                                id="textarea-observation" 
                                                value = { this.state.modalObservationValue } 
                                                name = "modalObservationValue"
                                                onChange={ this.changeModalSimpleValue }
                                                aria-label="minimum height" 
                                                rowsMin={3} 
                                                placeholder="Escreva detalhes do seu evento ou compromisso"
                                            />
                                        </div>
                                    </div>
                                </MuiPickersUtilsProvider>
                            </form>
                        </div>
                    </div>

                    {/* Bottom ToolBar */}
                    <div className="modal--footer">
                        {this.state.modalMode === "edit" ?
                            <Button
                                className="modal--footer-btn_red"
                                onClick = {() => this.deleteModalItem()}
                            >
                                Excluir
                            </Button>
                        : null }                         

                        <Button className="modal--footer-btn_white" onClick={ this.closeModal }>
                            Fechar
                        </Button>  

                        <Button className="modal--footer-btn_white btn--finances-attach-file" onClick={ this.attachFile }>
                            Anexar arquivo
                        </Button>                                
                        
                        <Button className="modal--footer-btn_blue" onClick = { this.saveModalItem }>
                            Salvar
                        </Button>
                    </div>                
                </Modal>   
            
            
            
            </div>
        );
    }
}

export default withStyles(useStyles)(Finances);
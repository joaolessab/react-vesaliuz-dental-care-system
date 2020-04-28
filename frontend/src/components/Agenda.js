import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  AllDayPanel,
  Scheduler,
  Resources,
  MonthView,
  DayView,
  WeekView,
  DragDropProvider,
  DateNavigator,
  Toolbar,
  TodayButton,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  ViewSwitcher
} from '@devexpress/dx-react-scheduler-material-ui';
import { owners } from "../mock--API/agenda/tasks";
import { appointments, resourcesData } from "../mock--API/agenda/resources";
/*import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';*/

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/Agenda.css';

const allLocalizationMessages = {
    'fr-FR': {
      allDay: 'Temps plein',
    },
    'de-GR': {
      allDay: 'Ganztägig',
    },
    'en-US': {
      allDay: 'All Day',
      today: 'Today'
    },
    'pt-BR': {
        allDay: 'Dia todo',
        today: 'Hoje',

        /*AppointmentForm*/
        detailsLabel : 'Detalhes',
        allDayLabel : 'O dia todo',
        titleLabel : 'Título',
        commitCommand : 'Salvar',
        moreInformationLabel : 'Mais informações',
        repeatLabel : 'Repetir',
        notesLabel : 'Escreva aqui mais detalhes',
        never : 'Nunca',
        daily : 'Diariamente',
        weekly : 'Semanalmente',
        monthly : 'Mensalmente',
        yearly : 'Anualmente',
        repeatEveryLabel : 'Repetir a cada',
        daysLabel : 'dia(s)',
        endRepeatLabel : 'Parar repetição',
        onLabel : 'Em',
        afterLabel : 'Depois de',
        occurrencesLabel : 'ocorrência(s)',
        weeksOnLabel : 'semana(s)',
        monthsLabel : 'mês(es)',
        ofEveryMonthLabel : 'de todos mês',
        theLabel : 'O',
        firstLabel : 'Primeiro',
        secondLabel : 'Segundo',
        thirdLabel : 'Terceiro',
        fourthLabel : 'Quarto',
        lastLabel : 'Quinto',
        yearsLabel : 'ano(s)',
        ofLabel : '',
        everyLabel : 'Em'
    }
};

const getLocalizationMessages = locale => allLocalizationMessages[locale];

/*const styles = theme => ({
    container: {
        display: 'flex',
        marginBottom: theme.spacing(2),
        justifyContent: 'flex-end',
    },
    text: {
        ...theme.typography.h6,
        marginRight: theme.spacing(2),
    },
});*/

/*const LocaleSwitcher = withStyles(styles, { name: 'LocaleSwitcher' })(
    ({ onLocaleChange, currentLocale, classes }) => (
        <div className={classes.container}>
            <div className={classes.text}>
                Locale:
            </div>
            <TextField
                select
                value={currentLocale}
                onChange={onLocaleChange}
            >
                <MenuItem value="fr-FR">Le français (French)</MenuItem>
                <MenuItem value="de-GR">Deutsch (German)</MenuItem>
                <MenuItem value="en-US">English (United States)</MenuItem>
                <MenuItem value="pt-BR">Portuguese (Brazil)</MenuItem>
            </TextField>
        </div>
    ),
);*/

class Agenda extends React.Component{

    constructor(props){
        super(props);

        /* VARIABLES */
        this.state = {
            data: appointments,
            resources: [
                {
                    fieldName: 'roomId',
                    title: 'Sala',
                    instances: resourcesData,
                },
                {
                    fieldName: 'members',
                    title: 'Membros',
                    instances: owners,
                    allowMultiple: true,
                },
            ],
            locale: 'pt-BR'
        };
        
        this.modalTitle = "";
        this.modalBody = "";
        this.modalPicture = "";
        
        this.openEdit = true;
        this.commitChanges = this.commitChanges.bind(this);
    }

    teste = (event) => {
        debugger
    };

    commitChanges = ({ added, changed, deleted }) => {
        debugger
        this.setState((state) => {
          let { data } = state;
          if (added) {
            const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
            data = [...data, { id: startingAddedId, ...added }];
          }
          if (changed) {
            data = data.map(appointment => (
              changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
          }
          if (deleted !== undefined) {
            data = data.filter(appointment => appointment.id !== deleted);
          }
          return { data };
        });
    };

    changeLocale = event => this.setState({ locale: event.target.value });

    // Visualização de Todo o conteúdo do HTML
    render(){
        const { data, resources, locale, currentDate } = this.state;

        // RETORNO BÁSICO DO HTML
        return (
            <div className="container--miolo-main">
                <div className="container--content-agenda">                    
                    <div className="div--content-title">
                        <h1>Agenda</h1>
                    </div>

                    <div className="div--content-agenda">
                        {/* 
                        <LocaleSwitcher
                            currentLocale={ locale }
                            onLocaleChange={ this.changeLocale }
                        />
                        */}
                        <Paper>
                            <Scheduler
                                data={ data }
                                locale={ locale }
                            >
                            <ViewState
                                defaultCurrentDate="2017-05-25"
                            />
                            {/* 
                            <ViewState
                                defaultCurrentDate={currentDate}
                            />
                            */}
                            <EditingState
                                onCommitChanges={ this.commitChanges }
                            />
                            <EditRecurrenceMenu />

                            <WeekView
                                startDayHour={8}
                                endDayHour={20}
                                displayName="Semana"
                            />
                            <WeekView
                                name="work-week"
                                displayName="Semana (Dias Úteis)"
                                excludedDays={[0, 6]}
                                startDayHour={8}
                                endDayHour={20}
                            />
                            <MonthView
                                displayName="Mês"
                            />
                            <DayView
                                displayName="Dia"
                                startDayHour={8}
                                endDayHour={20}
                            />

                            <Appointments />
                            <AppointmentTooltip
                                showOpenButton                                
                                showDeleteButton
                            />

                            <AppointmentForm
                                messages={ getLocalizationMessages(locale) }
                            />

                            <Resources
                                data={ resources }
                                mainResourceName="roomId"
                            />
                            <Toolbar />
                            <ViewSwitcher />
                            <DateNavigator />
                            <AllDayPanel
                                messages={ getLocalizationMessages(locale) }
                            />                            
                            <DragDropProvider />
                            <TodayButton
                                messages={ getLocalizationMessages(locale) }
                            />
                            </Scheduler>
                        </Paper>
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
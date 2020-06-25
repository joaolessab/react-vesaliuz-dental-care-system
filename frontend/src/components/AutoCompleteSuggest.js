import React from 'react';
import Autosuggest from 'react-autosuggest';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/AutoCompleteSuggest.css';

const itemsSuggest = [
    {
        title: 'Clientes',
        itemsSuggest: [
            {
              name: 'Clark Cold',
              year: 1972
            },
            {
              name: 'Diana Mendes',
              year: 1972
            },
            {
              name: 'Oliver Queen',
              year: 1972
            },
            {
              name: 'Bruce Wayne da Silva',
              year: 1972
            }
        ]
    },
    {
      title: 'Exames',
      itemsSuggest: [
        {
          name: 'Raio-X',
          year: 1983
        },
        {
          name: 'Intra',
          year: 1987
        }
      ]
    },
    {
      title: 'Tratamentos',
      itemsSuggest: [
        {
          name: 'Limpeza',
          year: 2000
        },
        {
          name: 'Implantação de porcelana',
          year: 2003
        },
        {
          name: 'Clareamento',
          year: 2007
        }
      ]
    },
    {
      title: 'Laboratório',
      itemsSuggest: [
        {
          name: 'Cento e Vinte - Dentes',
          year: 2012
        },
        {
          name: 'Consultório da Avenida',
          year: 2012
        },
        {
          name: 'Consultório da Praça',
          year: 2012
        },
        {
          name: 'Consultório da Esquina',
          year: 2012
        }
      ]
    }
];
  
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
  
function getSuggestions(value, source) {
  const escapedValue = escapeRegexCharacters(value.trim());
    
  if (escapedValue === '') {
    return [];
  }
  
  const regex = new RegExp('^' + escapedValue, 'i');

  /* Selecionando Source */
  var chosenSuggest = [];
  if (source === "all")
    chosenSuggest = itemsSuggest;
  else if(source === "clients")
    chosenSuggest = [itemsSuggest[0]];

  return chosenSuggest
    .map(section => {
      return {
        title: section.title,
        itemsSuggest: section.itemsSuggest.filter(language => regex.test(language.name))
      };
    })
    .filter(section => section.itemsSuggest.length > 0);
}
  
function getSuggestionValue(suggestion) {
  return suggestion.name;
}
  
function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}
  
function renderSectionTitle(section) {
  return (
    <strong>{section.title}</strong>
  );
}
  
function getSectionSuggestions(section) {
  return section.itemsSuggest;
}

class AutoCompleteSuggest extends React.Component{
    // Substituindo o construtor do componente (são inputs do componente)
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            suggestions: [],
            source: props.source
        };    
    }
    
    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });
    };
      
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value, this.state.source)
        });
    };
    
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    clearSuggest = () =>{
      this.setState({
        value: ''
      });
    };

    // Visualização de Todo o conteúdo do HTML
    render(){
        const { value, suggestions } = this.state;

        const inputProps = {
            placeholder: "Quer encontrar alguma coisa? Digite aqui...",
            value,
            onChange: this.onChange
        };

        return (
          <div className="div--search">
            <Autosuggest 
                multiSection = {true}
                suggestions = {suggestions}
                onSuggestionsFetchRequested = {this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested = {this.onSuggestionsClearRequested}
                getSuggestionValue = {getSuggestionValue}
                renderSuggestion = {renderSuggestion}
                renderSectionTitle = {renderSectionTitle}
                getSectionSuggestions = {getSectionSuggestions}
                inputProps = {inputProps} 
            />

            <Tooltip TransitionComponent={Zoom} placement="top" title="Limpar pesquisa">
              <button 
                id="limpa" 
                onClick={() => this.clearSuggest()}
              >
              </button>
            </Tooltip>
            
            <Tooltip TransitionComponent={Zoom} placement="top" title="Pesquisar">
              <button id="lupa"></button>
            </Tooltip>
          </div>
        );
    }
}

export default AutoCompleteSuggest;
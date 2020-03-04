import React from 'react';

//Arquivos CSS e Imagens devem ser importados aqui
import './Main.css';
import './MainAnimations.css';
import './AutoSuggest.css';

import Resume from '../components/Resume';
import Autosuggest from 'react-autosuggest';

const languages = [
    {
        title: '1970s',
        languages: [
            {
                name: 'C',
                year: 1972
            }
        ]
    },
    {
        title: '1980s',
        languages: [
            {
                name: 'C++',
                year: 1983
            },
            {
                name: 'Perl',
                year: 1987
            }
        ]
    },
    {
      title: '1990s',
      languages: [
        {
          name: 'Haskell',
          year: 1990
        },
        {
          name: 'Python',
          year: 1991
        },
        {
          name: 'Java',
          year: 1995
        },
        {
          name: 'Javascript',
          year: 1995
        },
        {
          name: 'PHP',
          year: 1995
        },
        {
          name: 'Ruby',
          year: 1995
        }
      ]
    },
    {
      title: '2000s',
      languages: [
        {
          name: 'C#',
          year: 2000
        },
        {
          name: 'Ccala',
          year: 2003
        },
        {
          name: 'Clojure',
          year: 2007
        },
        {
          name: 'Co',
          year: 2009
        }
      ]
    },
    {
      title: '2010s',
      languages: [
        {
          name: 'Elm',
          year: 2012
        }
      ]
    }
];
  
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    
    if (escapedValue === '') {
      return [];
    }
  
    const regex = new RegExp('^' + escapedValue, 'i');
  
    return languages
      .map(section => {
        return {
          title: section.title,
          languages: section.languages.filter(language => regex.test(language.name))
        };
      })
      .filter(section => section.languages.length > 0);
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
    return section.languages;
  }

class Main extends React.Component{
    // Substituindo o construtor do componente (são inputs do componente)
    constructor() {
        super();
    
        this.state = {
            value: '',
            suggestions: []
        };    
    }
    
    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });
    };
      
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };
    
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    // Visualização de Todo o conteúdo do HTML
    render(){
        const { value, suggestions } = this.state;

        const inputProps = {
            placeholder: "Type 'c'",
            value,
            onChange: this.onChange
        };

        return (
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
        );
    }
}

export default Main;
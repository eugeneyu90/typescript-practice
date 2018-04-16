import * as React from 'react';
import './App.css';
import * as Autosuggest from 'react-autosuggest';
import axios from 'axios';

// TODO Features
// 1. Auto focus on input box
// 2. Email Domain Suggestions
// 3. Error Handling

// Imagine you have a list of domains that you'd like to autosuggest.
// https://email-verify.my-addr.com/list-of-most-popular-email-domains.php
interface Domain {
  domain: string;
}

function escapeRegexCharacters(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const logo = require('./logo.svg');
const styles = {
  brandBackgroundColor: {
    backgroundColor: '#555'
  },
  errorMessage: {
    position: 'absolute',
    top: '10px'
  }
};

interface Props {
  name: string;
}

class App extends React.Component<Props, any> {
  static domains: Domain[] = [
    { domain: 'example.com'}, // Kickbox API Sandbox Tests
    { domain: 'gmail.com' },
    { domain: 'yahoo.com' },
    { domain: 'hotmail.com' },
    { domain: 'aol.com' },
    { domain: 'hotmail.co.uk' },
    { domain: 'hotmail.fr' },
    { domain: 'msn.com' },
    { domain: 'yahoo.fr' },
    { domain: 'wanadoo.fr' },
    { domain: 'orange.fr' },
    { domain: 'comcast.net' },
    { domain: 'yahoo.co.uk' },
    { domain: 'yahoo.com.br' },
    { domain: 'yahoo.co.in' },
    { domain: 'live.com' },
    { domain: 'rediffmail.com' },
    { domain: 'free.fr' },
    { domain: 'gmx.de' },
    { domain: 'web.de' },
    { domain: 'yandex.ru' },
    { domain: 'ymail.com' },
    { domain: 'libero.it' },
    { domain: 'outlook.com' },
    { domain: 'uol.com.br' },
    { domain: 'bol.com.br' },
    { domain: 'mail.ru' },
    { domain: 'cox.net' },
    { domain: 'hotmail.it' },
    { domain: 'sbcglobal.net' },
    { domain: 'sfr.fr' },
    { domain: 'live.fr' },
    { domain: 'verizon.net' },
    { domain: 'live.co.uk' },
    { domain: 'googlemail.com' },
    { domain: 'yahoo.es' },
    { domain: 'ig.com.br' },
    { domain: 'live.nl' },
    { domain: 'bigpond.com' },
    { domain: 'terra.com.br' },
    { domain: 'yahoo.it' },
    { domain: 'neuf.fr' },
    { domain: 'yahoo.de' },
    { domain: 'alice.it' },
    { domain: 'rocketmail.com' },
    { domain: 'att.net' },
    { domain: 'laposte.net' },
    { domain: 'facebook.com' },
    { domain: 'bellsouth.net' },
    { domain: 'yahoo.in' },
    { domain: 'hotmail.es' },
    { domain: 'charter.net' },
    { domain: 'yahoo.ca' },
    { domain: 'yahoo.com.au' },
    { domain: 'rambler.ru' },
    { domain: 'hotmail.de' },
    { domain: 'tiscali.it' },
    { domain: 'shaw.ca' },
    { domain: 'yahoo.co.jp' },
    { domain: 'sky.com' },
    { domain: 'earthlink.net' },
    { domain: 'optonline.net' },
    { domain: 'freenet.de' },
    { domain: 't-online.de' },
    { domain: 'aliceadsl.fr' },
    { domain: 'virgilio.it' },
    { domain: 'home.nl' },
    { domain: 'qq.com' },
    { domain: 'telenet.be' },
    { domain: 'me.com' },
    { domain: 'yahoo.com.ar' },
    { domain: 'tiscali.co.uk' },
    { domain: 'yahoo.com.mx' },
    { domain: 'voila.fr' },
    { domain: 'gmx.net' },
    { domain: 'mail.com' },
    { domain: 'planet.nl' },
    { domain: 'tin.it' },
    { domain: 'live.it' },
    { domain: 'ntlworld.com' },
    { domain: 'arcor.de' },
    { domain: 'yahoo.co.id' },
    { domain: 'frontiernet.net' },
    { domain: 'hetnet.nl' },
    { domain: 'live.com.au' },
    { domain: 'yahoo.com.sg' },
    { domain: 'zonnet.nl' },
    { domain: 'club-internet.fr' },
    { domain: 'juno.com' },
    { domain: 'optusnet.com.au' },
    { domain: 'blueyonder.co.uk' },
    { domain: 'bluewin.ch' },
    { domain: 'skynet.be' },
    { domain: 'sympatico.ca' },
    { domain: 'windstream.net' },
    { domain: 'mac.com' },
    { domain: 'centurytel.net' },
    { domain: 'chello.nl' },
    { domain: 'live.ca' },
    { domain: 'aim.com' },
    { domain: 'bigpond.net.au' }
  ];
  constructor(props: Props) {
    super(props);
    this.state = {
      emailSections: null,
      value: '',
      suggestions: [],
      highlighted: '',
      hasError: false,
      errorMessage: '',
      isCorrect: false,
      verified: {}
    };
  }

  protected onSuggestionsSelected = (
    event: React.FormEvent<any>,
    data: Autosuggest.SuggestionSelectedEventData<Domain>
  ): void => {
    const emailPrefix = this.state.value.split('@')[0];
    this.setState({
      value: `${emailPrefix}@${data.suggestion.domain}`
    });
    this.onSuggestionsClearRequested();
  }

  protected renderSuggestion(suggestion: Domain, params: Autosuggest.RenderSuggestionParams): JSX.Element {
    const className = params.isHighlighted ? 'highlighted' : undefined;
    return <span className={className}>{suggestion.domain}</span>;
  }
  // endregion region Event handlers
  protected renderInputComponent(inputProps: Autosuggest.InputProps<Domain>): JSX.Element {
    return (
      <div>
        <input {...inputProps} />
      </div>
    );
  }

  protected renderSuggestionsContainer({containerProps, children, query}: Autosuggest.RenderSuggestionsContainerParams): JSX.Element {
    return (
      <div {...containerProps}>
        <div>{children}</div>
      </div>
    );
  }

  protected onChange(
    event: React.FormEvent<any>,
    { newValue, method }: any
  ): void {
    console.log('newValue', newValue);
    // const hasError = !newValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/) && newValue !== '';
    this.setState({ 
      value: newValue,
      // hasError: hasError,
      // errorMessage: 'Please enter an email address!'
    });
  }

  protected onFocus = (
    event: React.FormEvent<any>
  ): void => {
    this.setState({
      isFocused: true
    });
  } 

  protected onBlur = (
    event: React.FormEvent<any>
  ): void => {
    this.setState({
      isFocused: false
    });
  } 

  protected onSuggestionsFetchRequested = ({ value }: any): void => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  protected onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  }
  
  // endregion region Helper methods
  protected getSuggestions(value: string): Domain[] {
    let escapedValue = escapeRegexCharacters(value.trim());
    const email = escapedValue.replace('\\', '');
    // console.log('escaped', escapedValue);
    const userEmail = escapedValue.split('@');
    const userDomain = userEmail[1];
    // console.log('userDomain', userDomain);
    
    if (userDomain === '' || userDomain === undefined) {
      this.setState({
        hasError: false,
        errorMessage: ``,
        isCorrect: false
      });
      return [];
    }
    // partial match & full match regex
    const regex = new RegExp('^' + userDomain, 'i');
    const regexFullMatch = new RegExp('^' + userDomain + '$', 'i');
    this.setState({
      hasError: true,
      errorMessage: `The domain name "${userDomain.replace('\\', '')}" looks incorrect.`,
      isCorrect: false
    });
    return App.domains.filter(domain => {
      if (regexFullMatch.test(domain.domain)) {
        console.log('Got a match!');
        console.log(this.state.isFocused);
        if (this.state.isFocused === false) {
          // Using Proxy instead of creating an endpoint in a backend Node/Express server
          const proxyUrl = 'https://no-cors-proxy.herokuapp.com/';
          const targetUrl = 'https://api.kickbox.com/v2/verify';
          axios({
            url: proxyUrl + targetUrl,
            method: 'GET',
            params: {
              email: email,
              apikey: 'test_cb097c5ad7caf02f222021cb20d3b14895ec09ea5b2f24e4539b8e15bc9a0bec',
            }
          }).then(success => { 
            console.log(success.data);
            let newVerifiedList = this.state.verified;
            newVerifiedList[email] = { 
              result: success.data.result,
              reason: success.data.reason
            };
            if (success.data.result !== 'deliverable') {
              this.setState({
                verified: newVerifiedList,
                hasError: true,
                errorMessage: 'This email is not deliverable. Please check!',
              });
            } else {
              this.setState({
                verified: newVerifiedList,
                hasError: false,
                errorMessage: '',
                isCorrect: true
              });
            }
          }).catch(error => { 
            console.log(error); 
          });
        }
        this.setState({
          hasError: false,
          errorMessage: '',
          isCorrect: true
        });
      }
      return (regex.test(domain.domain) && !regexFullMatch.test(domain.domain));
    });
  }

  protected getSuggestionValue = (suggestion: Domain): string => {
    const userEmail = this.state.value.split('@');
    const prefex = userEmail[0];
    return `${prefex}@${suggestion.domain}`;
  }

  protected onSuggestionHighlighted = (params: Autosuggest.SuggestionHighlightedParams): void => {
    console.log(params);
    this.setState({
        highlighted: params.suggestion
    });
  }
  // endregion

  render(): JSX.Element {
    const { value, suggestions, hasError, errorMessage } = this.state;
    const inputProps = {
      placeholder: `john.doe@example.com`,
      value,
      onChange: this.onChange.bind(this),
      onFocus: this.onFocus,
      onBlur: this.onBlur
    };

    const theme = {
      container:                'react-autosuggest__container',
      containerOpen:            'react-autosuggest__container--open',
      input:                    this.state.hasError ?
                                  'react-autosuggest__input--error' : 
                                  this.state.isCorrect ?
                                    'react-autosuggest__input--correct' : 
                                    'react-autosuggest__input',
      inputOpen:                'react-autosuggest__input--open',
      inputFocused:             'react-autosuggest__input--focused',
      suggestionsContainer:     'react-autosuggest__suggestions-container',
      suggestionsContainerOpen: 'react-autosuggest__suggestions-container--open',
      suggestionsList:          'react-autosuggest__suggestions-list',
      suggestion:               'react-autosuggest__suggestion',
      suggestionFirst:          'react-autosuggest__suggestion--first',
      suggestionHighlighted:    'react-autosuggest__suggestion--highlighted',
      sectionContainer:         'react-autosuggest__section-container',
      sectionContainerFirst:    'react-autosuggest__section-container--first',
      sectionTitle:             'react-autosuggest__section-title'
    };

    return (
      <div className="App">
        <header className="App-header" style={styles.brandBackgroundColor}>
          <img className="App-logo" src={logo} alt="logo" />
        </header>
        <div className="react-autosuggest__container">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            onSuggestionSelected={this.onSuggestionsSelected}
            focusInputOnSuggestionClick={true}
            alwaysRenderSuggestions={true}
            inputProps={inputProps}
            theme={theme}
            onSuggestionHighlighted={this.onSuggestionHighlighted}
            // highlightFirstSuggestion={true}
            renderInputComponent={this.renderInputComponent}
            renderSuggestionsContainer={this.renderSuggestionsContainer}
          />
        </div>
        <span className="error-container">
          {hasError ? errorMessage : null}
        </span>
      </div>
    );
  }
}

export default App;

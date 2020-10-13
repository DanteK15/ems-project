import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import SettingsContext from './SettingsContext'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

//This is the format for creating the context for the
//settings portion of the JS code, this code will
//be placed where the settings and input code is
//to create a context object that will make
//those values global
/*
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      locale: 'en'
    }
  }
  render() {
    return (
      <SettingsContext.Provider value = {this.state.locale}>
        <Home />
      </SettingsContext.Provider>
    )
    }
  }
}
*/

//This is example code for accessing the settings data
//via the context API
//<SettingsConext.Consumer>
//  {(locale) => <Posts locale={locale} />}
//</SettingsConext.Consumer>

//
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

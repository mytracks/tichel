import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import MomentUtils from '@date-io/moment'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import 'moment/locale/de'
import React from 'react'
import ReactDOM from 'react-dom'
import { I18nextProvider } from 'react-i18next'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Licenses from './components/Licenses/Licenses'
import Tichels from './components/Tichels/Tichels'
import i18n from './i18n'
import './index.css'
import NewTichel from './NewTichel'
import * as serviceWorker from './serviceWorker'
import TichelPage from './TichelPage'

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: 'https://api.tichel.de/v1/graphql',
  cache: cache,
  headers: {
    // authorization: `Bearer our-bearer-token`
  },
})

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0f4a7b',
    },
    secondary: {
      main: '#7faaeb',
    },
  },
})

const element = (
  <ApolloProvider client={client}>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Router>
            <Switch>
              <Redirect exact={true} from="/" to="/new/" />
              <Route exact={true} path="/new" component={NewTichel} />
              <Route exact={true} path="/licenses" component={Licenses} />
              <Route exact={true} path="/contact" component={Contact} />
              <Route exact={true} path="/tichels" component={Tichels} />
              <Route path="/tichel/:id" component={TichelPage} />
            </Switch>
          </Router>
          <Footer />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </I18nextProvider>
  </ApolloProvider>
)

ReactDOM.render(element, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

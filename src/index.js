import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import MomentUtils from '@date-io/moment'
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
import Footer from './components/Footer/Footer'
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

const element = (
  <ApolloProvider client={client}>
    <I18nextProvider i18n={i18n}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Router>
          <Switch>
            <Redirect exact={true} from="/" to="/new/" />
            <Route exact={true} path="/new" component={NewTichel} />
            <Route path="/tichel/:id" component={TichelPage} />
          </Switch>
        </Router>
        <Footer />
      </MuiPickersUtilsProvider>
    </I18nextProvider>
  </ApolloProvider>
)

ReactDOM.render(element, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

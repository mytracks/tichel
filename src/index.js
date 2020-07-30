import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Main';
import NewTichel from './NewTichel';
import Tichel from './Tichel';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
// import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "https://api.tichel.de/v1/graphql",
  cache: cache,
  headers: {
    // authorization: `Bearer our-bearer-token`
  }
});

const element = 
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Switch>
          <Redirect exact={true} from="/" to="/main" />
          <Route exact={true} path="/new" component={NewTichel} />
          <Route exact={true} path="/main" component={Main} />
          <Route path="/tichel/:id" component={Tichel} />
        </Switch>
      </div>
    </Router>
  </ApolloProvider>

ReactDOM.render(
  element,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import { Router,Route,Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import CreateDipensePage from '../components/expenses/create_dipense'
import CreateCommandePage from '../components/commandes/create_commande'
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import EditDipensePage from '../components/expenses/EditDipensePage'

export const history = createHistory();

const AppRouter = () =>{

  return(
    <Router history={history}>
      <div>
        <Switch>
          <PublicRoute path="/login" component={LoginPage} exact={true} />
          <PrivateRoute path="/dashboard" component={DashboardPage} />
          <PrivateRoute path="/create_dipense" component={CreateDipensePage} />
          <PrivateRoute path="/create_commande" component={CreateCommandePage} />
          <PrivateRoute path="/edit/:id" component={EditDipensePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default AppRouter;

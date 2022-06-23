import { Route, BrowserRouter, Switch, Router } from "react-router-dom";
import { RegisterProfessorData } from '../containers/RegisterProfessorData';
import  Home  from '../containers/Home';
import { SearchForClasses } from "../containers/SearchForClasses";
import { Login } from '../containers/Login';
import { ApproveDisapprove } from "../containers/ApproveDisapprove";
import { axiosInterceptor } from "../api";
import { useStoreActions } from "../store";
import history from "../common/utils/router";


export const Routes = () => {
  const state = useStoreActions((state) => state);

  axiosInterceptor(state, () => history.push("/login"));

   return (
    <BrowserRouter>
      <Router history={history}>
        <Switch>
          <Route component={ RegisterProfessorData } path="/cadastrar-aulas" exact />
        </Switch>
        <Switch>
          <Route component={ SearchForClasses } path="/procurar-aulas" exact />
        </Switch>
        <Switch>
          <Route component={ Home } path="/" exact />
        </Switch>
        <Switch>
          <Route component={ Login } path="/login" exact />
        </Switch>
        <Switch>
            <Route component={ ApproveDisapprove } path="/aprovar-reprovar" exact />
        </Switch>
      </Router>
    </BrowserRouter>

    
   )
}

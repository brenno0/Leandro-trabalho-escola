import { Route, BrowserRouter, Switch, useHistory } from "react-router-dom";
import { RegisterProfessorData } from '../containers/RegisterProfessorData';
import  Home  from '../containers/Home';
import { SearchForClasses } from "../containers/SearchForClasses";
import { Login } from '../containers/Login';
import { ApproveDisapprove } from "../containers/ApproveDisapprove";
import { axiosInterceptor } from "../api";
import { useStoreActions } from "../store";


export const Routes = () => {
  const state = useStoreActions((state) => state);
  const history = useHistory()

  axiosInterceptor(state, () => history.push("/login"));

   return (
    <BrowserRouter>
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
    </BrowserRouter>

    
   )
}

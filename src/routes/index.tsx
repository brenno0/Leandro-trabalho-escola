import { Route, BrowserRouter, Switch } from "react-router-dom";


import { RegisterProfessorData } from '../containers/RegisterProfessorData'
import  Home  from '../containers/Home'

export const Routes = () => {
   return (
    <BrowserRouter>
      <Switch>
        <Route component={ RegisterProfessorData } path="/cadastrar-aulas" exact />
      </Switch>
      <Switch>
        <Route component={ Home } path="/" exact />
      </Switch>
    </BrowserRouter>
   )
}
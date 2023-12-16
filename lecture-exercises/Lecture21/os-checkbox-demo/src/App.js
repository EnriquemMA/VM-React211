// comment
import './App.css';
import DisplayOS from './DisplayOS.js';
import CheckboxForm from './CheckboxForm';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

const OSCheckboxDemo = () => {
  
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/results"
          render={routeProps => (
            <DisplayOS {...routeProps} />
          )}>
        </Route >
        <Route path="/">
          <CheckboxForm />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default OSCheckboxDemo;

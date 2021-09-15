import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import './Css/App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import RegisterComponent from './Components/RegisterComponent';
import LoginComponent from './Components/LoginComponent';
import HomePage from './Components/homePage';

function App() {
  return (
    <div className="main-container container-fluid">
      <BrowserRouter>
      <Route path="/" component={HomePage} exact></Route>
      <Route path="/register" component={RegisterComponent} exact></Route>
      <Route path="/login" component={LoginComponent} exact></Route>
    </BrowserRouter>
    </div>
  );
}
 
export default App;

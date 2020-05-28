import React from 'react';
import './App.css';
import Menu from './components/MenuComponent';
import { DISHES } from './shared/dishes';
import { Navbar, NavbarBrand } from 'reactstrap';
import Main from './components/MainComponent';

class App extends Component {
    constructor(props) {
        super(props);
    }
  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }

export default App;

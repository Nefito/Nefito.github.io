import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';

class Main extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
          <Navbar dark color="primary">
              <div className="container">
                  <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
              </div>
          </Navbar>
          <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
          <Card key={dish.id} onClick={() => this.props.onClick(dish.id)}>
      </div>
    );
  }
}

export default Main;

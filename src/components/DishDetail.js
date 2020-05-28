import React, { Component } from "react";

import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDish: null,
    };
    console.log(this.props.selectedDish);
  }
  renderComments(dish) {
    if (dish != null) {
      const formattedComments = dish.comments.map((comment) => (
        <li key={comment.id}>
          <p>{comment.comment}</p>
          <p>
            -- {comment.author},{comment.date}
          </p>
        </li>
      ));
      return (
        <ul className="list-unstyled">
          <h4>Comments</h4>
          {formattedComments}
        </ul>
      );
    } else return <div></div>;
  }
  renderDish(dish) {
    if (dish != null) {
      //console.log(this.props.selectedDish);
      return (
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    } else return <div></div>;
  }
  render() {
    return (
        <div className="container">
          <div className="row">
            {this.renderDish(this.props.selectedDish)}
            <div className="col-12 col-md-5 m-1">
              {this.renderComments(this.props.selectedDish)}
            </div>
          </div>
        </div>
    );
  }
}

export default DishDetail;

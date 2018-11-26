import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from 'next/router';
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION (
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem (
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
  ){
    id
  }
}
`;

class CreateItem extends Component {
  state = {
    title: "Waffle Card",
    description: "iHop $30 card",
    price: 30,
    image: "card.jpg",
    largeImage: "card-large.jpg"
  };

  handleChange = e => {
    const {name, type, value} = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name] : val});
  }

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, {loading, error}) => (
          <Form onSubmit={async (e) => {
            //prevent default form submission event
            e.preventDefault();
            //call mutation
            const res = await createItem();
            //route user to item page
            Router.push({
              pathname: '/item',
              query: {id: res.data.createItem.id}
            })
            console.log(res);
          }}>
            <h2>Sell an Item</h2>
            <Error error={error}/>
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title"
                  required
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="price">
                Price
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Price"
                  required
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="description">
                Description
                <textarea
                  name="description"
                  id="description"
                  placeholder="Description"
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
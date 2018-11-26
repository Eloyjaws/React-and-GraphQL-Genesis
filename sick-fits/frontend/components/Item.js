import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from 'next/link';
import Title from "./styles/Title";
import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";
import formatMoney from '../lib/formatMoney';

export default class Item extends Component {
  static propTypes = {
    item: PropTypes.shape({
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired
    })
  };

  render() {
    const { item } = this.props;
    return (
      <ItemStyles>
          {item.image && <img src={item.image} alt={item.title} />}
        <Title>
          <Link href={{
              path: '/item',
              query: {id: item.id}
          }}>
            <a>{item.title}</a>
          </Link>
        </Title>
        <PriceTag>
            {formatMoney(item.price)}
        </PriceTag>
        <p>{item.description}</p>
        <div className="buttonList">
          <Link href={{
              path: '/edit',
              query: {id: item.id}
          }}>
            <a>Edit✏</a>
          </Link>
          <button>Add To Cart</button>
          <button>Delete</button>
        </div>
      </ItemStyles>
    );
  }
}

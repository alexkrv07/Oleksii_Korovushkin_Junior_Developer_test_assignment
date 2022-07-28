import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import ProductList from '../common/ProductList/ProductList';
import { GET_PRODUCTS_BY_CATEGORY } from '../../constants/query/getProductsByCategory';
import styles from './styles.module.css';
import ImageSlider from '../common/ImageSlider/ImageSlider';

class ProductListPage extends Component {

  getProducts = (data) => {
    return data.category.products;
  };

  render() {
    if (!this.props.activeCurrency) {
      return
    }
    const input = {
      title: this.props.category,
    }
    return (
      <div
        className={`${styles.productPage} ${this.props.className ? this.props.className : ''}`}
      >
        <h2 className={styles.title}>{this.props.category}</h2>
        <Query
          query={GET_PRODUCTS_BY_CATEGORY}
          variables={ {input} }
        >
          {({ loading, error, data }) => {
            if (loading) {
              return null;
            }

            if (error) {
              return `Error! ${error}`;
            }

            const products = this.getProducts(data);

            return (
              <>
                <ProductList
                  products={products}
                  activeCurrency={this.props.activeCurrency}
                  setProductId={this.props.setProductId}
                  addProductToCart={this.props.addProductToCart}
                />
                <ImageSlider
                  gallery={products[0].gallery}
                  alt={products[0].name}
                />
              </>


            );
          }}
        </Query>
      </div>
    );
  }
}

export default ProductListPage;

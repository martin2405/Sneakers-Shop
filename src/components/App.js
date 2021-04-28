import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import '../styles/style.css';
import MainWeb from '../web/MainWeb';
import TopBar from './TopBar';
import ProductPage from '../web/ProductPage';
import Cart from '../web/Cart';
import Collections from '../web/Collections';
import Error from "../web/Error";


class App extends Component {

  state = {
    products: [],
    productsInCart: [],
    actualProduct: null,
    selectedAgain: false,
    collectionsInputValue: '',
    classBtnAddToCart: null,
    error: false
  }
  
  componentDidMount() {
    fetch('products.json')
    .then(response => {
        return response.json()
    })
    .then(jsonData => {
      this.setState(() => ({
        products: jsonData.products
      }))
    })
    .catch(() => {
      this.setState(() => ({
        error: true
      }));
    });
  }

  handleShowProductPage = (product) => {
    document.documentElement.scrollTop = 0;
    this.setState(() => ({
      actualProduct: product
    }))
  }

  handleAddToCart = (type, actualProduct) => {
    const productsInCart = this.state.productsInCart;
    const indexInCart = productsInCart.findIndex(product => product.name === actualProduct.name)
    actualProduct.selectedSize = document.querySelector('select').value;
    if (type === 'add') {
      if (indexInCart === -1) { 
        productsInCart.push(actualProduct);
        this.setState(() => ({
          productsInCart,
          classBtnAddToCart: 'animate-add'
        }))
        setTimeout(() => {
          this.setState(() => ({
            classBtnAddToCart: null
          }))
        }, 1000)
      } else {
        this.setState(() => ({
          selectedAgain: true
        }))
      }
    } else if (type === 'yes') {
      productsInCart[indexInCart] = actualProduct
      this.setState(() => ({
        productsInCart,
        selectedAgain: false
      }))
    } else if (type === 'no') {
      this.setState(() => ({
        selectedAgain: false
      }))
    }
  }

  handleRemoveFromCart = (product) => {
    const productsInCart = this.state.productsInCart;
    const index = productsInCart.findIndex(productCart => productCart === product);
    productsInCart.splice(index, 1);
    this.setState(() => ({
      productsInCart
    }))
  }

  handleSearchValue = (e) => {
    this.setState(() => ({
      collectionsInputValue: e.target.value
    }))
  }

  render() {
    const {products, actualProduct, productsInCart, selectedAgain, collectionsInputValue, classBtnAddToCart, error} = this.state

  return ( 
    <Router basename={process.env.PUBLIC_URL}>
      <TopBar productsInCart={productsInCart} selectedAgain={selectedAgain}/>
      <Switch>
        {error && <Error/>}
        
        <Route path='/' exact render={() => <MainWeb products={products} showProductPage={this.handleShowProductPage} handleSearchValue={this.handleSearchValue}/>}/>

        <Route path='/products' exact render={(props) => <Collections products={products} showProductPage={this.handleShowProductPage} inputValue={collectionsInputValue} props={props}/>}/>

        <Route path='/products/:category' render={(props) => <Collections products={products} showProductPage={this.handleShowProductPage} inputValue=''
        props={props}/>}/>

        <Route path='/product/:name' render={(props) => actualProduct ? <ProductPage products={products} showProductPage={this.handleShowProductPage} addToCart={this.handleAddToCart} selectedAgain={selectedAgain} classBtnAddToCart={classBtnAddToCart} props={props}/> : <Redirect to='/'/>}/>
        
        <Route path='/cart' render={() => <Cart productsInCart={productsInCart} removeFromCart={this.handleRemoveFromCart}/>}/>
      </Switch>
      <footer className='footer' style={selectedAgain ? {filter: 'blur(2px)'} : null}><i className="far fa-copyright"></i> All rights reserved</footer>
    </Router>
  );
  }
}

export default App;

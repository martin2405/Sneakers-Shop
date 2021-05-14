import React, { Component } from 'react';
import ProductMiniature from '../components/ProductMiniature';

class Collections extends Component {
  state = {
    filteredProducts: [],
    inputValue: this.props.inputValue,
    typeOfSort: '',
    category: ''
  }

  componentDidMount() {
    let filteredProducts = this.props.products;
    const category = this.props.props.match.params.category;

    if (category) filteredProducts = filteredProducts.filter(product => product.tags.includes(category));

    filteredProducts = filteredProducts.filter(product => product.name.toUpperCase().includes(this.state.inputValue.toUpperCase()));
    this.setState(() => ({
      filteredProducts,
      category
    }))
  }

  componentDidUpdate() {
    const category = this.props.props.match.params.category;
    if (this.state.category !== category && category) {
      const products = this.props.products.filter(product => product.tags.includes(category))
      const filteredProducts = products.filter(product => product.name.toUpperCase().includes(this.state.inputValue.toUpperCase()))
      this.setState(() => ({
        filteredProducts,
        category
      }))
      this.handleSort()
    }
  }


  handleSort = (type, e) => {
    let {filteredProducts} = this.state
    if (type === 'non-function') {
      if (e.target.value === 'a-z') {
        filteredProducts.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0
        })
      } else if (e.target.value === 'z-a') {
        filteredProducts.sort((a, b) => {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0
          })
      } else if (e.target.value === 'low-high') {
        filteredProducts.sort((a, b) => {
          return a.price - b.price
        })
      } else if (e.target.value === 'high-low') {
        filteredProducts.sort((a, b) => {
          return b.price - a.price
        })
      } else if (e.target.value === 'featured') {
        filteredProducts.sort((a, b) => {
          return a.id - b.id
        })
      }
      this.setState(() => ({
        filteredProducts,
        typeOfSort: e.target.value
      }))
    } else {
      this.setState(() => ({
        typeOfSort: 'featured'
      }))
    }
  }

  handleSearch = (e) => {
    let products = this.props.products
    const category = this.props.props.match.params.category

    if (category) products = this.props.products.filter(product => product.tags.includes(category))

    const searchingProducts = products.filter(product => product.name.toUpperCase().includes(e.target.value.toUpperCase()))
    this.setState(() => ({
      inputValue: e.target.value,
      filteredProducts: searchingProducts
    }))

    this.handleSort('function')
  }

  render() {
    const {inputValue, filteredProducts, typeOfSort} = this.state;
    let allProductsList = ''
    if (filteredProducts) {
    allProductsList = filteredProducts.map(
      product => <ProductMiniature key={product.id} img={product.img} name={product.name} price={product.price} product={product} showProductPage={this.props.showProductPage}/>)
    }
  return (
    <>
    <div className='collections-info'>
      <p className='collections-counter'>{filteredProducts.length} products</p>
      <select className='collections-select' value={typeOfSort} onChange={(e) => this.handleSort('non-function', e)}>
        <option value="featured">Featured</option>
        <option value="a-z">Alphabetically, A-Z</option>
        <option value="z-a">Alphabetically, Z-A</option>
        <option value="low-high">Price, low to high</option>
        <option value="high-low">Price, high to low</option>
      </select>
    </div>
    <input className='collections-search' type="text" placeholder='Search...' value={inputValue} onChange={(e) => this.handleSearch(e)}/>
    <div className='all-products-list'>
      {allProductsList}
    </div>
    </>
    );
}
}
 
export default Collections;
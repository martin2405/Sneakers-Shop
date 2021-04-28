import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'

const menuList = [
    {link: 'dunk', name: 'Dunk'},
    {link: 'jordan', name: 'Jordan'},
    {link: 'yeezy', name: 'Yeezy'}
]

class TopBar extends Component {

    state = {
        menuIClass: 'fa-bars',
        barClass: '',
        categories: [],
    }

    componentDidMount() {
        let startScroll = 0;
        window.addEventListener('scroll', () => {
            if (this.state.menuIClass === 'fa-bars') {
                if (startScroll < document.documentElement.scrollTop) {
                    this.setState(() => ({
                        barClass: 'hidden'
                    }))
                } else {
                    this.setState(() => ({
                        barClass: ''
                    }))
            }
        }
            startScroll = document.documentElement.scrollTop
        })
    }

    handleMenu = () => {
        if (this.state.menuIClass === 'fa-bars') {
            this.setState(() => ({
                menuIClass: 'fa-times'
            }))
        } else {
            this.setState(() => ({
                menuIClass: 'fa-bars',
            }))
        }
    }

    render() {
        const {menuIClass, barClass} = this.state;
        const {productsInCart, selectedAgain} = this.props;

        const classActiveNav = menuIClass === 'fa-bars' ? "hidden" : "open";

        const list = menuList.map(
            item => <NavLink key={item.link} to={`/products/${item.link}`} onClick={this.handleMenu}><li className='menu-li'>{item.name} <i className="fas fa-caret-right"></i></li></NavLink>
        )

    return (
        <>
        <div className={`top-bar ${barClass}`} style={selectedAgain ? {filter: 'blur(2px)'} : null}>
            <div className='logo-container'>
                <NavLink to='/' onClick={() => {document.documentElement.scrollTop = 0; document.body.style.overflow = 'auto'}}>HOME</NavLink>
            </div>
            <button className='menu-btn bar-btn' onClick={this.handleMenu}><i className={`fas ${menuIClass}`}></i></button>
            <NavLink to='/cart'>
                <button className='cart-btn bar-btn'>
                    <div className='cart-counter'>{productsInCart.length}</div>
                    <i className="fas fa-shopping-cart"></i>
                </button>
            </NavLink>
        </div>
        <nav className={`menu-nav ${classActiveNav}`} style={selectedAgain ? {filter: 'blur(2px)'} : null}>
            <ul className='menu-ul'>
                {list}
            </ul>
        </nav>
    </>
    );
    }
}
 
export default TopBar;
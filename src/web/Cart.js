import {NavLink} from 'react-router-dom'

const Cart = ({productsInCart, removeFromCart}) => {

    const isEmpty = !productsInCart.length > 0

    const itemList = productsInCart.map(product => (
        <li className='product-cart-li' key={product.id}>
            <div className='product-cart-picture' style={{backgroundImage: `url(${process.env.PUBLIC_URL + product.img})`}}></div>
            <div className='product-cart-info'>
                <h1 className='product-cart-title'>{product.name}</h1>
                <p className='product-cart-size'>Size: {product.selectedSize}</p>
                <p className='product-cart-price'>Price: {product.price} zł</p>
            </div>
            <p className='remove' onClick={() => removeFromCart(product)}>Remove</p>
        </li>
    ))

    return (
        <>
        {!isEmpty && (
        <div className='cart'>
            <h1 className='cart-title'>Your cart</h1>
            <p className='back' onClick={() => window.history.back()}>Continue shopping</p>
            <ul className='cart-contents'>
                {itemList}
            </ul>
            <button className='check-out-btn'>Checkout</button>
        </div>
        )}

        {isEmpty && (
        <div className='cart-empty'>
            <h1 className='empty-h1'>Your cart is empty</h1>
            <button className='empty-button'><NavLink to='/products'>continue shopping <i className="fas fa-long-arrow-alt-right"></i></NavLink></button>
        </div>
        )}
        </>
    );
}
 
export default Cart;
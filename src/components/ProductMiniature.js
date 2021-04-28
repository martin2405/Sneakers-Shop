import {NavLink} from 'react-router-dom'

const ProductMiniature = ({img, name, price, product, showProductPage}) => {
    return (
        <div className='product'>
            <NavLink to={`/product/${name}`} onClick={() => showProductPage(product)}>
            <div className='img-conteiner' style={{backgroundImage: `url(${process.env.PUBLIC_URL + img})`}}></div>
            <p className='title'>{name}</p>
            <p className='price'>{price} zł</p>
            </NavLink>
        </div>
    );
}
 
export default ProductMiniature;
import ProductMiniature from '../components/ProductMiniature';

const ProductPage = ({products, showProductPage, addToCart, selectedAgain, classBtnAddToCart, props}) => {

    const actualProduct = products.filter(product => product.name === props.match.params.name)[0];

    const sizeList = actualProduct.sizes.map(size => <option value={size} key={size}>{size}</option>);

    let similarProducts = products.filter(product => product.tags.includes(actualProduct.tags[0])).slice(0, 4);

    similarProducts = similarProducts.map(product => <ProductMiniature key={product.id} img={product.img} name={product.name} price={product.price} product={product} showProductPage={showProductPage}/>)
    
    return (
        <>
        <main className='main-product' style={selectedAgain ? {filter: 'blur(2px)'} : null}>
            <div className='product-img' style={{backgroundImage: `url(${process.env.PUBLIC_URL + actualProduct.img})`}}></div>
            <h1 className='product-title'>{actualProduct.name}</h1>
            <p className='product-price'>{actualProduct.price} zł</p>
            <p className='size'>Size</p>
            <select className='select'>
                {sizeList}
            </select>
            <button className={`btn-add-to-cart ${classBtnAddToCart}`} onClick={() => addToCart("add", actualProduct)}>Add to cart</button>
        </main>
        <section style={selectedAgain ? {filter: 'blur(2px)'} : null}>
            <h2 className='section-title'>you may also like</h2>
            <div className='section-products'>
            {similarProducts}
            </div>
        </section>

        {selectedAgain && (
        <div className='to-blur'>
            <div className='confirmation'>
                <p className='confirmation-p'>This product is already in your cart. Do you want to replace it?</p>
                <button className='btn-confirmation yes' onClick={() => addToCart('yes', actualProduct)}>Yes</button>
                <button className='btn-confirmation no' onClick={() => addToCart('no', actualProduct)}>No</button>
            </div>
        </div>)}
        </>
    );
}
 
export default ProductPage;
import ProductMiniature from './ProductMiniature';

const ListsProducts = ({products, showProductPage}) => {
    let popularProducts = products.slice(8, 13)
    popularProducts = popularProducts.map(product => 
    <ProductMiniature key={product.id} img={product.img} name={product.name} price={product.price} product={product} showProductPage={showProductPage}/>)
    
    let newProducts = products.slice(0, 5)
    newProducts = newProducts.map(product => 
    <ProductMiniature key={product.id} img={product.img} name={product.name} price={product.price} product={product} showProductPage={showProductPage}/>)

    return (
        <>
        <section className='section-main'>
            <h2 className='section-products-title'>New</h2>
            <div className='products'>
                {newProducts}
            </div>
        </section>
        <section className='section-main'>
            <h2 className='section-products-title'>The most popular</h2>
            <div className='products'>
                {popularProducts}
            </div>
        </section>
        </>
    );
}
 
export default ListsProducts;
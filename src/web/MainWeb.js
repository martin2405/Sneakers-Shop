import ListsProducts from '../components/ListsProducts';
import { NavLink } from 'react-router-dom';

const sections = [
  {iClass:"fas fa-shipping-fast", text:"Every order to 13:00 AM is realized and sent at the same day.", title: 'shipment'}, 
  {iClass: "fas fa-credit-card", text: "We service many forms of payment. Credit card, PayPal, bank transfer", title: 'payment'},
  {iClass: "fas fa-phone", text: "Do you have any problem with order? We don't have size or model which is interesting you? Call to us 123-123-123", title: 'customer service'}
]

const MainWeb = ({products, showProductPage, handleSearchValue}) => {

  const list = sections.map(section => (
    <section className='info-section' key={section.iClass}>
      <div className='section-conteiner'>
        <div className='img-conteiner-main-web'><i className={section.iClass}></i></div>
        <p>{section.title}</p>
      </div>
      <p className='section-describe'>{section.text}</p>
    </section>
  ))


  return (
      <>
      <header className='header'>
          <h1 className='header-h1'><span>Find your</span> <span>GRAILS</span></h1>
          <form className='header-form'>
              <input className='header-input' type="text" placeholder='Search...' onChange={handleSearchValue}/>
              <NavLink to='/products'><button className='header-btn'><i className="fas fa-arrow-right"></i></button></NavLink>
          </form>
      </header>
      <main>
        {<ListsProducts products={products} showProductPage={showProductPage}/>}
      </main>
      <section className='info'>
          <h1 className='info-h1'>Quick and safe shopping online</h1>
          {list}
      </section>
      </>
  );
}
 
export default MainWeb;
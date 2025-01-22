import './App.css';
import Header from './cpn/Header';
import Footer from './cpn/Footer';
import { useLocation } from 'react-router-dom';

function App(props) {
  let params1 = useLocation();
  // console.log(params1);
  
  return (
    <div>
      <Header />
      <section>
        <div className='contanier'>
          <div className='row'>
              {/* {pramas1['pathname'].includes('account')?<Meu/>} */}
          </div>
        </div>
      </section>
      {props.children}

      <Footer />
    </div>
  );
}

export default App;

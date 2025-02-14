import './App.css';
import Header from './cpn/Header';
import Footer from './cpn/Footer';
import { useLocation } from 'react-router-dom';
import MenuLeft from './menu-2/MenuLeft';
import MenuAcc from './menu-2/MenuAcc';


function App(props) {
  let params1 = useLocation();
  // console.log(params1);

  return (
    <div>
      <Header />
      <section>
        <div class="container">
          <div class="row">

            {params1['pathname'].includes("account") ? <MenuAcc /> : <MenuLeft />}

            {/* tạo thêm cái menu ứng với cpn  */}

            {props.children}
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
}

export default App;

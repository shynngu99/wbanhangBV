import logo from './logo.svg';
import './App.css';
import Header from './cpn/Header';
import Footer from './cpn/Footer';

function App(props) {
  return (
    <div>
      <Header />

      {props.children}
      
      <Footer />
    </div>
  );
}

export default App;

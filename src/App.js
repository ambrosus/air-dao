import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import bg from './assets/background.png';
function App() {
  return (
    <div>
      <img className="background" src={bg} alt="background"/>
      <Header/>
      <div className="container">
        <Content/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;

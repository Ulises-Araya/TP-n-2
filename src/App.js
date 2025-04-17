import './App.css';
import './Colors.css';
import Header from './components/Header';
import Tab from './components/Tab';

function App() {

  return (
    <div className="App">
        <Header/>
        <main>
          <Tab/>
        </main>
    </div>
  );
}

export default App;
import logo from './logo.svg';
import './App.css';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';

function App() {
  return (
    <div className="App">
      <img src = {logo} className = 'App-logo' alt = 'logo'></img>
      <SortingVisualizer></SortingVisualizer>
    </div>
  );
}

export default App;

import './App.css';
import Parse from 'parse/dist/parse.min.js';



// Configuración de inicialización de Parse
const app_id = process.env.REACT_APP_PARSE_APP_ID;
const javascript_key = process.env.REACT_APP_PARSE_APP_JAVASCRIPT_KEY
const REACT_APP_PARSE_HOST_URL = 'https://parseapi.back4app.com/parse';

// Inicializar Parse
Parse.initialize(app_id, javascript_key);
Parse.serverURL = REACT_APP_PARSE_HOST_URL; 


function App() {
  const fetchAllCars = async () => {
    const query = new Parse.Query('B4aVehicle');
    try {
      const allCarsGet = await query.find();
      allCarsGet.forEach((item) => {
        console.log(item);
      });
    } catch (error) {
      console.error('Error while fetching cars: ', error);
    }
  };

  fetchAllCars();  // Llama a la función fetchAllCars

  return (
    <div className="App">
      <header className="App-header">
        <h1>Prueba</h1>
      </header>
    </div>
  );
}

export default App;

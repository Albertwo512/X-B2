import './App.css';
import Parse from 'parse/dist/parse.min.js';
import { UserRegistration } from './UserRegistration.js';
import { UserLogin } from './UserLogin.js';



// Configuración de inicialización de Parse
const app_id = process.env.REACT_APP_PARSE_APP_ID;
const REACT_APP_PARSE_HOST_URL = 'https://parseapi.back4app.com';
const javascript_key = process.env.REACT_APP_PARSE_APP_JAVASCRIPT_KEY


// Inicializar Parse
Parse.initialize(app_id, javascript_key);
Parse.serverURL = REACT_APP_PARSE_HOST_URL;



function App() {
  const fetchAllUser = async () => {
    const query = new Parse.Query("DB_B2X");
    try {
      const allUserGet = await query.find();
      allUserGet.forEach((item) => {
        console.log(item);
      });
    } catch (error) {
      console.error('Error while fetching user: ', error);
    }
  };

  fetchAllUser();  

  return (
    <div className="App">
      <header className="App-header">
        <UserRegistration/>
        <UserLogin/>
      </header>
    </div>
  );
}

export default App;

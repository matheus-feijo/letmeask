import {BrowserRouter,Route } from "react-router-dom";
import { NewRoom } from './pages/NewRoom';
import { Home } from './pages/Home';

import "./styles/global.scss";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
   <BrowserRouter>
      <AuthProvider>
        <Route  path="/" exact component={Home}/>
        <Route path="/rooms/new" component={NewRoom}/>
      </AuthProvider>    
   </BrowserRouter>
      
    
  );
}

export default App;

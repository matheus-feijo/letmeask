import {BrowserRouter,Route, Switch } from "react-router-dom";
import { NewRoom } from './pages/NewRoom';
import { Home } from './pages/Home';
import {Room} from "./pages/Room";

import "./styles/global.scss";
import { AuthProvider } from "./context/authContext";
import { AdminRoom } from "./pages/AdminRoom";

function App() {
  return (
   <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route  path="/" exact component={Home}/>
          <Route path="/rooms/new" component={NewRoom}/>
          <Route path="/rooms/:id" component={Room}/>
          <Route path={"/admin/rooms/:id"} component={AdminRoom} />
        </Switch>
      </AuthProvider>    
   </BrowserRouter>
      
    
  );
}

export default App;

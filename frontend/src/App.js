// import logo from './logo.svg';
import './App.css';
import Home from "./Components/Home"
import {Switch, Route} from "react-router"
import VideoDisplay from './Components/VideoDisplay';

export const config={
  endpoint:"https://a9002692-e9eb-4bae-9c44-e8b1e885bfb8.mock.pstmn.io"
  // endpoint:"http://3.6.229.226:8082"
}

function App() {
  return (
  
    <div>
      <Switch>
        
        <Route exact path='/playvideo/:id' component={VideoDisplay}/>
        <Route exact path='/' component={Home}/>
      </Switch>
    </div>
  );
}

export default App;

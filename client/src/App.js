import React, { Component } from "react";
import UploadPage from "./containers/UploadPage";
import MarketPage from "./containers/MarketPage";
import MyFeedsPage from "./containers/MyFeedsPage";
import LoginPage from "./containers/LoginPage";
//import Navigation from "./components/Navigation";
import "./App.css";
import { NavLink, Switch, Route } from "react-router-dom";

const styles = {
  link: {
    textDecoration: "none",
    verticalAlign: "middle",
    color: "#edfffe"
  },
}
class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="App">
        <div className="Navigation">
          <div className="button"><NavLink style={styles.link} to="/market">Market</NavLink></div>
          <div className="button"><NavLink style={styles.link} to="/mine">My Feeds</NavLink></div>
          <div className="button"><NavLink style={styles.link} to="/upload">Upload</NavLink></div>
          <div className="button"><NavLink style={styles.link} to="/logout">Logout</NavLink></div>
        </div>
        <Switch>
          <Route path="/market" component={MarketPage}></Route>
          <Route path="/mine" component={MyFeedsPage}></Route>
          <Route path="/upload" component={UploadPage}></Route>
          <Route path="/logout" component={LoginPage}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;

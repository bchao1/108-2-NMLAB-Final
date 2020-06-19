import getWeb3 from "./utils/getWeb3";
import PublisherContract from "./contracts/Publisher.json"

import React, { Component } from "react";
import UploadPage from "./containers/UploadPage";
import MarketPage from "./containers/MarketPage";
import MyFeedsPage from "./containers/MyFeedsPage";
import LoginPage from "./containers/LoginPage";
import AccountPage from "./containers/AccountPage";
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
    this.state = {web3: null, accounts: null, contract: null };
  }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = PublisherContract.networks[networkId];
      console.log(networkId, deployedNetwork);
      const instance = new web3.eth.Contract(
        PublisherContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="Navigation">
          <div className="button"><NavLink style={styles.link} to="/market">Market</NavLink></div>
          <div className="button"><NavLink style={styles.link} to="/mine">My Feeds</NavLink></div>
          <div className="button"><NavLink style={styles.link} to="/upload">Upload</NavLink></div>
          <div className="button"><NavLink style={styles.link} to="/upload">Account</NavLink></div>
        </div>
        <Switch>
          <Route 
            path="/market" 
            component={() => <MarketPage web3={this.state.web3} accounts={this.state.accounts} contract={this.state.contract}/>}>
          </Route>
          <Route 
            path="/mine" 
            render={() => <MyFeedsPage web3={this.state.web3} accounts={this.state.accounts} contract={this.state.contract}/>}>
          </Route>
          <Route 
            path="/upload" 
            component={() => <UploadPage web3={this.state.web3} accounts={this.state.accounts} contract={this.state.contract}/>}>
          </Route>
          <Route 
            path="/account" 
            component={() => <AccountPage web3={this.state.web3} accounts={this.state.accounts} contract={this.state.contract}/>}>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;

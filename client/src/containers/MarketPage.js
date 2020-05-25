import React, { Component } from "react";
import Bookshelf from "../components/Bookshelf";
import "./MarketPage.css";


const numItems = 10;

class MarketPage extends Component {
    constructor(props) {
        super(props);
        this.state = {items: []};
    }

    componentDidMount = async () => {
        this.updateMarket();
    }

    componentDidUpdate = async(prevProps, prevState, snapshot) => {
        const { accounts, contract } = this.props;
        if (accounts === prevProps.accounts && contract === prevProps.contract) return;  // state change
        this.updateMarket();
    }

    updateMarket = async() => {
        const { accounts, contract } = this.props;
        if (!accounts || !contract)　return;
        var items = await contract.methods.GetRandom(numItems).call();
        console.log(items);
        this.setState({items: items});
    }

    render() {  
        return (
            <div className="MarketPage">
                <Bookshelf fileInfo={this.state.items} />
            </div>
        )
    }
}

export default MarketPage;
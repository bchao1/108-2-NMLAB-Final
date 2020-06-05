import React, { Component } from "react";
import Bookshelf from "../components/Bookshelf";
import "./MarketPage.css";

const numItems = 10;
const testItems = Array(10).fill(
    {
        'preview_ipfs_hash': 'QmSZLYLL95vEQ49Hate6rHjj1SucoVLPRPSY8YurB8MNvV',
        'main_ipfs_hash': 'QmRcFDuroaMAdprDjctj5MHwcgSHmjcGg47r4JJtJQxhYQ',
        'filename': 'haa',
        'filetype': 'pdf',
    }
);

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
        if(items == null) items = [];
        
        //let items = testItems;
        this.setState({items: items});
    }

    splitRows = () => {
        let rows = [], chunk = 4, i, j;
        for(i = 0,j = this.state.items.length; i < j; i += chunk) {
            rows.push(this.state.items.slice(i, i + chunk));
        }
        return rows
    }
    render() {  
        let bookshelfRows = this.splitRows();
        return (
            <div className="MarketPage">
                {
                    bookshelfRows.map((row, idx) => (
                        <Bookshelf key={idx} fileInfo={row} owned={false} />
                    ))
                }
            </div>
        )
    }
}

export default MarketPage;
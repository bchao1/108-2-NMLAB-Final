import React, { Component } from "react";
import Bookshelf from "../components/Bookshelf";
import "./MarketPage.css";

const testFileInfo = [
    { 
        prevHash: 1,
        hash: 'A',
        name: 'haha'
    },
    { 
        prevHash: 1,
        hash: 'A',
        name: 'haha'
    },
    { 
        prevHash: 1,
        hash: 'A',
        name: 'haha'
    },
    { 
        prevHash: 1,
        hash: 'A',
        name: 'haha'
    }
];

class MarketPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="MarketPage">
                <Bookshelf fileInfo={testFileInfo} />
                <Bookshelf fileInfo={testFileInfo} />
                <Bookshelf fileInfo={testFileInfo} />
                <Bookshelf fileInfo={testFileInfo} />
            </div>
        )
    }
}

export default MarketPage;
import React, { Component } from "react";
import Bookshelf from "../components/Bookshelf";
import "./MarketPage.css";

const testFileInfo = [
    { 
        prevHash: 1,
        hash: 'QmaurgJWL4VyiikU8tkChm6Lf9Rw7ffRVaLG91iSaGURYM',
        name: 'haha'
    },
    { 
        prevHash: 1,
        hash: 'QmW6iyTGihRKwX8xRXyZAD9kY1G4R5rY9QBEeGLTnTwFxp',
        name: 'haha'
    },
    { 
        prevHash: 1,
        hash: 'QmW6iyTGihRKwX8xRXyZAD9kY1G4R5rY9QBEeGLTnTwFxp',
        name: 'haha'
    },
    { 
        prevHash: 1,
        hash: 'QmW6iyTGihRKwX8xRXyZAD9kY1G4R5rY9QBEeGLTnTwFxp',
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
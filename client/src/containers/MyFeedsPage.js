import React, { Component } from "react";
import Bookshelf from "../components/Bookshelf";
import "./MyFeedsPage.css";


class MyFeedsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {myUpload: [], myCollect: []};
    }

    componentDidMount = async () => {
        this.updateMyFeed();
    }

    componentDidUpdate = async (prevProps, prevState, snapShot) => {
        const { accounts, contract } = this.props;
        if (accounts === prevProps.accounts && contract === prevProps.contract) return;  // state change
        this.updateMyFeed();        
    }

    updateMyFeed = async() => {
        const { accounts, contract } = this.props;
        if (!accounts || !contract)　return;  // state valid
        var myUpload = await contract.methods.GetMyUpload().call({from: accounts[0]});
        var myCollect = await contract.methods.GetMyCollect().call({from: accounts[0]});
        this.setState({
            myUpload: this.getUniqueItems(myUpload), 
            myCollect: this.getUniqueItems(myCollect)
        });
    }

    getUniqueItems = (arr) => (
        arr.filter((val, index, self) => 
            index === self.findIndex((t) => (
                t[2] === val[2] && t[3] === val[3]
            ))
        )
    )
    
    splitRows = (items) => {
        let rows = [], chunk = 4, i, j;
        for(i = 0,j = items.length; i < j; i += chunk) {
            rows.push(items.slice(i, i + chunk));
        }
        return rows
    }
    render() {
        let uploadBookshelfRows = this.splitRows(this.state.myUpload);
        let collectBookshelfRows = this.splitRows(this.state.myCollect);
        return (
            <div className="MyFeedsPage">
                <div className="MyFeedsSection">
                    My Upload
                    {
                        uploadBookshelfRows.map((row, idx) => (
                            <Bookshelf key={idx} fileInfo={row} owned={true}/>
                        ))
                    }
                </div>
                <div className="MyFeedsSection">
                    My Collection
                    {
                        collectBookshelfRows.map((row, idx) => (
                            <Bookshelf key={idx} fileInfo={row} owned={true} />
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default MyFeedsPage;
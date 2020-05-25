import React, { Component } from "react";

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
        var myUpload = await contract.methods.GetMyUpload().call();
        console.log(myUpload);
        this.setState({myUpload: myUpload});
    }

    render() {
        return (
            <div>
                My feeds.
            </div>
        )
    }
}

export default MyFeedsPage;
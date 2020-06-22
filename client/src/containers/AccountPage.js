import React, { Component } from "react";
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import "./AccountPage.css";

const styles = theme => ({
    button: {
        margin: theme.spacing(1),
        backgroundColor: "white",
        fontFamily: "Fira Mono",
        fontSize: "1rem",
        color: "black",
        width: "50%",
        "&:hover": {
            backgroundColor: "black",
            color: "white",
            border: "1px solid white"
        }
    },
    whiteText: {
        color: "white",
    },
    formControl: {
        minWidth: 120,
        border: "1px solid white",
        borderRadius: "5px",
        "&:focus": {
            outline: "none"
        }
    },
    
});

class AccountPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: "user",
            tmpInfo: {
                username: "user"
            },
            money: 0
        }
    }

    onSubmitBtnClick = async (e) => {
        // submit tmpInfo.
        e.preventDefault();
        // alert(this.state.tmpInfo.username);
        const { accounts, contract } = this.props;
        let status = await contract.methods.SetAuthorInfo([
            accounts[0],
            this.state.tmpInfo.username,
        ]).send({from: accounts[0]});

        this.updateAccountInfo();
    }


    handleUsernameChange = e => {
        e.persist();
        e.preventDefault();
        console.log(e.target);
        this.setState(prevState => {
            return {
                ...prevState,
                tmpInfo: {
                    ...prevState.tmpInfo,
                    username: e.target.value,
                }
            }
        })
    }

    updateAccountInfo = async () => {
        const { web3, accounts, contract } = this.props;
        if (!accounts || !contract)　return;  // state valid
        var accountInfo = await contract.methods.GetAuthorInfo(accounts[0]).call();
        var value = await web3.eth.getBalance(accounts[0]);
        this.setState({
            username: accountInfo.name,
            money: (value * 1e-18).toFixed(8)
        })
    }

    componentDidMount = async () => {
        this.updateAccountInfo();
    }

    render(){
        const { classes } = this.props;
        return(
            <div className="AccountPage">
                <div className="headline">
                    Hello
                     <br/>
                     <div className="username">{this.state.username}</div>
                </div>
                <div className="account">
                    <div className="account-info">
                        <div className="key">Username</div>
                        <div className="value">
                            <input
                                className="input"
                                type="text"
                                name="username"
                                value={this.state.tmpInfo.username}
                                onChange={this.handleUsernameChange}
                            />
                        </div>
                    </div>
                    <div className="account-info">
                        <div className="key">Account</div>
                        <div className="value">{this.state.money} ETH</div>
                    </div>
                    <div className="button-div">
                        <Button
                            className={classes.button}
                            onClick={this.onSubmitBtnClick}
                        >
                            Submit Changes
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(AccountPage);
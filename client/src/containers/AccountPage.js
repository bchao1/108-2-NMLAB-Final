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
            }
        }
    }

    onSubmitBtnClick = e => {
        // submit tmpInfo.
        e.preventDefault();
        alert(this.state.tmpInfo.username);
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

    render(){
        const { classes } = this.props;
        return(
            <div className="AccountPage">
                <div className="headline">
                    Hello
                     <br/>
                     <span style={{"font-size": "2.5rem"}}>{this.state.username}</span>
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
                        <div className="value">?? ETH</div>
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
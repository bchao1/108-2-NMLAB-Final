import React, { Component, Fragment } from "react";
// material ui imports
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

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

const styles = theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      borderColor: "white"
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    whiteText: {
        color: "white",
    },
    whiteBorder: {
        borderColor: "white"
    }
  });

class MarketPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            filetype: "all",
        };
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

    handleFileTypeChange = e => {
        this.setState({
            filetype: e.target.value,
        })
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
        const { classes } = this.props;
        return (
            <Fragment>
                <div class="select-bar">
                    <FormControl className={classes.formControl}>
                        <Select
                            labelId="demo-simple-select-label"
                            value={this.state.filetype}
                            onChange={this.handleFileTypeChange}
                            variant = "outlined"
                            className={classes.whiteText}
                        >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"text"}>Text</MenuItem>
                        <MenuItem value={"pdf"}>PDF</MenuItem>
                        <MenuItem value={"image"}>Image</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField 
                        className={classes.formControl} 
                        type="search" 
                        variant = "outlined"
                        InputProps={{className: classes.whiteText}}
                    />
                </div>
                <div className="MarketPage">
                    {
                        /*
                        bookshelfRows.map((row, idx) => (
                            <Bookshelf key={idx} fileInfo={row} />
                        ))
                        */
                    }
                </div>
            </Fragment>
        )
    }
}

export default withStyles(styles)(MarketPage);
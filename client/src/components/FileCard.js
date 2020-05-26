import React, {Fragment} from 'react';
import styles from "./FileCard.module.css";
import Modal from 'react-modal';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// test cid QmW6iyTGihRKwX8xRXyZAD9kY1G4R5rY9QBEeGLTnTwFxp

class FileCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            donate: "",
            prevText: "",
            prevOpen: false,
        };
    }

    handleInputChange = e => {
        this.setState({
            donate: e.target.value
        })
    }

    onDonateClick = () => {
        alert("DONATE!");
    }

    onBuyClick = () => {
        alert("BUY!");
    }

    onPreviewClick = async () => {
        let res = await fetch(`http://ntuee.org:9090/ipfs/${this.props.prev_ipfs_hash}`);
        let data = await res.text();
        this.setState({
            prevText: data,
            prevOpen: true,
        })
        //alert(data);
    }

    handleClose = () => {
        this.setState({
            prevOpen: false,
        })
    }

    render(){
        return(
            <div className={styles.Filecard}>
                <Dialog
                    open={this.state.prevOpen}
                    onClose={this.handleClose}
                >
                    <DialogTitle>Preview</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.state.prevText}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>

                <div className={styles.file} onClick={this.onPreviewClick}>
                    <div className={styles.key}>File hash</div>
                    <div className={styles.value}>{this.props.main_ipfs_hash}</div>
                    <div className={styles.key}>File name</div>
                    <div className={styles.value}>{this.props.filename}</div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.footerRow}>
                        <input
                            className={styles.left}
                            type="text"
                            value={this.state.donate}
                            onChange={this.handleInputChange}
                        />
                        <div 
                            className={styles.right}
                            onClick={this.onDonateClick}
                        >
                            Donate
                        </div>
                    </div>
                    <div className={styles.footerRow}>
                        <div className={styles.left}></div>
                        <div 
                            className={styles.right}
                            onClick={this.onBuyClick}
                        >
                            Buy
                        </div>
                    </div> 
                </div>
            </div>
        )
    };
}

export default FileCard;
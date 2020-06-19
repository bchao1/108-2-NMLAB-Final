import React, {Fragment} from 'react';
import styles from "./FileCard.module.css";
import Modal from 'react-modal';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getPreviewContent } from "../utils/preview";

// test cid QmW6iyTGihRKwX8xRXyZAD9kY1G4R5rY9QBEeGLTnTwFxp

class FileCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            donate: "",
            prevBuffer: "",
            prevOpen: false,
        };
    }

    handleInputChange = e => {
        this.setState({
            donate: e.target.value
        })
    }

    onDonateClick = async () => {
        const { accounts, contract } = this.props;
        const eth_value = parseFloat(this.state.donate);
        const wei_value = 1e18 * eth_value;
        const status = await contract.methods.Donate(this.props.preview_ipfs_hash).send({
            from: accounts[0], 
            value: eth_value,
        });
    }

    onPreviewClick = async () => {
        let res = await fetch(`http://ntuee.org:9090/ipfs/${this.props.preview_ipfs_hash}`);
        let data = await res.arrayBuffer();
        this.setState({
            prevBuffer: Buffer.from(data),
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
        const footer = this.props.owned ? 
            <div className={styles.footerRow}>
                <a href={`http://ntuee.org:9090/ipfs/${this.props.main_ipfs_hash}`} className={styles.download_btn}> Download </a>
            </div> : 
            <div className={styles.footerRow}>
                <input
                    className={styles.left}
                    type="text"
                    value={this.state.donate}
                    placeholder={"unit: ETH"} // 1e18 wei = 1 ETH
                    onChange={this.handleInputChange}
                />
                <div 
                    className={styles.right}
                    onClick={this.onDonateClick}
                >
                    Donate
                </div>
            </div>

        return(
            <div className={styles.Filecard}>
                <Dialog
                    open={this.state.prevOpen}
                    onClose={this.handleClose}
                >
                    <DialogTitle>Preview</DialogTitle>
                    <DialogContent>
                        {getPreviewContent(this.state.prevBuffer, this.props.filetype)}
                    </DialogContent>
                </Dialog>

                <div className={styles.file} onClick={this.onPreviewClick}>
                    {/* <div className={styles.key}>File hash</div> */}
                    {/* <div className={styles.value}>{this.props.main_ipfs_hash}</div> */}
                    {/* <div className={styles.key}>File name</div> */}
                    <div className={styles.value}>{this.props.filename}</div>
                </div>
                <div className={styles.footer}>
                    {footer}
                </div>
            </div>
        )
    };
}

export default FileCard;
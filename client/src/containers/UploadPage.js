import React, { Component } from "react";
import "./UploadPage.css";

const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({host :"ntuee.org", port: 5002, protocol: "http"});

const styles = {
    topicText: {
        color: "white"
    }
}

const previewCharNum = 500;

class UploadPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainIPFSHash: '',
            previewIPFSHash: '',
            buffer: '',
            previewBuffer: '',
            fileName: ''
        }
    }

    onSubmit = async(e) => {
        e.preventDefault();
        //Send to ipfs server node
        console.log(ipfs.getEndpointConfig());
        console.log(ipfs);
        const mainIPFSHash = await this.uploadFile(this.state.buffer, "main");
        const previewIPFSHash = await this.uploadFile(this.state.previewBuffer, "preview");

        const { accounts, contract } = this.props;
        console.log(accounts);
        let status = await contract.methods.Upload([
            this.state.fileName,
            mainIPFSHash,
            previewIPFSHash,
            0, // TODO
            accounts[0],
        ]).send({from: accounts[0]});
        console.log("upload status", status);

        this.setState({
            mainIPFSHash: mainIPFSHash,
            previewIPFSHash: previewIPFSHash,
        })
        console.log("FINISH!");
    }

    uploadFile = async(buffer, statePrefix) => {
        const result = await ipfs.add(buffer).next();
        return result.value.path;
    }

    onFileUpload = e => {
        e.stopPropagation();
        e.preventDefault();
        const file = e.target.files[0];
        // file.name = file original upload name
        // file.size 
        this.setState({
            fileName: file.name,
            mainIPFSHash: '',
            previewIPFSHash: '',
            buffer: '',
            previewBuffer: ''
        })
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => this.toBuffer(reader);
    }

    toBuffer = async(reader) => {
        const buffer = await Buffer.from(reader.result);
        const previewBuffer = this.createPreviewFileBuffer(buffer);
        this.setState({
            buffer: buffer,
            previewBuffer: previewBuffer,
        });
    }

    createPreviewFileBuffer = (mainBuffer) => {
        let allContent = mainBuffer.toString('utf8');
        let previewContent = allContent.substring(0, previewCharNum);
        const previewBuffer = Buffer.from(previewContent, 'utf8');
        return previewBuffer;
    }

    render() {
        return (
            <div className="UploadPage">
                <form onSubmit={this.onSubmit}>
                    <label className="file-upload">
                        <input 
                            type = "file"
                            onChange = {this.onFileUpload}
                        />
                        File Upload
                    </label>
                    <button
                        type="submit"
                    > 
                        Send file to ipfs
                    </button>
                </form>
                <div className="preview">{this.state.previewBuffer.toString()}</div>
                <div className="footer">
                    <div className="footer-field">
                        <div className="footer-key">File uploaded</div>
                        <div className="footer-value">{this.state.fileName}</div>
                    </div>
                    <div className="footer-field">
                        <div className="footer-key">Main File CID</div> 
                        <div className="footer-value">{this.state.mainIPFSHash}</div>
                    </div>
                    <div className="footer-field">
                        <div className="footer-key">Preview File CID</div> 
                        <div className="footer-value">{this.state.previewIPFSHash}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UploadPage;
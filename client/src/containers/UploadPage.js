import React, { Component } from "react";
import "./UploadPage.css";

const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({host :"ntuee.org", port: 5002, protocol: "http"});

const styles = {
    topicText: {
        color: "white"
    }
}

class UploadPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ipfsHash: '',
            buffer: '',
            fileName: ''
        }
    }

    onSubmit = async(e) => {
        e.preventDefault();
        //Send to ipfs server node
        console.log(ipfs.getEndpointConfig());
        console.log(ipfs);
        for await (const result of ipfs.add(this.state.buffer)) {
            console.log(result.path);
            this.setState({
                ipfsHash: result.path
            })
        }
        console.log("FINISH!");
    }

    onFileUpload = e => {
        e.stopPropagation();
        e.preventDefault();
        const file = e.target.files[0];
        // file.name = file original upload name
        // file.size 
        this.setState({
            fileName: file.name,
            ipfsHash: '',
            buffer: '',
        })
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => this.toBuffer(reader);
    }

    toBuffer = async(reader) => {
        const buffer = await Buffer.from(reader.result);
        this.setState({
            buffer: buffer,
        });
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
                <div className="preview">
                </div>
                <div className="footer">
                    <div className="footer-field">
                        <div className="footer-key">File uploaded</div>
                        <div className="footer-value">{this.state.fileName}</div>
                    </div>
                    <div className="footer-field">
                        <div className="footer-key">File CID</div> 
                        <div className="footer-value">{this.state.ipfsHash}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UploadPage;
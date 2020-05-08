import React, { Component } from "react";
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({host :"ntuee.org", port: 5002, protocol: "http"});

class UploadPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ipfsHash: "hello",
            buffer: ''
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
            <div>
                <form onSubmit={this.onSubmit}>
                    <input 
                        type = "file"
                        onChange = {this.onFileUpload}
                    />
                    <button
                        type="submit"
                    > 
                        Send file to ipfs
                    </button>
                </form>
                <div style={{color:"white"}}>
                    {this.state.ipfsHash}
                </div>
            </div>
        )
    }
}

export default UploadPage;
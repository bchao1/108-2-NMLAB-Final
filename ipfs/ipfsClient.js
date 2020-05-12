//using the infura.io node, otherwise ipfs requires you to run a //daemon on your own computer/server.
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
        host: '127',
        port: 5001, 
        protocol: 'https',
     });

//run with local daemon
// const ipfsApi = require(‘ipfs-api’);
// const ipfs = new ipfsApi(‘localhost’, ‘5001’, {protocol:‘http’});
export default ipfs;
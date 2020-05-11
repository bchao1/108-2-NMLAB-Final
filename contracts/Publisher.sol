pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

struct BookMeta {
      string filename;
      string main_ipfs_hash; 
      string preview_ipfs_hash;
      uint price;
      string author;
      bool valid;
}

contract Publisher {
  string[] Hashes;
  mapping (string => BookMeta) HashToMeta;
  mapping (address => string[]) SenderToHashes;

  function randMod(uint _modulus) internal view returns(uint) {
    return uint(keccak256(abi.encodePacked(now, msg.sender))) % _modulus;
  }

  function Upload(BookMeta memory data) public returns (bool) {
      if (HashToMeta[data.main_ipfs_hash].valid) {
        HashToMeta[data.main_ipfs_hash] = data;
        SenderToHashes[msg.sender].push(data.main_ipfs_hash);
        return true;
      } 
      else {
          return false;
      }
  }

  function BuyBook(string memory preview_ipfs_hash) public returns (bool) {
      // TODO
      return false;
  }

  function GetMyUpload() public view returns (string[] memory){
      return SenderToHashes[msg.sender];
  }

  function GetRandom(uint num) public view returns (string[] memory){
      string [] memory random = new string[](num);
      for (uint i=0; i<num; i++) {
          random[i] = Hashes[randMod(Hashes.length)];
      }
      return random;
  }
}

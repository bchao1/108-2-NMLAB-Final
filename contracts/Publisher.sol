pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;


contract Publisher {

    struct BookMeta {
        string filename;
        string main_ipfs_hash;
        string preview_ipfs_hash;
        uint price;
        string author;
    }

  string[] Hashes;
  mapping (string => BookMeta) HashToMeta;
  mapping (string => bool) isValid;
  mapping (address => string[]) SenderToHashes;
  uint randNonce = 0;

  function randMod(uint _modulus) internal returns(uint) {
    randNonce++;
    return uint(keccak256(abi.encodePacked(now, msg.sender, randNonce))) % _modulus;
  }

  function Upload(BookMeta memory data) public returns (bool) {
      if (!isValid[data.main_ipfs_hash]) {
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

  function GetRandom(uint num) public returns (BookMeta[] memory){
      BookMeta[] memory random = new BookMeta[](num);
      for (uint i = 0; i < num; i++) {
          random[i] = HashToMeta[Hashes[randMod(Hashes.length)]];
      }
      return random;
  }
}

pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;


contract Publisher {

    struct BookMeta {
        string filename;
        string main_ipfs_hash;
        string preview_ipfs_hash;
        uint price;
        address payable author;
    }

  string[] Hashes;
  mapping (string => BookMeta) HashToMeta;
  mapping (string => BookMeta) PrevHashToMeta;
  mapping (string => bool) isValid;
  mapping (address => string[]) SenderToHashes;
  mapping (address => string[]) ReaderToHashes;
  uint randNonce = 0;

  function randMod(uint _modulus) internal returns(uint) {
    randNonce++;
    return uint(keccak256(abi.encodePacked(now, msg.sender, randNonce))) % _modulus;
  }

  function Upload(BookMeta memory data) public returns (bool) {
      if (!isValid[data.main_ipfs_hash]) {
        HashToMeta[data.main_ipfs_hash] = data;
        Hashes.push(data.main_ipfs_hash);
        PrevHashToMeta[data.preview_ipfs_hash] = data;
        SenderToHashes[msg.sender].push(data.main_ipfs_hash);
        return true;
      }
      else {
        return false;
      }
  }

  function BuyBook(string memory preview_ipfs_hash) public payable returns (bool) {
      address payable author = PrevHashToMeta[preview_ipfs_hash].author;
      uint price = PrevHashToMeta[preview_ipfs_hash].price;
      require(msg.value == price, "Incorrect Value");
      author.transfer(price);
      ReaderToHashes[msg.sender].push(PrevHashToMeta[preview_ipfs_hash].main_ipfs_hash);
      return true;
  }

  function GetMyUpload() public view returns (BookMeta[] memory){
      BookMeta[] memory ret = new BookMeta[](SenderToHashes[msg.sender].length);
      for (uint i = 0; i < SenderToHashes[msg.sender].length; i++) {
          ret[i] = HashToMeta[SenderToHashes[msg.sender][i]];
      }
      return ret;
  }

  function GetMyCollect() public view returns (BookMeta[] memory){
      BookMeta[] memory ret = new BookMeta[](ReaderToHashes[msg.sender].length);
      for (uint i = 0; i < ReaderToHashes[msg.sender].length; i++) {
          ret[i] = HashToMeta[ReaderToHashes[msg.sender][i]];
      }
      return ret;
  }

  function GetRandom(uint num) public view returns (BookMeta[] memory){
      uint actual_num = num;
      if (Hashes.length < num) actual_num = Hashes.length;
      BookMeta[] memory random = new BookMeta[](actual_num);

      for (uint i = 0; i < actual_num; i++) {
          random[i] = HashToMeta[Hashes[Hashes.length - 1 - i]];
      }
      return random;
  }
}

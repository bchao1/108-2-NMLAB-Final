pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;


contract Publisher {

    struct BookMeta {
        string filename;
        string filetype;
        string main_ipfs_hash;
        string preview_ipfs_hash;
        address payable author;
    }

    struct AuthorMeta {
        address author;
        string name;
    }

  string[] Hashes;
  mapping (string => BookMeta) HashToMeta;
  mapping (string => BookMeta) PrevHashToMeta;
  mapping (string => bool) isValid;
  mapping (address => bool) AuthorIsValid;
  mapping (address => string[]) SenderToHashes;
  mapping (address => string[]) ReaderToHashes;
  mapping (address => AuthorMeta) AuthorToMeta;
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
        isValid[data.main_ipfs_hash] = true;
        return true;
      }
      else {
        return false;
      }
  }

  function Donate(string memory preview_ipfs_hash) public payable returns (bool) {
      address payable author = PrevHashToMeta[preview_ipfs_hash].author;
      author.transfer(msg.value);
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

  function indexOf(string memory _haystack, string memory _needle) public pure returns (int)
  {
      bytes memory h = bytes(_haystack);
      bytes memory n = bytes(_needle);
      if(h.length < 1 || n.length < 1 || (n.length > h.length))
          return -1;
      else if(h.length > (2**128 - 1))
          return -1;
      else
      {
          uint subindex = 0;
          for (uint i = 0; i < h.length; i ++)
          {
              if (h[i] == n[0]) // found the first char of b
              {
                  subindex = 1;
                  while(subindex < n.length && (i + subindex) < h.length && h[i + subindex] == n[subindex]) // search until the chars don't match or until we reach the end of a or b
                  {
                      subindex++;
                  }
                  if(subindex == n.length)
                      return int(i);
              }
          }
          return -1;
      }
  }

  function SearchByName(string memory keyword) public view returns (BookMeta[] memory){
      uint[] memory indices = new uint[](Hashes.length);
      uint actual_num = 0;
      for (uint i = 0; i < Hashes.length; i++) {
          if (indexOf(HashToMeta[Hashes[i]].filename, keyword)>=0){
              indices[actual_num] = i;
              actual_num = actual_num + 1;
          }
      }
    //   require(actual_num>0, "No Search found");
      BookMeta[] memory ret = new BookMeta[](actual_num);
      for (uint i = 0; i < actual_num; i++) {
          ret[i] = HashToMeta[Hashes[indices[i]]];
      }
      return ret;
  }

  function compareStrings(string memory a, string memory b) public pure returns (bool) {
      return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
  }


  function SearchByType(string memory target_type) public view returns (BookMeta[] memory){
      uint[] memory indices = new uint[](Hashes.length);
      uint actual_num = 0;
      for (uint i = 0; i < Hashes.length; i++) {
          if (compareStrings(HashToMeta[Hashes[i]].filetype, target_type)){
              indices[actual_num] = i;
              actual_num = actual_num + 1;
          }
      }
    //   require(actual_num>0, "No Search found");
      BookMeta[] memory ret = new BookMeta[](actual_num);
      for (uint i = 0; i < actual_num; i++) {
          ret[i] = HashToMeta[Hashes[indices[i]]];
      }
      return ret;
  }

  function toString(address _addr) public pure returns(string memory)
  {
      bytes32 value = bytes32(uint256(_addr));
      bytes memory alphabet = "0123456789abcdef";

      bytes memory str = new bytes(42);
      str[0] = '0';
      str[1] = 'x';
      for (uint256 i = 0; i < 20; i++) {
          str[2+i*2] = alphabet[uint8(value[i + 12] >> 4)];
          str[3+i*2] = alphabet[uint8(value[i + 12] & 0x0f)];
      }
      return string(str);
  }

  function GetAuthorInfo(address author) public view returns (AuthorMeta memory){
      if (!AuthorIsValid[author]){
          AuthorMeta memory ret = AuthorMeta(author, toString(author));
          return ret;
      } else {
          return AuthorToMeta[author];
      }
  }

  function SetAuthorInfo(AuthorMeta memory newmeta) public{
      require(newmeta.author == msg.sender, "Invalid address to set info");
      if (!AuthorIsValid[msg.sender]){
          AuthorIsValid[msg.sender] = true;
      }
      AuthorToMeta[msg.sender] = newmeta;
  }
}

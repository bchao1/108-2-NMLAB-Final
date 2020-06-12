const Publisher = artifacts.require("./Publisher.sol");

contract("Publisher", accounts => {
  it("Test Upload and GetMyUpload", async () => {
    const instance = await Publisher.deployed();
    var status = await instance.Upload([
      "filename.txt",
      "txt",
      "main_hash",
      "preview_hash",
      accounts[0],
    ]);

    var myUpload = await instance.GetMyUpload.call();
    assert.equal(myUpload.length, 1, "Not Uploaded");
  });
  
  it("Test Donate and GetMyCollect", async () => {
    const instance = await Publisher.deployed();

    await instance.Upload([
      "filename_.txt",
      "pdf",
      "main_hash_",
      "preview_hash_",
      accounts[2],
    ]);

    const initialBalance_0 = await web3.eth.getBalance(accounts[2]);
    // assert.equal(initialBalance_0, 100, 'accounts[0] false')
    const initialBalance_1 = await web3.eth.getBalance(accounts[0]);
    // assert.equal(initialBalance_1, 100, 'accounts[1] false')

    const price = 1e9;
    var status = await instance.Donate("preview_hash_", {from: accounts[0], value: price});
    assert(status);

    const finalBalance_0 = await web3.eth.getBalance(accounts[2]);
    const finalBalance_1 = await web3.eth.getBalance(accounts[0]);
    const difference_0 = - (initialBalance_0 - finalBalance_0);
    const difference_1 = (initialBalance_1 - finalBalance_1);
    console.log(initialBalance_0, finalBalance_0);
    // assert.equal(difference_1, price, "Incorrect transfer: buyer");
    // assert.equal(difference_0, price, "Incorrect transfer: author");

    var collection = await instance.GetMyCollect();
    assert.equal(collection.length, 1, "Book Not Collected");
  }) 
    
  it("Test SearchByType", async () => {
    const instance = await Publisher.deployed();

    await instance.Upload([
      "filename_ggg9.txt",
      "8889",
      "main_hash_ccd",
      "preview_hash_ccd",
      accounts[2],
    ]);
    await instance.Upload([
        "filename_QQQ_gwwdwgg.txt",
        "88891",
        "main_hash_44d",
        "preview_hash_44d",
        accounts[0],
      ]);

    var collection = await instance.SearchByNameAndType("", "88891");
    assert.equal(collection.length, 1, "Book Not Searched");
  }) 
    
  it("Test SearchByName", async () => {
    const instance = await Publisher.deployed();

    await instance.Upload([
      "filename_HAP_ggg.txt",
      "pseudo",
      "main_hash_55g",
      "preview_hash_55g",
      accounts[2],
    ]);
      
    await instance.Upload([
        "filename_HAPPY_ggge.txt",
        "pseudo",
        "main_hash_ccg",
        "preview_hash_ccg",
        accounts[1],
      ]);
      
    await instance.Upload([
        "filename_HAPPY_gggeooo.txt",
        "none",
        "main_hash_dog",
        "preview_hash_dog",
        accounts[1],
    ]);


    var collection = await instance.SearchByNameAndType("HAPPY", "none");
    assert.equal(collection.length, 1, "Book Not Searched");
  }) 

  it("Test GetRandom", async () => {
    const instance = await Publisher.deployed();
    const num = 10;
    for (let i = 0; i < num * 3; i++) {
      await instance.Upload([
        `filename_${i}.txt`,
        "png",
        `main_hash_${i}`,
        `preview_hash_${i}`,
        accounts[0],
      ]);
    }

    var rand = await instance.GetRandom.call(num);
    assert(rand.length === num, `Should return ${num} items.`);

    for (let i = 0; i < num; i++) {
      assert(rand[i]['filename'].startsWith("filename"), "filename incorrect");
    }
    // TODO
  })

  it("Test GetAuthorInfo & SetAuthorInfo", async () => {
    const instance = await Publisher.deployed();

    var info = await instance.GetAuthorInfo(accounts[0]);
    assert.equal(info.author, accounts[0]);
    assert.equal(info.name, accounts[0].toLowerCase());
    
    await instance.SetAuthorInfo([
        accounts[0],
        "Iam8787"
    ]);
    
    var getinfo = await instance.GetAuthorInfo(accounts[0]);
    assert.equal(getinfo.author, accounts[0]);
    assert.equal(getinfo.name, "Iam8787");
  }) 
    
    
});

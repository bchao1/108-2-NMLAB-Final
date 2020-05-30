const Publisher = artifacts.require("./Publisher.sol");

contract("Publisher", accounts => {
  it("Test Upload and GetMyUpload", async () => {
    const instance = await Publisher.deployed();
    var status = await instance.Upload([
      "filename.txt",
      "main_hash",
      "preview_hash",
      100,
      accounts[0],
    ]);

    var myUpload = await instance.GetMyUpload.call();
    assert.equal(myUpload.length, 1, "Not Uploaded");
  });
  
  it("Test BuyBook and GetMyCollect", async () => {
    const instance = await Publisher.deployed();
    const price = 1e9;

    await instance.Upload([
      "filename_.txt",
      "main_hash_",
      "preview_hash_",
      price,
      accounts[2],
    ]);

    const initialBalance_0 = await web3.eth.getBalance(accounts[2]);
    // assert.equal(initialBalance_0, 100, 'accounts[0] false')
    const initialBalance_1 = await web3.eth.getBalance(accounts[0]);
    // assert.equal(initialBalance_1, 100, 'accounts[1] false')
    var status = await instance.BuyBook("preview_hash_", {from: accounts[0], value: price});
    assert(status);

    const finalBalance_0 = await web3.eth.getBalance(accounts[2]);
    const finalBalance_1 = await web3.eth.getBalance(accounts[0]);
    const difference_0 = - (initialBalance_0 - finalBalance_0);
    const difference_1 = (initialBalance_1 - finalBalance_1);
    console.log(initialBalance_0, finalBalance_0);
    assert.equal(difference_1, price, "Incorrect transfer: buyer");
    assert.equal(difference_0, price, "Incorrect transfer: author");

    var collection = await instance.GetMyCollect();
    assert.equal(collection.length, 1, "Book Not Bought");
  }) 

  it("Test GetRandom", async () => {
    const instance = await Publisher.deployed();
    const num = 10;
    for (let i = 0; i < num * 3; i++) {
      await instance.Upload([
        `filename_${i}.txt`,
        `main_hash_${i}`,
        `preview_hash_${i}`,
        i + 100,
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
});

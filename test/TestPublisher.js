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
    const price = 1;

    await instance.Upload([
      "filename_.txt",
      "main_hash_",
      "preview_hash_",
      price,
      accounts[0],
    ]);

    const initialBalance = await web3.eth.getBalance(accounts[1]);
    var status = await instance.BuyBook("preview_hash", {from: accounts[1], value: price});
    assert(status);

    const finalBalance = await web3.eth.getBalance(accounts[1]);
    const difference = (initialBalance - finalBalance).toString();
    console.log(initialBalance, finalBalance);
    assert.equal(difference, price, "Incorrect transfer");

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
    // TODO
  })
});

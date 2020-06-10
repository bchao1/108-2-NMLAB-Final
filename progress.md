# 108 - 2 NMLAB Final Project

## Frontend

### 登入
- 用那一串 hash 登入

### 書架
- preview files
    - Contract.GetRandom
- buy file:
    - Contract.BuyBooks

### 自己的頁面
- 書架
    - Contract.GetMyUpload
    - Contract.GetCollection
- 下載文章（自己跟別人的）：前端自己處理
- 上傳自己的文章
    - 選擇賣幾塊錢
    - preview
    - Contract.Upload

## Contract

### Struct 
- ```
    BookMeta = (
        filename: str, 
        main_ipfs_hash: str, 
        preview_ipfs_hash: str,
    )
    AuthorMeta = (
        address: address,
        name: str,
    )
  ```

### Methods
- GetAuthorInfo
    - input: address
    - output: AuthorMeta

- SetAuthorInfo
    - input: AuthorMeta

- Upload
    - input: BookMeta
    - output: 

- BuyBooks
    - input: (preview_ipfs_hash,)
    - output: (success,)

- GetMyUpload
    - input:
    - output: [BookMeta]

- GetCollection
    - input:
    - output: [BookMeta]
   
- GetRandom
    - input: (num: uint)
    - output: BookMeta - main_ipfs_hash
    
## Progress
- 6/9
    - 改 donate 單位
    - author 資料頁
        - 前端
        - contract
    - filter 接 contract
    - MyFeedsPage 刪除重複的
    - 開始頁面
- 5/26
    - Finish basic support
        - [x] Finish Buy/Donate
        - [x] Finish My feeds
            - Show main file hash
        - [x] Market no main file hash
        - [x] Upload don't show file hash, show success message
        - [x] Remove logout
    - Other
        - [x] Different "displayable" file types
            - `application/pdf`
            - images: `image`
                - `image/jpeg`
                - `image/png`
            - `text`
        - Advertisement 
        - [x] Add "file type" field in contract
        - Market search / tag filter
            - search by keywords
            - filter tag by file type
            - Search in frontend? (lame) or in contract
        - Basic info page (author hash <-> author name in contract)
- 5/12 Discussion
    - Frontend finish
        - 崇皓
            - Filecard - `react-modal`
                1. Donate
                2. Buy - `BuyBook`
                3. Preview field
            - Use web3 to link contract and frontend
        - 宗瑞
            - Also upload preview file to ipfs - `Upload`
            - Use web3 to link contract and frontend
        - No login for now
    - 永松
        - `BuyBook`: Transfer ETH
        - `GetCollection`: files I bought
        - `GetRandom`: or get latest N ?
            - If random, frontend needs to send a list of indices to contract backend.
- 5/12
### frontend, ipfs
- 5/10
    - finish noob upload page (can upload to ipfs, get file cid)
- 5/8, 9
    - **UPDATE**: successfully run on server. Host is `ntuee.org`
    - use docker for ipfs `docker run -it -p 4002:4002 -p 4003:4003 -p 5002:5002    -p9090:9090 ipfs/js-ipfs:latest`
    - `/ip4/0.0.0.0/tcp/5002/http` for uploading. `/ip4/0.0.0.0/tcp/9090/http` forread.
    - got ipfs running in daemon. See `client/src/UploadPage.js` for client     connection code. 
    - noob frontend layout.
    - Local read only gateway: `http://ntuee.org:9090/ipfs/<cid>`
## References
- react-box: https://github.com/truffle-box/react-box
- Metamask: https://metamask.io
- ipfs: https://www.npmjs.com/package/ipfs
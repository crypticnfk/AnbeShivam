const AnbeShivamNFT = artifacts.require('AnbeShivamNFT');

contract('AnbeShivamNFT', (accounts) => {
   let asNFT;

   const sampleURI = "https://anbeshivam.main.eth/{id}.json";

   before(async() => {
      asNFT = await AnbeShivamNFT.deployed();
      const MINTER_ROLE = web3.utils.soliditySha3("MINTER_ROLE");
      await asNFT.grantRole(MINTER_ROLE, accounts[0]);
   });

   describe("Contract Deployment", async() => {
      it("Contract deploys successfully", async () => {
            assert.ok(asNFT.address);
      });

      it("NFT has correct name and symbol", async() => {
            const name = await asNFT.name();
            assert.equal(name, "AnbeShivamNFT");
            const symbol = await asNFT.symbol();
            assert.equal(symbol, "ANBE");
      }); 
   });

   describe("Minting new NFTs", async() => {

      it("Mints new NFTs", async() => {
            const minted = await asNFT.safeMint(accounts[0], sampleURI);
            assert.ok(minted);
      });
      
      it("Correct token balance", async() => {
            const balance = await asNFT.balanceOf(accounts[0]);
            assert.equal(balance, 1);
      });
   });

   describe("Token URI", async() => {

      before(async() => {
            await asNFT.safeMint(accounts[0], sampleURI);
      })
      
      it("Has correct token URI", async () => {
            const uri = await asNFT.tokenURI(0);
            assert.equal(uri, sampleURI);
      });
   });
})
const { isTopic } = require("web3-utils");

const AnbeShivamNFT = artifacts.require('AnbeShivamNFT');

contract('AnbeShivamNFT' , (accounts)=>{
   let asMain ,asiToken ;
   before(async ()=>{
        asMain = await AnbeShivamNFT.deployed();
   })

   describe("Contract Deploment",async ()=>{
      it("Contract is deployed",async ()=>{
            assert.ok(asMain.address);
      })
      it("NFT symbol is correct" ,async ()=>{
            const symbol = await asMain.symbol();
            assert.equal(symbol , "ANBE");
      }) 
   })
   describe("Minting" ,async()=>{

      it("Minting token" ,async ()=>{
            const minted = await asMain.safeMint(accounts[0]);
            assert.ok(minted);
      })
      it("Checking token balance" ,async ()=>{
            const balance = await asMain.balanceOf(accounts[0]);
            assert.equal(balance , 1);
      })
   })
})


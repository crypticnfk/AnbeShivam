const AnbeShivamMain = artifacts.require('AnbeShivamMain');
const AnbeShivamNFT = artifacts.require('AnbeShivamNFT');
const AnbeShivamInvestorToken = artifacts.require('AnbeShivamInvestorToken');

contract('AnbeShivamMain', (accounts) => {
    let asMain, asiToken, asNFT;

    const sampleURI = "https://anbeshivam.main.eth/{id}.json";

    before(async () =>{
      asMain = await AnbeShivamMain.deployed();
      asNFT = await AnbeShivamNFT.deployed();
      asiToken = await AnbeShivamInvestorToken.deployed();
      await asMain.setContractAddresses(await asiToken.address, await asNFT.address);
      const MINTER_ROLE = web3.utils.soliditySha3("MINTER_ROLE");
      await asiToken.grantRole(MINTER_ROLE, await asMain.address);
      await asNFT.grantRole(MINTER_ROLE, await asMain.address);
    });

    describe("Contract Deployment", async () => {
        it("contract deploys succesfully", async () => {
           const address = await asMain.address;
           assert.isDefined(address);    
           assert.notEqual(address, "0x0000000000000000000000000000000000000000"); 
           assert.notEqual(address, null);
           assert.notEqual(address, undefined);       
        });
    });

    describe("Adding new content",async () => {
        let event, initialContentCount;

        before(async () => {
            initialContentCount = await asMain.returnContentCount();
            const result = await asMain.addContent("abcd", "sampleurl");
            event = result.logs[0].args;
        });

        it("content count increases", async () => {
            const finalContentCount = await asMain.returnContentCount();
            assert.equal((finalContentCount - initialContentCount).toString(), "1");
        });

        it("content has correct name and file url", async () => {
            assert.equal(event[0], 0);
            assert.equal(event[1], "abcd");
            assert.equal(event[2], "sampleurl");
        });
    });

    describe("Viewing content",async () => {
        let result, event;

        before(async () => {
            await asMain.addContent("abcd", "sampleurl");
            result = await asMain.returnContent(0, {from: accounts[1]});
            event = result.logs[0].args;
        });

        it("emits event for viewing content", async () => {
            assert.ok(event);
            assert.equal(event[1], accounts[1]);
        });

        it("returns correct content", async () => {
            assert.equal(event[0].name, "abcd");
            assert.equal(event[0].fileURL, "sampleurl");
        });
    });

    describe("Funding projects", async() => {
        let initialInvestorBalance, initialEthBalance, initialGODSBalance;

        before(async () => {
            initialEthBalance = await web3.eth.getBalance(accounts[0]);
            initialInvestorBalance = await web3.eth.getBalance(accounts[1]);
            initialGODSBalance = await asiToken.balanceOf(accounts[1]);
            await asMain.investFunds(0, sampleURI, {from: accounts[1], value: web3.utils.toWei("0.1", "ether")});
        });

        it("investor can invest funds", async() => {
            const finalInvestorBalance = await web3.eth.getBalance(accounts[1]);       
            const difference = parseFloat(
                web3.utils.fromWei((initialInvestorBalance - finalInvestorBalance).toString())
            );               
            assert.isAbove(difference, 0.1);
        });

        it("creator receives funds", async() => {
            const finalEthBalance = await web3.eth.getBalance(accounts[0]);             
            assert.equal(web3.utils.fromWei((finalEthBalance - initialEthBalance).toString()), "0.1");
        });

        it("investor receives GODS tokens", async()=> {
            const finalGODSBalance = await asiToken.balanceOf(accounts[1]);
            assert.equal(web3.utils.fromWei((finalGODSBalance - initialGODSBalance).toString()), "0.1");

            const newSupply = await asiToken.totalSupply();
            assert.equal(web3.utils.fromWei(newSupply).toString(), "0.1");
        });

        it("investor receives NFT", async()=> {
            const NFTBalance = await asNFT.balanceOf(accounts[1]);
            assert.equal(NFTBalance, 1);
        });
    });
})
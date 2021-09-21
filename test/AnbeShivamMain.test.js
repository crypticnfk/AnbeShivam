const AnbeShivamMain = artifacts.require('AnbeShivamMain');
const AnbeShivamInvestorToken = artifacts.require('AnbeShivamInvestorToken');

contract('AnbeShivamMain', (accounts) => {
    let asMain, asiToken;

    before(async () =>{
      asMain = await AnbeShivamMain.deployed();
      asiToken = await AnbeShivamInvestorToken.deployed();
      await asMain.setTokenContractAddress(await asiToken.address);
      await asiToken.setMinterRole(await asMain.address);
    })

    describe("Contract Deployment", async () => {

        it("contract deploys succesfully", async () => {
           const address = await asMain.address;
           assert.isDefined(address);    
           assert.notEqual(address, "0x0000000000000000000000000000000000000000"); 
           assert.notEqual(address,null);
           assert.notEqual(address,undefined);       
        })
    })

    describe("Add new content",async () => {
        let event, initialContentCount;

        before(async () => {
            initialContentCount = await asMain.returnContentCount();
            const result = await asMain.addContent("abcd", "sampleurl");
            event = result.logs[0].args;
        })

        it("content count increases", async () => {
            const finalContentCount = await asMain.returnContentCount();
            assert.equal((finalContentCount - initialContentCount).toString(), "1");
        })

        it("content has correct name and file", async () => {
            assert.equal(event.name, "abcd");
            assert.equal(event.fileURL, "sampleurl");
        })
    })

    describe("Fund contents", async() => {
        let initialEthBalance, initialGodsBalance;

        before(async () => {
            initialEthBalance = await web3.eth.getBalance(accounts[0]);
            initialGodsBalance = await asiToken.balanceOf(accounts[1]);
            await asMain.investFunds(0, {from: accounts[1], value: web3.utils.toWei("0.1", "ether")});
        })

        it("invest funds in content", async() => {
            const finalEthBalance = await web3.eth.getBalance(accounts[0]);                        
            assert.equal(web3.utils.fromWei((finalEthBalance - initialEthBalance).toString()), "0.1");
        })

        it("investor receives GODS tokens", async()=> {
            const finalGodsBalance = await asiToken.balanceOf(accounts[1]);
            assert.equal(web3.utils.fromWei((finalGodsBalance - initialGodsBalance).toString()), "0.1");
        })
    })
})
const AnbeShivamMain = artifacts.require('AnbeShivamMain');

contract('AnbeShivamMain', (accounts) => {
    let asm ;
    before(async () =>{
      asm = await AnbeShivamMain.deployed();
    })

    describe('Contract Deployment' ,async () =>{

        it('contract deploys succesfully', async () =>{
           const address = await asm.address;
           assert.isDefined(address);    
           assert.notEqual(address, "0x0000000000000000000000000000000000000000"); 
           assert.notEqual(address,null);
           assert.notEqual(address,undefined);       
        })
    })

    describe("Add contents",async ()=>{
        let event;
        before(async()=> {
            const result = await asm.addContent("abc","string");
            event=result.logs[0].args;
        })
        it("adds new content",async()=>{
            const contentcount=await asm.returncount();
            assert.equal(contentcount.toString(),"1");
            assert.equal(event.name,"abc");
            assert.equal(event.fileURL,"string");
        })
    })

    describe("Fund contents", async() => {
        let initialEthBalance, initialGodsBalance;

        before(async() => {
            initialEthBalance = await web3.eth.getBalance(accounts[0]);
            initialGodsBalance = await asm.balanceOf(accounts[1]);
            await asm.investFunds(0, {from: accounts[1], value: web3.utils.toWei("0.1", "ether")});
        })

        it("can send funds to the content creator", async() => {
            const finalEthBalance = await web3.eth.getBalance(accounts[0]);                        
            assert.equal(web3.utils.fromWei((finalEthBalance-initialEthBalance).toString()), "0.1");
        })

        it("investor can receive GODS tokens", async()=> {
            const finalGodsBalance = await asm.balanceOf(accounts[1]);
            assert.equal(web3.utils.fromWei((finalGodsBalance-initialGodsBalance).toString()), "0.1");
        })
    })
})
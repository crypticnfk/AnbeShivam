const AnbeShivamMain = artifacts.require('AnbeShivamMain');

contract('AnbeShivamMain', (accounts) => {
    let asm ;
    before(async () =>{
      asm = await AnbeShivamMain.deployed();

    })
    describe('contract deployment' ,async () =>{

        it('contract deploys succesfully', async () =>{
           const address = await asm.address;
           assert.isDefined(address);    
           assert.notEqual(address, "0x0000000000000000000000000000000000000000"); 
           assert.notEqual(address,null);
           assert.notEqual(address,undefined);       
        })
        
        it("contract has correct name", async () =>{
            const contractName = await asm.name;
            assert.equal(contractName, "AnbeShivamMain");

        })
    })
    describe("add content",async ()=>{
        let event;
        before(async()=> {
            const result = await asm.addContent("abc","string");
            event=result.logs[0].args;

        })
        it("adds new content",async()=>{
            const contentcount=await asm.returncount();
            assert.equal(contentcount.toString(),"1");
            assert.equal(event.name,"abc")
            assert.equal(event.fileURL,"string")

        })
    })

})
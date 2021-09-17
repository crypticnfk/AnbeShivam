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
           console.log("asm" , asm)         
        })
        
        it("contract has correct name", async () =>{
            const contractName = await asm.name;
            assert.equal(contractName, "AnbeShivamMain");

        })
    })

})
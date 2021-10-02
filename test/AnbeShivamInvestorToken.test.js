const AnbeShivamInvestorToken = artifacts.require('AnbeShivamInvestorToken');

contract('AnbeShivamInvestorToken', (accounts) => {
    let asiToken;

    before(async () =>{
        asiToken = await AnbeShivamInvestorToken.deployed();
        const MINTER_ROLE = web3.utils.soliditySha3("MINTER_ROLE");
        await asiToken.grantRole(MINTER_ROLE, accounts[0]);
    });

    describe("Contract Deployment", async () => {
        it("contract deploys succesfully", async () => {
           const address = await asiToken.address;
           assert.isDefined(address);    
           assert.notEqual(address, "0x0000000000000000000000000000000000000000"); 
           assert.notEqual(address, null);
           assert.notEqual(address, undefined);       
        });
    });

    describe("Investor Token checks", async() => {
        it("token has correct name, symbol and decimals", async() => {
            assert.equal(await asiToken.name(), "AnbeShivamInvestorToken");
            assert.equal(await asiToken.symbol(), "GODS");
            assert.equal(await asiToken.decimals(), 18);
        });
    });

    describe("Minting tokens", async () => {
        it("can mint new GODS tokens", async()=> {
            let initialGODSBalance = await asiToken.balanceOf(accounts[0]);
            await asiToken.mint(accounts[0], web3.utils.toWei("10"));
            let finalGODSBalance = await asiToken.balanceOf(accounts[0]);
            let difference = web3.utils.fromWei(finalGODSBalance) - web3.utils.fromWei(initialGODSBalance);
            assert.equal(difference.toString(), "10");            
        });
    });
})
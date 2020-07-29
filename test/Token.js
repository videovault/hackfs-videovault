const { expect } = require("chai");

describe("Token contract", function() {

    let Token;
    let buidlerToken;
    let TokenInstance;
    let owner;
    let addr1;
    let addr2;
    let addr3;
    let addr4;

    beforeEach(async function () {
        Token = await ethers.getContractFactory("nft");
        [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
        buidlerToken = await Token.deploy();
        TokenInstance = await buidlerToken.deployed();

        await buidlerToken.deployed();
    });
    
    describe("Token deployment", function() {
        it("Token contract should be deployed successfully", async function() {
            expect(TokenInstance.address).to.not.equal('');
            expect(TokenInstance.address).to.not.equal(null);
            expect(TokenInstance.address).to.not.equal(undefined);
            expect(TokenInstance.address).to.not.equal(0x0);
        });
        
        it("Token deployed should have a name", async function() {
            expect(await buidlerToken.name()).to.equal("Video-Vault");
        });
        
        it("Token deployed should have a symbol", async function() {
            expect(await buidlerToken.symbol()).to.equal("VIVA");
        });
    });

    describe("Adding content creators and consumers", function() {
    
        it("Should add content creators successfully", async function() {
            await buidlerToken.connect(addr1).AccountCredentials("Emily");
            [UserID, Username, Useraddress] = await TokenInstance.creators(0);
            // console.log(UserID);
            // console.log(Username);
            // console.log(Useraddress);
            expect(UserID.toNumber()).to.equal(1);
            expect(Username).to.equal("Emily");
            expect(Useraddress).to.equal(await addr1.getAddress());
        });

        it("Should add subscribers successfully", async function() {
            await buidlerToken.connect(addr2).Subscribe("Frank");
            [SubsID, Subsname, Subsaddress] = await TokenInstance.subscribers(0);
            // console.log(SubsID);
            // console.log(Subsname);
            // console.log(Subsaddress);
            expect(SubsID.toNumber()).to.equal(1);
            expect(Subsname).to.equal("Frank");
            expect(Subsaddress).to.equal(await addr2.getAddress());
        });
    });

    describe("Should successfully make association between content creators and subscribers", function() {

        it("Associate the subscribers to the correct content creators and vice versa", async function() {
            await buidlerToken.connect(addr3).AccountCredentials("George");
            await buidlerToken.connect(addr4).Subscribe("Amy");
            const result = await buidlerToken.Association(0,[1]);
            // console.log(await TokenInstance.subscribers(0));
        });
    });
});
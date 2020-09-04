const { default: Web3 } = require("web3");

const Main = artifacts.require("main");
module.exports = async function(deployer) {
    await deployer.deploy(Main);
    let a=await web3.eth.getAccounts();
    let main=await Main.deployed();
};
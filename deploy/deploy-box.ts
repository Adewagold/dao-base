import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { ADDRESS_ZERO } from '../helper-hardhat-config';


const deployBox: DeployFunction = async function(hre: HardhatRuntimeEnvironment){
    const {getNamedAccounts, deployments, network} = hre;
    const {deploy, log} = deployments;
    const { deployer } = await getNamedAccounts();
    log("----------------------------------------------------")
    log("Deploying Box Contract...")

    const box = await deploy("Box",
    {
        from: deployer,
        args:[],
        log:true,
    });

    //transfer ownershipt
    const boxContract = await ethers.getContractAt("Box", box.address)
    const timeLock = await ethers.getContract("TimeLock")
    const transferTx = await boxContract.transferOwnership(timeLock.address);
    await transferTx.wait(1);
    log("You've done it!!!");
}

 
export default deployBox;


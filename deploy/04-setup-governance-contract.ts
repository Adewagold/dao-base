import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { ADDRESS_ZERO } from '../helper-hardhat-config';


const setupContracts: DeployFunction = async function(hre: HardhatRuntimeEnvironment){
    const {getNamedAccounts, deployments, network} = hre;
    const {deploy, log} = deployments;
    const { deployer } = await getNamedAccounts();
    log("----------------------------------------------------")
    log("Deploying GovernanceToken...")
    const timeLock = await ethers.getContract("TimeLock", deployer); //attach it to the deploeyer
    const governor = await ethers.getContract("GovernorContract", deployer);

    log("setting up roles");
    const proposerRole = await timeLock.PROPOSER_ROLE();
    const executorRole = await timeLock.EXECUTOR_ROLE();
    const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE();

    const proposerTx = await timeLock.grantRole(proposerRole,governor.address);
    await proposerTx.wait(1);
    const executorTx = await timeLock.grantRole(executorRole,ADDRESS_ZERO);
    await executorTx.wait(1);
    const revokeRoleTx = await timeLock.revokeRole(adminRole, deployer);
    await revokeRoleTx.wait(1);

}


export default setupContracts;
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { MIN_DELAY, QUORUM_PERCENTAGE, VOTING_DELAY, VOTING_PERIOD } from '../helper-hardhat-config';


const deployGovernorContract: DeployFunction = async function(hre: HardhatRuntimeEnvironment){
    const {getNamedAccounts, deployments, network} = hre;
    const {deploy, log, get} = deployments;
    const { deployer } = await getNamedAccounts();
    log("----------------------------------------------------")
    log("Deploying Governor Contract contract...");
    const governanceToken = await get("GovernanceToken");
    const timeLock = await get("TimeLock");
    const governorContract = await deploy("GovernorContract", {
        from: deployer,
        args:[governanceToken.address, timeLock.address, VOTING_DELAY, VOTING_PERIOD, QUORUM_PERCENTAGE],
        log:true
    });
    log("Governor Contract deployed")
}

export default deployGovernorContract;
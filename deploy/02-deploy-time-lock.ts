import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { MIN_DELAY } from '../helper-hardhat-config';


const deployTimeLockContract: DeployFunction = async function(hre: HardhatRuntimeEnvironment){
    const {getNamedAccounts, deployments, network} = hre;
    const {deploy, log} = deployments;
    const { deployer } = await getNamedAccounts();
    log("----------------------------------------------------")
    log("Deploying TimeLock contract...")

    const timeLockContract = await deploy("TimeLock",{
        from: deployer,
        args:[MIN_DELAY, [], []],
        log:true,
        //waitConfirmations:
        });
    //verify
    log(`Deployed timelock contrac to address ${timeLockContract.address}`);
    
}

// const delegate = async(governanceTokenAddress: string, delegatedAccount: string) =>{
//     const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress);
//     const tx = await governanceToken.delegate(delegatedAccount);
//     await tx.wait(1);
//     console.log(`Checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}`);
    
// }

export default deployTimeLockContract;
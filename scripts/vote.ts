import { ethers, network } from "hardhat";
import { developmentChains, proposalsFile, VOTING_DELAY, VOTING_PERIOD } from "../helper-hardhat-config";
import * as fs from "fs";
import { moveBlocks } from "../utils/move-blocks";

const index = 0;

async function main(proposalIndex: number){
    const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"))
    const proposalId = proposals[network.config.chainId!][proposalIndex];
    // 0 = Against, 1= For, 2 = Abstain
    const voteWay = 1;
    const reason = "I like a do da cha cha";
    await vote(proposalId, voteWay, reason);

}

export async function vote(proposalId: string, voteWay: number, reason:string){
    console.log("Voting......")
    const governor = await ethers.getContract("GovernorContract");
    const voteTx = await governor.castVoteWithReason(proposalId, voteWay, reason);

    const voteTxResponse = await voteTx.wait(1);
    const proposalState = await governor.state(proposalId);
    console.log(`Current Proposal State: ${proposalState}`);

    if(developmentChains.includes(network.name)){
        await moveBlocks(VOTING_PERIOD+1);
    }
    console.log("Yikes! Finally voted");
}

main(index)
    .then(()=> process.exit(0))
    .catch((error)=>{
        console.log(error);
        process.exit(1)
});

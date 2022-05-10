import { ethers, network } from "hardhat";
import { developmentChains, FUNC, NEW_STORE_VALUE, proposalsFile, PROPOSAL_DESCRIPTION, VOTING_DELAY } from "../helper-hardhat-config";
import { moveBlocks } from "../utils/move-blocks";
import * as fs from "fs";
export async function propose(args:any[], functionTocall: string, proposalDescription:string){
    const governor = await ethers.getContract("GovernorContract");
    const box = await ethers.getContract("Box");
    const encodedFunctionCall = box.interface.encodeFunctionData(functionTocall, args);
    
    console.log("Logging encodedFunction call");
    console.log(`Proposing ${functionTocall} on ${box.address} with ${args}`)
    console.log(`Prpososal Description ${proposalDescription}`);
    const proposeTx  = await governor.propose([box.address], [0], [encodedFunctionCall], proposalDescription);
    await proposeTx.wait(1);

    if(developmentChains.includes(network.name)){
        await moveBlocks(VOTING_DELAY+1)
    }
    const proposeReceipt = await proposeTx.wait(1);
    const proposalId = proposeReceipt.events[0].args.proposalId;
    let proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf-8"))

    proposals[network.config.chainId!.toString()].push(proposalId.toString());
    fs.writeFileSync(proposalsFile, JSON.stringify(proposals))
    console.log(encodedFunctionCall);
}

propose([NEW_STORE_VALUE], FUNC, PROPOSAL_DESCRIPTION)
    .then(()=> process.exit(0))
    .catch((error)=>{
        console.log(error);
        process.exit(0);
})
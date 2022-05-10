// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;
// We want to wait for a new vote to be executed

// Everyone who holds the governance token has to pay 5 tokens

//give time to users to get out if they don't like an update
import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController{

    // minDelay: How long you have to wait before executing
    // proposers is the list of addresses that can propose
    // executors: who can execute when a proposal passes
    constructor(
        uint256 minDelay, 
        address[] memory proposers, 
        address[] memory executors) TimelockController(minDelay, proposers, executors){
            
        }

}
near view near-challenge-7.testnet viewCandidates 

near call near-challenge-7.testnet addCandidate '{ "name": "Trump" }' --accountId martint.testnet --gas 300000000000000

near call near-challenge-7.testnet addCandidate '{ "name": "Putin" }' --accountId martint.testnet --gas 300000000000000

near call near-challenge-7.testnet addCandidate '{ "name": "Cat from NEAR" }' --accountId martint.testnet --gas 300000000000000

near view near-challenge-7.testnet viewCandidates 

near view near-challenge-7.testnet viewVotes 

near call near-challenge-7.testnet vote '{ "candidateId": "2" }' --accountId martint.testnet --gas 300000000000000

near view near-challenge-7.testnet viewCandidates 

near view near-challenge-7.testnet viewVotes 

near call near-challenge-7.testnet vote '{ "candidateId": "0" }' --accountId martint.testnet --gas 300000000000000

near view near-challenge-7.testnet viewCandidates 

near view near-challenge-7.testnet viewVotes 

near call near-challenge-7.testnet addCandidate '{ "name": "Nobody" }' --accountId martint.testnet --gas 300000000000000

near view near-challenge-7.testnet viewCandidates 

near call near-challenge-7.testnet removeCandidate '{ "candidateId": "3" }' --accountId martint.testnet --gas 300000000000000

near view near-challenge-7.testnet viewCandidates 

near view near-challenge-7.testnet viewVotes 

near call near-challenge-7.testnet removeVote --accountId martint.testnet --gas 300000000000000

near view near-challenge-7.testnet viewCandidates 

near view near-challenge-7.testnet viewVotes 

near call near-challenge-7.testnet removeVote --accountId martint.testnet --gas 300000000000000

near call near-challenge-7.testnet addCandidateTrumpMode '{ "name": "Trump" }' --accountId martint.testnet --gas 300000000000000

near call near-challenge-7.testnet addCandidateTrumpMode '{ "name": "Trump Junior" }' --accountId martint.testnet --gas 300000000000000

near view near-challenge-7.testnet viewCandidates 

near call near-challenge-7.testnet addCandidateHitlerMode '{ "name": "Hitler" }' --accountId martint.testnet --gas 300000000000000

near call near-challenge-7.testnet addCandidate '{ "name": "Somebody" }' --accountId martint.testnet --gas 300000000000000
near call near-challenge-7.testnet removeCandidate '{ "candidateId": "5" }' --accountId martint.testnet --gas 300000000000000

near view near-challenge-7.testnet viewCandidates 

near call near-challenge-7.testnet askCatToReviveCandidate '{ "candidateId": "5" }' --accountId martint.testnet --gas 300000000000000
near call near-challenge-7.testnet askCatToReviveCandidate '{ "candidateId": "5" }' --accountId martint.testnet --gas 300000000000000
near call near-challenge-7.testnet askCatToReviveCandidate '{ "candidateId": "5" }' --accountId martint.testnet --gas 300000000000000
near call near-challenge-7.testnet askCatToReviveCandidate '{ "candidateId": "5" }' --accountId martint.testnet --gas 300000000000000
near call near-challenge-7.testnet askCatToReviveCandidate '{ "candidateId": "5" }' --accountId martint.testnet --gas 300000000000000

near view near-challenge-7.testnet viewCandidates 

near view near-challenge-7.testnet viewVotes 

near call near-challenge-7.testnet vote360NoScopeMode --accountId spiritdungeons.testnet --gas 300000000000000

near view near-challenge-7.testnet viewCandidates 

near view near-challenge-7.testnet viewVotes 

near call near-challenge-7.testnet vote360NoScopeMode --accountId spiritdungeons.testnet --gas 300000000000000

near view near-challenge-7.testnet viewCandidates 

near view near-challenge-7.testnet viewVotes 

near view near-challenge-7.testnet getLeadingCandidate 

near call near-challenge-7.testnet startNewElection --accountId martint.testnet --gas 300000000000000

near view near-challenge-7.testnet viewCandidates 

near view near-challenge-7.testnet viewVotes 

near view near-challenge-7.testnet viewLogs

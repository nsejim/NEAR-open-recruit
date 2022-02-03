

import { VMContext } from 'near-sdk-as';
import { listProofs, recordProof } from '../assembly';
import { Context } from 'near-sdk-as';
import { Proof, ProofData, PROOF_TYPE } from '../assembly/models/proof';


describe("Openoroofs Contract", () => {
    beforeEach(() => {
        VMContext.setCurrent_account_id("alice.testnet")
    })

    describe("recordProof method", () => {
        it('should add the new proof into the proof list of ALice', () => {
            VMContext.setSigner_account_id("near.testnet");
            const proofData: ProofData =  {
                description: "NCD",
                type: PROOF_TYPE.CERTIFICATE,
                date: Context.blockTimestamp
            }
            recordProof(proofData, "alice.testnet");

            expect(listProofs("alice.testnet").length).toBe(1);
            expect(listProofs("alice.testnet")[0].associatedAccountId).toBe("alice.testnet");
        })

    })
})
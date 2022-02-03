import { Context, VMContext } from "near-sdk-as";
import { Proof, ProofData, PROOF_TYPE } from '../assembly/models/proof';


describe('Proof Model', () => {
    beforeEach(() => {
        VMContext.setSigner_account_id("alice.testnet");
    });

    it('should correctly record the proof addedBy and associated Account Ids', () => {
        VMContext.setSigner_account_id("near.testnet");
        const proofData: ProofData =  {
            description: "NCD",
            type: PROOF_TYPE.CERTIFICATE,
            date: Context.blockTimestamp
        }
        const newProof = new Proof("1", proofData, "alice.testnet");

        expect(newProof.addedByAccountId).toBe("near.testnet");
        expect(newProof.associatedAccountId).toBe("alice.testnet");
    })

})

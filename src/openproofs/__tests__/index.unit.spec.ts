

import { VMContext } from 'near-sdk-as';
import { listProofs, recordProof } from '../assembly';
import { Context } from 'near-sdk-as';
import { Proof, ProofData, PROOF_TYPE } from '../assembly/models/proof';
import { getProof } from '../assembly/index';

const OPENPROOFS_CONTRACT= "openproofs.ncd.nsejim.test";

describe("Openoroofs Contract", () => {
    beforeEach(() => {
        VMContext.setCurrent_account_id("alice.testnet")
    })

    describe("recordProof method", () => {
        it('should add the new proof in the proof list of the sender', () => {
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

    describe("getProof method", () => {
        it('should get data of requested proofId', () => {
            VMContext.setSigner_account_id("near.testnet");
            const proofData: ProofData =  {
                description: "NCD",
                type: PROOF_TYPE.CERTIFICATE,
                date: Context.blockTimestamp
            }
            const proofId = recordProof(proofData, "alice.testnet");
            VMContext.setSigner_account_id(OPENPROOFS_CONTRACT);
            const requestedProof: Proof = getProof("alice.testnet", proofId);
            expect(requestedProof.data.description).toBe("NCD")
        })
    })
})
import { Proof, ProofData, PROOF_TYPE } from "./models/proof";
import { proofs } from './states';
import { Context } from 'near-sdk-as';
import { generateUniqueId } from "../../utils";

export function recordProof(proofData: ProofData, associatedAccountId: string = ''): void {
  associatedAccountId = associatedAccountId || Context.sender;
  const accountProofs = listProofs(associatedAccountId);
  const existingJProofIds: string[] = accountProofs.map<string>(proof => proof.id);
  
  const id: string = generateUniqueId("PROOF", existingJProofIds);
  const newProof = new Proof(id, proofData, associatedAccountId);
  accountProofs.push(newProof);

  proofs.set(associatedAccountId, accountProofs);

}



// viewMethods
export function listProofs(accountId: string): Proof[] {
  return proofs.getSome(accountId);
}

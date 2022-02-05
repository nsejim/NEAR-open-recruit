import { Proof, ProofData } from "./models/proof";
import { proofs } from './states';
import { Context } from 'near-sdk-as';
import { generateUniqueId } from "../../utils";


const OPENPROOFS_CONTRACT= "openproofs.ncd.nsejim.test";

export function recordProof(proofData: ProofData, associatedAccountId: string = ''): string {
  associatedAccountId = associatedAccountId || Context.sender;
  const accountProofs = listProofs(associatedAccountId) ;
  const existingJProofIds: string[] = accountProofs.map<string>(proof => proof.id);
  
  const id: string = generateUniqueId("PROOF", existingJProofIds);
  const newProof = new Proof(id, proofData, associatedAccountId);
  accountProofs.push(newProof);

  proofs.set(associatedAccountId, accountProofs);
  return newProof.id;
}

// viewMethods
export function listProofs(accountId: string): Proof[]  {
  const result = proofs.get(accountId);
  return  result ? result : [];
}

export function getProof(accountId: string, proofId: string): Proof {
  const allProofs = listProofs(accountId);
  const proofIdx = allProofs.map<string>(proof => proof.id).indexOf(proofId);
  return allProofs[proofIdx];
}

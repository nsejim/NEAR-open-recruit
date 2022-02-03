import { PersistentMap } from "near-sdk-as";
import { Proof } from './models/proof';

type AccountId = string;
export const proofs = new PersistentMap<AccountId, Proof[]>("proofs");

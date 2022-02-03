import { Context } from 'near-sdk-as';

export enum PROOF_TYPE {
    CERTIFICATE,
    DRIVING_LICENCE,
    DEGREE
}

@nearBindgen
export class ProofData {
    description: string;
    type: PROOF_TYPE;
    date: u64;
}


@nearBindgen
export class Proof {
    recordedOn: u64;
    addedByAccountId: string; 

    constructor(
        public id: string,
        public data: ProofData, 
        public associatedAccountId: string = ''
        ) {
        this.addedByAccountId = Context.sender;
        this.recordedOn = Context.blockTimestamp;
    }
}
import { Context } from "near-sdk-as";

@nearBindgen
export class Application {
    createdOn: u64; 
    applicantAccountId: string; 

    constructor (
        public id: string,
        public jobId: string,
        public name: string, 
        public proofIds: string[]) {
            this.createdOn = <u64>Context.blockTimestamp;
            this.applicantAccountId = Context.sender; // The  job is only created by the sender account
    }
}
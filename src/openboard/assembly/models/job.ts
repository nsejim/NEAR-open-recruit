import { Context } from "near-sdk-as";

@nearBindgen
export class Employer {
    name: string;
    accountId: string;
}

@nearBindgen
export class JobState {
    title: string;
    deadline: u64;
}

@nearBindgen
export class EmployerJobPair {
    id: string;
    employer: Employer;
    data: JobState;
    createdOn: u64; 
    updatedOn: u64;
};

@nearBindgen
export class Job { 
    employerAccountId: string;
    createdOn: u64; 
    updatedOn: u64;
    constructor(public id: string, public data: JobState) {
        this.createdOn = <u64>Context.blockTimestamp;
        this.employerAccountId = Context.sender; // The  job is only created by the sender account
    }
}

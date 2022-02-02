
import { Context } from 'near-sdk-as';
import { VMContext } from 'near-mock-vm';
import { Job } from '../assembly/models/job';

describe('Job ', () => {

    beforeEach(() => {
        VMContext.setSigner_account_id("employer.testnet");
    });

    it("should have the employer accountId set correctly after job is created", () => {
        const id: string = "1";
        const job = new Job(id, {
            title: "NEAR full stack developer",
            deadline: <u64>Date.fromString("2022/02/28 15:00").getTime()
        });
        
        expect(job.employerAccountId).toStrictEqual("employer.testnet");
    })

    it('should have createdOn date set', () => {
        const id: string = "1";
        const job = new Job(id, {
            title: "NEAR full stack developer",
            deadline: <u64>Date.fromString("2022/02/28 15:00").getTime()
        });

        expect(job.createdOn).toStrictEqual(Context.blockTimestamp);
    })

    it('should id be correctly set', () => {
        const id: string = "1";
        const job = new Job(id, {
            title: "NEAR full stack developer",
            deadline: <u64>Date.fromString("2022/02/28 15:00").getTime()
        });

        expect(job.id).toBe(id);
    })
   
})

import { Context, VMContext } from "near-sdk-as";
import { Application } from '../assembly/models/application';


describe('Application', () => {
    beforeEach(() => {
        VMContext.setSigner_account_id("alice.testnet");
    });

    it('should correctly set the candidate account Id', () => {
        const newApplication = new Application("1", "JOB-1234", "Alice");

        expect(newApplication.applicantAccountId).toBe("alice.testnet");
    })

    it('should have createdOn date set', () => {
        const newApplication = new Application("1", "JOB-1234", "Alice");

        expect(newApplication.createdOn).toStrictEqual(Context.blockTimestamp);
    })
})

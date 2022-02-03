
import { Context, VMContext } from 'near-sdk-as'
import { registerAsEmployer, postJob, updateJob, listJobs, apply, listApplications } from '../assembly';
import { employers, jobs, applications } from '../assembly/states';

describe('openboard Contract', () => {

  beforeEach(() => {
    VMContext.setSigner_account_id("employer.testnet");
    registerAsEmployer({
      name: 'NEAR',
      accountId: ''
    })
  });

  describe('registerAsEmployer method', () => {
    it('should correctly register the sender account as an employer', () => {
            
      const sender = Context.sender;
      expect(employers.contains(sender)).toBe(true);
      expect(employers.getSome(sender).name).toBe("NEAR")
      expect(employers.getSome(sender).accountId).toBe("employer.testnet")
    })
  })
  
  describe('postJob method', () => {
    it('should correctly post a job for a registered user ', () => {

      const jobId = postJob({
        title: "Software Developer",
        deadline: <u64> Date.now()
      })

      expect(jobs.length).toBe(1);
      expect(jobs[0].createdOn).toStrictEqual(Context.blockTimestamp);
      expect(jobs[0].id).toBe(jobId);
    })
  })

  describe('updateJob method', () => {
    it('should update the job correctly', () => {
      const jobId = postJob({
        title: "Software Developer",
        deadline: <u64> Date.now()
      })
      const job = jobs[0];
      job.data.title = "Blockchain Analyst";
      const index = updateJob(jobId, job.data);
      expect(index).toBe(0);
      expect(jobs[index].data.title).toBe("Blockchain Analyst");

    })

    it('should not updated the job if the sender is different from the employer owner', () => {
      const jobId = postJob({
        title: "Software Developer",
        deadline: <u64> Date.now()
      })
      expect(jobs[0].data.title).toStrictEqual("Software Developer");

      VMContext.setSigner_account_id("employer1.testnet");
      const job = jobs[0];
      job.data.title = "Blockchain Analyst";
      const index = updateJob(jobId, job.data);
      expect(index).toBe(0);
      expect(jobs[index].data.title).toBe("Software Developer");

    })
  })

  describe('listJobs method', () => {
    it('should returns empty list when no job has been created yet', () => {

      expect(listJobs().length).toBe(0);
    })

    it('should returns a jobs list containing the created job', () => {
      registerAsEmployer({
  name: 'NEAR',
  accountId: ''
})
      const jobId = postJob({
        title: "Software Developer",
        deadline: <u64> Date.now()
      })

      const data = listJobs();
      expect(data.length).toBe(1);
      expect(data[0].employer.name).toStrictEqual("NEAR");
      expect(data[0].id).toBe(jobId);
    })

    it('should only return the jobs list of the related employer', () => {
      registerAsEmployer({
        name: 'NEAR',
        accountId: ''
      })
      postJob({
        title: "Software Developer",
        deadline: <u64> Date.now()
      })

      VMContext.setSigner_account_id("employer2.testnet");
      registerAsEmployer({
        name: 'AMAZON',
        accountId: ''
      })
      postJob({
        title: "Devops Engineer",
        deadline: <u64> Date.now()
      })

      let data = listJobs();
      expect(data.length).toBe(2);
      expect(data[1].employer.name).toStrictEqual("AMAZON");
      
      VMContext.setSigner_account_id("employer.testnet");
      data = listJobs(true);
      expect(data.length).toBe(1);

    })
  })


  describe('apply method', () => {
    it('should correctly save the application', () => {
      VMContext.setSigner_account_id("employer.testnet");
      registerAsEmployer({
        name: 'NEAR',
        accountId: ''
      })
      const jobId = postJob({
        title: "Devops Engineer",
        deadline: <u64> Date.now()
      })

      VMContext.setSigner_account_id("alice.testnet");
      apply(jobId, "Alice");
      const receivedApplications = listApplications(jobId);
      expect(receivedApplications.length).toBe(1);
      expect(receivedApplications[0].applicantAccountId).toBe("alice.testnet");
    })
  })
})

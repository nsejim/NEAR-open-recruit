import { Context, ContractPromise, logging } from 'near-sdk-as'

import { Job, Employer, JobState, EmployerJobPair }  from "./models/job";
import { jobs, employers, applications } from './states';
import { generateUniqueId } from '../../utils';
import { Application } from './models/application';
import { GetProofArgs } from './models/openProofAPI';

const OPENPROOFS_CONTRACT= "openproofs.ncd.nsejim.test";

// changeMethods
export function registerAsEmployer(employer: Employer): void {
  employer.accountId = Context.sender;
  if(employer.accountId) {
    employers.set(employer.accountId, employer); // add the current sender account as employer
    logging.log(`Employer ${Context.sender} is successfully registered!`)
  } else {
    logging.log(`Failed to create employer.`)
  }

}

export function postJob(job: JobState): string {
  assert(employers.contains(Context.sender), "Employer not registered!");
  const existingJobIds: string[] = listJobs().map<string>(job => job.id);
  const id: string = generateUniqueId("JOB", existingJobIds);
  const newJob = new Job(id, job); // create the new job
  jobs.push(newJob); // add in the jobs set
  logging.log(`The job ${job.title} is posted!`)
  return newJob.id;
}


export function updateJob(id: string, job: JobState): i32 {
  const allJobs: EmployerJobPair[] = listJobs();
  const oldJobIndex: i32 = <i32> listJobs().map<string>(job => job.id).indexOf(id);
  assert(oldJobIndex > -1, "Job to be updated has not been found");
  const jobData: Job = jobs[oldJobIndex];
  if(Context.sender == jobData.employerAccountId) {
    jobData.id = id || generateUniqueId("JOB", allJobs.map<string>(job => job.id));
    jobData.data = job;
    jobData.updatedOn = Context.blockTimestamp;
    jobs.replace(oldJobIndex, jobData);
    logging.log(`The job ${job.title} has been well updated!`)
  } else {
    logging.log(`A job can only be updated by its owner!`)
    
  }
  return <i32>oldJobIndex;
}

export function apply(jobId: string, name: string, proofIds: string[]): string {
  const receivedApplications = listApplications(jobId);
  assert(receivedApplications.findIndex(application => application.applicantAccountId === Context.sender) < 0, "A candidate can only apply once on a given job");
  const existingApplicationIds: string[] = listApplications(jobId).map<string>(application => application.id);
  const id: string = generateUniqueId("APP", existingApplicationIds);
  const newApplication = new Application(id, jobId, name, proofIds);
  applications.push(newApplication);
  return newApplication.id;
}


export function viewProof(jobId: string, applicationId: string, proofId: string): void {
      const application: Application = viewApplication(jobId, applicationId);
      callGetProof(application.applicantAccountId, proofId);
}

function callGetProof(accountId: string, proofId: string): void {
  let args: GetProofArgs = { accountId, proofId };
  let promise = ContractPromise.create(
                        OPENPROOFS_CONTRACT, 
                        "getProof", 
                        args, 
                        100000000000000);
  logging.log("Open Proof Contract called !")
  promise.returnAsResult();
}


// viewMethods
export function listJobs(myJobsOnly: boolean = false): EmployerJobPair[] {
  let allJobs: Array<Job> = [];
  for (let index = 0; index < jobs.length; index++) {
    const element = jobs[index];
    allJobs.push(element);
  } 
  if (myJobsOnly) {  
    allJobs = allJobs.filter(job => job.employerAccountId == Context.sender); // filter only the job for this sender employer
  }
  return allJobs.map<EmployerJobPair>(job => {
    const employer = employers.getSome(job.employerAccountId);
    return {
      id: job.id,
      employer: {
        name: employer.name ,
        accountId: job.employerAccountId
      },
      data: job.data,
      createdOn: job.createdOn, 
      updatedOn: job.updatedOn
    }
  })
}

export function listApplications(jobId: string): Application[] {
  let jobs = listJobs();
  const jobIndex: i32 = <i32> jobs.map<string>(job => job.id).indexOf(jobId);
  let job: EmployerJobPair = jobs[jobIndex];
  let jobApplications: Array<Application> = [];
  if (job) {  
    for (let index = 0; index < applications.length; index++) {
      const application = applications[index];
      if (application.jobId == job.id) {
        jobApplications.push(application);
      }
    } 
  }
  return jobApplications;
}


export function viewApplication(jobId: string, applicationId: string): Application {
  const jobApplications = listApplications(jobId);
  const applicationIdx = jobApplications.map<string>(app => app.id).indexOf(applicationId);
  return jobApplications[applicationIdx];
}
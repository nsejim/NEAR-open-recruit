import { Context, logging } from 'near-sdk-as'

import { Job, Employer, JobState, EmployerJobPair }  from "./models/job";
import { jobs, employers } from './states';
import { generateUniqueId } from '../../utils';


// changeMethods
export function registerAsEmployer(employer: Employer): void {
  employer.accountId = Context.sender;
  employers.set(employer.accountId, employer); // add the current sender account as employer
  logging.log(`Employer ${Context.sender} is successfully registered!`)
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

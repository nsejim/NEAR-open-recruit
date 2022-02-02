import { PersistentMap, PersistentVector } from "near-sdk-as";
import { Employer, Job } from "./models/job";
import { Application } from './models/application';

type AccountId = string;
export const employers = new PersistentMap<AccountId, Employer>("employers");
export const jobs = new PersistentVector<Job>("jobs");
export const applications = new PersistentVector<Application>("applications");
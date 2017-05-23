import sample_projects from '../services/samples/projects.json'
import sample_trackers from '../services/samples/trackers.json'
import sample_issue_statuses from '../services/samples/issue_statuses.json'
import sample_users from '../services/samples/users.json'

export const LIST_OF_PROJECTS = sample_projects.projects;
export const LIST_OF_TRACKERS = sample_trackers.trackers;
export const LIST_OF_STATUSES = sample_issue_statuses.issue_statuses;
export const LIST_OF_USERS = [{"id":"me","login":"me","firstname":"moi","lastname":""}, ...sample_users.users];

export const AVAILABLE_OPERATORS = ['!=', ':', '=', '<', '>']; // ORDER IS IMPORTANT (highest priority first)

export const AVAILABLE_FILTERS = [];

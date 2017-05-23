import sample_projects from '../services/samples/projects.json'
import sample_trackers from '../services/samples/trackers.json'
import sample_issue_statuses from '../services/samples/issue_statuses.json'
import sample_users from '../services/samples/users.json'

export const LIST_OF_PROJECTS = sample_projects.projects;
export const LIST_OF_TRACKERS = sample_trackers.trackers;
export const LIST_OF_STATUSES = sample_issue_statuses.issue_statuses;
export const LIST_OF_USERS = [{"id":"me","login":"me","firstname":"moi","lastname":""}, ...sample_users.users];

export const AVAILABLE_OPERATORS = ['!=', ':', '=', '<', '>']; // ORDER IS IMPORTANT (highest priority first)

export const TYPES_OF_FILTERS = {
  SELECT:"select",
  BOOLEAN:"boolean",
  DATE:"date",
  TEXT:"text"
};

export const AVAILABLE_FILTERS = {
  projects: {label:'Projets', values: LIST_OF_PROJECTS, type: TYPES_OF_FILTERS.SELECT, placeholder: "Tous les projets"},
  trackers: {label:'Trackers', values: LIST_OF_TRACKERS, type: TYPES_OF_FILTERS.SELECT, placeholder: "Tous les trackers"},
  status: {label:'Statuts', values: LIST_OF_STATUSES, type: TYPES_OF_FILTERS.SELECT, placeholder: "Tous les statuts"},
  watched: {label:'Observateur', type: TYPES_OF_FILTERS.BOOLEAN, placeholder: "Indéterminé"},
  assigned_to: {label:'Assigné à', values: LIST_OF_USERS, type: TYPES_OF_FILTERS.SELECT, placeholder: "Indéterminé"},
  updated_at: {label:'Date de mise à jour', type: TYPES_OF_FILTERS.DATE, placeholder: 'DD/MM/YYYY'},
  text: {label:'Contient', type: TYPES_OF_FILTERS.TEXT, placeholder: "contenu recherché"}
};

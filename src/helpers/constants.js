import sample_projects from '../services/samples/projects.json'
import sample_trackers from '../services/samples/trackers.json'
import sample_issue_statuses from '../services/samples/issue_statuses.json'
import sample_users from '../services/samples/users.json'

const BOOLEAN_VALUES = [{name: 'true'}, {name: 'false'}];

export const MAGIC_VALUES = {
  me: {"id":"me",
    text:"me",
    "login":"me",
    "firstname":"moi",
    "lastname":""},
  today: {text: "Aujourd'hui",
    value: '0 day' },
  one_week_ago: {text: "Il y a une semaine",
    value: '1 week'},
  one_month_ago: {text: "Il y a un mois",
    value: '1 month'}
};

export const LIST_OF_PROJECTS = sample_projects.projects;
export const LIST_OF_TRACKERS = sample_trackers.trackers;
export const LIST_OF_STATUSES = sample_issue_statuses.issue_statuses;
export const LIST_OF_USERS = [MAGIC_VALUES.me, ...sample_users.users];

export const AVAILABLE_OPERATORS = ['!=', ':', '=', '<', '>']; // ORDER IS IMPORTANT (highest priority first)

export const TYPES_OF_FILTERS = {
  SELECT:{name: "select", operators: [':']},
  BOOLEAN:{name: "boolean", operators: [':']},
  DATE:{name: "date", operators: [':', '<', '>']},
  TEXT:{name: "text", operators: [':']}
};

export const AVAILABLE_FILTERS = {
  projects: {label:'Projets',
    type: TYPES_OF_FILTERS.SELECT,
    values: LIST_OF_PROJECTS,
    magic_values: [],
    placeholder: "Tous les projets"},
  trackers: {label:'Trackers',
    type: TYPES_OF_FILTERS.SELECT,
    values: LIST_OF_TRACKERS,
    magic_values: [],
    placeholder: "Tous les trackers"},
  status: {label:'Statuts',
    type: TYPES_OF_FILTERS.SELECT,
    values: LIST_OF_STATUSES,
    magic_values: [],
    placeholder: "Tous les statuts"},
  watched: {label:'Observateur',
    type: TYPES_OF_FILTERS.BOOLEAN,
    values: BOOLEAN_VALUES,
    placeholder: "Indéterminé"},
  assigned_to: {label:'Assigné à',
    type: TYPES_OF_FILTERS.SELECT,
    values: LIST_OF_USERS,
    magic_values: [MAGIC_VALUES.me],
    placeholder: "Indéterminé"},
  updated_at: {label:'Date de mise à jour',
    type: TYPES_OF_FILTERS.DATE,
    placeholder: 'DD/MM/YYYY'},
  text: {label:'Contient',
    type: TYPES_OF_FILTERS.TEXT,
    placeholder: "contenu recherché"}
};

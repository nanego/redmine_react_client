/* eslint-disable no-undef */

const api_key = 'XXXXX';  // TODO set up auth system

const default_limit = 50; // TODO Should be fetched from IssueServiceConfig.default_limit;

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  }
}

function login(query, cb) {
  return fetch('http://'+query['email']+':'+query['password']+'@localhost:3033/issues.json', {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function parseJSON(response) {
  return response.json();
}

function getAllProjects(query, cb) {
  return fetch(`projects.json?q=${query}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getAllTrackers(query, cb) {
  return fetch(`trackers.json?q=${query}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function buildIssueQueryWithParams(offset, limit, filters, base_url){
  var param_filters = "";
  if (filters["status_id"] === undefined) {
    param_filters += 'status_id=open';
  }
  if (filters["project_id"] !== undefined) {
    param_filters += '&project_id='+filters["project_id"];
  }
  if(filters["projects_ids"] !== undefined && filters["projects_ids"].length>0){
    param_filters += '&f[]=project_id&op[project_id]=%3D&f[]=&c[]=project';
    for(var i=0,l=filters["projects_ids"].length; i<l; i++) param_filters += '&v[project_id][]='+filters["projects_ids"][i];
  }
  if(filters["assigned_to_id"] !== undefined && filters["assigned_to_id"] !== ""){
    param_filters += '&f[]=assigned_to_id&op[assigned_to_id]='+filters["assigned_to_id"];
  }
  // Trackers
  if (filters["trackers"] !== undefined && filters["trackers"] != "") {
    // param_filters += '&tracker_id='+filters["trackers"];
    param_filters += '&f[]=tracker_id&op[tracker_id]=%3D&f[]=&c[]=tracker';
    for(var i=0,l=filters["trackers"].length; i<l; i++) param_filters += '&v[tracker_id][]='+filters["trackers"][i];
  }
  // Priorities
  if (filters["priority_id"] !== undefined && filters["priority_id"] != "") {
    param_filters += '&priority_id='+filters["priority_id"];
  }
  return '/'+base_url+'.json?sort=updated_on:desc&limit=' + limit + '&offset=' + offset + param_filters
}

function fetch_issues(offset, limit, filters, base_url) {

  offset = offset || 0;
  limit = limit || default_limit;
  filters = filters || {};
  base_url = base_url || "issues";

  var query = buildIssueQueryWithParams(offset, limit, filters, base_url);

  return fetch(query, {
    method: 'get',
    headers: { 'X-Redmine-API-Key': api_key, 'Content-Type': 'application/json' },
    accept: 'application/json',
  })
}

function getFilteredIssues(filters, cb) {
  console.log("getFilteredIssues : " + JSON.stringify(filters, null, 2) );
  return fetch_issues(null, null, filters)
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

/*
 {
 'Authorization': 'Basic '+btoa('username:password'),
 'Content-Type': 'application/x-www-form-urlencoded'
 },
 */

const ServiceAPI = { getAllProjects, login, getAllTrackers, getFilteredIssues };
export default ServiceAPI;

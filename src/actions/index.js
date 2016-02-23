import axios from 'axios';

export const FETCH_EMPLOYEES = 'FETCH_EMPLOYEES';
export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const FETCH_EMPLOYEE = 'FETCH_EMPLOYEE';
export const SORT_EMPLOYEES = 'FETCH_EMPLOYEE';


const ROOT_URL = 'https://solstreet-employees.firebaseio.com/';

export function fetchEmployees() {
  const request = axios.get(`${ROOT_URL}/employees.json`);

  return {
    type: FETCH_EMPLOYEES,
    payload: request
  };
}

export function fetchEmployee(key) {
  const request = axios.get(`${ROOT_URL}/employees/${key}.json`);

  return {
    type: FETCH_EMPLOYEE,
    payload: request
  };
}

export function createEmployee(props) {
  const request = axios.post(`${ROOT_URL}/employees.json`, props);

  return {
    type: CREATE_EMPLOYEE,
    payload: request
  };
}

export function updateEmployee(props) {
  const request = axios.patch(`${ROOT_URL}/employees/${props.key}.json`, props);

  return {
    type: UPDATE_EMPLOYEE,
    payload: request
  };
}

export function deleteEmployee(key) {
  const request = axios.delete(`${ROOT_URL}/employees/${key}.json`);

  return {
    type: DELETE_EMPLOYEE,
    payload: request
  };
}

export function sortEmployees(key){
  return {
    type: SORT_EMPLOYEES,
    payload: key
  }
}

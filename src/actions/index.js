import axios from 'axios';

export const FETCH_EMPLOYEES = 'FETCH_EMPLOYEES';
export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';

const ROOT_URL = 'https://solstreet-employees.firebaseio.com/';

export function fetchEmployees() {
  const request = axios.get(`${ROOT_URL}/employees.json`);

  return {
    type: FETCH_EMPLOYEES,
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

export function deleteEmployee(key) {
  const request = axios.delete(`${ROOT_URL}/employees/${key}.json`);

  return {
    type: DELETE_EMPLOYEE,
    payload: request
  };
}

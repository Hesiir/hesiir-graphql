import * as DataLoader from 'dataloader';
import * as fetch from 'node-fetch';
const env = require('../../../env/config.json')

const BASE_URL = env.fetchAPI;
const RESTful = new DataLoader(
  keys => Promise.all(keys.map(getJSONFromRelativeURL))
);

RESTful.loadAll = RESTful.load.bind(new DataLoader(
  keys => Promise.all(keys.map(getAll))
), '__all__');

function getJSONFromRelativeURL(relativeURL) {
  return fetch(`${BASE_URL}/${relativeURL}`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    });
}

function getByArgs(args){
  return getJSONFromRelativeURL(args)
}
function getAll(api){
  return getJSONFromRelativeURL(`${api}`)
    .then(data => data.people);
}
export default RESTful;
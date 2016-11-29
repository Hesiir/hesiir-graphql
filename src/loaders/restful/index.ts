import * as DataLoader from 'dataloader';
import * as fetch from 'node-fetch';
import * as dotenv from 'dotenv';
import { GraphQLError } from 'graphql/error';

dotenv.config();
const RESTful = new DataLoader(
  keys => Promise.all(keys.map(fetchJSONFromRelativeURL))
);

function fetchJSONFromRelativeURL(relativeURL:string) {
  return fetch(`http://test.blackpearl.4009515151.com/interfaces/${relativeURL}`, { credentials: 'include' })
    .then(res => res.json())
}

export default RESTful;
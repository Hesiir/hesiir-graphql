import * as DataLoader from 'dataloader';
import * as fetch from 'node-fetch';
import * as dotenv from 'dotenv';
import { GraphQLError } from 'graphql/error';

dotenv.config();
const RESTful = new DataLoader(
  keys => Promise.all(keys.map(fetchJSONFromAbsoluteURL))
);

function fetchJSONFromAbsoluteURL(absoluteURL:string) {
  return fetch(absoluteURL, { credentials: 'include' })
    .then(res => {
      console.log(res.clone().text());
      return res.json()
    })
}

export default RESTful;
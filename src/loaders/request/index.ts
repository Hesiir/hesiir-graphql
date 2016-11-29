import * as DataLoader from 'dataloader';
import * as request from 'request';
import * as dotenv from 'dotenv';
import { GraphQLError } from 'graphql/error';

dotenv.config();

const httpReq = new DataLoader(
  keys => Promise.all(keys.map(requestJSONFromRelativeURL))
);

function requestJSONFromRelativeURL(relativeURL:string) {
  return request(`http://test.blackpearl.4009515151.com/interfaces/${relativeURL}`, (err, res, body) => {
    console.log("====>");
    
    console.log(err);
    console.log(res);
    console.log(body);
    
  })
}

export default httpReq;

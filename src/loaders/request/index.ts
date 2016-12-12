import * as DataLoader from 'dataloader';
import * as request from 'request';
import * as dotenv from 'dotenv';
import { GraphQLError } from 'graphql/error';

dotenv.config();

const httpReq = new DataLoader(
  keys => Promise.all(keys.map(requestJSONFromRelativeURL))
);

function requestJSONFromRelativeURL(relativeURL:string) {
  return request({
    url: `http://test.blackpearl.4009515151.com/interfaces/${relativeURL}`,
    headers: {
      Authorization: "Bearer KFWzkp6nuGc66BBsC75tRtoVQDkZ7A"
    }
  }, (err, res, body) => {
    if (err) return { error: err };
    console.log(err);
    
    // 如果需要验证用户登录，则转发重定向的请求
    if (res.req && res.req.path) request({
      url: `http://test.4009515151.com${res.req.path.replace(/app\//, '')}`,
      headers: {
        Authorization: "Bearer KFWzkp6nuGc66BBsC75tRtoVQDkZ7A"
      }
    }, (err, res, body) => {
      console.log(res);
      
      if (err) return { error: err };
      return res;
    })
    return res;
  })
}

export default httpReq;

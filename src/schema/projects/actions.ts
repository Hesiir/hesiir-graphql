import * as fetch from 'node-fetch';
import {
  GraphQLList,
  GraphQLObjectType
} from 'graphql';
import * as dotenv from 'dotenv';
dotenv.config();


export function noArrayType(Type) {
  return new GraphQLObjectType({
    name: `noArray${String(Type).match(/[a-zA-Z0-9]+/)[0]}`,
    description: '!!relay局限性(relay2有改观) - 跟节点不能是数组',
    fields: () => ({
      fields: { 
        type: new GraphQLList(Type),
        resolve: obj => obj.map(i => i)
      }
    })
  })
}

export function falconHandle(loader, field){
  let url:string = process.env.NODE_ENV == 'production' ? `${process.env.FETCHAPI}/${field}` : `${process.env.FETCHAPI_DEV}/${field}`;
  return loader.getByFetch.load(url)
    .then(data => {
      const result = data.result ? data.result : (data.error || 'Exception Error :)');
      if (typeof result == 'string') throw new Error(result);
      return result;
    })
}

export function 


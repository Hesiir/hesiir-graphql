import * as fetch from 'node-fetch';
import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import CanaanViewType from '../projects/canaan';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: '所有数据的根查询',
  fields: () => ({
    canaan: { type: CanaanViewType }
  }),
});

export default new GraphQLSchema({
  query: QueryType,
});
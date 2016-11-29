import * as fetch from 'node-fetch';
import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'CanaanMutatuionType',
  description: '友邻市集的数据提交接口',
  fields: () => ({
    GoodsOrder: { type: GraphQLString }
  })
})
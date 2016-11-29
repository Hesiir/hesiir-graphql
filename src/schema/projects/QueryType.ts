import * as fetch from 'node-fetch';
import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import {
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay';

export const GoodsType = new GraphQLObjectType({
  name: 'Goods',
  description: '商品类型',
  fields: () => ({
    goodsId: {
      type: GraphQLString,
      resolve: obj => obj['goods_id']
    }
  })
})

function falconHandle(loader, field){
  return loader.getByFetch.load(field)
    .then(data => {
      const result = data.result ? data.result : (data.error || 'Exception Error :)');
      if (typeof result == 'string') throw new Error(result);
      return result;
    })
}

export default new GraphQLObjectType({
  name: 'CanaanQueryType',
  description: '友邻市集的数据查询接口',
  fields: () => ({
    goodsList: {
      type: new GraphQLList(GoodsType),
      resolve: (root, args, {loaders}) => falconHandle(loaders, 'goods/997')
    },
    goodsDetail: {
      type: GoodsType,
      resolve: (_, args, {loaders}) => {
        const canaan_proc = _.canaan;
        return loaders.getByRequest.load('goodslist')
      }
    },
    goodsTest: {
      type: GoodsType,
      resolve: (_, args, {loaders}) => {
        // return loaders.getByFetch.load('goods/list')
        return loaders.getByRequest.load('goods/list')
      }
    }
  })
})
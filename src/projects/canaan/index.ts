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
    id: globalIdField('Goods'),
    goodsId: {
      type: GraphQLString,
      resolve: obj => obj['goods_id']
    }
  })
})

export const CallbackType = (type) => new GraphQLObjectType({
  name: 'Callback',
  description: `接口声明类型
  falcon返回接口类型为：{
    code:<number>,        状态码
    result:<jsonObject>,  返回正常结果(不和异常信息同时返回)
    error: <string>,      如果异常返回错误信息
  }`,
  fields: () => ({
    data: {
      type: type,
      resolve: obj => obj.result || null
    },
    message: { 
      type: GraphQLString,
      resolve: obj => obj.error || 'normal'
    }
  })
})

export default new GraphQLObjectType({
  name: 'CanaanViewType',
  description: '来自canaan商城的数据集合',
  fields: () => ({
    goodsList: {
      type: new GraphQLList(GoodsType),
      resolve: (root, args, {loaders}) => loaders.getByFetch.load('goods/list').result
    },
    goodsDetail: {
      type: GoodsType,
      resolve: (root, args, {loaders}) => loaders.getByFetch.load('goods/996').result
    }
  })
})
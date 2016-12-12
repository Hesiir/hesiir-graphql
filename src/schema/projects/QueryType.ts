import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';
import {
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay';
import {
  falconHandle,
  noArrayType
} from './actions'

export const iKeyValueType = new GraphQLObjectType({
  name: 'IdKeyValue',
  description: 'id-key-value类型',
  fields: () => ({
    id: { type: GraphQLString },
    key: { type: GraphQLString },
    value: { type: GraphQLString }
  })
})

export const categoryType = new GraphQLObjectType({
    name: 'Category',
    description: '商品分类类型',
    fields: () => ({
        categoryId: {
            type: GraphQLString,
            resolve: obj => obj['categoryId']
        },
        name: {
            type: GraphQLString,
            resolve: obj => obj['name']
        },
        spell: {
            type: GraphQLString,
            resolve: obj => obj['spell']
        },
        isLeaf: {
            type: GraphQLString,
            resolve: obj => obj['isLeaf']
        },
        parentId: {
            type: GraphQLString,
            resolve: obj => obj['parentId']
        },
        itemNum: {
            type: GraphQLString,
            resolve: obj => obj['itemNumber']
        },
        order: {
            type: GraphQLString,
            resolve: obj => obj['order']
        },
        children: {
            type: new GraphQLList(categoryType),
            resolve: obj => obj['children']
        }
    })
});

export const productType = new GraphQLObjectType({
  name: 'Products',
  description: '商品销售类型',
  fields: () => ({
    productId: {
      type: GraphQLString,
      description: '商品销售ID',
      resolve: obj => obj['goods_id']
    },
    productPrice: {
      type: GraphQLString,
      description: '商品销售价格',
      resolve: obj => obj['goods_id']
    },
    stock: {
      type: GraphQLString,
      description: '商品库存',
      resolve: obj => obj['goods_id']
    },
    specs: {
      type: GraphQLString,
      description: '商品销售规格',
      resolve: obj => obj['goods_id']
    },
    limitedNum: {
      type: GraphQLString,
      description: '限购数量',
      resolve: obj => obj['goods_id']
    },
  })
})

export const goodsType = new GraphQLObjectType({
  name: 'Goods',
  description: '商品类型',
  fields: () => ({
    goodsId: {
      type: GraphQLString,
      description: '商品ID',
      resolve: obj => obj['goods_id']
    },
    coverImage: {
      type: GraphQLString,
      description: '商品封面图',
      resolve: obj => obj['goods_id']
    },
    pictureShow: {
      type: new GraphQLList(GraphQLString),
      description: '商品展示图片',
      resolve: obj => obj['goods_id']
    },
    goodsName: {
      type: GraphQLString,
      description: '商品名称',
      resolve: obj => obj['name']
    },
    goodsTitle: {
      type: GraphQLString,
      description: '商品销售名称',
      resolve: obj => obj['goods_id']
    },
    introductionText: {
      type: GraphQLString,
      description: '商品详情',
      resolve: obj => obj['goods_id']
    },
    goodsInfo: {
      type: new GraphQLList(iKeyValueType),
      description: '商品图文介绍',
      resolve: obj => obj['goods_id']
    },
    minPrice: {
      type: GraphQLString,
      description: '商品最小销售价',
      resolve: obj => obj['goods_id']
    },
    maxPrice: {
      type: GraphQLString,
      description: '商品最大销售价',
      resolve: obj => obj['goods_id']
    },
    offShelveTime: {
      type: GraphQLString,
      description: '商品下架时间',
      resolve: obj => obj['goods_id']
    },
    isSSC: {
      type: GraphQLString,
      description: '是否带阳光社区标签',
      resolve: obj => obj['goods_id']
    },
    isLimited: {
      type: GraphQLString,
      description: '是否限制购买',
      resolve: obj => obj['goods_id']
    },
    products: {
      type: new GraphQLList(productType),
      description: '在销售商品',
      resolve: obj => obj['goods_id']
    },
    productSpec: {
      type: new GraphQLList(iKeyValueType),
      description: '商品销售规格',
      resolve: obj => obj['goods_id']
    },
    shiping: {
      type: GraphQLString,
      description: '商品运费',
      resolve: obj => obj['goods_id']
    }
  })
})

export const villagePlanType = new GraphQLObjectType({
  name: 'villagePlan',
  description: '友邻计划接口类型',
  fields: () => ({
    nationalDonationSum: {
      type: GraphQLInt,
      description: '全国募集金额总计',
      resolve: obj => obj['national_sum']
    },
    nationalDonorSum: {
      type: GraphQLInt,
      description: '全国募集人数总计',
      resolve: obj => obj['people_num']
    },
    nationalDonationTimes: {
      type: GraphQLInt,
      description: '全国募集次数总计',
    },
    villageName: {
      type: GraphQLString,
      description: '项目名称',
      resolve: obj => obj['project_name']
    },
    villageDonationSum: {
      type: GraphQLInt,
      description: '项目募集金额总计',
      resolve: obj => obj['project_sum']
    },
    villageDonorSum: {
      type: GraphQLInt,
      description: '项目募集人数总计'
    },
    villageRanking: {
      type: GraphQLInt,
      description: '项目在全国中的排名',
      resolve: obj => obj['ranking']
    },
    villageDonationTimes: {
      type: GraphQLInt,
      description: '项目募集次数总计',
      resolve: obj => obj['project_times']
    },
    villagePlanURL: {
      type: GraphQLString,
      description: '项目参与地址',
    }
  })
})


export const userAddressType = new GraphQLObjectType({
  name: 'UserAddress',
  description: '用户住址类型',
  fields: () => ({
    country: {
      type: GraphQLInt,
      description: '国家',
      resolve: obj => obj['national_sum']
    },
    province: {
      type: GraphQLInt,
      description: '省/自治区',
      resolve: obj => obj['national_sum']
    },
    city: {
      type: GraphQLInt,
      description: '城市/城镇',
      resolve: obj => obj['people_num']
    },
    district: {
      type: GraphQLInt,
      description: '区/县',
    },
    street: {
      type: GraphQLString,
      description: '街道',
      resolve: obj => obj['project_name']
    },
    budding: {
      type: GraphQLInt,
      description: '府/厦/邸',
      resolve: obj => obj['project_sum']
    },
    room: {
      type: GraphQLInt,
      description: '房间'
    },
    isRegistedVanke: {
      type: GraphQLBoolean,
      description: '是否注册万科物业房屋'
    }
  })
})

export const stewardType = new GraphQLObjectType({
  name: 'Steward',
  description: '管家信息类型',
  fields: () => ({
    stewardId: {
      type: GraphQLInt,
      description: '管家ID',
      resolve: obj => obj['national_sum']
    },
    phone: {
      type: GraphQLInt,
      description: '管家电话',
      resolve: obj => obj['national_sum']
    },
    fullName: {
      type: GraphQLInt,
      description: '管家名字',
      resolve: obj => obj['national_sum']
    },
    gridCode: {
      type: GraphQLInt,
      description: '管家所在网格编码',
      resolve: obj => obj['people_num']
    },
    gridName: {
      type: GraphQLInt,
      description: '管家所在网格名称',
    }
  })
})

export const userInfoType = new GraphQLObjectType({
  name: 'UserInfo',
  description: '用户详情类型',
  fields: () => ({
    userId: {
      type: GraphQLInt,
      description: '用户ID',
      resolve: obj => obj['national_sum']
    },
    userName: {
      type: GraphQLInt,
      description: '用户名称',
      resolve: obj => obj['people_num']
    },
    nickName: {
      type: GraphQLInt,
      description: '用户昵称',
    },
    contact: {
      type: new GraphQLList(iKeyValueType),
      description: '联系方式',
      resolve: obj => obj['project_name']
    },
    address: {
      type: new GraphQLList(userAddressType),
      description: '住址',
      resolve: obj => obj['project_sum']
    }
  })
})

export default new GraphQLObjectType({
  name: 'CanaanQueryType',
  description: '友邻市集的数据查询接口',
  fields: () => ({
    goodsCategory: {
      type: noArrayType(categoryType),
      description: '商品分类接口',
      resolve: (root, args, {loaders}) => falconHandle(loaders, 'category/list')
    },
    villagePlan: {
      type: villagePlanType,
      description: '友邻计划接口',
      resolve: (root, args, {loaders}) => falconHandle(loaders, 'sunshine/ranking')
    },
    goodsList: {
      type: noArrayType(goodsType),
      description: '商品列表接口',
      args: { cat: { type: GraphQLInt }},
      resolve: (root, {cat}, {loaders}) => falconHandle(loaders, `goods/list/${cat}`)
    },
    goodsDetail: {
      type: goodsType,
      description: '商品详情接口',
      args: { id: { type: GraphQLInt}},
      resolve: (root, {id}, {loaders}) => falconHandle(loaders, `goods/detail/${id}`)
    },
    userInfo: {
      type: userInfoType,
      description: '用户信息接口',
      resolve: (root, args, {loaders}) => falconHandle(loaders, 'addr/detail')
    },
    stewardList: {
      type: noArrayType(stewardType),
      description: '管家列表接口',
      resolve: (root, args, {loaders}) => falconHandle(loaders, 'keeper/list')
    }
  })
})
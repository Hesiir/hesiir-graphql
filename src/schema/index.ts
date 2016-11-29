import { GraphQLSchema } from 'graphql';
import { 
  QueryType,
  MutationType
} from './projects';

export default new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});
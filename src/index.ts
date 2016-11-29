import * as express from 'express';
import * as path from 'path';
import { 
  graphqlExpress,
  graphiqlExpress
 } from 'graphql-server-express';
import { maskErrors } from 'graphql-errors';
import * as morgan from 'morgan';
import * as chalk from "chalk";
import * as cors from 'cors';
import * as favicon from 'serve-favicon';
import * as bodyParser from 'body-parser';
import * as jwt from 'express-jwt';
import * as dotenv from 'dotenv';
import schema from './schema';
import loaders from './loaders';
import proc from './process';

dotenv.config();
const graphQLServer = express();

let corsOptionsDelegate = function(req, callback){
  let corsOptions;
  if(process.env.WHITELIST.split(',').indexOf(req.header('Origin')) !== -1){
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  }else{
    corsOptions = { origin: false }; // disable CORS for this request
  }
  // credentials 设置为true，当使用fetch时只设置Access-Control-Allow-Origin无法通过安全校验
  corsOptions.credentials = true;
  callback(null, corsOptions);
};

// maskErrors(schema);

graphQLServer.use(morgan('combined'));
graphQLServer.use(favicon('favicon.svg'));
graphQLServer.use(cors(corsOptionsDelegate));
// let auth = (req, res, next) => {
//   console.log(req.headers);
  
//   const authorization = req.headers['authorization'];
  
//   if(authorization) {
//     proc.canaan.decodeToken(authorization.split('Bearer ')[1], (err, decoded) => {
//       let auth = decoded;
//       if(err) auth = {
//         name: err.name,
//         message: err.message
//       };
//       req['auth'] = auth;
//       return next();
//     })
//   }

//   let token = proc.canaan.Token;
//   req['auth'] = `Bearer ${token}`;
//   next();
// }
graphQLServer.post(`/${process.env.PROJECT}`, [bodyParser.json()], graphqlExpress(() => {
  // console.log(auth);
  
  return {
    schema: schema,
    context: { loaders },
    rootValue: { auth: {} },
    formatError: (err) => process.env.DEBUG ? err : err.message
  }
}));
graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: `/${process.env.PROJECT}`,
}));
graphQLServer.use(/[^(`${process.env.PROJECT}`|graphiql)]/,(req, res, next) => {
  res.send({
    message: "Not Found",
    documentation_url: "https://graphql.local"
  })
  // res.set('Content-Type', 'application/graphql; charset=utf-16');
  next();
})

graphQLServer.listen(process.env.PORT, () => console.log(
  `${chalk.bgGreen(chalk.white(' express '))} Server is start on http://${process.env.DOMAIN}:${process.env.PORT}`
))

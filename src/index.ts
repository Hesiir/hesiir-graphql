import * as express from 'express';
import * as path from 'path';
import { graphql } from 'graphql';
import { maskErrors } from 'graphql-errors';
import * as morgan from 'morgan';
import * as chalk from "chalk";
import * as cors from 'cors';
import * as favicon from 'serve-favicon';
import * as bodyParser from 'body-parser';
import schema from './schema';
import loaders from './loaders';

const graphQLServer = express();
const whiteList = require('../env/whiteList.json');
const env = require('../env/config.json')

const BASE_URL = env.fetchAPI;
let corsOptionsDelegate = function(req, callback){
  let corsOptions;
  if(whiteList.domain.indexOf(req.header('Origin')) !== -1){
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  }else{
    corsOptions = { origin: false }; // disable CORS for this request
  }
  // credentials 设置为true，当使用fetch时只设置Access-Control-Allow-Origin无法通过安全校验
  corsOptions.credentials = true;
  callback(null, corsOptions);
};

maskErrors(schema);

graphQLServer.use(bodyParser.text({type: 'application/graphql; charset=utf-16'}));
graphQLServer.use(morgan('combined'));
graphQLServer.use(favicon(path.join(__dirname, '../env/favicon.svg')));
graphQLServer.use(cors(corsOptionsDelegate));
graphQLServer.post('graphql', (req, res) => {
  graphql(schema, req.body)
    .then(result => res.send(JSON.stringify(result, null, 2)))
});

graphQLServer.listen(env.port, () => console.log(
  `${chalk.bgGreen(chalk.white(' express '))} Server is start on http://${env.domain}:${env.port}`
))

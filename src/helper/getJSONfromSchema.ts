import * as path from 'path';
import * as fs from 'fs';
import { graphql } from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';
import schema from '../schema';

const jsonFile = path.join(__dirname, '../../dist/schema.json');
const graphQLFile = path.join(__dirname, '../../dist/schema.graphql');

async function updateSchema() {
  try {
    const json = await graphql(schema, introspectionQuery);
    fs.writeFileSync(jsonFile, JSON.stringify(json, null, 2));
    fs.writeFileSync(graphQLFile, printSchema(schema));
    console.log('Schema has been regenerated');
  } catch (err) {
    console.error(err.stack);
  }
}

// Run the function directly, if it's called from the command line
if (!module.parent) updateSchema();

export default updateSchema;
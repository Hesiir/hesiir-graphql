import RESTful from './restful';
import httpReq from './request';

export default {
  getByFetch: RESTful,
  getByRequest: httpReq,
  getByQuery: null
};

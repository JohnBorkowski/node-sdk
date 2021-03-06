/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const util = require('util');
const requestFactory = require('../lib/requestwrapper');
const BaseService = require('../lib/base_service');
const pick = require('object.pick');

/**
 *
 * @param {Object} options
 * @constructor
 */
function DiscoveryV1(options) {
  BaseService.call(this, options);

  // Check if 'version_date' was provided
  if (typeof this._options.version_date === 'undefined') {
    throw new Error('Argument error: version_date was not specified, use DiscoveryV1.VERSION_DATE_2017_04_27');
  }
  this._options.qs.version = options.version_date;
}

util.inherits(DiscoveryV1, BaseService);
DiscoveryV1.prototype.name = 'discovery';
DiscoveryV1.prototype.version = 'v1';
DiscoveryV1.URL = 'https://gateway.watsonplatform.net/discovery/api';

/**
 * Initial release
 * @type {string}
 */
DiscoveryV1.VERSION_DATE_2016_12_15 = '2016-12-15';
/**
 * Release exposing the `sort` parameter on the `/query` endpoint
 * @type {string}
 */
DiscoveryV1.VERSION_DATE_2017_04_27 = '2017-04-27';

/**
 * Return the list of environments
 *
 * @param {Object} params
 */
DiscoveryV1.prototype.getEnvironments = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/environments',
      method: 'GET',
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Create a new environment
 * @param {string} name
 * @param {string} description
 * @param {int} size (optional)
 */
DiscoveryV1.prototype.createEnvironment = function(params, callback) {
  params = params || {};

  // size is an int of 1,2,3, default 1
  if (!params.size) {
    params.size = 1;
  }

  const parameters = {
    options: {
      url: '/v1/environments',
      method: 'POST',
      multipart: [
        {
          'content-type': 'application/json',
          body: JSON.stringify(pick(params, ['name', 'description', 'size']))
        }
      ],
      json: true
    },
    originalParams: params,
    requiredParams: ['name', 'description'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Update an existing environment
 * @param {string} environment_id(required)
 * @param {string} name(required)
 * @param {string} description(optional)
 */
DiscoveryV1.prototype.updateEnvironment = function(params, callback) {
  params = params || {};
  const parameters = {
    options: {
      url: '/v1/environments/{environment_id}',
      method: 'PUT',
      path: pick(params, ['environment_id']),
      multipart: [
        {
          'content-type': 'application/json',
          body: JSON.stringify(pick(params, ['name', 'description']))
        }
      ],
      json: true
    },
    originalParams: params,
    requiredParams: ['environment_id', 'name'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Get details about an environment
 *
 * @param {Object} params
 * @param {String} params.environment_id
 */
DiscoveryV1.prototype.getEnvironment = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/environments/{environment_id}',
      method: 'GET',
      path: pick(params, ['environment_id']),
      json: true
    },
    requiredParams: ['environment_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Get details about an environment
 *
 * @param {Object} params
 * @param {String} params.environment_id
 */
DiscoveryV1.prototype.deleteEnvironment = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/environments/{environment_id}',
      method: 'DELETE',
      path: pick(params, ['environment_id']),
      json: true
    },
    requiredParams: ['environment_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * List all configurations
 *
 * @param {Object} params
 * @param {String} params.environment_id
 */
DiscoveryV1.prototype.getConfigurations = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/environments/{environment_id}/configurations',
      method: 'GET',
      path: pick(params, ['environment_id']),
      json: true
    },
    requiredParams: ['environment_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Get details about a configuration
 *
 * @param {Object} params
 * @param {String} params.environment_id
 * @param {String} params.configuration_id
 */
DiscoveryV1.prototype.getConfiguration = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/environments/{environment_id}/configurations/{configuration_id}',
      method: 'GET',
      path: pick(params, ['environment_id', 'configuration_id']),
      json: true
    },
    requiredParams: ['environment_id', 'configuration_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Return the list of collections in the given environment
 *
 * @param {Object} params
 * @param {String} params.environment_id
  */
DiscoveryV1.prototype.getCollections = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/environments/{environment_id}/collections',
      method: 'GET',
      path: pick(params, ['environment_id']),
      json: true
    },
    requiredParams: ['environment_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Get details about a collection
 *
 * @param {Object} params
 * @param {String} params.environment_id
 * @param {string} params.collection_id
 */
DiscoveryV1.prototype.getCollection = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/environments/{environment_id}/collections/{collection_id}',
      method: 'GET',
      path: pick(params, ['environment_id', 'collection_id']),
      json: true
    },
    requiredParams: ['environment_id', 'collection_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Create a new collection
 *
 * @param {Object} params
 * @param {String} params.environment_id environment guid for the collection
 * @param {string} params.collection_name
 * @param {string} params.description
 * @param {string} params.configuration_id  configuration to create the collection in
 * @param {string} params.language_code currently, only `en_us` is supported
 */
DiscoveryV1.prototype.createCollection = function(params, callback) {
  params = params || {};

  params.language_code = params.language_code || 'en_us';

  const parameters = {
    options: {
      url: '/v1/environments/{environment_id}/collections',
      method: 'POST',
      path: pick(params, ['environment_id']),
      multipart: [
        {
          'content-type': 'application/json',
          body: JSON.stringify(pick(params, ['collection_name', 'description', 'configuration_id', 'language_code']))
        }
      ],
      json: true
    },
    originalParams: params,
    requiredParams: ['environment_id', 'configuration_id', 'collection_name'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Delete a collection
 *
 * @param {Object} params
 * @param {String} params.environment_id environment guid for the collection
 * @param {string} params.collection_id the guid of the collection to delete
 */
DiscoveryV1.prototype.deleteCollection = function(params, callback) {
  params = params || {};

  params.language_code = params.language_code || 'en_us';

  const parameters = {
    options: {
      url: '/v1/environments/{environment_id}/collections/{collection_id}',
      method: 'DELETE',
      path: pick(params, ['environment_id', 'collection_id']),
      json: true
    },
    requiredParams: ['environment_id', 'collection_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Add a document to a collection
 * @param params
 * @param {String} params.environment_id environment guid for the collection
 * @param {string} params.collection_id the guid of the collection to delete
 * @param {Buffer|ReadableStream|Object} params.file a file to post (smaller than 50mb)
 * @param {string} [params.configuration_id] config guid
 * @param {string} [params.metadata] file metadata, including content-type (will infer if missing)
 * @param callback
 * @return {ReadableStream|undefined}
 */
DiscoveryV1.prototype.addDocument = function(params, callback) {
  params = params || {};

  const queryParams = pick(params, ['configuration_id']);
  const formDataParams = pick(params, ['file', 'metadata']);

  // if we get a buffer or object, we need to include stuff about filename for the service
  if (formDataParams.file) {
    if (
      typeof formDataParams.file.filename !== 'string' &&
      !(formDataParams.file.options && typeof formDataParams.file.options.filename !== 'string') &&
      !(formDataParams.file.path && typeof formDataParams.file.path !== 'string') &&
      !(formDataParams.file.name && typeof formDataParams.file.name !== 'string')
    ) {
      const filedat = formDataParams.file;
      // the filename used below is because the name must exist
      formDataParams.file = { value: filedat, options: { filename: '_' } };
    }
  }

  const parameters = {
    options: {
      url: '/v1/environments/{environment_id}/collections/{collection_id}/documents',
      method: 'POST',
      path: pick(params, ['environment_id', 'collection_id']),
      qs: queryParams,
      formData: formDataParams,
      json: true
    },
    requiredParams: ['environment_id', 'collection_id', 'file'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Update or partially update a document to create or replace an existing document
 * @param params
 * @param {String} params.environment_id environment guid for the collection
 * @param {string} params.collection_id the guid of the collection
 * @param {string} params.document_id the guid of the document to update
 * @param {Buffer|ReadableStream|Object} params.file a file to post (smaller than 50mb)
 * @param {string} [params.configuration_id] config guid
 * @param {string} [params.metadata] file metadata, including content-type (will infer if missing)
 * @param callback
 * @return {ReadableStream|undefined}
 */
DiscoveryV1.prototype.updateDocument = function(params, callback) {
  params = params || {};

  const queryParams = pick(params, ['configuration_id']);
  const formDataParams = pick(params, ['file', 'metadata']);

  // if we get a buffer or object, we need to include stuff about filename for the service
  if (formDataParams.file) {
    if (
      typeof formDataParams.file.filename !== 'string' &&
      !(formDataParams.file.options && typeof formDataParams.file.options.filename !== 'string') &&
      !(formDataParams.file.path && typeof formDataParams.file.path !== 'string') &&
      !(formDataParams.file.name && typeof formDataParams.file.name !== 'string')
    ) {
      const filedat = formDataParams.file;
      // the filename used below is because the name must exist
      formDataParams.file = { value: filedat, options: { filename: '_' } };
    }
  }

  const parameters = {
    options: {
      url: '/v1/environments/{environment_id}/collections/{collection_id}/documents/{document_id}',
      method: 'POST',
      path: pick(params, ['environment_id', 'collection_id', 'document_id']),
      qs: queryParams,
      formData: formDataParams,
      json: true
    },
    requiredParams: ['environment_id', 'collection_id', 'document_id', 'file'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Delete a specific document
 * @param params
 * @param {String} params.environment_id environment guid for the collection
 * @param {string} params.collection_id the guid of the collection to delete
 * @param {string} params.document_id the guid of the document to delete
 * @param callback
 * @return {ReadableStream|undefined}
 */
DiscoveryV1.prototype.deleteDocument = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/environments/{environment_id}/collections/{collection_id}/documents/{document_id}',
      method: 'DELETE',
      path: pick(params, ['environment_id', 'collection_id', 'document_id']),
      json: true
    },
    requiredParams: ['environment_id', 'collection_id', 'document_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Queries the collection
 *
 * @param {Object} params
 * @param {String} params.environment_id
 * @param {string} params.collection_id
 * @param {String} [params.query]  A query search returns all possible results, even when it's not very relevant, with the most relevant documents listed first. Use a query search when you want to find the most relevant search results. Results are scored between 0 and 1, with 1 being an exact match and 0 being not a match at all.
 * @param {String} [params.natural_language_query]  BETA - A natural language query that returns relevant documents by using training data and natural language understanding. You cannot use this parameter and the query parameter in the same query.
 * @param {String} [params.filter]  A cacheable query that allows you to limit the information returned to exclude anything that isn't related to what you are searching. Filter searches are better for metadata type searches and when you are trying to get a sense of concepts in the dataset.
 * @param {String} [params.aggregation] An aggregation search uses combinations of filters and query search to return an exact answer. Aggregations are useful for building applications, because you can use them to build lists, tables, and time series. For a full list of possible aggregrations, see the Query reference.
 * @param {Number} [params.count=10] Number of documents to return
 * @param {Number} [params.offset=0] For pagination purposes. Returns additional pages of results. Deep pagination is highly unperformant, and should be avoided.
 * @param {String} [params.return] A comma separated list of the portion of the document hierarchy to return.
 * @param {String} [params.sort] A comma separated list of fields in the document to sort on. You can optionally specify a sort direction by prefixing the field with - for descending or + for ascending. Ascending is the default sort direction if no prefix is specified.
 * @param {Boolean} [params.passages=false] BETA - A boolean that specifies whether the service returns a set of the most relevant passages from the documents returned by a query.  The passages parameter works only on private collections. It does not work in the Watson Discovery News collection.
 */
DiscoveryV1.prototype.query = function(params, callback) {
  params = params || {};

  // query and natural_language_query can't both be populated
  if (params.query && params.natural_language_query) {
    delete params.natural_language_query;
  }

  const parameters = {
    options: {
      url: '/v1/environments/{environment_id}/collections/{collection_id}/query',
      method: 'GET',
      json: true,
      path: pick(params, ['environment_id', 'collection_id']),
      qs: pick(params, ['query', 'natural_language_query', 'filter', 'aggregation', 'count', 'offset', 'return', 'sort', 'passages'])
    },
    requiredParams: ['environment_id', 'collection_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = DiscoveryV1;

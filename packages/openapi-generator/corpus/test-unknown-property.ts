//! should handle unknown properties in responses

/// file: index.ts

import * as t from 'io-ts';
import * as h from '@api-ts/io-ts-http';

const MyRoute = h.httpRoute({
  path: '/test/{id}',
  method: 'POST',
  request: h.httpRequest({
    params: {
      /** @param id the test id */
      id: t.string,
    },
  }),
  response: {
    200: t.type({
      foo: t.unknown,
    }),
  },
});

export const Routes = h.apiSpec({
  'api.v1.test.myroute': {
    post: MyRoute,
  },
});

///

`
{
  "openapi": "3.1.0",
  "info": {
    "title": "test",
    "version": "0.1.0"
  },
  "paths": {
    "/test/{id}": {
      "post": {
        "summary": "MyRoute",
        "parameters": [
          {
            "name": "id",
            "schema": {
              "type": "string"
            },
            "required": true,
            "in": "path",
            "description": "the test id"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": ["foo"],
                  "properties": {
                    "foo": {
                      "title": "unknown"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {}
  }
}`;

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "or90yotn7n1zq5o",
    "created": "2023-11-23 15:28:43.550Z",
    "updated": "2023-11-23 15:28:43.550Z",
    "name": "topics",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ewahxr8b",
        "name": "label",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "7atfiliv",
        "name": "desc",
        "type": "editor",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
        }
      },
      {
        "system": false,
        "id": "870bmqf7",
        "name": "slug",
        "type": "text",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": "[a-z0-9-]+"
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.verified = true",
    "viewRule": "@request.auth.verified = true",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("or90yotn7n1zq5o");

  return dao.deleteCollection(collection);
})

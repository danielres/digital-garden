/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "or90yotn7n1zq5o",
    "created": "2023-11-14 20:04:32.198Z",
    "updated": "2023-11-14 20:04:32.198Z",
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
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

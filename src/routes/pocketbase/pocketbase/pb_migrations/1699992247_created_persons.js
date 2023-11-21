/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "vt8rj7d06hbe5sj",
    "created": "2023-11-14 20:04:07.107Z",
    "updated": "2023-11-14 20:04:07.107Z",
    "name": "persons",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jjdonq7j",
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
        "id": "gbwj4bhw",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("vt8rj7d06hbe5sj");

  return dao.deleteCollection(collection);
})

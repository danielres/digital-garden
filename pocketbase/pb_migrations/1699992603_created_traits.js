/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ozl92t7li26gaz5",
    "created": "2023-11-14 20:10:03.172Z",
    "updated": "2023-11-14 20:10:03.172Z",
    "name": "traits",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "opjrncvg",
        "name": "topic",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "or90yotn7n1zq5o",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "8u4wtrgf",
        "name": "item",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "or90yotn7n1zq5o",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_4SFoJvX` ON `traits` (\n  `topic`,\n  `item`\n)"
    ],
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
  const collection = dao.findCollectionByNameOrId("ozl92t7li26gaz5");

  return dao.deleteCollection(collection);
})

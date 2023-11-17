/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("scj3si3rfop1wq7");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "scj3si3rfop1wq7",
    "created": "2023-11-14 20:13:22.236Z",
    "updated": "2023-11-14 20:15:58.980Z",
    "name": "personsTraits",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "4c4e0aoo",
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
        "id": "acwajcob",
        "name": "item",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "vt8rj7d06hbe5sj",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "8ffs6zis",
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
    "indexes": [
      "CREATE INDEX `idx_sejpw36` ON `personsTraits` (\n  `topic`,\n  `item`\n)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})

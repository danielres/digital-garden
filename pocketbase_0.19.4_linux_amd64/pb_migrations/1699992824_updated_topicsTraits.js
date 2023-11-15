/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ozl92t7li26gaz5")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nritctsl",
    "name": "desc",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ozl92t7li26gaz5")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nritctsl",
    "name": "field",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
})

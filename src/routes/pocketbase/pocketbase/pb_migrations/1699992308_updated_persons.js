/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vt8rj7d06hbe5sj")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gbwj4bhw",
    "name": "label",
    "type": "text",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vt8rj7d06hbe5sj")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})

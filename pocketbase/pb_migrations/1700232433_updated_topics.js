/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("or90yotn7n1zq5o")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("or90yotn7n1zq5o")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "870bmqf7",
    "name": "slug",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})

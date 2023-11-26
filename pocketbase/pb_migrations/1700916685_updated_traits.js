/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("akbebc2i031o0fk")

  // remove
  collection.schema.removeField("d5kwhcxi")

  // remove
  collection.schema.removeField("fdcvv9sl")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("akbebc2i031o0fk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d5kwhcxi",
    "name": "level",
    "type": "select",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fdcvv9sl",
    "name": "kind",
    "type": "text",
    "required": true,
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

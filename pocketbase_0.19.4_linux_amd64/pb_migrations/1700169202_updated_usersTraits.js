/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mow0wrweh8u3z20")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "otizqqy3",
    "name": "kind",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "interest",
        "expertise"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mow0wrweh8u3z20")

  // remove
  collection.schema.removeField("otizqqy3")

  return dao.saveCollection(collection)
})

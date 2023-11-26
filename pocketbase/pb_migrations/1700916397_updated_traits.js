/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("akbebc2i031o0fk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "webxzvn5",
    "name": "levels",
    "type": "json",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("akbebc2i031o0fk")

  // remove
  collection.schema.removeField("webxzvn5")

  return dao.saveCollection(collection)
})

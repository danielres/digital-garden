/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("or90yotn7n1zq5o")

  // remove
  collection.schema.removeField("a8lpnsfp")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("or90yotn7n1zq5o")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a8lpnsfp",
    "name": "children",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "or90yotn7n1zq5o",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})

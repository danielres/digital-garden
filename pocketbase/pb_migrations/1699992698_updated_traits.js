/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ozl92t7li26gaz5")

  collection.name = "TopicsTraits"
  collection.indexes = [
    "CREATE INDEX `idx_4SFoJvX` ON `TopicsTraits` (\n  `topic`,\n  `item`\n)"
  ]

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ozl92t7li26gaz5")

  collection.name = "traits"
  collection.indexes = [
    "CREATE INDEX `idx_4SFoJvX` ON `traits` (\n  `topic`,\n  `item`\n)"
  ]

  // remove
  collection.schema.removeField("nritctsl")

  return dao.saveCollection(collection)
})

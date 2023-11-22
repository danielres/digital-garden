/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("scj3si3rfop1wq7")

  collection.indexes = [
    "CREATE INDEX `idx_sejpw36` ON `personsTraits` (\n  `topic`,\n  `item`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("scj3si3rfop1wq7")

  collection.indexes = []

  return dao.saveCollection(collection)
})

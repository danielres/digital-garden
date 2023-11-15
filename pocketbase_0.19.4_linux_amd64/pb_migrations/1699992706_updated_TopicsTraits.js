/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ozl92t7li26gaz5")

  collection.name = "topicsTraits"
  collection.indexes = [
    "CREATE INDEX `idx_4SFoJvX` ON `topicsTraits` (\n  `topic`,\n  `item`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ozl92t7li26gaz5")

  collection.name = "TopicsTraits"
  collection.indexes = [
    "CREATE INDEX `idx_4SFoJvX` ON `TopicsTraits` (\n  `topic`,\n  `item`\n)"
  ]

  return dao.saveCollection(collection)
})

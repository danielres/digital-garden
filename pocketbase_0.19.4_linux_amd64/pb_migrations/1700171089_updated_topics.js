/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("or90yotn7n1zq5o")

  collection.listRule = "@request.auth.verified = true"
  collection.viewRule = "@request.auth.verified = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("or90yotn7n1zq5o")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})

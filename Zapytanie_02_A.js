 printjson(db.people.aggregate([{"$project": {"credit": 1}}, {"$unwind": "$credit"}, {"$group": {_id: "$credit.currency", total: {$sum: {"$toDouble": "$credit.balance"}}}}]).toArray());

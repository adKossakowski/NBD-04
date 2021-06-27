printjson(db.people.aggregate([{$match: {"sex": "Female", "nationality": "Poland"}}, {"$project": {"credit": 1}}, {"$unwind": "$credit"}, {"$group": {_id: "$credit.currency", total: {$sum: {"$toDouble": "$credit.balance"}}, average: {$avg: {"$toDouble": "$credit.balance"}}}}]).toArray());
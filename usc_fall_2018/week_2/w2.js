agg = db.users.aggregate([
    { 
        $group: {  
        _id:'$offer', 
        names: {$push: '$profile.name'},
        count: {$sum: 1} 
        } 
    },
    { $sort: { 
        count: -1 }
    } 
])


agg = db.users.aggregate([
    { $match: 
        { $and: [{offer: {$ne: ""}}, 
                {offer: {$ne: null}}
        ]}
    }, 
    { $group: 
        {  
        _id:'$offer', 
        namesArray: {$push: '$profile.name'},
        count: {$sum: 1} 
        } 
    },
    { $sort: { 
        count: -1 }
    } 
])


agg = db.listings.aggregate([
    { $project : {
        profitability: {$multiply:[ 
            {"$size": "$paid_users"}, "$price" ]},
        price: 1,
        title: 1, 
        _id:0
        }
    },
    { $sort: {
        profitability:-1, price: -1
        }
    }, 
    { $limit: 5 }
])



agg =
db.users.aggregate([ 
        { 
            $project: { 
                name: '$profile.name', 
                _id: 0, 
                eventTot:{ $size: '$history'}
            } 
        }, 
        { 
            $match: { 
                eventTot: {$gt: 1} 
            } 
        },  
            { 
                $sort: {
                    eventTot:-1, 
                    name: 1 
                }
            }
        
        ])




agg = db.listings.aggregate([
        { $unwind : "$categories"},
        { $group : {
            _id: "$categories", 
            events_array: { $push : "$title"}, 
            numberOfEvents: { $sum: 1 }, 
            numberOfAttendees:{
                $sum: {$size:'$listing_users'}
                },
            profitability: { $sum: { 
                $multiply: [  {$size: "$paid_users"}, "$price" ] } 
                }
            }
        }, 
        { $sort: {profitability : -1}}
    ])






agg = db.posts.aggregate([
    {$match : {"_id" : ObjectId("57e413f200223203000d62d9")}},
    {$unwind : "$pin_array"}, 
    {$lookup : { 
         from: "pins", localField: "pin_array", 
         foreignField: "_id", as: "pin_docs"}},  
    {$match: {"pin_docs": {$ne: []}} }, 
    {$unwind : "$pin_docs"}, 
    {$unwind : "$pin_docs.pin_categories"},  
    {$group :{
        _id: { pin_cat: { 
                $toLower: "$pin_docs.pin_categories"}}, 
        records: { $push : "$pin_docs.title"}, 
        count: { $sum: 1 }}
    }, 
    { $project: {
        tmp: {
            _id: '$_id', 
            records: '$records', 
            count: '$count'
        }
    }}, 
    {$group: {
        _id: null, 
        total:{$sum: "$tmp.count"}, 
        pin_category_group: {$push: "$tmp"}}
    }, 
    {$unwind : "$pin_category_group"}, 
    {$project : {
        _id: "$pin_category_group._id", 
        records: "$pin_category_group.records", 
        count: "$pin_category_group.count", 
        total: 1, 
        percentage: {
            $multiply: [
            { $divide: 
                [ "$pin_category_group.count", 
                "$total"] 
            }, 100]
            } 
        }
    } 
])









while (agg.hasNext()){
    printjson(agg.next())
}




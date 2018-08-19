query = db.laureates
.find({'prizes.category':"chemistry", 'prizes.affiliations.country': "France" })
.count()


query = db.laureates
        .distinct('prizes.affiliations.country')


query = Object.keys(db.nobel.findOne()).length

query = Object.keys(db.nobel.findOne())


query = db.nobel
        .distinct("new_array")
        .length

query = db.nobel.distinct("new_array")


query = db.nobel.find( { "new_array": {$all:["crimson"] } })



query = db.nobel.find( { "new_array": ["crimson","kiwi"] } ) 


query = db.nobel.find( { "new_array":"indigo" } ).count()


query = db.nobel.find(
        {$or: [{ "new_array":"indigo" }, {new_array:"crimson"}]} )
        .count()


query = db.nobel.find( { "new_array":{$in: ["indigo","crimson"] }} ).count()


query = db.nobel.find( 
        {$or: [{ new_score_array: { $size: 0} }, { new_score_array: { $size: 1} }, 
        { new_score_array: { $size: 2} } ]} ).count()



query = db.nobel.find(
    { $text: { $search: "radiation -cosmic" } },    
    { score: { $meta: "textScore" } } )
    .sort( { score: { $meta: "textScore" } } )
    .count()


query = db.nobel.find(    
    { $text: { $search: "radiation" } },    
    { score: { $meta: "textScore" } } )
    .sort( { score: { $meta: "textScore" } } )
    .count()



try {
    while (query.hasNext()){
        printjson( query.next())
    } 
} catch(err){
    printjson(query)
}

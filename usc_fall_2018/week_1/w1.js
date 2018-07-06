// use HR database
// Qeustion 1
query = db.hr.find().sort({ YearsAtCompany:-1 }).limit(1)



// Question 2
query = db.hr.find({},
    {_id:0, Education:1, MonthlyIncome:1})
    .sort({Education:1, MonthlyIncome:1})  




// use Laureates/Nobel database
query = db.laureates.find({'prizes.category':"physics"}).count()

query = db.laureates
.find({'prizes.category':"chemistry", 'prizes.year': {$gt:"1910"}})
.sort({"prizes.year": -1})
.limit(5)






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



// use Cities collection

query = db.cities.find(
    { loc: {$near: 
    { $geometry: 
    {coordinates: [ -72.622739, 42.070206]}, $minDistance: 100, $maxDistance:10000 }  }  })



query = db.runCommand(    {      geoNear: "cities",      near: {coordinates: [ -72.622739, 42.070206 ] },      spherical: true, limit: 10} )









try {
    while (query.hasNext()){
        printjson( query.next())
    } 
} catch(err){
    printjson(query)
}

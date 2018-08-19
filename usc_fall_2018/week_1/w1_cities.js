

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

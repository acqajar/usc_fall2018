// use HR database
// Qeustion 1
query = db.class1_hr.find().sort({ YearsAtCompany:-1 }).limit(1)



// Question 2
query = db.class1_hr
    .find({},{_id:0, Education:1, MonthlyIncome:1})
    .sort({Education:1, MonthlyIncome:1})  





try {
    while (query.hasNext()){
        printjson( query.next())
    } 
} catch(err){
    printjson(query)
}

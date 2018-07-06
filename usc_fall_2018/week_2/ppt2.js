// Question 1 Challenges
ppt = db.users.find().count() 
ppt = db.pins.find().count()
ppt = db.listings.find().count()
ppt = db.posts.find().count()
ppt = db.users.aggregate([{
    $group:{
        _id: {"accepted?":"$isAccepted"}, count: {$sum:1}
    }
    }])
ppt = db.posts.aggregate([ {
        $group:{
            _id: "$isPrivate", count: {$sum:1} 
        }
    }])
ppt = db.posts.aggregate([ {$group:{_id:"$isPrivate", count: {$sum:1}}}, {$project: {isPrivate:"$_id", count:1, _id:0}} ])


// Question 2 Challenges

ppt = db.posts.aggregate([
    {$match: {$and: [{post_categories: {$ne:""}}, {post_categories: {$ne: null}}]} }, 
    {$group: {_id:"$post_categories", names:{$push:"$title"}, count:{$sum:1}  }}, 
    {$sort:{count:-1}},
    {$project:{count:1, category:"$_id", _id:0}}  ])


ppt = db.listings.aggregate([
    {$match: {$and: [{categories: {$ne:""}}, {categories: {$ne: null}}]} }, 
    {$group: {_id:"$categories", names:{$push:"$title"}, count:{$sum:1}  }}, 
    {$sort:{count:-1}},
    {$project:{count:1, category:"$_id", _id:0}}  ])


ppt = db.pins.aggregate([
{$match:{pin_categories: "Human Resources"}}, 
{ $group:{ _id: {$size: "$board_array"}, names: {$push:"$title"}, numOfPins:{$sum:1}} }, 
{$project: {sharesOnPosts:"$_id", numOfPins:1, _id:0, names:1}}, 
{$sort:{sharesOnPosts:-1}} ])


ppt = db.posts.aggregate([
    {$match: {$and: [{post_categories: {$ne:""}}, {post_categories: {$ne: null}}]} }, 
    {$group: {_id:{cat:{$toLower:"$post_categories"}, huddles:{$size:"$session"}}, names:{$push:"$title"}, count:{$sum:1}  }},
    {$project:{count:1, category:"$_id.cat", _id:0, huddles:"$_id.huddles"}},
    {$group:{_id:"$category", totHud:{$sum:"$huddles"}, totCount:{$sum:"$count"}  }},
    {$sort:{totHud:-1, totCount:-1}}  ])





// Question 3 Challenges


ppt = db.pins.aggregate([{$match:{isPrivate:{$ne: true} } }, {$unwind:{path: "$pin_categories"} }, {$group:{_id:{category:{$toLower:"$pin_categories"}}, categoryCount:{$sum:1} }}, {$project:{ category:"$_id.category", _id:0, categoryCount:1}}, {$sort: {categoryCount:-1}} ])
ppt = db.users.aggregate([{$match: {isAccepted: true}}, {$unwind:"$history"}, {$group: {_id:{amount: "$history.paid"}, numPaid:{$sum:1}, names:{$push:"$profile.name"}, eventName: {$push:"$history.session_name"} } }, {$project:{amount:"$_id.amount", _id:0, numPaid:1, names:1, "eventName":1 }},{$limit:3}, {$sort: {amount:-1}} ])
ppt = db.pins.aggregate([{$match:{isPrivate: {$ne: true}}},{$unwind:"$pin_categories"},{$group:{_id: {$toLower:"$pin_categories"},boards:{$sum:{$size:"$board_array"}}, total:{$sum:1} }}, {$project:{shares:"$boards", total:1, category:"$_id", _id:0}},{$sort:{shares:-1}} ])
// Session_host_lname
ppt = db.users.aggregate([{$match: {isAccepted: true}}, {$unwind:"$history"}, {$group: {_id:{host: "$history.session_host_lname", category:"$history.session_theme"}, numOfEvents:{$sum:1} } }, {$project:{hostLastName:"$_id.host", category:"$_id.category",_id:0, numOfEvents:1}}, {$sort: {numOfEvents:-1}} ])
ppt = db.users.aggregate([{$match: {isAccepted: true}}, {$unwind:"$history"}, {$group: {_id:{host: "$history.session_host_lname", category:"$history.session_theme"}, numOfEvents:{$sum:1} } }, {$project:{hostLastName:"$_id.host", Category:"$_id.category",_id:0, numOfEvents:1}},{$group: {_id:"$hostLastName", total:{$sum:"$numOfEvents"}, eventsPerCat:{$push:{category:"$Category",count:"$numOfEvents"}} }},{$sort: {total:-1}} ])



// Question 4 Challenges

ppt = db.users.aggregate([
    {$match:{"_id" : ObjectId("581e6696c8c4e7030062160f")}}, 
    {$unwind:"$playbookArray"}, 
    {$lookup: {from:"posts", localField:"playbookArray",foreignField:"_id", as: "Posts" }},
    {$unwind:"$Posts"}, 
    {$unwind:"$Posts.pin_array"},
    {$unwind:"$Posts.pin_array"},
    {$lookup: {from:"pins", localField:"Posts.pin_array", foreignField:"_id", as:"Pins"}},
    {$match:{Pins: {$ne:[]}}}, 
    {$unwind:"$Pins"},
    {$unwind:"$Pins.pin_categories"},
    {$group:{ _id:{$toLower:"$Pins.pin_categories"}, totalPins:{$sum:1}, tmp:{$push:"$Pins.title"}, PostCat:{$push:"$Posts"} }}, 
    {$project:{ pinCat:"$_id", totalPins:1, tmp:1, posts:"$PostCat"}}, 
    {$group: {_id:null, total:{$sum:"$totalPins"}, temp:{$push:{cat:"$_id",count: "$totalPins", title:"$tmp" }} } }, 
    {$unwind:"$temp"},{$project: {_id:"$temp.cat",percentage: {$multiply:[{$divide:["$temp.count", "$total"]},100]}, titles:"$temp.title" } }, 
    {$sort:{percentage:-1}}]).pretty()




while (ppt.hasNext()){
    printjson(ppt.next())
}




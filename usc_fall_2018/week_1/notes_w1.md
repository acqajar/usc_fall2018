# Mongodb Basics 

### Objectives:
* Organize csvs into NoSQL database structures
* Basic MongoDB queries
* Complex Queries
    * Geospatial
    * Text
    * Embedded Objects and Arrays
* [Query Optimization](https://docs.mongodb.com/manual/tutorial/analyze-query-plan/)
    * analyzing query time
    * managing/creating indexes ([here](https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/))


<br><br>

# Step 1:<br>

### <strong>Import csv on HR data </strong>

#### Tips:
* Use mongoimport & see --help if needed :)
* Specify database as `hr_data` and the collection as `hr`
* Mongoimport is a powerful tool, and can quickly digest any file type. The file types most pertinent to this course are `.json` and `.csv` 


<br><br>
# Step 2:<br>

### <strong>Explore the data</strong>: [Query the Database](https://docs.mongodb.com/manual/tutorial/query-documents/)
#### Answer the following questions:
* Which employee has the greatest number of years at the company?
* Order by and `only` show the employees by Education and and MonthlyIncome. `Note` -  order by both Education and MonthlyIncome.
* Order by and `only` show all employees where the monthly income is at least 10000 and the performance rating is no greater than 3
#### Tips:
* There are two ways of accomplishing this task: the hard way and the easy way. The <strong>hard</strong> way is to think about looping through the data to find the largest number. The <strong>easy</strong> way is to manipulate the way the data is displayed and/or returned from querying the collection.
* Everything is object based in the query - even the functions that you intend to apply to the data. Therefore, as you think about constructing your query, think carefully about the order of operations i.e. given a column and/or field in a document, apply this function.
<br><br>
# Step 3:<br>

### <strong>Lets Relate it all!</strong>
#### Answer the following questions:
* [Query Embedded document](https://docs.mongodb.com/manual/tutorial/query-embedded-documents/)
* [Query Array](https://docs.mongodb.com/manual/tutorial/query-arrays/)
#### Tips:
* Tips for population
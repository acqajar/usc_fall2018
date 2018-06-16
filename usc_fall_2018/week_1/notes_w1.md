# Mongodb Basics 

### Overview:
* [Upload csvs/json into NoSQL database (MongoDB)](#upload)
* [Basic MongoDB queries](#basic)
* [Complex Queries](#complex)
    * Geospatial ([here](https://docs.mongodb.com/manual/geospatial-queries/)) use USC database, cities collection
    * Text ([here](https://docs.mongodb.com/manual/text-search/))
    * Embedded Objects and Arrays
* [Query Optimization](#optimize)
    * Analyzing query time
    * Managing/creating indexes ([here](https://docs.mongodb.com/manual/indexes/))

<br>

`Note:`

>For today's lesson, we will be using a web version of MongoDB which you can find [here](https://www.tutorialspoint.com/mongodb_terminal_online.php). For future classes, you will should have MongoDB (and other NoSQL db we will use) already installed. Thank you :).
<!-- https://docs.mongodb.com/manual/tutorial/analyze-query-plan/ -->
<br><br>
<a id="upload"></a>
# Step 1: Upload files into MongoDB <br>

### Concepts:
* Get started on web MongoDB instance
* Import json/csv into Mongodb
* Navigating Mongo shell


First, in case you didn't, navigate to this link [here](https://www.tutorialspoint.com/mongodb_terminal_online.php). Here, we want to upload two different file types. The two files to upload are in the `data` folder which is inside the `week_1` folder. 
1. Upload those files to the online MongoDB instance by clicking on the left hand sidebar then right clicking on "root" folder and selecting upload.
2. Once uploaded, we now have to import those file types into MongoDB. To import these files we will use <strong> mongoimport </strong>.
> <strong> `Key Feature`: </strong>
> <br> <strong>$ mongoimport</strong> is a utility used to easily and simply import files into MongoDB. Here we will only concern ourselves with the .json and .csv file formats

Execute the following commands to import the .csv and .json files respectively. `Note` - the 2 .json file types should exist in the same database (--db).
 ```js
// To import .csv files
mongoimport --db [database_name] --collection [collection_name] --file [file_name] --headerline --type=[file_type] 

// To import .json files
mongoimport --jsonArray --db [database_name] --collection [collection_nam] --file [file_name]
```
#### Question - Using what you have above, how would you import the .csv and .json files?

3. Once you have successfully imported these files into you database 


> #### Tips:
>* Use mongoimport & see --help if needed :)
>* Mongoimport is a powerful tool, and can quickly digest any file type. The file types most pertinent to this course are `.json` and `.csv` 
>* To learn more, visit this [link](https://docs.mongodb.com/manual/reference/program/mongoimport/).


<br><br>
<a id="basic"></a>
# Step 2: Basic Queries<br>

### Concepts 
* Project, find, and, or, limit, where, sort, in, match, greater than


### Unit Questions - using previously uploaded csv:
* Which employee has the greatest number of years at the company?
* Order by and `only` show the employees by Education and and MonthlyIncome. `Note` -  order by both Education and MonthlyIncome.
* Order by and `only` show all employees where the monthly income is at least 10000 and the performance rating is no greater than 3
#### Tips:
* There are two ways of accomplishing this task: the hard way and the easy way. The <strong>hard</strong> way is to think about looping through the data to find the largest number. The <strong>easy</strong> way is to manipulate the way the data is displayed and/or returned from querying the collection.
* Everything is object based in the query - even the functions that you intend to apply to the data. Therefore, as you think about constructing your query, think carefully about the order of operations i.e. given a column and/or field in a document, apply this function.
<br><br>

<a id="complex"></a> 

# Step 3: Complex Queries

### Concepts:
* [Query Embedded document](https://docs.mongodb.com/manual/tutorial/query-embedded-documents/)
* [Query Array](https://docs.mongodb.com/manual/tutorial/query-arrays/)
* Geospatial
* Text

### Unit Questions:
* Questions 
#### Tips:


<a id="optimize"></a>

# Step 4: Query Optimization<br>

#### Concepts:
* Execution stats
* [Complex Indexes](https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/) - multiple indexes, order
* [Latency](https://docs.mongodb.com/manual/reference/method/db.collection.latencyStats/)


#### Unit Questions:
* Questions 
#### Tips:
* Tips for population
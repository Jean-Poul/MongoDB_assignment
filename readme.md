# Databases for developers MongoDB Assignment 3

## Group members

- Allan Bo Simonsen, cph-as484
- Jean-Poul Leth-Møller, cph-jl360
- Magda Aleksandra Wawrzak, cph-mw216
- Nina Lisakowski, cph-nl163

### Code Walkthrough
how to code works
#### How to run the projekt

### Questions


a) What is sharding in mongoDB?
Sharding in mongoDB means splitting the data into multiple instances of mongoDB, increasing both read and write performance. These instances of mongoDB are grouped together in a cluster, where they together share the responbility to serve the data. Adding more shards(instances of mongoDB servers) to the cluster should in theory increase performance in read and write, especially in heavy load conditions.The data is split into the shards according to the *shard key*, this can both be range based or hashed. The shard key should be able to evenly distribute the data to the shards, and should preferably be the most often serached parameter.

b & c) What are the different components required to implement sharding? & Explain architecture of sharding in mongoDB?
--![Unavngivet123](https://user-images.githubusercontent.com/21145015/158875747-4e1d3f8f-4849-4402-be84-5f35a7aea7e7.png)
Sharding requires 3 components to work.
* config server
The config server holds the keys for the data, keeping track of which shard contains the requested data. The config server is a mongod instance and needs to be in the same replica set as the mongos server. the config server has a special --configsvr sertup parameter and has standard port 27019. The config server can be replicated giving resiliance for data loss. Dosent matter if you have alot of data if you cant fint, because you lost the key.

* Shards
Shards are also mongod instances, and are the databases where we split the data into. The data is split according to shard key and splits the data on a specified key in the collection that is indexed. The standard port for shards are 27018 and has a special startup paramter --shardsvr

* Mongos server
The mongos server acts as the entry point for the database, even though it dosent contain any data itself(beacause the data is in the shards). The standard port is 27017. This means that this service can live locally in the client application and connect to the config server(that does need to be hosted in the cloud), giving easy access for the user, without knowing anything about the shards.

The setup for sharding is very tedious and requieres setting up each individual component as described.

The flow of data is as follow: The mongos server acts an entry point for the client. The mongos server, when requested for read or write operation, will contact the config server. The config server will lookup which shard to contact for the specific data. The mongos server will then contact the correct shard to complete the operation.


d) Provide implementation of map and reduce function
-Answered by code
e) Provide execution command for running MapReduce
-Answered by code
f) Provide top 10 recorded out of the sorted result. (hint: use sort on the result returned by
MapReduce)
-Answered by code

g) Show what happens to the data when one shard is turned off.
When a shard goes down, the data that shard contains becomes unavailable. The effectively means half or more of the data is unreadable. This can be mediagted by replicating the shards. Replications would in that case step in and acts as the new primary. however the setup for this only becomes more confusing and cumbersome.

h) Show what happens to the data when the shard rejoins.
Depending on the setup, when a shard comes back online, if it is part of a replication cluster. It will try to catchup with the newest available data.

i) Explain how you could introduce redundancy to the setup above.
As we have already dicussed, replication is the answer. This would increase the redundancy of shards substantially and actually make this a viable solution. Even though it comes with a big cost in setup and amount of servers. If done right each replica and shard should live on their own server. This can quickly scale up dozens if not hundreds of servers.  

#### Pros & cons with mongoDB
- Can handle humongous amount of data
- High flexibility in data types, since its data types are not enforced by any schema
- Allows nesting of objects. Can also make references/relation to other documents.
- Can store files, using gridFX
- Data redundancy with replication feature.
- Horizontal scaleability with sharding

-Encourages denormilazation due to there being no rule enforcement from schemas and allowing nesting
-No type checking or input validation. The data needs to be cleaned and checked by the code.
-joins are difficult to implement.
-nesting is limited at 100th level.
-Can be prone to duplication of data, due to lack of restrictions.

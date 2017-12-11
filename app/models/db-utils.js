import {MongoClient} from "mongodb";
import data from "./cities.json";

const url = 'mongodb://localhost:27017';

const dbName = 'task7';

/**
 * add a default documents of cities to the model
 */
function addCities() {
    MongoClient.connect(url, function (err, client) {
        console.log("Connected correctly to server");
    
        const db = client.db(dbName);
        const citiesCollection = db.collection("cities");
        const cursor = citiesCollection.find({}).count(function(err, value) {
            if (value === 0) {
                console.log("Add new documents to an empty city collection");
                citiesCollection.insertMany(data);
            } else {
                console.log("Collection of the cities exists");
            }
            client.close();
        });
    });
}

export {addCities};
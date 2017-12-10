import {MongoClient} from "mongodb";
import data from "./cities.json";

const url = 'mongodb://localhost:27017';
const dbName = 'task7';

/**
 * add default city documents to model
 */
function addCities() {
    MongoClient.connect(url, function (err, client) {
        console.log("Connected correctly to server");
    
        const db = client.db(dbName);
        const citiesCollection = db.collection("cities");
        const cursor = citiesCollection.find({}).count(function(err, value) {
            if (value === 0) {
                console.log("Add new documents to an empty collection");
                citiesCollection.insertMany(data);
            } else {
                console.log("Collection exists");
            }
            client.close();
        });
    });
}

function getRandomDocument() {
    return MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        const citiesCollection = db.collection("cities");
        const cursor = citiesCollection.find({}).toArray(function(err, docArr) {
            if (docArr.length) {
                // console.log("documents are exist ", docArr);
                const max = docArr.length - 1;
                const randomNumber = Math.floor(Math.random() * (max + 1));
                console.log("random number is ", randomNumber);
                console.log("random document is ", docArr[randomNumber]);
            }
            client.close();
        });
    });
}

export {addCities, getRandomDocument};
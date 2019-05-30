# CTLFirebase

This is a small wrapper to abstract some of the more common tasks of sending data via a realtime database.

## Installation

Copy the `CTLFirebase` folder into your project and then you can require it by using `const CTLFirebase = require('./CTLFirebase/CTLFirebase')` in your node.js code.

You do however also need to install firebase into your project:

```
npm install firebase
```

## API

**CTLPrinter(credentials)**
- *credentials* - Object that is taken from the firebase configuration


**write(key, values)**
- *key* The key to store. Will override other keys with that name
- *values* The value to store into firebase
- *@returns Promise*


**writeToList(key, values)**
- *key* The key to store. Will override other keys with that name
- *values* The value to store into firebase
- *@returns Promise*


**read(key)**
- *key* The key to retreive value from
- *@returns Promise(DataObject)*


**listen(key, onAdded)**
- *key* The key to listen to
- *onAdded* The callback for when there is new data
- *@returns Promise(DataObject)*


**listenToList(key, onAdded)**
- *key* The key to listen to
- *onAdded* The callback for when there is new data
- *@returns Promise(DataObject)*


**delete(key)**
- *key* The key to delete/unset
- *@returns Promise*


```
DataObject = {
    firebaseKey: String // The unique firebase key of the data
    value: * // The value for the current key
}
```

## Example

Look into the `examples/` folder to actually run this

```
const CTLFirebase = require('./CTLFirebase/CTLFirebase');

// You need to get these from Firebase
// https://support.google.com/firebase/answer/7015592?hl=en
const credentials = { ... };
const options = {};

const database = new CTLFirebase(credentials, options);

// Sets up an event listener for the key 'TEST_KEY'
database.listen('TEST_KEY', obj => {
    console.log('The data was updated: ', obj);
});

// Writes a message to 'TEST_KEY' after 1 second
setTimeout(() => {
    database.write('TEST_KEY', Math.random());
}, 1000);
```
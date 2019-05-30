const CTLFirebase = require('../CTLFirebase/CTLFirebase');

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
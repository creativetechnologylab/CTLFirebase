const CTLFirebase = require('../CTLFirebase/CTLFirebase');

// You need to get these from Firebase
// https://support.google.com/firebase/answer/7015592?hl=en
const credentials = { ... };
const options = {};

const database = new CTLFirebase(credentials, options);

database.listen('TEST_KEY', obj => {
    console.log('The data was updated: ', obj);
});

setTimeout(() => {
    database.write('TEST_KEY', Math.random());
}, 1000);
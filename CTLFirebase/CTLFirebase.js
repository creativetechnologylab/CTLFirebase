var firebase = require('firebase');

class CTLFirebase {
    constructor(credentials) {
        this.fb = firebase.initializeApp(credentials);
        this.database = this.fb.database();
    }

    _writeRef(ref, values) {
        return new Promise((resolve, reject) => {
            ref.set(values, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }

    write(key, values) {
        return this._writeRef(this.database.ref(key), values);
    }

    writeToList(key, values) {
        const ref = this.database.ref(key).push();
        return this._writeRef(ref, values);
    }

    _reportSnapshot(snapshot) {
        const val = snapshot.val();
        const key = snapshot.key;
        
        return {
            firebaseKey: key,
            value: val
        };
    }

    read(key) {
        return new Promise((resolve, reject) => {
            this.database.ref(key).once('value')
                .then(snapshot => {
                    resolve(this._reportSnapshot(snapshot));
                });
        });
    }

    listen(key, onAdded) {
        this.database.ref(key).on('value', snapshot => {
            onAdded(this._reportSnapshot(snapshot));
        });
    }

    listenToList(key, onAdded) {
        this.database.ref(key).on('child_added', snapshot => {
            onAdded(this._reportSnapshot(snapshot));
        });
    }

    delete(key) {
        return this.write(key, NULL);
    }
}

module.exports = CTLFirebase;
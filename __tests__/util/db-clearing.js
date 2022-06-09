/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const mongoose = require('mongoose');

module.exports = async function removeAllCollections() {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        await collection.deleteMany();
    }
};

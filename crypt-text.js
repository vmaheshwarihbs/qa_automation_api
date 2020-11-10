const { encrypt, decrypt } = require('./hash');

const hash = encrypt('tmtapp');

// console.log(hash);


const text = decrypt(hash);

// console.log(text);
module.exports = text;

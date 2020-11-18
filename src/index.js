import { cryptography } from '@liskhq/lisk-client';


const {getRandomBytes, getAddressFromPublicKey, getPrivateAndPublicKeyFromPassphrase, getBase32AddressFromAddress} = cryptography;
const {publicKey, privateKey} = getPrivateAndPublicKeyFromPassphrase(getRandomBytes(20).toString('utf8'));
const address = getAddressFromPublicKey(publicKey);
const base32Address = getBase32AddressFromAddress(address);

console.log({publicKey, privateKey, address, base32Address});

const bigIntBuffer = Buffer.alloc(8);
bigIntBuffer.writeBigUInt64BE(BigInt(40));

const bigIntVal = bigIntBuffer.readBigUInt64BE();

console.log({bigIntBuffer, bigIntVal})
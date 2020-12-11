import { cryptography, apiClient } from '@liskhq/lisk-client';


const {getRandomBytes, getAddressFromPublicKey, getPrivateAndPublicKeyFromPassphrase, getBase32AddressFromAddress} = cryptography;
const {publicKey, privateKey} = getPrivateAndPublicKeyFromPassphrase(getRandomBytes(20).toString('utf8'));
const address = getAddressFromPublicKey(publicKey);
const base32Address = getBase32AddressFromAddress(address);

console.log({publicKey, privateKey, address, base32Address});

const bigIntBuffer = Buffer.alloc(8);
bigIntBuffer.writeBigUInt64BE(BigInt(40));

const bigIntVal = bigIntBuffer.readBigUInt64BE();

console.log({bigIntBuffer, bigIntVal})

const {createWSClient} = apiClient;

const run = async() => {
  const client = await createWSClient('ws://localhost:8888/ws');

  const info =  await client.node.getNodeInfo();
  console.log(info);

  client.subscribe('app:block:new', block => {
    console.info(client.block.decode(Buffer.from(block.block, 'hex')));
  });
};

run().then(console.info).catch(console.error);
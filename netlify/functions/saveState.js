const { NetlifyKV } = require('netlify');

const kv = new NetlifyKV();

exports.handler = async function(event, context) {
  const { state } = JSON.parse(event.body);
  const id = generateId();
  await kv.set(id, state);
  return {
    statusCode: 200,
    body: JSON.stringify({ id }),
  };
};

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

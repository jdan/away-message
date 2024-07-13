const { NetlifyKV } = require('netlify');

const kv = new NetlifyKV();

exports.handler = async function(event, context) {
  const { id } = event.queryStringParameters;
  const state = await kv.get(id);
  return {
    statusCode: 200,
    body: JSON.stringify({ state }),
  };
};

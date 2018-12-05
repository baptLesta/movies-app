const { to } = require('await-to-js');
const pe = require('parse-error');

module.exports.to = async (promise) => {
  const [err, res] = await to(promise);
  if (err) return [pe(err)];

  return [null, res];
};

function sendError(res, err, code) { // Error Web Response
  if (typeof err === 'object' && typeof err.message !== 'undefined') {
    err = err.message; // eslint-disable-line
  }

  if (typeof code !== 'undefined') res.statusCode = code; // eslint-disable-line

  return res.json({ success: false, error: err });
}

function sendSuccess(res, data, code) { // Success Web Response
  let sendData = { success: true };

  if (typeof data === 'object') {
    sendData = Object.assign(data, sendData); // merge the objects
  }

  if (typeof code !== 'undefined') res.statusCode = code; // eslint-disable-line

  return res.json(sendData);
}

function throwError(errorMsg, log) {
  if (log === true) {
    console.error(errorMsg);
  }

  throw new Error(errorMsg);
}

module.exports = { to, sendError, sendSuccess, throwError };

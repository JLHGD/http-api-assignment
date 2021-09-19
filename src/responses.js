const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const indexCSS = fs.readFileSync(`${__dirname}/../client/style.css`);

const respond = (request, response, content, type) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getIndexStyle = (request, response) => respond(request, response, indexCSS, 'text/css');

const getIndex = (request, response) => respond(request, response, index, 'text/html');
// respond(request, response, indexCSS, 'text/css');

const generateXML = (obj) => {
  let responseXML = '<response>';
  if (obj.message) {
    responseXML = `${responseXML} <name>${obj.message}</name>`;
  }
  if (obj.id) {
    responseXML = `${responseXML} <id>${obj.id}</id>`;
  }
  responseXML = `${responseXML} </response>`;
  return responseXML;
};

const getSuccess = (request, response, acceptedTypes) => {
  const success = {
    message: 'This is a successful response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    return respond(request, response, generateXML(success), 'text/xml');
  }

  const successString = JSON.stringify(success);
  return respond(request, response, successString, 'application/json');
};

// const getBadRequest = (request, response, acceptedTypes) => {
//     const badRequest = {
//         message: "Missing valid query paramter set to true",
//         id: "badRequest"
//     };
//     const goodRequest = {
//         message: "This request has the required parameters"
//     };
//     const badRequestString = JSON.strinify(badRequest);
//     const goodRequestString = JSON.strinify(goodRequest);
//   respond(request, response, index, 'text/html');
// };
//
// const getUnauthorized = (request, response, acceptedTypes) => {
//     const unauthorized = {
//         message: "Missing loggedIn query parameter set to yes",
//         id: "unauthorized"
//     };
//     const authorized = {
//         message: "You have successfully viewed the content"
//     };
//     const unauthorizedString = JSON.strinify(unauthorized);
//     const authorizedString = JSON.strinify(authorized);
//   respond(request, response, index, 'text/html');
// };
//
// const getForbidden = (request, response, acceptedTypes) => {
//     const forbidden = {
//         message: "You do not have access to this content",
//         id: "forbidden"
//     };
//     const forbiddenString = JSON.strinify(forbidden);
//   respond(request, response, index, 'text/html');
// };
//
// const getInternal = (request, response, acceptedTypes) => {
//     const internal = {
//         message: "Internal Server Error. Something went wrong",
//         id: "internal"
//     };
//     const internalString = JSON.strinify(internal);
//   respond(request, response, index, 'text/html');
// };
//
// const getNotImplemented = (request, response, acceptedTypes) => {
//     const notImplemented = {
//         message: "A get request for this page has not been implemented yet.
//                      Check again later for updated content",
//         id: "notImplemented"
//     };
//     const notImplementedString = JSON.strinify(notImplemented);
//   respond(request, response, index, 'text/html');
// };
//
// const getNotFound = (request, response, acceptedTypes) => {
//     const notFound = {
//         message: "The page you are looking for was not found",
//         id: "notFound"
//     };
//     const notFoundString = JSON.strinify(notFound);
//   respond(request, response, index, 'text/html');
// };

// const getAcceptedTypes = (request, response, acceptedTypes) => {

// };

// module.exports.getAcceptedTypes = getAcceptedTypes;

module.exports = {
  getIndexStyle,
  getIndex,
  getSuccess, // ,
  // getBadRequest,
  // getUnauthorized,
  // getForbidden,
  // getInternal,
  // getNotImplemented,
  // getNotFound,
};

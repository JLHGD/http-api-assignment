// Generates an XML string with a given object
const generateXML = (obj) => {
  let responseXML = '<response>';
  if (obj.message) {
    responseXML = `${responseXML} <message>${obj.message}</message>`;
  }
  if (obj.id) {
    responseXML = `${responseXML} <id>${obj.id}</id>`;
  }
  responseXML = `${responseXML} </response>`;
  return responseXML;
};

const respond = (request, response, status, object, type) => {
  response.writeHead(status, { 'Content-Type': type });
  let content;
  if (type === 'text/xml') {
    content = generateXML(object);
  } else {
    content = JSON.stringify(object);
  }
  response.write(content);
  response.end();
};

const getSuccess = (request, response, acceptedTypes) => {
  const success = {
    message: 'This is a successful response',
  };
  return respond(request, response, 200, success, acceptedTypes[0]);
};

const getBadRequest = (request, response, acceptedTypes, params) => {
  const badRequest = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    badRequest.message = 'Missing valid query paramter set to true';
    badRequest.id = 'badRequest';
    return respond(request, response, 400, badRequest, acceptedTypes[0]);
  }
  return respond(request, response, 200, badRequest, acceptedTypes[0]);
};

const getUnauthorized = (request, response, acceptedTypes, params) => {
  const unauthorized = {
    message: 'You have successfully viewed the content',
  };
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    unauthorized.message = 'Missing loggedIn query parameter set to yes';
    unauthorized.id = 'unauthorized';
    return respond(request, response, 401, unauthorized, acceptedTypes[0]);
  }
  return respond(request, response, 200, unauthorized, acceptedTypes[0]);
};

const getForbidden = (request, response, acceptedTypes) => {
  const forbidden = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };
  return respond(request, response, 403, forbidden, acceptedTypes[0]);
};

const getInternal = (request, response, acceptedTypes) => {
  const internal = {
    message: 'Internal Server Error. Something went wrong',
    id: 'internalError',
  };
  return respond(request, response, 500, internal, acceptedTypes[0]);
};

const getNotImplemented = (request, response, acceptedTypes) => {
  const notImplemented = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
    id: 'notImplemented',
  };
  return respond(request, response, 501, notImplemented, acceptedTypes[0]);
};

const getNotFound = (request, response, acceptedTypes) => {
  const notFound = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };
  return respond(request, response, 404, notFound, acceptedTypes[0]);
};

module.exports = {
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternal,
  getNotImplemented,
  getNotFound,
};

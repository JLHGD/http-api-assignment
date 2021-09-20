const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlResponseHandler = require('./htmlResponses.js');
const dataResponseHandler = require('./jsonXMLResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlResponseHandler.getIndex,
  '/style.css': htmlResponseHandler.getIndexStyle,
  '/success': dataResponseHandler.getSuccess,
  '/badRequest': dataResponseHandler.getBadRequest,
  '/unauthorized': dataResponseHandler.getUnauthorized,
  '/forbidden': dataResponseHandler.getForbidden,
  '/internal': dataResponseHandler.getInternal,
  '/notImplemented': dataResponseHandler.getNotImplemented,
  notFound: dataResponseHandler.getNotFound,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const acceptedTypes = request.headers.accept.split(',');
  const params = query.parse(parsedUrl.query);

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes, params);
  } else {
    urlStruct.notFound(request, response, acceptedTypes);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.1.1: ${port}`);

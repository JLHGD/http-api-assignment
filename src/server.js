const http = require('http');
const url = require('url');

const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': responseHandler.getIndex,
  '/success': responseHandler.getSuccess,
  // '/badRequest': responseHandler.getBadRequest,
  // '/unauthorized': responseHandler.getUnauthorized,
  // '/forbidden': responseHandler.getForbidden,
  // '/internal': responseHandler.getInternal,
  // '/notImplemented': responseHandler.getNotImplemented,
  // '/notFound': responseHandler.getNotFound
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const acceptedTypes = request.headers.accept.split(',');

  if (urlStruct[parsedUrl.pathname]) {
    if (urlStruct[parsedUrl.pathname] === '/') {
      responseHandler.getIndexStyle(request, response);
    }
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes);
  } else {
    // urlStruct['/notFound'](request, response, acceptedTypes);
    // responseHandler.getIndexStyle(request, response);
    responseHandler.getIndex(request, response);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.1.1: ${port}`);

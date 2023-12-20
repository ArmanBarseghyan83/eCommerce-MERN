// This is used as a catch-all route handler for handling requests to routes that do not exist.
// This will run only if no routes found, because it comes after all routes in server.js and will
// pass the error to the next errorHandler() function.
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};


// err is going to be error passed from notFound() and will be modified if necessary
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = `Resource not found`;
    statusCode = 404;
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };

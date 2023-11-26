// Instead of having try catch in the controller functions, 
// wrap controllers with this function to handle the errors.
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;

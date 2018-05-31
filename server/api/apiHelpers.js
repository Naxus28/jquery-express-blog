import { ApiException } from '../errorHandlers/exceptionClasses';
/**
 * checks if api request is missing mandatory params
 * @param  {Object} items the post object
 * @return missingItems | throws exception
 */
const validateApiRequest = (items) => {
  let missingItems = [];

  for (let [key, value] of Object.entries(items)) {
    if (!value) {
      missingItems.push(key);
    }
  }

  if (missingItems.length) {
    throw new ApiException(`Missing required item(s): '${missingItems}'`, 400);
  }
};

export {
  validateApiRequest
};
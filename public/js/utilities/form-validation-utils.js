/**
 * VALIDATE FORM
 * @param  {Object} data
 * @return {Array} the incoplete form fields
 */
const fieldsIncomplete = data => {
  const requiredFields = ['author', 'title', 'content'];
  const incomplete = [];

  requiredFields.forEach(field => {
    if (!data[field]) {
        incomplete.push(field);
      }
  });

  return incomplete;
};


/**
 * FORMAT FIELDS TEXT FOR FEEDBACK
 * @param  {Array} fields
 * @return {String} formatted message
 */
const formatIncompleteFieldsErrorMsg = fields => {
  let formattedErrorMsg = '';

  fields.forEach((field, i)=> {
    // if it is the second to last element, add ', and' to string
    // or ' and' if there are only two elements in the array ("title and content" as opposed to "title, and content")
    if (i === fields.length-2) {  
      let text = fields.length > 2 ? `${field}, and ` : `${field} and `;
      formattedErrorMsg+=text;

    // if it is the last element, don't change anything
    } else if (i === fields.length-1) { 
      formattedErrorMsg+=field;

    // else, add comma
    } else {
      formattedErrorMsg+=`${field}, `;
    }
  });

  return formattedErrorMsg;
};


const displayFormError = (error, context, parentClass) => {
  context
    .render('../../templates/form-error.template', { error })
    .replace(parentClass);

    $(parentClass).show();
};
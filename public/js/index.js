// const BLOG_ENDPOINT = `${window.location.origin}/blog`;


// /**
//  * BUILD POST HTML
//  * @param  {Array} blogPosts
//  * @return {DOM Node(s)}
//  */
// const buildPostsHTML = blogPosts => ( 
//   blogPosts.map(post => {
//     let {
//       _id,
//       title,
//       content,
//       author,
//       publishDate,
//       updatedDate
//     } = post;

//     content = content.length > 300 
//       ? `${content.substring(0, 500)}... <a href="" class="read-more">read more</a>`
//       : content;

//     return `
//     <div class="blog-posts__post" id=${_id}>
//       <div class="blog-posts__post-header">
//         <h3 class="blog-posts__post-title">${title}</h3>
//         <button class="update">Update</button>
//         <button class="delete">Delete</button>
//       </div>
//       <p class="blog-posts__post-content">${content}</p>
//       <div class="blog-posts__post-footer">
//         <div class="author-container">
//           <span class="author bold">${author}</span>
//         </div>        

//         <div class="published-dates-container">
//           <span class="date bold">Published: ${moment(publishDate).format('MMMM Do YYYY, h:mm:ss a')}</span>
//           ${
//             updatedDate 
//               ? `<span class="date bold">Updated: ${moment(updatedDate).format('MMMM Do YYYY, h:mm:ss a')}</span>`
//               : ''
//           }
//         </div>
//       </div>
//     </div>`
//   })
// );



// /**
//  * VALIDATE FORM
//  * @param  {Object} data
//  * @return {Array} the incoplete form fields
//  */
// const fieldsIncomplete = data => {
//   const requiredFields = ['author', 'title', 'content'];
//   const incomplete = [];

//   requiredFields.forEach(field => {
//     if (!data[field]) {
//         incomplete.push(field);
//       }
//   });

//   return incomplete;
// };

// /**
//  * FORMAT FIELDS TEXT FOR FEEDBACK
//  * @param  {Array} fields
//  * @return {String} formatted message
//  */
// const formatIncompleteFieldsErrorMsg = fields => {
//   let formattedErrorMsg = '';

//   fields.forEach((field, i)=> {
//     // if it is the second to last element, add ', and' to string
//     // or ' and' if there are only two elements in the array ("title and content" as opposed to "title, and content")
//     if (i === fields.length-2) {  
//       let text = fields.length > 2 ? `${field}, and ` : `${field} and `;
//       formattedErrorMsg+=text;

//     // if it is the last element, don't change anything
//     } else if (i === fields.length-1) { 
//       formattedErrorMsg+=field;

//     // else, add comma
//     } else {
//       formattedErrorMsg+=`${field}, `;
//     }
//   });

//   return formattedErrorMsg;
// };

// /**
//  * GETS POST TEXT FIELDS
//  * @param  {jQuery Event Object} e 
//  * @return {Object} the text fields
//  */
// const getBlogPostTextFields = e => {
//   let $postParent = $(e.target).closest('.blog-posts__post'),
//       id = $postParent.attr('id'),
//       title = $postParent.find('.blog-posts__post-title').text(),
//       author = $postParent.find('.blog-posts__post-footer .author').text(),
//       content = $postParent.find('.blog-posts__post-content').text();

//   return {
//     id,
//     title,
//     author,
//     content
//   };
// }

// /**
//  * AJAX GET 
//  * @return {undefined}
//  */
// // const getBlogPosts = () => {
// //   $.ajax({
// //     url: BLOG_ENDPOINT,
// //     dataType: 'json',
// //     success: posts => $('.blog-posts').html(buildPostsHTML(posts)),
// //     error: handleError
// //   });
// // };

// /**
//  * AJAX POST 
//  * @return {undefined}
//  */
// const postBlogPosts = () => {
//   $('.blog-form').on('submit', e => {
//     e.preventDefault();

//     let $form = $(e.target),
//         $error = $('.post-error'),
//         data = $form.serializeObject();
//         incompleteFields = fieldsIncomplete(data);

//      if (incompleteFields.length) {
//       incompleteFields = incompleteFields.length === 1
//           ? incompleteFields
//           : formatIncompleteFieldsErrorMsg(incompleteFields);

//       handleError(`Please enter ${incompleteFields} before submitting the form.`);
//       return;
//      }

//      // POST
//     $.ajax({
//       url: BLOG_ENDPOINT,
//       method: 'POST',
//       dataType: 'json',
//       headers: {
//         'Content-Type': 'application/json' // browsers default Content-Type to application/x-www-form-urlencoded
//       },
//       data: JSON.stringify(data), // need to stringify to send as json
//       success: posts => {
//         $('.blog-posts').prepend(buildPostsHTML([posts])); // pass the single post as an array so we can map over it on 'buildPostsHTML'
//         $error.hide();
//         $form[0].reset();
//       },
//       error: err => handleError(err)
//     });
//   });
// };


// /**
//  * HANDLES CLICKS ON 'UPDATE' BUTTON (NOT SUBMISSION) 
//  * @return {undefined}
//  */
// const updateBlogPost = () => {
//   $('body').on('click', '.update', e => {
//     let $postParent = $(e.target).closest('.blog-posts__post');

//     // get values from fields
//     let { 
//       id, 
//       author,
//       title, 
//       content
//     } = getBlogPostTextFields(e);

//     // create form
//     let inlineForm =  
//     `<div class="update-form">
//       <div class="update-error error"></div>
//       <form action="#" class="blog-update"  onsubmit="return false;" id=${id}>
//         <div class="input-wrapper">
//           <input name="author" placeholder="Author" value="${author}">
//           <input name="title" placeholder="Title" value="${title}">
//         </div>

//         <div class="input-wrapper">
//           <textarea name="content" placeholder="Write your post">${content}</textarea>
//         </div>     

//         <div class="buttons-container">
//           <button class="submit-update">Update Post</button>
//           <button class="cancel-update" type="button">Cancel</button>
//         </div>
//       </form>
//     </div>`;

//     $postParent.after(inlineForm);
//     $postParent.hide();
//   });
// };

// /**
//  * HANDLES CLICKS ON 'CANCEL' THAT CANCEL OUT OF THE UPDATE OPTION
//  * @return {undefined}
//  */
// const cancelUpdateSubmission = () => {
//   $('body').on('click', '.cancel-update', e => {
//     let $target = $(e.target),
//         $form = $target.closest('.blog-update'),
//         $postParent = $target.closest('.update-form').prev(),
//         $error = $target.closest('.update-form').find('.update-error');

//     $postParent.show();
//     $form.hide();
//     $error.hide();
//   });
// };


// /**
//  * AJAX PUT 
//  * @return {undefined}
//  */
// const submitUpdate = () => {
//   $('body').on('submit', '.blog-update', e => {
//     event.preventDefault();

//       let $form = $(e.target),
//           id = $form.attr('id'),
//           $error = $(e.target).closest('.update-form').find('.update-error'),
//           $updateForm = $('.blog-update'),
//           data = $form.serializeObject();
//           incompleteFields = fieldsIncomplete(data);

//        if (incompleteFields.length) {
//         let formattedFields = incompleteFields.length === 1
//             ? incompleteFields
//             : formatIncompleteFieldsErrorMsg(incompleteFields);

//         handleError(`Please enter ${formattedFields} before submitting the form.`, $error);
//         return;
//        }

//        // PUT
//       $.ajax({
//         url: `${BLOG_ENDPOINT}\/${id}`,
//         method: 'PUT',
//         dataType: 'json',
//         headers: {
//           'Content-Type': 'application/json' // browsers default Content-Type to application/x-www-form-urlencoded
//         },
//         data: JSON.stringify(Object.assign(data, { id: id })), // need to stringify to send as json
//         success: posts => {
//           $('.blog-posts').prepend(buildPostsHTML([posts])); // pass the single post as an array so we can map over it on 'buildPostsHTML'
//           $error.hide();
//           $updateForm.remove();
//           $form[0].reset();
//         },
//         error: err => handleError(err)
//       });
//     });
// };


// /**
//  * AJAX DELETE 
//  * @return {undefined}
//  */
// const deletePost = () => {
//   $('body').on('click', '.delete', e => {
//     if (!confirm('This action cannot be undone. Do you want to proceed?')) {
//       return;
//     }

//     const $postParent = $(e.target).closest('.blog-posts__post');
//     const textFields = getBlogPostTextFields(e);

//      // DELETE
//     $.ajax({
//       url: `${BLOG_ENDPOINT}\/${textFields.id}`,
//       method: 'DELETE',
//       dataType: 'json',
//       headers: {
//         'Content-Type': 'application/json' // browsers default Content-Type to application/x-www-form-urlencoded
//       },
//       data: JSON.stringify(textFields), // need to stringify to send as json
//       success: () => $postParent.remove(), // remove the blog node
//       error: handleError
//     });
//   });
// };


// // INIT
// const init = () => {
//   // getBlogPosts();
//   postBlogPosts();
//   updateBlogPost();
//   submitUpdate();
//   cancelUpdateSubmission();
//   deletePost();
// };

// $(init);





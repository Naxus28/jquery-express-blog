const getUpdatePostForm = jqueryEvent => {
  let { 
    id, 
    title, 
    author,
    authorId,
    content
  } = getBlogPostTextFields(jqueryEvent, '.post-container');

  return`
    <div class="update-form">
      <div class="update-error error"></div>
      <form action="#/" method="POST" class="blog-update" onsubmit="return false;" id=${id}>
        <div class="input-wrapper">
          <input type="hidden" name="author" value="${authorId}">
          <input class="update-form__author" name="authorEmail" placeholder="Author" value="${author}" readonly>
          <input name="title" placeholder="Title" value="${title}">
        </div>

        <div class="input-wrapper">
          <textarea class="update-form__textarea" name="content" placeholder="Write your post">${content}</textarea>
        </div>     

        <div class="buttons-container">
          <button class="submit-update">Update Post</button>
          <button class="cancel-update" type="button">Cancel</button>
        </div>
      </form>
    </div>`;
};
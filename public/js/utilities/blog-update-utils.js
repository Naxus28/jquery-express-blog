/**
 * HANDLES CLICKS ON 'UPDATE' BUTTON (NOT SUBMISSION) 
 * @return {undefined}
 */
const updateBlogPost = hiddenPostSelector => {
  $('body')
    .off('click', '.update')
    .on('click', '.update', e => {
      let $postParent = $(e.target).closest(hiddenPostSelector);

      $postParent.after(getUpdatePostForm(e));
      $postParent.hide();
  });
};

/**
 * HANDLES CLICKS ON 'CANCEL' THAT CANCEL OUT OF THE UPDATE OPTION
 * @return {undefined}
 */
const cancelUpdateSubmission = () => {
  $('body')
  .off('click', '.cancel-update')
  .on('click', '.cancel-update', e => {
    let $target = $(e.target),
        $form = $target.closest('.blog-update'),
        $postParent = $target.closest('.update-form').prev(),
        $error = $target.closest('.update-form').find('.update-error');

    $postParent.show();
    $form.hide();
    $error.hide();
  });
};

const initUpdateBlogUIListeners = blogPostSelector => {
  updateBlogPost(blogPostSelector);
  cancelUpdateSubmission();
};
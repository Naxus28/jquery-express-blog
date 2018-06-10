const trimContent = (content, maxLen) => {
  return content.length > maxLen ? `${content.substring(0, maxLen)}...` : content;
};

const formatDateForPost = rawDate => moment(rawDate).format('MMMM Do YYYY, h:mm:ss a');
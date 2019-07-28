export const isEmptyObject = obj => Object.keys(obj).length === 0;

export const renderGender = (gender) => {
  switch (gender.toLowerCase()) {
    case 'male':
      return 'Mr.';
    case 'female':
      return 'Mrs.';
    default:
      return '';
  }
};

export const sliceContent = (content, limit) =>
  content.length > limit
    ? `${content.slice(0, limit)}...`
    : content;

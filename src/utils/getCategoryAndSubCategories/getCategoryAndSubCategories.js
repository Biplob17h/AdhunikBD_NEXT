const getCategoryAndSubCategories = async (categoryId) => {
  let category = {};
  let subCategories = [];

  fetch(`/api/category?categoryId=${id}`)
    .then((res) => res.json())
    .then((data) => {
      category = data.data;
    });

  fetch(`/api/category/subcategory?categoryId=${id}`)
    .then((res) => res.json())
    .then((data) => {
      subCategories = data.data;
    });

  return { category, subCategories };
};

export default getCategoryAndSubCategories
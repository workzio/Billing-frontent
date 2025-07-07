const getProduct = state => state.product.productdetails
const getCategory = state => state.product.categorydetails
const getUnit = state => state.product.unitlist
const getCategoryProduct = state => state.product.categoryProductdetails

const selectors = {
    getProduct,
    getCategory,
    getCategoryProduct,
    getUnit
}

export default selectors
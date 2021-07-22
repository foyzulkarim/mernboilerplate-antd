class ProductViewModel {   
    static convert = (product) => {
        const viewModel = Object.create(product);
        const { __v, ...rest } = JSON.parse(JSON.stringify(viewModel));
        return rest;
    }
}

module.exports.ProductViewModel = ProductViewModel;
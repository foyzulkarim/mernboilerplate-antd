class FilterViewModel {   
    static convert = (filter) => {
        const viewModel = Object.create(filter);
        const { __v, ...rest } = JSON.parse(JSON.stringify(viewModel));
        return rest;
    }
}

module.exports.FilterViewModel = FilterViewModel;
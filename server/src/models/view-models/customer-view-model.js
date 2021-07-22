class CustomerViewModel {   
    static convert = (customer) => {
        const viewModel = Object.create(customer);
        const { __v, ...rest } = JSON.parse(JSON.stringify(viewModel));
        return rest;
    }
}

module.exports.CustomerViewModel = CustomerViewModel;
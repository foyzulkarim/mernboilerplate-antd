class PermissionViewModel {   
    static convert = (permission) => {
        const viewModel = Object.create(permission);
        const { __v, ...rest } = JSON.parse(JSON.stringify(viewModel));
        return rest;
    }
}

module.exports.PermissionViewModel = PermissionViewModel;
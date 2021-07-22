class UserViewModel {
    static convert = (user) => {
        const viewModel = Object.create(user);
        const { __v, passwordHash, ...rest } = JSON.parse(JSON.stringify(viewModel));
        return rest;
    }

}

module.exports.UserViewModel = UserViewModel;
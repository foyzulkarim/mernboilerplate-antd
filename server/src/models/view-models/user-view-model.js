class UserViewModel {
    static convert = (user) => {
        if (user) {
            const viewModel = Object.create(user);
            const { __v, passwordHash, ...rest } = JSON.parse(JSON.stringify(viewModel));
            return rest;
        }
        return null;
    }

}

module.exports.UserViewModel = UserViewModel;
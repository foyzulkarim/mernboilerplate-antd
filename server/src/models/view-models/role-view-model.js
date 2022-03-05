class RoleViewModel {
  static convert = (role) => {
    const viewModel = Object.create(role);
    const { __v, ...rest } = JSON.parse(JSON.stringify(viewModel));
    return rest;
  };
}

module.exports.RoleViewModel = RoleViewModel;

class ResourceViewModel {
  static convert = (resource) => {
    const viewModel = Object.create(resource);
    const { __v, ...rest } = JSON.parse(JSON.stringify(viewModel));
    return rest;
  };
}

module.exports.ResourceViewModel = ResourceViewModel;

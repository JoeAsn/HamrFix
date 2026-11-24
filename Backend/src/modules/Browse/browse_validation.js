function browse_validation(req, res, next) {
  const filters = req.query;
  const filtered_array = Object.entries(filters).filter((filter) => {
    filters[filter[0]];
  });
  const filtered_object = Object.fromEntries(filtered_array);
  // validation phase.
}
export default browse_validation;

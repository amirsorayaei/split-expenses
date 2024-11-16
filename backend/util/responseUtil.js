export const formatResponse = (
  status,
  message,
  data = null,
  additional = {},
  errors = []
) => {
  return {
    status,
    message,
    detail: null,
    data,
    additional,
    errors,
  };
};

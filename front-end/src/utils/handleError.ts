// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleError(error: any) {
  let message = "";
  if (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.errors?.[0]
  ) {
    message = error.response.data.errors?.[0].message;
  } else {
    message = error.message;
  }
  return message;
}

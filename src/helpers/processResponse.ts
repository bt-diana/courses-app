const processResponse = (response: Response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw Error(`${response.status}: ${response.statusText}`);
  }
};

export default processResponse;

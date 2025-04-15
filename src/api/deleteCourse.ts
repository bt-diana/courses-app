const API_URL = import.meta.env.VITE_API_URL;

const deleteCourse = (idToDelete: string) =>
  fetch(`${API_URL}/${idToDelete}`, {
    method: 'DELETE',
  }).then((res) => {
    if (!res.ok) {
      throw Error(`${res.status}: ${res.statusText}`);
    }
  });

export default deleteCourse;

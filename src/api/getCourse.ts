const API_URL = import.meta.env.VITE_API_URL;

const getCourse = (id: string) =>
  fetch(`${API_URL}/course/${id}`, {
    method: 'GET',
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw Error(`${res.status}: ${res.statusText}`);
      }
    })
    .then((course) => {
      return course;
    });

export default getCourse;

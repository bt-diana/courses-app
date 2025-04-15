const API_URL = import.meta.env.VITE_API_URL;

const getCourses = () =>
  fetch(`${API_URL}/course`, {
    method: 'GET',
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw Error(`${res.status}: ${res.statusText}`);
      }
    })
    .then((courses) => {
      return courses;
    });

export default getCourses;

const apiSecret = import.meta.env.VITE_API_SECRET;

const getCourses = () =>
  fetch(`https://${apiSecret}.mockapi.io/courses/course`, {
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
    })
    .catch((error) => {
      console.error(error);
    });

export default getCourses;

const apiSecret = import.meta.env.VITE_API_SECRET;

const getCourse = (id: string) =>
  fetch(`https://${apiSecret}.mockapi.io/courses/course/${id}`, {
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
    })
    .catch((error) => {
      console.error(error);
    });

export default getCourse;

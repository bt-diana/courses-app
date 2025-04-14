const apiSecret = import.meta.env.VITE_API_SECRET;

const deleteCourse = (idToDelete: string) =>
  fetch(`https://${apiSecret}.mockapi.io/courses/course/${idToDelete}`, {
    method: 'DELETE',
  }).then((res) => {
    if (!res.ok) {
      throw Error(`${res.status}: ${res.statusText}`);
    }
  });

export default deleteCourse;

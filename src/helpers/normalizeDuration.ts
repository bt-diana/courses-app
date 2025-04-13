const normalizeDuration = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = Math.floor(duration % 60);
  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes} hours`;
};

export default normalizeDuration;

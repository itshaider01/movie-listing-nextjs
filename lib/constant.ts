const API_URL = (() => {
  const url = process.env.NEXT_PUBLIC_API_URL;

  if (!url) {
    throw new Error("Trouble locating server's URL.");
  }

  return url.slice(-1) === "/" ? url : `${url}/`;
})();

export { API_URL };

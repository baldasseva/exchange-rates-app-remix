const fetchData = async (url, method, body) => {
  var myHeaders = new Headers();
  myHeaders.append("apikey", "xxx");

  return fetch(url, {
    method,
    headers: myHeaders,
    body,
    redirect: "follow",
  })
    .then((response) => response)
    .catch((error) => error);
};

export default fetchData;

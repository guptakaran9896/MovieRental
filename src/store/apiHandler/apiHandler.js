
export const ApiHandler = async ({ endPoint, method, reqParam }) => {
  const acceptType = "application/json";
  const contentType =
    reqParam instanceof FormData ? "multipart/form-data" : "application/json";
  let response = null;
  try {
    let content = {
      method: method.toUpperCase(),
      headers: apiHeaders(reqParam, contentType, acceptType),
    };
    if (
      method === "post" ||
      method === "delete" ||
      method === "patch" ||
      method === "put"
    ) {
      content = {
        ...content,
        body:
          reqParam instanceof FormData ? reqParam : JSON.stringify(reqParam),
      };
    }

    if (reqParam instanceof FormData) {
      let headers = apiHeaders(reqParam, contentType, acceptType);

      response = await fetch(endPoint, {
        method: "POST",
        body: reqParam,
        headers: headers,
      });

      // response = await axios({
      //     method: 'post',
      //     url: endPoint,
      //     data: content.body,
      //     headers: {
      //         'Content-Type': `multipart/form-data; boundary=${reqParam._boundary}`,
      //     },
      // });
      // response = await axios.post(endPoint, reqParam, header);
    } else {
      response = await fetch(endPoint, content);
    }
  } catch (e) {
    console.log(e);
  }
  console.log(response);
  if (response) {
    const resContentType = response.headers.get("Content-type");

    let data = null;

    if (resContentType === null) return Promise.resolve(null);
    else if (resContentType === "application/json" || resContentType == "application/json; charset=utf-8")
      data = await response.json();
    else if (resContentType.includes("text/plain"))
      data = await response.text();
    else if (resContentType === "application/pdf") {
      data = await response.blob();
    } else if (resContentType === "application/vnd.ms-excel") {
      // data = new Blob([await response], { type: resContentType });
      data = new Blob([await response.blob()], { type: resContentType });
    }
    response = {
      data: data,
      status: response?.status,
      statusText: response?.statusText,
      headers: response.headers,
    };
  }
  if (response?.data?.accessToken) {
    localStorage.setItem("token", response.data.accessToken);
  }
  if (response?.data?.refreshToken) {
    localStorage.setItem("refreshToken", response.data.refreshToken);
  }
  if (
    response?.data?.status === "error" &&
    response?.data?.errCode === "ExpiredTokenException"
  ) {
    console.log("calling 2")
    // localStorage.clear();
    return response;
  } else {
    return response;
  }
};

export function apiHeaders(reqParam, contentType, acceptType) {
  const requestHeader =
    reqParam instanceof FormData
      ? {
        // "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("token")
          ? `Bearer ${localStorage.getItem("token")}`
          : "",
        RefreshToken: localStorage.getItem("refreshToken")
          ? `Bearer ${localStorage.getItem("refreshToken")}`
          : "",
      }
      : {
        Accept: acceptType,
        "x-api-key": "web",
        "Content-Type": contentType,
        Authorization: localStorage.getItem("token")
          ? `Bearer ${localStorage.getItem("token")}`
          : "",
        RefreshToken: localStorage.getItem("refreshToken")
          ? `Bearer ${localStorage.getItem("refreshToken")}`
          : "",
      };
  const headers = requestHeader;
  return headers;
}

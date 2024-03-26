import { useAuthStore } from "@/stores";
export const fetchWrapper = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE"),
};

function request(method) {
  return (url, body) => {
    if (!url.startsWith(import.meta.env.VITE_API_URL)) {
      url = import.meta.env.VITE_API_URL + url;
    }
    const requestOptions = {
      method,
      headers: authHeader(url),
    };
    if (body && !["GET", "HEAD"].includes(method.toUpperCase())) {
      requestOptions.headers["Content-Type"] = "application/json";
      requestOptions.body = JSON.stringify(body);
    }
    return fetch(url, requestOptions).then(handleResponse);
  };
}

function authHeader(url) {
  const authStore = useAuthStore();
  const user = authStore.user || {};
  const token = user.token;
  const isLoggedIn = !!token;
  const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);

  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
}

async function handleResponse(response) {
  const isJson = response.headers
    ?.get("content-type")
    ?.includes("application/json");
  let data;
  if (isJson) {
    data = await response.json();
  }

  // const isJson = response.headers
  //   ?.get("content-type")
  //   ?.includes("application/json");
  // const data = isJson ? response.json() : null;
  const error = response.ok
    ? null
    : {
        status: response.status,
        message: data?.message || response.statusText,
      };

  switch (response.status) {
    case 200:
    case 201:
      return data;
    case 401:
    case 403:
      const { user, logout } = useAuthStore();
      if (user) {
        logout();
      }
      break;
    case 404:
      error.message = "请求资源不存在";
      break;
    case 500:
      error.message = "服务器发生错误,请稍后重试";
      break;
  }

  if (error) {
    return Promise.reject(error);
  }
}

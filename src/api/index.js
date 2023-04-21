const HEADERS = {
  'Content-Type': 'application/json; charset=UTF-8',
  'Connection': 'keep-alive',
  'Keep-Alive': 'timeout=2',
  'Transfer-Encoding': 'chunked'
}

const transport = {}

transport.http = (url) => (structure) => {
  const api = {};
  const services = Object.keys(structure);
  for (const name of services) {
    api[name] = {};
    const service = structure[name];
    const methods = Object.keys(service);
    for (const method of methods) {
      api[name][method] = ({ token, ...args } = {}) =>
      {
        if (token) HEADERS['Authorization'] = `Bearer ${token}`
        return new Promise((resolve, reject) => {
          fetch(`${url}/api/${name}/${method}`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({ args }),
          }).then((res) => {
            if (res.status === 200 || res.status === 201) resolve(res.json());
            else res.text().then((message) => {
              reject(new Error(`${message}`));
            });
          });
        });
      }
    }
  }
  
  return Promise.resolve(api);
};

const scaffold = (url) => transport['http'](url);

export default async function apiMethods() {
  const url = 'http://localhost:8001'
  const systemApi = await scaffold(url)({ system: { load: [] }});
  const systemResponse = await systemApi.system.load();
  const structure = systemResponse.clientApi;
  const fullApi = await scaffold(url)(structure);
  return fullApi
}

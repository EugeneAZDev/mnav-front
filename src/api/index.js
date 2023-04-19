const transport = {}

transport.http = (url) => (structure) => {
  const api = {};
  const services = Object.keys(structure);
  for (const name of services) {
    api[name] = {};
    const service = structure[name];
    const methods = Object.keys(service);
    for (const method of methods) {
      api[name][method] = ({ ...args }) =>
        new Promise((resolve, reject) => {
          fetch(`${url}/api/${name}/${method}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
  
  return Promise.resolve(api);
};

const scaffold = (url) => {
  const protocol = 'http'; // url.startsWith('ws:') ? 'ws' : 'http';
  return transport[protocol](url);
};

export default async function apiMethods() {  
  const result = await scaffold('http://localhost:8001')({
    item: {
      create: ['record'],
      read: ['id'],
    },
    user: {
      create: ['record'],
      find: ['email'],
    },
    auth: {
      register: ['id', 'password'],
      login: ['email', 'password'],
    }
  });
  return result
}

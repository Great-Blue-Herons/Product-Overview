import http from 'k6/http';
import { check, sleep } from 'k6';


export const options = {
  stages: [
    { duration: '30s', target: 20 },
    // { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {
  let id = 9;
  const product = {
    method: 'get',
    url: `http://localhost:3000/products/${id}`
  };
  const styles = {
    method: 'get',
    url: `http://localhost:3000/products/${id}/styles`
  };
  const related = {
    method: 'get',
    url: `http://localhost:3000/products/${id}/related`
  };

  const res = http.batch([product, styles, related]);

  check(res[0], {
    'main product status was 200': (r) => r.status === 200,
  });
  // sleep(1);
};
import http from 'k6/http';
import { check, sleep } from 'k6';


export const options = {
  stages: [
   { duration: '10s', target: 500 },
   { duration: '10s', target: 100 },
   { duration: '10s', target: 1000 },
   { duration: '1m', target: 1000 },
   { duration: '10s', target: 100 },
   { duration: '10s', target: 0 },
  ],
 };

export default function () {
  var id = 1000011;
  for (var i = 1000011; i > (1000011 * .9); i--) {
    id = i;
  };
  const main = {
    method: 'get',
    url: `http://localhost:3000/products/${id}`
  };
  // const main = {
  //   method: 'get',
  //   url: `http://localhost:3000/products/${id}/styles`
  // };
  // const main = {
  //   method: 'get',
  //   url: `http://localhost:3000/products/${id}/related`
  // };

  const res = http.batch([main]);

  check(res[0], {
    'main status was 200': (r) => r.status === 200,
  });
  sleep(2);
};
const http = require('http');

function request(path, method = 'GET', body = null) {
  return new Promise((resolve) => {
    const dataString = body ? JSON.stringify(body) : '';
    const req = http.request(
      {
        hostname: 'localhost',
        port: 3000,
        path,
        method,
        headers: body
          ? {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(dataString),
            }
          : {},
      },
      (res) => {
        let responseData = '';
        res.on('data', (chunk) => (responseData += chunk));
        res.on('end', () => {
          console.log(`\n=== STATUS: ${res.statusCode} ===`);
          console.log(JSON.parse(responseData));
          resolve();
        });
      }
    );
    if (body) req.write(dataString);
    req.end();
  });
}

async function runTests() {
  console.log('--- TESTE 1: POST Sucesso (201) ---');
  await request('/users', 'POST', {
    name: 'Maria Silva',
    email: 'maria@email.com',
  });

  console.log('\n--- TESTE 2: POST Validação (400) ---');
  await request('/users', 'POST', { name: 'Maria Silva' });

  console.log('\n--- TESTE 3: GET Listagem (200) ---');
  await request('/users', 'GET');

  console.log('\n--- TESTE 4: GET ID Inexistente (404) ---');
  await request('/users/id-inexistente', 'GET');
}

runTests();

const secret = 'SECRET_SAUCE';

function getProducts() {
  console.log('[getProducts]');

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.open('GET', 'http://localhost:3003/api/products', true);
  xhr.onload = () => console.log(xhr.responseText);
  xhr.onerror = () => console.log('Woops, there was an error making the request.');
  xhr.send();
}


function updateProducts() {
  console.log('[updateProducts]');
  var xhr = new XMLHttpRequest();

  xhr.open('PUT', 'http://localhost:3003/api/products/1001', true);
  xhr.setRequestHeader('X-Sanctu-Compu', secret);
  xhr.onload = () => console.log(xhr.responseText);
  xhr.onerror = () => console.log('Woops, there was an error making the request.');
  xhr.send();

}

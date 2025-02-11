### GET Request Example with Password Authentication
fetch('http://localhost:3000/globalCount', {
  headers: { 'x-password': 'password' } // replace with the actual password
})
  .then(response => response.json())
  .then(data => console.log("Fetched globalCount:", data.globalCount));

### POST Request Example with Password Authentication
fetch('http://localhost:3000/globalCount', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'x-password': 'password' // replace with the actual password
  },
  body: JSON.stringify({ value: 42 })
})
  .then(response => response.json())
  .then(data => console.log("Updated globalCount:", data.globalCount));

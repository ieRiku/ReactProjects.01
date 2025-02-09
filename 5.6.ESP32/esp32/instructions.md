// In Chrome DevTools Console:
fetch('http://localhost:3000/globalCount')
  .then(response => response.json())
  .then(data => console.log("Fetched globalCount:", data.globalCount));

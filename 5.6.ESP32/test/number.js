import http from 'http';

const PORT = 3001;
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("23");
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const crypto = require('crypto');

exports.hashPassword = (req, res) => {
  const password = req.body.password; // Get password from request body
  const hash = crypto.createHash('sha256').update(password).digest('hex');
  res.send({ hash: hash }); // Send the hash back to the client
};

// Client-side code (in your Cloud Console JavaScript or web app)
fetch('YOUR_CLOUD_FUNCTION_URL', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ password: 'user_password' })
})
.then(response => response.json())
.then(data => {
  const providedHash = data.hash;
  console.log(providedHash);
});
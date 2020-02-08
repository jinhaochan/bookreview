const express = require('express');
const app = express();
const PORT = 8000

app.get('/', (req, res) => {
	res.send({message: 'endpoint working' });
});

app.listen(PORT, () => {
	console.log('Server runnning at localhost:${PORT}/');
});

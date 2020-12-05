import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import { createServer } from 'https';
import dotenv from 'dotenv';
import { send } from 'process';
dotenv.config();
import shell from 'shelljs';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT;
const GITHUB_SECRET = process.env.GITHUB_SECRET;

const creds = {
    key: fs.readFileSync('./certs/key.pem', 'utf8'),
    cert: fs.readFileSync('./certs/cert.pem', 'utf8')
}

app.get('/', (req, res) => {
    res.send('yes');
});

app.post('/github', (req, res) => {
	if(req.headers['x-github-event'] === 'push') {
		console.log('push event registered');
			if(req.body.ref === 'refs/heads/production');
				res.send('Got notified of a production branch push');
				console.log('Pushed to production');
				shell.exec('./deploy.sh');
	} else {
		res.send('Go away');
	}
});

const httpsServer = createServer(creds, app)
httpsServer.listen(PORT, err => {
	if (err)
		throw err;
	else
	console.log(`Running on port ${PORT}`);
});

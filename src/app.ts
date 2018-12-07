import * as bodyParser from 'body-parser';
import * as express from 'express';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

export default app;

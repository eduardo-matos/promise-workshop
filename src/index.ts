import * as config from './config';
import app from './app';
import './routes';

app.listen(config.APP_PORT);

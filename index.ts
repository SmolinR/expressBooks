import app from './app';
import { PORT } from './constants';
import dbconnect from './db'

app.listen(PORT, () => {
  dbconnect()
  // eslint-disable-next-line no-console
  console.log(`Server has started on port ${PORT}!`);
});

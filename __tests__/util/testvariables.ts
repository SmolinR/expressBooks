import jwt from 'jsonwebtoken';
import { PASSWORD_TOKEN_SECRET } from '../../constants';

const email = {
  full: 'smolin438@gmail.com',
  wrong: 'ajksdngfkjn@skdmfg.com',
  noValid: 'testnovalid',
  empty: '',
};
const token = {
  full: jwt.sign({ payload: 'payload' }, PASSWORD_TOKEN_SECRET, { expiresIn: '1h' }),
};
const login = {
  full: 'ruhatest',
  long: 'ruhatestruhatestruhatestruhatest',
  wrong: 'ruhawrong',
  short: 'r',
  empty: '',
};
const password = {
  full: '123',
  short: '1',
  empty: '',
};
const title = {
  full: 'ruhatestbook',
  long: 'ruhatestbookruhatestbookruhatestbook',
  underscore: '___',
  short: 't',
  empty: '',
};
const authorId = {
  long: '62a1ef59dca393285066a173a',
  empty: '',
};
const id = {
  long: '62a1ef59dca393285066a173a',
  empty: '',
  wrong: '12a2698bbd1256773855e471',
};
const categoryTitle = {
  full: 'ruhatestcategory',
  long: 'ruhatestcategoryruhatestcategoryruhatestcategory',
  underscore: '___',
  short: 'c',
  empty: '',
};
export {
  email, login, password, title, authorId, id, categoryTitle, token,
};

import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'jhon deo',
    email: 'jhon@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'shane deo',
    email: 'shane@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;

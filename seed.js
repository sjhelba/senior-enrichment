const db = require('./db/index');
const {Campus, Student} = require('./db/models/index');


const campuses = [
  {
    name: 'Ba\'ku',
    image: '/img/Baku.jpeg'
  },
  {
    name: 'Risa',
    image: '/img/Risa.jpeg'
  },
  {
    name: 'Terra',
    image: '/img/Terra.jpeg'
  },
  {
    name: 'Trill',
    image: '/img/Trill.jpeg'
  }
];

const students = [{
  name: 'Emma',
  email: 'emma@mhiajs.edu',
  campusId: 1
}, {
  name: 'Olivia',
  email: 'Olivia@mhiajs.edu',
  campusId: 2
}, {
  name: 'Sophia',
  email: 'Sophia@mhiajs.edu',
  campusId: 3
}, {
  name: 'Ava',
  email: 'Ava@mhiajs.edu',
  campusId: 4
}, {
  name: 'Isabella',
  email: 'Isabella@mhiajs.edu',
  campusId: 1
}, {
  name: 'Mia',
  email: 'Mia@mhiajs.edu',
  campusId: 2
}, {
  name: 'Abigail',
  email: 'Abigail@mhiajs.edu',
  campusId: 3
}, {
  name: 'Emily',
  email: 'Emily@mhiajs.edu',
  campusId: 4
}, {
  name: 'Noah',
  email: 'Noah@mhiajs.edu',
  campusId: 1
}, {
  name: 'Liam',
  email: 'Liam@mhiajs.edu',
  campusId: 2
}, {
  name: 'Mason',
  email: 'Mason@mhiajs.edu',
  campusId: 3
}, {
  name: 'Jacob',
  email: 'Jacob@mhiajs.edu',
  campusId: 4
}, {
  name: 'William',
  email: 'William@mhiajs.edu',
  campusId: 1
}, {
  name: 'Ethan',
  email: 'Ethan@mhiajs.edu',
  campusId: 2
}, {
  name: 'Alexander',
  email: 'Alexander@mhiajs.edu',
  campusId: 3
}, {
  name: 'Logan',
  email: 'Logan@mhiajs.edu',
  campusId: 4
}
];


const seed = () =>
  Promise.all(campuses.map(campus =>
    Campus.create(campus))
  )
  .then(() =>
  Promise.all(students.map(student =>
    Student.create(student))
  ));

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();

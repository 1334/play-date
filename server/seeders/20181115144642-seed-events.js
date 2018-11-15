'use strict';
const data = require('./db.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const events = data.events.map(event => ({
      id: event.id,
      title: event.title,
      image: event.image,
      eventdate: event.date,
      location: event.location,
      lng: event.coords[0],
      lat: event.coords[1],
      description: event.description,
      price: +event.price,
      agefrom: +event.ageFrom,
      ageto: +event.ageTo,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    return queryInterface.bulkInsert('events', events, {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('events', null, {});
  }
};

// console.log(data);
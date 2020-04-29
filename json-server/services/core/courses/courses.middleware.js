const express = require('express');
const router = express.Router();
const url = require('url');

let failedRequestsCount = 0;

module.exports = (server) => {

  router.get('/courses', (req, res, next) => {

    if (!req.header('Authorization')) {
      res.status(401).send('Unathorized!');
    }

    let coursesDB = server.db.getState().courses;

    if (req.query['textFragment'] === 'error' && failedRequestsCount <= 3) {
      failedRequestsCount++;
      res.status('500').send('Something went wrong');
    }

    let courses = req.query['textFragment'] ? coursesDB.filter((course) => {
      return course.title.toUpperCase().indexOf(req.query['textFragment'].toUpperCase()) >= 0 ||
            course.description.toUpperCase().indexOf(req.query['textFragment'].toUpperCase()) >= 0;
    }) : coursesDB;

    let currentPage = +req.query.currentPage;
    let pageSize = +req.query.pageSize;
      // calculate total pages
      let totalPages = Math.ceil(courses.length / pageSize);

      // ensure current page isn't out of range
      if (currentPage < 1) {
          currentPage = 1;
      } else if (currentPage > totalPages) {
          currentPage = totalPages;
      }

      let startPage, endPage;
      if (totalPages <= 10) {
          // less than 10 total pages so show all
          startPage = 1;
          endPage = totalPages;
      } else {
          // more than 10 total pages so calculate start and end pages
          if (currentPage <= 6) {
              startPage = 1;
              endPage = 10;
          } else if (currentPage + 4 >= totalPages) {
              startPage = totalPages - 9;
              endPage = totalPages;
          } else {
              startPage = currentPage - 5;
              endPage = currentPage + 4;
          }
      }

      // calculate start and end item indexes
      let startIndex = (currentPage - 1) * pageSize;
      let endIndex = startIndex + pageSize;

      let pages = courses.slice(startIndex, endIndex)

      setTimeout(function responseDelay() {
        res.json({
          items: pages,
          totalPages: totalPages
        });
      }, 1000);
    
  });

  router.delete('/courses', (req, res, next) => {

    if (!req.header('Authorization')) {
      res.status(401).send('Unathorized!');
    }

    let coursesDB = server.db.getState().courses;
    coursesDB.splice(coursesDB.findIndex(function (course) {
        return course.id === +req.query['id'];
    }), 1);

    res.json(coursesDB);
  });

  router.post('/courses', (req, res, next) => {

    if (!req.header('Authorization')) {
      res.status(401).send('Unathorized!');
    }

    let coursesDB = server.db.getState().courses;
    coursesDB.unshift(req.query);

    res.json(coursesDB);
  });

  return router;
};



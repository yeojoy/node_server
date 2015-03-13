var express = require('express');
var router = express.Router();

var db_pool = require('../libs/db_pool');

var ITEM_QUERY = [
    "SELECT",
        "*",
    "FROM",
        "bbooklist"
];

/*  문항 id를 받아서 해당 문항을 json으로 내려 줌
    path : host/item/:id
    method : GET
 */
router.get('/', function(req, res) {

  db_pool.acquire(function(err, db) {
    db.query(ITEM_QUERY.join(' '), [], function(err, rows, columns) {
      db_pool.release(db);
      if (err) return res.end(err);
      console.log("=========================================================");
      console.log("                        RESULT                           ");
      console.log("=========================================================");
      console.log(JSON.stringify(rows));
      console.log("=========================================================");

      res.json(rows);
    });
  });
});


var ANSWER_QUERY = [
    "SELECT",
        "QUESTION_NBR_CDE AS questionNoCode, ",
        "ANSWER_CDE AS id, ",
        "ANSWER_TYP_CDE AS typeCode, ",
        "ANSWER_ENGL_CONTS AS answerEnglConts",
    "FROM",
        "ESLS_QUESTION_ANSWER",
    "WHERE",
            "QUESTION_NBR_CDE = ?",
        "AND",
            "ANSWER_TYP_CDE = 1"
];
/*
    정답 확인.
    path : host/item/answer
    method : POST
    content-type : application/json
    REQUEST params
        type : 문항 타입 (String)
        id : 문항 id (String)
        answers : 답안 (String Array)
 */
router.post('/answer', function(req, res) {
  var userAnswer = req.body;
  console.log("Params : " + JSON.stringify(userAnswer));

  db_pool.acquire(function(err, db) {
    db.query(ANSWER_QUERY.join(' '), [userAnswer.id], function(err, rows, columns) {
      db_pool.release(db);
      if (err) return res.end(err);
      console.log("=========================================================");
      console.log("                        RESULT                           ");
      console.log("=========================================================");
      console.log(JSON.stringify(rows));
      console.log("=========================================================");
      var response = {};

      if (userAnswer.type === '13') {
        var answers = userAnswer.answers;
        answers.sort();
        for (var index in answers) {
          if (answers[index] !== rows[index].answerEnglConts) {
            response.message = "wrong answer!";
            break;
          } else {
            response.message = "good job";    
          }
        }
        

      } else {
        if (answers[0] === rows[0].answerEnglConts)
          response.message = "good job";
        else
          response.message = "wrong answer!";
      }

      res.send(response);
      
    });
  });
});

module.exports = router;

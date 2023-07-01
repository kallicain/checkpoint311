let database = require("./database");


let listPeople = function (req, res) {
  // return all people in db
  let sql = ("select * from customers"); // select all from table of customers
  //access db, query sql func, return err or result
  database.query(sql, function(err, results){
    if(err){
      console.log("error:", err);
      res.sendStatus(500); 
    } else {
      res.json(results); 
    }
  });
};

let listPerson = function (req, res) {
  //get one person from customers table by id
  let id = req.params.id;
  let sql = "select * from customers where id = ?" // code the get info on the id requested
  let params = [id] // to go in the sql command

  database.query(sql, params, function(err, results){
    if (err){
      console.log("error:", err)
    } else {
      if(res.length == 0){
        res.sendStatus(404); // array returns 0 there is no person
      } else {
        res.json(results[0]) // sending the object in the array at position 0
      }
    }
  })
};

let deletePerson = function (req, res) {
  //delete row with matching id on input
  let id = req.params.id;
  let sql = "delete from customers where id = ?"; // code to delete id 
  let params = [id] // to go in the sql commmand entered
  database.query(sql, params, function(err, results){
    if (err) {
      console.log("error:", err);
      res.sendStatus(500);
    } else {
      res.sendStatus(204) // no data but it worked
    }
  })
};

let addPerson = function (req, res) {
  let name = req.body.name;
  let service = req.body.service;

  if(!name){
    res.status(400).json("Name is required");
    return;
  }

  let sql = "insert into customers (name, service) values (?, ?);"
  let params = [name, service];

  database.query(sql, params, function(err, results){
    if(err) {
      console.log("error:", err);
      res.sendStatus(500);
    } else {
      res.sendStatus(204); // no data but it worked
    }
  })
};

let updatePerson = function (req, res) {
  let id = req.params.id;
  let name = req.params.name;
  let service = req.params.service;
  let done = req.params.done;

  if(!name) {
    res.status(400).json("Name is required");
    return;
  }
  
  let doneCheck = false;
  if(done == true) {
    doneCheck = true;
  };

  let sql = "update customers set name = ?, service = ?, done = ? where id = ?";
  let params = [name, service, doneCheck, id];

  database.query(sql, params, function(err, results){
    if (err) {
      console.log("error:", err)
      res.sendStatus(500);
    } else {
      res.sendStatus(204); // no data but it worked
    }
  })
};

module.exports = {
  listPeople,
  listPerson,
  deletePerson,
  addPerson,
  updatePerson,
};

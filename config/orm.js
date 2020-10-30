// Import (require) connection.js into orm.js
const connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
const printQuestionMarks = num => {
    const arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
}
  
// Helper function to convert object key/value pairs to SQL syntax
const objToSql = ob => {
    const arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (let key in ob) {
      let value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
}

// In the orm.js file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.

const orm = {
    // selectAll()
    // This method will select all of the burgers.
    selectAll: function(tableInput, cb) {
        const queryStr = `SELECT * FROM ${tableInput};`;

        connection.query(queryStr, (err, result) => {
            if (err) throw err;

            cb(result);
        });
    },
    // insertOne()
    // This method will insert a burger into the database.
    insertOne: function(table, cols, vals, cb) {
        let queryStr = `INSERT INTO ${table}`;

        queryStr += " (";
        queryStr += cols.toString();
        queryStr += ") ";
        queryStr += "VALUES (";
        queryStr += printQuestionMarks(vals.length);
        queryStr += ") ";

        console.log(queryStr);

        connection.query(queryStr, vals, (err, result) => {
            if (err) throw err;

            cb(result);
        })
    },

    // updateOne()
    // This method will update one of the burgers.
    updateOne: function(table, objColVals, condition, cb) {
        let queryStr = `UPDATE ${table}`;

        queryStr += " SET ";
        queryStr += objToSql(objColVals);
        queryStr += " WHERE ";
        queryStr += condition;

        console.log(queryStr);

        connection.query(queryStr, (err, result) => {
            if (err) throw err;

            cb(result);
        });
    }
};



// Object for all our SQL statement functions.
// const orm = {
//   all: function(tableInput, cb) {
//     const queryString = "SELECT * FROM " + tableInput + ";";
//     connection.query(queryString, function(err, result) {
//       if (err) {
//         throw err;
//       }
//       cb(result);
//     });
//   },
//   create: function(table, cols, vals, cb) {
//     let queryString = "INSERT INTO " + table;

//     queryString += " (";
//     queryString += cols.toString();
//     queryString += ") ";
//     queryString += "VALUES (";
//     queryString += printQuestionMarks(vals.length);
//     queryString += ") ";

//     console.log(queryString);

//     connection.query(queryString, vals, function(err, result) {
//       if (err) {
//         throw err;
//       }

//       cb(result);
//     });
//   },
//   // An example of objColVals would be {name: panther, sleepy: true}
//   update: function(table, objColVals, condition, cb) {
//     let queryString = "UPDATE " + table;

//     queryString += " SET ";
//     queryString += objToSql(objColVals);
//     queryString += " WHERE ";
//     queryString += condition;

//     console.log(queryString);
//     connection.query(queryString, function(err, result) {
//       if (err) {
//         throw err;
//       }

//       cb(result);
//     });
//   },
//   delete: function(table, condition, cb) {
//     let queryString = "DELETE FROM " + table;
//     queryString += " WHERE ";
//     queryString += condition;

//     connection.query(queryString, function(err, result) {
//       if (err) {
//         throw err;
//       }

//       cb(result);
//     });
//   }
// };

// Export the ORM object in module.exports.
module.exports = orm;

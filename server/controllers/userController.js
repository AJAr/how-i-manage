const { redirect } = require("express/lib/response");
const mysql = require("mysql");

//connection
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

//View users
exports.view = (req, res) => {
  

pool.getConnection((err, connection) => {
  if (err) throw err; //not connected
  console.log("Connected as ID" + connection.threadId);
});

//user connection
connection.query('SELECT * FROM user', (err, rows) => {
  //when finished, release
  connection.release();

  if(!err) {
    redirect.render('main', { rows });
  } else {
    console.log(err);
  }

  console.log('Data from user table: \n', rows);
});

};

//User search 

exports.find = (req, res) => {
  
    pool.getConnection((err, connection) => {
      if (err) throw err; //not connected
      console.log("Connected as ID" + connection.threadId);

      let searchTerm = req.body.Search;
    });
    
    //search configuration
    connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
      //when finished, release
      connection.release();
    
      if(!err) {
        redirect.render('main', { rows });
      } else {
        console.log(err);
      }
    
      console.log('Data from user table: \n', rows);
    });
    
};

exports.form = (req, res) => {
res.render('add-user');
};

//add user

exports.add = (req, res) => {
const { first_name, last_name, email, phone, comments } = req.body;
exports.find = (req, res) => {
  
  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log("Connected as ID" + connection.threadId);

    let searchTerm = req.body.Search;
  });
  
  //user connection
  connection.query('INSERT INTO user first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?',[first_name, last_name, email, phone, comments], (err, rows) => {
    //when finished, release
    connection.release();
  
    if(!err) {
      redirect.render('add-user', { alert: 'User successfully added!' });
    } else {
      console.log(err);
    }
  
    console.log('Data from user table: \n', rows);
  });
};
};

//edit user

exports.edit = (req, res) => {

    pool.getConnection((err, connection) => {
      if (err) throw err; //not connected
      console.log("Connected as ID" + connection.threadId);
    });
    
    //user connection
    connection.query('SELECT * FROM user WHERE id = ?',[req.params.id], (err, rows) => {
      //when finished, release
      connection.release();
    
      if(!err) {
        redirect.render('main', { rows });
      } else {
        console.log(err);
      }
    
      console.log('Data from user table: \n', rows);
    });
}

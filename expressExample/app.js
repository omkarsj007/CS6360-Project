// module.exports = app;
const dbConfig = require("./config/db.config.js");
const express = require("express");
const cors = require("cors");
const db = require("./models");
const app = express();
const bodyParser = require("body-parser")

var corsOptions = {
  origin: "http://localhost:3000"
};

const mysql = require('mysql2');
const conn = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: dbConfig.PASSWORD,
 database: dbConfig.DB,
});

conn.connect();


app.use(cors(corsOptions));
app.use(bodyParser.json())
 
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/validateLogin/:email", (req, res, next) => {
  const email = req.params.email;
  const query = "SELECT * FROM Users WHERE email=?";
  conn.query(query, [email], function (err, data, fields) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });
 });

app.post("/addNewUser", (req, res, next) => {
  let userType = req.body.userType;
  let username = req.body.username;
  let password = req.body.password;

  if (userType == 'customer' || userType == 'Customer')
  {
    let id = 4;
    let bankID = 3;
    let acct_num = Math.floor(100000000 + Math.random() * 700000000);    
         
    conn.query(
    "INSERT INTO Customer (Cust_id, Username, Password, Bank_ID, Bank_AccNum) VALUES (?, ?, ?, ?, ?)",
    [id, username, password, bankID, acct_num],
    function(err, data) {
      if (err) throw err;
      if (data.length === 0) {
        console.log("Sending 400")
        return res.status(400).send("Error creating account, try again");
      };
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    }); 
  }
   else if (userType == "admin" || userType == "Admin")
    {
      let id = 7;
      let username = req.body.username;
      let password = req.body.password;
      let division = second;

      conn.query(
        "INSERT INTO Admin (Admin_id, Username, Password, Division) VALUES (?, ?, ?, ?)",
        [id, username, password, division],
        function(err, data) {
          if (err) throw err;
          if (data.length === 0) {
            console.log("Sending 400")
            return res.status(400).send("Error creating account, try again");
          };
          res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
          });
        }); 
  }
  else if (userType == "seller" || userType == "Seller")
  {
    let id = 7;
    let username = req.body.username;
    let password = req.body.password;
    let address = "3000 Northside Blvd";
    conn.query(
      "INSERT INTO Sellers (Seller_ID, Username, Password, Address) VALUES (?, ?, ?, ?)",
      [id, username, password, address],
      function(err, data) {
        if (err) throw err;
        if (data.length === 0) {
          console.log("Sending 400")
          return res.status(400).send("Error creating account, try again");
        };
        res.status(200).json({
          status: "success",
          length: data?.length,
          data: data,
        });
      }); 
  }
  else 
  {
     return res.status(400).send("Please Specify whether you are Admin, Seller, or Customer");
  }
});


app.post("/sample", async (req, res, next) => {
  
  let username = req.body.username;
  let password = req.body.password;
  let userType = req.body.userType;
  if(userType == "admin")
  {
    conn.query(`select * from Admin where username="${username}" AND password="${password}"`, function (err, results) {
      if (err) throw err;
      if (results.length === 1) {
        return res.status(200).json({
          status: "success",
          length: results?.length,
          data: results,
        });
      } else {
        return res.status(404).json({ error: "Invalid Credentials" });
      }
    });
  }
  if(userType == "customer")
  {
    conn.query(`select * from Customer where username="${username}" AND password="${password}"`, function (err, results) {
      if (err) throw err;
      if (results.length === 1) {
        return res.status(200).json({
          status: "success",
          length: results?.length,
          data: results,
        });
      } else {
        return res.status(404).json({ error: "Invalid Credentials" });
      }
    });
  }
  if(userType == "seller")
  {
    conn.query(`select * from Sellers where username="${username}" AND password="${password}"`, function (err, results) {
      if (err) throw err;
      if (results.length === 1) {
        return res.status(200).json({
          status: "success",
          length: results?.length,
          data: results,
        });
      } else {
        return res.status(404).json({ error: "Invalid Credentials" });
      }
    });
  }

  // return res.status(404).json({ error: "Invalid Credentials" });

});

app.post("/UpdateProductPrice", (req, res, next) => {
  
  let admin_seller = req.body.admin_seller;
  let productId = req.body.productId;
  let sellerId = req.body.sellerId;
  let Product_Price = req.body.Product_Price;
  if (Product_Price <= 0)
  {
  return res.status(400).send("Please enter valid price");
  } 
  if (admin_seller == "Seller")
      {
        let count = 0;
         conn.query(
    "SELECT Price, Stock FROM `Product_Stock` WHERE `Product_ID` = ? AND `Seller_ID` = ?",
    [productId, sellerId],
    function(err, data) {
      if (err) throw err;
      if (data.length === 0) {
        // console.log("Sending 400")
        count = count + 1;
        // return res.status(400).send("Product or Seller not found.");
      };
    });
  conn.query("Update `Product_Stock` set `price` = ? WHERE `Product_ID` = ? AND `Seller_ID` = ? ",
             [Product_Price,productId, sellerId],
             function (err, data, fields) {
    if(err) return next(new AppError(err))
    // res.status(200).json({
    //   status: "success",
    //   length: data?.length,
    //   data: data,
    // });
  });
       if(count == 0)
       {
        return res.status(200).send("Price Updated");
       }
        elseif(count == 1)
        {
           return res.status(400).send("Product or Seller not found.");
        }
}
   else if (admin_seller == "Admin")
      {
        let count = 0;
        conn.query(
    "SELECT Price, Stock FROM `Product_Stock` WHERE `Product_ID` = ? ",
    [productId],
    function(err, data) {
      if (err) throw err;
      if (data.length === 0) {
        // console.log("Sending 400")
        // return res.status(400).send("Product not found.");
        count = count + 1;
      };
    });
  conn.query("Update `Product_Stock` set `price` = ? WHERE `Product_ID` = ? ",
             [Product_Price,productId],
             function (err, data, fields) {
    if(err) return next(new AppError(err))
    // res.status(200).json({
    //   status: "success",
    //   length: data?.length,
    //   data: data,
    // });
  });
        if(count == 0)
        {
        return res.status(200).send("Price Updated");
        }
        if(count == 1)
        {
        return res.status(400).send("Product not found.");
        }
}
  else 
  {
     return res.status(400).send("Please Specify whether you are Admin or Seller");
  }
  
 });


 app.get("/getTransactions", (req, res, next) => {
  const status = req.query.status;
  var table;
  if(status === 'rejected')
  {
    table = "vw_CustomersWithRejectedTransactions"
  }
  else if(status === 'pending')
  {
    table = "vw_CustomersWithPendingTransactions"
  }
  else
  {
    table = "vw_CustomersWithApprovedTransactions"
  }
  conn.query(`select * from ${table}`, function (err, data, fields) {
    if(err) return next(new AppError(err))
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });
 });

app.post("/getOrderHistory", (req, res, next) => {
  const custId = req.body.custId;
  const query = "SELECT * FROM vw_CustomerOrderHistory WHERE Cust_id=?";
  conn.query(query, [custId], function (err, data, fields) {
    if(err) return next(new AppError(err))
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });
});

app.get("/getSellerInventory", (req, res, next) => {
  const sellerId = req.query.sellerId;
  const query = "SELECT * FROM vw_SellerInventoryHistory WHERE Seller_ID=?";
  conn.query(query, [sellerId], function (err, data, fields) {
    if(err) return next(new AppError(err))
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });
});

app.post("/purchaseItems", async (req, res, next) => {
  let now = new Date().toISOString().slice(0, 19).replace('T', ' ');

  let customerId = req.body.customerId;
  let productId = req.body.productId;
  let sellerId = req.body.sellerId;
  let count = req.body.count;

  // check that the customer's order does not violate product_stock
  conn.query(
    "SELECT Price, Stock FROM `Product_Stock` WHERE `Product_ID` = ? AND `Seller_ID` = ?",
    [productId, sellerId],
    function(err, data) {
      if (err) throw err;
      if (data.length === 0) {
        console.log("Sending 400")
        return res.status(400).send("Product or Seller not found.");
      }
      let productStock = data[0]["Stock"];
      let productPrice = data[0]["Price"];
      if (count > productStock) {
        return res.status(400).send("Not enough stock to fulfill order.");
      }

      // get bank id and bank account number from customers
      var bankId;
      var bankAccNum;
      conn.query(
        "SELECT Bank_ID, Bank_AccNum FROM Customer WHERE Cust_id = ?",
        [customerId],
        function(err, data) {
          if (err) throw err;
          bankId = data[0]["Bank_ID"];
          bankAccNum = data[0]["Bank_AccNum"];

          let cost = count * productPrice;
          // Create a new transaction
          conn.query(
            "INSERT INTO `Transactions` SET ?",
            {
              BANK_ID: bankId,
              Account_id: bankAccNum,
              Approval_Status: 'Approved',
              Timestamp: now,
              Amount: cost,
            },
            function(err, data) {
              if (err) throw err;
              let transactionId = data.insertId;
              console.log("Transaction ID: " + transactionId);

              // Create a new order
              conn.query(
                "INSERT INTO `Orders` SET ?",
                {
                  Cust_ID: customerId,
                  Timestamp: now,
                  Status: "Confirmed",
                  Verified_By: 1,
                  T_ID: transactionId,
                },
                function(err, data) {
                  if (err) throw err;
                  let orderId = data.insertId;
                  console.log("Order ID: " + orderId);

                  // add a row in order_summary
                  conn.query(
                    "INSERT INTO `Order_Summary` SET ?",
                    {
                      Order_ID: orderId,
                      Product_ID: productId,
                      Seller_ID: sellerId,
                      Count: count,
                    },
                    function (err, data) {
                      if (err) throw err;

                      // update product_stock table
                      let newStock = productStock - count;
                      conn.query(
                        "UPDATE Product_Stock SET Stock = ? WHERE Product_ID = ? AND Seller_ID = ?",
                        [newStock, productId, sellerId],
                        function (err, data) {
                          if (err) throw err;
                          res.status(200).send("Transaction completed succesfully.")
                        }
                      )
                    }
                  )
                }
              )
            }
          )
        }
      )
    }
  )
})

app.get("/getProductStock", (req, res, next) => {
  conn.query(
    "SELECT P.Product_ID AS productId, P.Name, P.Category, P.Description, PS.Price, PS.Stock, S.Seller_ID AS sellerId, S.Username FROM product AS P, product_stock AS PS, sellers AS S WHERE S.Seller_ID = PS.Seller_ID AND P.Product_ID = PS.Product_ID;",
    function (err, data) {
      if (err) throw err;
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    }
  )
})

 app.post("/getQuery", (req, res, next) => {
  const { query } = req.body;
  const parsedQuery = query.split('\n').join(' ');
  conn.query(parsedQuery, function (err, data, fields) {
    if(err) return next(new AppError(err))
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });
 });


// db.sequelize.sync();
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

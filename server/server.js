/* Variables  */
const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser');
const app = express()
const port = 3000
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

/* Db Connection */
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sgv'
})

db.connect((err)=>{
  if(err) throw err;
  console.log("Connected to SGV database !!!");
})
/* Db connection ends */


app.get('/', (req, res) => {
  res.send("Welcome To Application");
});


/* Admin Section Starts */

var admin = {
  user_name : "usman",
  user_password : "aslam"
}

app.get('/admin',(req,res) => {

  try{
    res.status(200).send(JSON.stringify(admin))
  }catch{
    console.log("Error while Getting Admin : "+e)
  }finally{
    console.log("Getting Admin")
  }

});

/* Admin Section Ends */


/* Apartment Section Starts */

app.post('/createApart',(req,res) => {
  try{
    let apart = req.body.apartment
    console.log(apart)
    db.query("INSERT INTO apartments(apart_num,person_name,person_contact,person_email,active) VALUES(?,?,?,?,?)",
      [apart.num,apart.name,apart.contact,apart.email,1],
      (err,result,fields) => {
        if(err){
          res.send(err.sqlMessage);
          // throw err;
        }else{
          res.send("Success")
        }

        
      }
    )
  }catch{
    console.log("Error creating apartment "+e)
  }finally{
    console.log("In create apartment API")
  }
});

app.get('/apartment', (req, res) => {
  try{
    let getApartments = "SELECT * FROM apartments where active = 1";
      db.query(getApartments,function(err,result,fields){
        if(err){
          res.send(err.sqlMessage)
        }else{
          console.log(result);
          res.status(200).send(JSON.stringify(result));
        }
      });
    // res.status(200).send(JSON.stringify(students))
  }catch{
    console.log("Error Occured "+e)
  }finally{
    console.log("Getting Apartments")
  }
});

app.get('/inactiveApartment', (req, res) => {
  try{
    let getApartments = "SELECT * FROM apartments where active = 0";
      db.query(getApartments,function(err,result,fields){
        if(err){
          res.send(err.sqlMessage)
        }else{
          console.log(result);
          res.status(200).send(JSON.stringify(result));
        }
      });
    // res.status(200).send(JSON.stringify(students))
  }catch{
    console.log("Error Occured "+e)
  }finally{
    console.log("Getting Apartments")
  }
});

app.put('/updateApart',(req,res) =>{
  try{
    let apart = req.body.apart
    console.log(apart)
    let sql = "UPDATE apartments SET apart_num = ? , person_name = ? , person_contact = ? ,  person_email = ?  WHERE apart_id = ?"
    db.query(sql,[apart.num,apart.name,apart.contact,apart.email,apart.id],
    (err,result,fields)=>{
        if (err){
          res.send(err.sqlMessage)
          throw err
        } 
        res.send(true)
    })
    // updateStudent(std)
  }catch{
    console.log("Error Updating Apartment "+e)
  }finally{
    console.log("Update Apartment")
  }

});

app.put('/deleteApart',(req,res) =>{
  try{

    let apart = req.body.apart
    console.log(apart.apart_id)
    let sql = "UPDATE apartments SET active = 0  WHERE apart_id = ?"
    db.query(sql,[apart.apart_id],
    (err,result,fields)=>{
        if (err){
          res.send(err.sqlMessage)
        }else{
          res.send(true)
        }

    })
    // updateStudent(std)
  }catch{
    console.log("Error Updating Apartment "+e)
  }finally{
    console.log("Delete Apartment")
  }

});


app.put('/activeApart',(req,res) =>{
  try{

    let apart = req.body.apart
    console.log(apart.apart_id)
    let sql = "UPDATE apartments SET active = 1  WHERE apart_id = ?"
    db.query(sql,[apart.apart_id],
    (err,result,fields)=>{
        if (err){
          res.send(err.sqlMessage)
        }else{
          res.send(true)
        }
    })
    // updateStudent(std)
  }catch{
    console.log("Error Updating Apartment "+e)
  }finally{
    console.log("Delete Apartment")
  }

});

/* Apartment section Ends */

/* Payment Section Starts */

app.post('/createPay',(req,res) => {
  try{
    let pay = req.body.payment
    console.log(pay)
    db.query("INSERT INTO payments(name,default_amount,active) VALUES(?,?,?)",
      [pay.name,pay.default_amount,1],
      (err,result,fields) => {
        if(err){
          res.send(err.sqlMessage);
          // throw err;
        }else{
          res.send("Payment Insertion Successful")
        }
      }
    )
  }catch{
    console.log("Error creating payment "+e)
  }finally{
    console.log("In create payment API")
  }
});


app.get('/payment', (req, res) => {
  try{
    let getPayments = "SELECT * FROM payments where active = 1";
      db.query(getPayments,function(err,result,fields){
        if(err){
          res.send(err.sqlMessage)
          throw err
        }else{
          console.log(result);
          res.status(200).send(JSON.stringify(result));
        }
      });
    // res.status(200).send(JSON.stringify(students))
  }catch{
    console.log("Error Occured getting Payments"+e)
  }finally{
    console.log("Getting Payments")
  }
});

app.put('/updatePay',(req,res) =>{
  try{
    let pay = req.body.pay
    console.log(pay)
    let sql = "UPDATE payments SET name = ? , default_amount = ? WHERE payment_id = ?"
    db.query(sql,[pay.name,pay.default_amount,pay.id],
    (err,result,fields)=>{
        if (err){
          res.send(err.sqlMessage)
          throw err
        } 
        res.send("Payment Update Successful")
    })
    // updateStudent(std)
  }catch{
    console.log("Error Updating Payment "+e)
  }finally{
    console.log("Update Payment")
  }
});


app.put('/deletePay',(req,res) =>{
  try{
    let pay = req.body.pay
    console.log(pay.payment_id)
    let sql = "UPDATE payments SET active = 0  WHERE payment_id = ?"
    db.query(sql,[pay.payment_id],
    (err,result,fields)=>{
        if (err){
          res.send(err.sqlMessage)
        }else{
          res.send(true)
        }

    })
    // updatePayment(pay)
  }catch{
    console.log("Error Deleting Payment "+e)
  }finally{
    console.log("Delete Payment")
  }

});


/* Payment Section Ends */

/* Bills Section Starts */

app.post('/createBill',(req,res) => {
  try{
    const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
      "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NONEMBER", "DECEMBER"
    ];
    let bill = req.body.bill
    let month = new Date(bill.bill_date)
    let date = monthNames[month.getMonth()]+"-"+month.getFullYear()


    db.query("INSERT INTO bills(pay_id,bill_date,amount,active) VALUES(?,?,?,?)",
      [bill.pay_id,date,bill.amount,1],
      (err,result,fields) => {
        if(err){
          res.send("Insertion Failed : "+err.sqlMessage);
          // throw err;
        }else{
          res.send(true);
        }
      }
    )
  }catch(e){
    console.log("Error creating Bill "+e);
  }finally{
    console.log("In create Bill API")
  }
});


app.get('/bill', (req, res) => {
  try{
    let getBills = "select bills.bill_id,bills.pay_id,payments.name,bills.bill_date,bills.amount from bills join payments on bills.pay_id = payments.payment_id where bills.active = 1;";
      db.query(getBills,function(err,result,fields){
        if(err){
          res.send(err.sqlMessage)
          throw err
        }else{
          console.log(result);
          res.status(200).send(JSON.stringify(result));
        }
      });
    // res.status(200).send(JSON.stringify(students))
  }catch{
    console.log("Error Occured getting Payments"+e)
  }finally{
    console.log("Getting Payments")
  }
});

app.put('/updateBill',(req,res) =>{
  try{
    const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NONEMBER", "DECEMBER"
  ];
  let bill = req.body.bill
  let month = new Date(bill.bill_date)
  let date = monthNames[month.getMonth()]+"-"+month.getFullYear()
    console.log(bill)
    let sql = "UPDATE bills SET pay_id = ? , bill_date = ? , amount = ? WHERE bill_id = ?"
    db.query(sql,[bill.pay_id,date,bill.amount,bill.bill_id],
    (err,result,fields)=>{
        if (err){
          res.send(err.sqlMessage)
          throw err
        } 
        res.send("Bill Update Successful")
    })
    // updateStudent(std)
  }catch{
    console.log("Error Updating Payment "+e)
  }finally{
    console.log("Update Payment")
  }
});


app.put('/deleteBill',(req,res) =>{
  try{
    let bill = req.body.bill
    console.log(bill.bill_id)
    let sql = "UPDATE bills SET active = 0  WHERE bill_id = ?"
    db.query(sql,[bill.bill_id],
    (err,result,fields)=>{
        if (err){
          res.send(err.sqlMessage)
        }else{
          res.send(true)
        }

    })
    // updatePayment(pay)
  }catch{
    console.log("Error Deleting Payment "+e)
  }finally{
    console.log("Delete Payment")
  }

});


app.post('/processBill',(req,res)=>{
  const date = req.body.date;
  const userSelectedDate = new Date(date);

  if (date == "") {
    res.send("Please Select a month !!!")
    return ;
  }else if(userSelectedDate.getMonth() > new Date().getMonth()){
    res.send("Future Months cannot be processed !!!");
    return;
  }else if(userSelectedDate.getFullYear() > new Date().getFullYear()){
    res.send("Future Years cannot be processed !!!");
    return;
  }else{
    const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
      "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NONEMBER", "DECEMBER"
    ];
    const date = monthNames[userSelectedDate.getMonth()]+"-"+userSelectedDate.getFullYear();
    let sql = "insert into apartment_payments(select apartments.apart_id,bills.bill_id,bills.bill_date,bills.amount,?,?,? from apartments CROSS JOIN bills where bills.bill_date = ?)";
    db.query(sql,[0,0,0,date],(err)=>{
      if (err) {
        res.send(err.sqlMessage);    
      }else{
        res.send(true);
      }
    })
  }


});
/* Bills Section Ends */


/*Apartment Payment Section Starts */
app.post("/addApartmentPayment",(req,res)=>{
  console.log(req.body)
})

app.get("/apartmentPayment",(req,res)=>{
  let id = req.query.id

  let sql = "select bills.bill_id,apartment_payments.apart_id,apartments.apart_num,payments.name,apartment_payments.date,apartment_payments.amount_payable,apartment_payments.amount_paid,apartment_payments.arears,apartment_payments.status from apartment_payments join apartments on apartment_payments.apart_id=apartments.apart_id join bills on apartment_payments.bill_id=bills.bill_id join payments on bills.pay_id=payments.payment_id where apartments.apart_id=? and apartments.active=? and payments.active=?";
  db.query(sql,[id,1,1],function(err,result,fields){
        if (err){
          res.send(err.sqlMessage)
        }else{
          console.log(result)
          res.send(result)
        }
    });
})

app.put("/processApartPay",(req,res)=>{
  let apartPay = req.body.apart_pay
  console.log(apartPay.apart_id);

  let sql = "UPDATE apartment_payments SET amount_paid = ?, arears = ?, status = ? where apart_id = ? and bill_id = ?";
  db.query(sql,
    [apartPay.amount_paid,apartPay.arears,apartPay.status,apartPay.apart_id,apartPay.bill_id],
    (err,result,fields) => {
        if (err){
          res.send(err.sqlMessage);
        }else{
          console.log(result)
          res.send(true)
        }
    });
  
})
/*Apartment Payment Section Ends */

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

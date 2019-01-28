const router = require("express").Router();
const bodyParser = require("body-parser");
const mysql = require("mysql")


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }))

let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'sekolahku'
})

//signUP

router.post("/signUp", (req, res) => {
    let user = req.body.user;
    let email = req.body.email;
    let pasword = req.body.pasword;
    let input = {
        user: req.body.user,
        email: req.body.email,
        pasword: req.body.pasword
    }

    if ((user && email && pasword) == null) {
        res.send("masukan email, username, dan password");
    } else {
        let sql = `SELECT * FROM users WHERE user = '${req.body.user}' OR email = '${req.body.email}'`;
        db.query(sql, (err, result) => {
            if (err) {
                throw err
            }
            else if (result.length > 0) {
                res.send({
                    "signup": "failed",
                    "status": "Anda sudah terdaftar dengan username/email yang sama!"
                });
            }
            else {
                let sql = `INSERT INTO users SET?`;
                db.query(sql, input, (err, result) => {
                    res.send({
                        "user": req.body.user,
                        "email": req.body.email,
                        "status": "sign Up berhasil"
                    })
                })
            }
        })
    }
})

//login
router.post("/login", (req, res) => {
    var email = req.body.email;
    var pasword = req.body.pasword;

    db.query('SELECT * FROM users WHERE email = ?', email, function (error, results, fields) {
        if (error) {
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            if (results.length > 0) {
                if (results[0].pasword == pasword) {
                    console.log(results.pasword)
                    res.send({
                        results,
                        "code": 200,
                        "success": "login sucessfull"
                    });
                } else {
                    res.send({
                        "code": 204,
                        "success": "Email and password does not match"
                    });
                }
            }
            else {
                res.send({
                    "code": 204,
                    "success": "Email does not exits"
                });
            }
        }
    });
});

module.exports = router;
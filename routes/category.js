var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("category/add", { msg: "" });
});

router.post("/submit", upload.single("picture"), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  pool.query(
    "insert into category(categoryname,picture) values(?,?)",
    [req.body.categoryname, req.file.filename],
    function (err, result) {
      if (err) {
        res.render("category/add", { msg: "Record not submitted" });
      } else {
        res.render("category/add", { msg: "Record submitted" });
      }
    }
  );
});

router.get("/display", function (req, res, next) {
  pool.query("select * from category", function (err, result) {
    if (err) {
      res.render("category/display", { data: [] });
    } else {
      res.render("category/display", { data: result });
    }
  });
});

router.get("/displayJSON", function (req, res, next) {
  pool.query("select * from category", function (err, rslt) {
    if (err) {
      res.status(500).json({ status: false });
    } else {
      res.status(200).json({ status: true, data: rslt });
    }
  });
});

router.get("/displaybyid", function (req, res, next) {
  console.log(req.query);
  pool.query(
    "select * from category where categoryid = ?",
    [req.query.cid],
    function (err, result) {
      if (err) {
        res.render("category/edit", { data: {} });
      } else {
        console.log(result[0]);
        res.render("category/edit", { data: result[0] });
      }
    }
  );
});

router.post("/update", function (req, res) {
  console.log(req.body);
  pool.query(
    "update category set categoryname=? where categoryid=?",
    [req.body.categoryname, req.body.categoryid],
    function (err, result) {
      if (err) {
        res.redirect("/category/display");
      } else {
        res.redirect("/category/display");
      }
    }
  );
});

router.get("/delete", function (req, res) {
  console.log(req.query);
  pool.query(
    "delete from category where categoryid=?",
    [req.query.cid],
    function (err, result) {
      if (err) {
        res.redirect("/category/display");
      } else {
        res.redirect("/category/display");
      }
    }
  );
});

router.get("/displaypicture", function (req, res, next) {
  console.log(req.query);
  pool.query(
    "select * from category where categoryid = ?",
    [req.query.cid],
    function (err, result) {
      if (err) {
        res.render("category/editpicture", { data: {} });
      } else {
        console.log(result[0]);
        res.render("category/editpicture", { data: result[0] });
      }
    }
  );
});

router.post("/updatepicture", upload.single("picture"), function (req, res) {
  console.log(req.body);
  pool.query(
    "update category set picture=? where categoryid=?",
    [req.file.filename, req.body.categoryid],
    function (err, result) {
      if (err) {
        res.redirect("/category/display");
      } else {
        res.redirect("/category/display");
      }
    }
  );
});

module.exports = router;

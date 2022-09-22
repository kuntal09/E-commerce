var express = require("express");
var router = express.Router();
const pool = require("./pool");
var upload = require("./multer");
router.get("/", function (req, res) {
  res.render("subcategory/add", { mesg: "" });
});
router.post("/add", upload.single("picture"), function (req, res) {
  pool.query(
    "insert into subcategory (categoryid,subcategoryname,description,picture,status) values(?,?,?,?,?)",
    [
      req.body.categoryid,
      req.body.subcategoryname,
      req.body.description,
      req.file.filename,
      req.body.status,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        res.render("subcategory/add", { mesg: "server error" });
      } else {
        res.render("subcategory/add", {
          mesg: "record submitted successfully",
        });
      }
    }
  );
});
router.get("/display", function (req, res) {
  pool.query("select * from subcategory", function (error, result) {
    if (error) {
      res.render("subcategory/display", { data: [] });
    } else {
      res.render("subcategory/display", { data: result });
    }
  });
});

router.get("/displayJSON", function (req, res) {
  pool.query(
    "select * from subcategory where categoryid=?",
    [req.query.cid],
    function (error, result) {
      if (error) {
        res.status(500).json({ status:false });
      } else {
        res.status(200).json({ status:true, data: result });
      }
    }
  );
});

router.get("/displayJSONbyproductid", function (req, res) {
    pool.query(
      "select * from subcategory where categoryid in (select categoryid from products where productid=?)",
      [req.query.pid],
      function (error, result) {
        if (error) {
          res.status(500).json({ status:false,error });
        } else {
          res.status(200).json({ status:true, data: result });
        }
      }
    );
  });

router.get("/displaybyid", function (req, res) {
  pool.query(
    "select * from subcategory where subcategoryid=?",
    [req.query.sid],
    function (error, result) {
      if (error) {
        res.render("subcategory/editdata", { data: {} });
      } else console.log(result);
      {
        res.render("subcategory/editdata", { data: result[0] });
      }
    }
  );
});
router.post("/edit", function (req, res) {
  console.log(req.body);
  pool.query(
    "update subcategory set categoryid=?,subcategoryname=?,description=?,status=? where subcategoryid=?",
    [
      req.body.categoryid,
      req.body.subcategoryname,
      req.body.description,
      req.body.status,
      req.body.subcategoryid,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        res.redirect("/subcategory/display");
      } else {
        res.redirect("/subcategory/display");
      }
    }
  );
});
router.get("/displaypicture", function (req, res) {
  pool.query(
    "select * from subcategory where subcategoryid=?",
    [req.query.sid],
    function (error, result) {
      if (error) {
        res.render("subcategory/editpicture", { data: {} });
      } else console.log(result);
      {
        res.render("subcategory/editpicture", { data: result[0] });
      }
    }
  );
});
router.post("/editpicture", upload.single("picture"), function (req, res) {
  console.log(req.body);
  pool.query(
    "update subcategory set picture=? where subcategoryid=?",
    [req.file.filename, req.body.subcategoryid],
    function (error, result) {
      if (error) {
        console.log(error);
        res.redirect("/subcategory/display");
      } else {
        res.redirect("/subcategory/display");
      }
    }
  );
});
router.get("/delete", function (req, res) {
  pool.query(
    "delete from subcategory where subcategoryid=?",
    [req.query.sid],
    function (error, result) {
      if (error) {
        res.redirect("/subcategory/display");
      } else {
        res.redirect("/subcategory/display");
      }
    }
  );
});

module.exports = router;

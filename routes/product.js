var express = require("express");
var router = express.Router();
const pool = require("./pool");
var upload = require("./multer");
router.get("/", function (req, res) {
  res.render("product/add", { mesg: "" });
});
router.post("/add", upload.single("picture"), function (req, res) {
  pool.query(
    "insert into products (categoryid, subcategoryid, productname, description, price, offerprice, color, size, stock, picture, status) values(?,?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.categoryid,
      req.body.subcategoryid,
      req.body.productname,
      req.body.description,
      req.body.price,
      req.body.offerprice,
      req.body.color,
      req.body.size,
      req.body.stock,
      req.file.filename,
      req.body.status,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        res.render("product/add", { mesg: "server error" });
      } else {
        res.render("product/add", { mesg: "record submitted successfully" });
      }
    }
  );
});
router.get("/display", function (req, res) {
  pool.query("select * from products", function (error, result) {
    if (error) {
      res.render("product/display", { data: [] });
    } else {
      res.render("product/display", { data: result });
    }
  });
});

router.get("/displayJSON", function (req, res) {
  pool.query("select * from products", function (error, result) {
    if (error) {
      res.status(500).json({ status: false });
    } else {
      res.status(200).json({ status: true, data: result });
    }
  });
});

router.get("/displayJSONbysubcategoryid", function (req, res) {
  pool.query(
    "select * from products where subcategoryid =?",
    [req.query.sid],
    function (error, result) {
      if (error) {
        res.status(500).json({ status: false });
      } else {
        res.status(200).json({ status: true, data: result });
      }
    }
  );
});

router.get("/displaybyid", function (req, res) {
  pool.query(
    "select * from products where productid=?",
    [req.query.pid],
    function (error, result) {
      if (error) {
        res.render("product/editdata", { data: {} });
      } else console.log(result);
      {
        res.render("product/editdata", { data: result[0] });
      }
    }
  );
});
router.post("/editdata", function (req, res) {
  console.log(req.body);
  pool.query(
    "update products set categoryid=?, subcategoryid=?, productname=?, description=?, price=?, offerprice=?, color=?, size=?, stock=?, status=? where productid=?",
    [
      req.body.categoryid,
      req.body.subcategoryid,
      req.body.productname,
      req.body.description,
      req.body.price,
      req.body.offerprice,
      req.body.color,
      req.body.size,
      req.body.stock,
      req.body.status,
      req.body.productid,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        res.redirect("/product/display");
      } else {
        res.redirect("/product/display");
      }
    }
  );
});
router.get("/displaypicture", function (req, res) {
  pool.query(
    "select * from products where productid=?",
    [req.query.pid],
    function (error, result) {
      if (error) {
        res.render("product/editpicture", { data: {} });
      } else console.log(result);
      {
        res.render("product/editpicture", { data: result[0] });
      }
    }
  );
});
router.post("/editpicture", upload.single("picture"), function (req, res) {
  console.log(req.body);
  pool.query(
    "update products set picture=? where productid=?",
    [req.file.filename, req.body.productid],
    function (error, result) {
      if (error) {
        console.log(error);
        res.redirect("/product/display");
      } else {
        res.redirect("/product/display");
      }
    }
  );
});
router.get("/delete", function (req, res) {
  pool.query(
    "delete from products where productid=?",
    [req.query.pid],
    function (error, result) {
      if (error) {
        res.redirect("/product/display");
      } else {
        res.redirect("/product/display");
      }
    }
  );
});

module.exports = router;

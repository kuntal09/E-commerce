$(document).ready(function () {
  $.getJSON("/product/displayJSON", { ajax: true }, function (result) {
    if (result.status) {
      var str = ``;
      result.data.forEach((item, index) => {
        var peroff = ((item.price - item.offerprice) * 100) / item.price;

        str += `<div style="padding:30px;width:330px;">
        <img src="/images/${item.picture}" width="300"><br>
        <b>${item.productname.slice(0, 30)}${
          item.productname.length > 30 ? "..." : ""
        }</b>
        <p>${item.description.slice(0, 100)}${
          item.description.length > 100 ? "..." : ""
        }</p>
        <p><b>Rs.${item.offerprice}</b> <s>Rs.${
          item.price
        }</s> <font color="#ff905a">(${parseInt(peroff)}% OFF)</font></p>
        </div>`;
      });
      $("#product").html(str);
    }
  });

  $(".category").click(function () {
    var categoryid = $(this).attr("cid");
    $.getJSON(
      "/subcategory/displayJSON",
      { ajax: true, cid: categoryid },
      function (result) {
        console.log(result);
        if (result.status) {
          var str = "<table style='width:20%'><tr>";
          result.data.forEach((item, index) => {
            str +=
              "<td class='scategory' sid=" +
              item.subcategoryid +
              " style='cursor:pointer;'><img src='/images/" +
              item.picture +
              "' width=100><br>" +
              item.subcategoryname +
              "</td>";
          });
          str += "</tr></table>";
          $("#subcategory").html(str);
        }
      }
    );
  });

  $(document).on("click", ".scategory", function () {
    $(window).scrollTop($('#product').offset().top);
    $.getJSON(
      "/product/displayJSONbysubcategoryid",
      { ajax: true, sid: $(this).attr("sid") },
      function (result) {
        if (result.status) {
          var str = ``;
          result.data.forEach((item, index) => {
            var peroff = ((item.price - item.offerprice) * 100) / item.price;

            str += `<div style="padding:30px;width:330px;">
            <img src="/images/${item.picture}" width="300"><br>
            <b>${item.productname.slice(0, 30)}${
              item.productname.length > 30 ? "..." : ""
            }</b>
            <p>${item.description.slice(0, 100)}${
              item.description.length > 100 ? "..." : ""
            }</p>
            <p><b>Rs.${item.offerprice}</b> <s>Rs.${
              item.price
            }</s> <font color="#ff905a">(${parseInt(peroff)}% OFF)</font></p>
            </div>`;
          });
          $("#product").html(str);
        }
      }
    );
  });
});

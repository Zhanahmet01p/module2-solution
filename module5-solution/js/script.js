(function (global) {

  var dc = {};

  var homeHtmlUrl = "snippets/home-snippet.html";
  var allCategoriesUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";

  function chooseRandomCategory(categories) {
    var randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  }

  function insertProperty(string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
    return string;
  }

  document.addEventListener("DOMContentLoaded", function () {
    $ajaxUtils.sendGetRequest(
      allCategoriesUrl,
      function (categories) {
        var randomCategory = chooseRandomCategory(categories);
        var shortName = "'" + randomCategory.short_name + "'";

        $ajaxUtils.sendGetRequest(
          homeHtmlUrl,
          function (responseText) {
            var homeHtml = insertProperty(responseText, "randomCategoryShortName", shortName);
            document.querySelector("#main-content").innerHTML = homeHtml;
          },
          false
        );
      },
      true
    );
  });

  global.$dc = dc;

})(window);

/* main.js - language switching & i18n apply */
(function () {
  var KEY = "oldweb-lang";
  var def = "zh";

  function current() {
    try { var v = localStorage.getItem(KEY); if (v && I18N[v]) return v; } catch (e) {}
    var h = (navigator.language || "zh").toLowerCase();
    if (h.indexOf("es") === 0) return "es";
    if (h.indexOf("en") === 0) return "en";
    return def;
  }

  function apply(lang) {
    if (!I18N[lang]) lang = def;
    var dict = I18N[lang];
    document.title = dict.site_title;
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      if (dict[key]) nodes[i].textContent = dict[key];
    }
    // active language marker
    var btns = document.querySelectorAll("[data-lang]");
    for (var j = 0; j < btns.length; j++) {
      if (btns[j].getAttribute("data-lang") === lang) btns[j].className = "langbtn on";
      else btns[j].className = "langbtn";
    }
  }

  function setLang(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    apply(lang);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var start = current();
    apply(start);
    var btns = document.querySelectorAll("[data-lang]");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        setLang(this.getAttribute("data-lang"));
      });
    }
  });
})();

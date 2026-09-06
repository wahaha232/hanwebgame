/* js/main.js - language, game list, placeholder emulator actions */
(function () {
  var KEY = "dosclassic-lang";
  var FALLBACK = {
    games: [{ id: "han", title: "楚漢相爭", folder: "/games/han/", executable: "HAN.EXE", status: "available", titles: { zh: "楚漢相爭", en: "Chu-Han Contest", es: "La Disputa Chu-Han" } }]
  };

  function langOf() {
    try { var v = localStorage.getItem(KEY); if (v && I18N[v]) return v; } catch (e) {}
    var h = (navigator.language || "zh").toLowerCase();
    if (h.indexOf("es") === 0) return "es";
    if (h.indexOf("en") === 0) return "en";
    return "zh";
  }

  function setText(el, txt) { if (el) el.textContent = txt; }

  function apply(lang) {
    var d = I18N[lang] || I18N.zh;
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var k = nodes[i].getAttribute("data-i18n");
      if (d[k]) nodes[i].textContent = d[k];
    }
    var btns = document.querySelectorAll("[data-lang]");
    for (var j = 0; j < btns.length; j++) {
      btns[j].classList.toggle("on", btns[j].getAttribute("data-lang") === lang);
    }
    document.documentElement.lang = lang;
    var h1 = document.querySelector("h1");
    if (h1) h1.textContent = d.brand;
  }

  function saveLang(l) { try { localStorage.setItem(KEY, l); } catch (e) {} apply(l); }

  function renderGames(list, lang) {
    var box = document.getElementById("gameList");
    box.innerHTML = "";
    (list.games || []).forEach(function (g) {
      var title = (g.titles && g.titles[lang]) || g.title;
      var card = document.createElement("div");
      card.className = "gameCard";
      card.innerHTML =
        '<div class="gameTitle">' + title + '</div>' +
        '<div class="gameMeta">DOS CLASSIC · ' + g.executable + ' · ' + g.status + '</div>' +
        '<button class="playBtn" data-game="' + g.id + '">' + (I18N[lang].play_now || "PLAY NOW") + '</button>';
      var btn = card.querySelector("button");
      btn.addEventListener("click", function () { playGame(g, lang); });
      box.appendChild(card);
    });
    if (!list.games || !list.games.length) {
      box.innerHTML = "<p>" + (I18N[lang].load_fail || "") + "</p>";
    }
  }

  function loadGames(lang) {
    if (typeof XMLHttpRequest === "undefined") { renderGames(FALLBACK, lang); return; }
    var req = new XMLHttpRequest();
    req.open("GET", "games/games.json", true);
    req.onreadystatechange = function () {
      if (req.readyState === 4) {
        if (req.status === 200) {
          try { renderGames(JSON.parse(req.responseText), lang); }
          catch (e) { renderGames(FALLBACK, lang); }
        } else { renderGames(FALLBACK, lang); }
      }
    };
    req.onerror = function () { renderGames(FALLBACK, lang); };
    req.send();
  }

  function playGame(g, lang) {
    // Phase 1: emulator will be integrated in Phase 2.
    var note = document.getElementById("emulatorNote");
    if (note) { note.classList.remove("hidden"); }
    showError(true);
  }

  function showError(on) {
    var err = document.getElementById("errorScreen");
    if (!err) return;
    if (on) err.classList.remove("hidden");
    else err.classList.add("hidden");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var lang = langOf();
    apply(lang);
    loadGames(lang);

    var btns = document.querySelectorAll("[data-lang]");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        saveLang(this.getAttribute("data-lang"));
      });
    }

    var btnPlay = document.getElementById("btnPlay");
    if (btnPlay) btnPlay.addEventListener("click", function () {
      playGame({ id: "han" }, langOf());
    });
    var btnRetry = document.getElementById("btnRetry");
    if (btnRetry) btnRetry.addEventListener("click", function () { showError(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") showError(false);
    });
  });
})();

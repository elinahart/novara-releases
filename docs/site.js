// NOVARA's site: the app's themes tried on the page, blocks that appear as you scroll (and leave
// when you scroll back), a sentence that types itself, and a simulated feed of the agents at work.
(function () {
  var root = document.documentElement;
  var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- Themes, remembered for the next visit.
  function setTheme(t) {
    root.dataset.theme = t;
    document.querySelectorAll("[data-set-theme]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.setTheme === t)); });
    try { localStorage.setItem("novara-site-theme", t); } catch (e) { /* private mode */ }
  }
  var saved = null;
  try { saved = localStorage.getItem("novara-site-theme"); } catch (e) { /* private mode */ }
  setTheme(saved || "dark-aero");
  document.querySelectorAll("[data-set-theme]").forEach(function (b) {
    b.addEventListener("click", function () { setTheme(b.dataset.setTheme); });
  });

  // ---- Reveal on scroll: in when it enters, out again when it leaves.
  var shown = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { e.target.classList.toggle("in", e.isIntersecting); });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(function (el) { if (still) el.classList.add("in"); else shown.observe(el); });

  // ---- The sentence types itself as it scrolls into the middle of the screen.
  var typed = document.querySelector(".typed");
  if (typed) {
    var text = typed.dataset.text;
    var paint = function () {
      var r = typed.getBoundingClientRect(), h = window.innerHeight;
      var p = still ? 1 : Math.min(1, Math.max(0, (h * 0.95 - r.top) / (h * 0.55)));
      var n = Math.round(text.length * p);
      typed.innerHTML = "";
      typed.appendChild(document.createTextNode(text.slice(0, n)));
      var caret = document.createElement("span");
      caret.className = "caret";
      typed.appendChild(caret);
      var rest = document.createElement("span");
      rest.className = "ghost";
      rest.textContent = text.slice(n);
      typed.appendChild(rest);
    };
    window.addEventListener("scroll", paint, { passive: true });
    window.addEventListener("resize", paint);
    paint();
  }

  // ---- The agents at work: a simulated feed that plays while it is on screen.
  var feed = document.getElementById("feed");
  if (feed) {
    var items = Array.prototype.slice.call(feed.children);
    items.forEach(function (li) {
      var who = document.createElement("b");
      who.textContent = li.dataset.who;
      who.style.color = li.dataset.c;
      var dot = document.createElement("i");
      dot.style.background = li.dataset.c;
      li.prepend(dot, who);
    });
    var step = 0, timer = null;
    var tick = function () {
      if (step >= items.length) {
        timer = setTimeout(function () { items.forEach(function (li) { li.classList.remove("on", "now"); }); step = 0; tick(); }, 2600);
        return;
      }
      items.forEach(function (li) { li.classList.remove("now"); });
      items[step].classList.add("on", "now");
      step++;
      timer = setTimeout(tick, 1300);
    };
    if (still) items.forEach(function (li) { li.classList.add("on"); });
    else new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !timer) tick();
        if (!e.isIntersecting && timer) { clearTimeout(timer); timer = null; }
      });
    }, { threshold: 0.3 }).observe(feed);
  }

  // ---- The header gets a shadow once the page has moved.
  var top = document.querySelector(".top");
  window.addEventListener("scroll", function () { top.classList.toggle("scrolled", window.scrollY > 10); }, { passive: true });
})();

// ---- Small pleasures: reading progress, the section in view, screenshots that open big,
// a light under the mouse, agents' bubbles over the town, back to top.
(function () {
  var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var bar = document.createElement("div");
  bar.className = "progress";
  document.body.appendChild(bar);
  var up = document.createElement("button");
  up.className = "to-top";
  up.setAttribute("aria-label", document.documentElement.lang === "fr" ? "Revenir en haut" : "Back to top");
  up.textContent = "↑";
  up.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: still ? "auto" : "smooth" }); });
  document.body.appendChild(up);
  var onScroll = function () {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
    up.classList.toggle("on", window.scrollY > window.innerHeight);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // The menu follows the section in view.
  var links = Array.prototype.slice.call(document.querySelectorAll('.top nav a[href^="#"]'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute("href")); }).filter(Boolean);
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id); });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(function (s) { spy.observe(s); });

  // Screenshots open big; Escape or a click closes them.
  var box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  var big = document.createElement("img");
  var caption = document.createElement("p");
  box.append(big, caption);
  document.body.appendChild(box);
  var close = function () { box.classList.remove("open"); };
  box.addEventListener("click", close);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  document.querySelectorAll("main figure img, .trio img, .flow img").forEach(function (img) {
    img.addEventListener("click", function () {
      big.src = img.currentSrc || img.src;
      big.alt = img.alt;
      caption.textContent = img.alt;
      box.classList.add("open");
    });
  });

  // A light that follows the mouse on cards.
  document.querySelectorAll(".cards > div, .tokens > div").forEach(function (c) {
    c.addEventListener("pointermove", function (e) {
      var r = c.getBoundingClientRect();
      c.style.setProperty("--mx", e.clientX - r.left + "px");
      c.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });

  // Agents' bubbles over the town (simulated).
  var hero = document.querySelector(".hero-shot");
  if (hero && !still) {
    var fr = document.documentElement.lang === "fr";
    var says = fr
      ? [["Nalu", "dessine star.png", "#3b82f6", "✎", 18, 22], ["Coordinateur", "découpe l'idée en 5 tâches", "#f59e0b", "★", 46, 10], ["Kalani", "compose la musique", "#10b981", "♪", 60, 58], ["Ariel", "teste le niveau 2", "#ec4899", "✓", 14, 70], ["NOVARA", "sprite prêt à valider", "#8b5cf6", "◆", 52, 34]]
      : [["Nalu", "drawing star.png", "#3b82f6", "✎", 18, 22], ["Coordinator", "splitting the idea into 5 tasks", "#f59e0b", "★", 46, 10], ["Kalani", "composing the music", "#10b981", "♪", 60, 58], ["Ariel", "testing level 2", "#ec4899", "✓", 14, 70], ["NOVARA", "sprite ready to approve", "#8b5cf6", "◆", 52, 34]];
    var chips = says.map(function (s) {
      var b = document.createElement("div");
      b.className = "bubble";
      b.style.left = s[4] + "%";
      b.style.top = s[5] + "%";
      var i = document.createElement("i");
      i.style.background = s[2];
      i.textContent = s[3];
      var who = document.createElement("b");
      who.textContent = s[0];
      b.append(i, who, document.createTextNode(" " + s[1]));
      hero.appendChild(b);
      return b;
    });
    var k = 0;
    setInterval(function () {
      chips.forEach(function (c, j) { c.classList.toggle("on", j === k % chips.length || j === (k + 2) % chips.length); });
      k++;
    }, 1800);
  }
})();

// ---- The themes showcase: while it is on screen, scrolling plays the themes one by one; the
// whole site takes each one's colours. Leaving it gives back the theme chosen for the site.
(function () {
  var show = document.getElementById("showcase");
  if (!show) return;
  var root = document.documentElement;
  var tabs = Array.prototype.slice.call(show.querySelectorAll(".show-strip button"));
  var img = document.getElementById("show-img"), name = document.getElementById("show-name"), desc = document.getElementById("show-desc"), n = document.getElementById("show-n");
  var current = -1, inside = false;
  var chosen = function () { try { return localStorage.getItem("novara-site-theme") || "dark-aero"; } catch (e) { return "dark-aero"; } };
  var pick = function (i) {
    if (i === current) return;
    current = i;
    var t = tabs[i];
    tabs.forEach(function (b, j) { b.setAttribute("aria-selected", String(j === i)); });
    img.classList.add("swap");
    setTimeout(function () {
      img.src = "img/" + t.dataset.img + ".jpg";
      img.alt = "NOVARA · " + t.dataset.name;
      img.onload = function () { img.classList.remove("swap"); };
    }, 180);
    name.textContent = t.dataset.name;
    desc.textContent = t.dataset.desc;
    n.textContent = String(i + 1);
    if (inside) root.dataset.theme = t.dataset.themeId;
  };
  var wide = function () { return window.matchMedia("(min-width: 901px)").matches; };
  var onScroll = function () {
    if (!wide()) return;
    var r = show.getBoundingClientRect();
    var span = show.offsetHeight - window.innerHeight;
    var p = Math.min(0.999, Math.max(0, -r.top / span));
    var nowInside = r.top < window.innerHeight * 0.4 && r.bottom > window.innerHeight * 0.6;
    if (nowInside !== inside) {
      inside = nowInside;
      root.dataset.theme = inside ? tabs[Math.max(0, current)].dataset.themeId : chosen();
    }
    pick(Math.floor(p * tabs.length));
  };
  tabs.forEach(function (b, i) {
    b.addEventListener("click", function () {
      if (wide()) {
        var span = show.offsetHeight - window.innerHeight;
        window.scrollTo({ top: show.offsetTop + span * (i + 0.5) / tabs.length, behavior: "smooth" });
      } else { inside = true; pick(i); root.dataset.theme = b.dataset.themeId; }
    });
  });
  document.getElementById("show-keep").addEventListener("click", function () {
    var t = tabs[Math.max(0, current)].dataset.themeId;
    try { localStorage.setItem("novara-site-theme", t); } catch (e) { /* private mode */ }
    document.querySelectorAll("[data-set-theme]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.setTheme === t)); });
  });
  pick(0);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// ---- Make your character: the app's looks, hats and pets (first frames of their sheets).
(function () {
  var me = document.getElementById("maker-me");
  if (!me) return;
  var fr = document.documentElement.lang === "fr";
  var L = function (en, f) { return fr ? f : en; };
  var LOOKS = [[101, L("Astronaut", "Astronaute")], [102, L("Neon", "Néon")], [103, L("Wizard", "Magicien")], [104, L("All gold", "Tout en or")], [105, L("Pirate", "Pirate")], [106, L("Rainbow", "Arc-en-ciel")],
    [107, L("Aero bubble", "Bulle d'Aero")], [108, L("Metro tile", "Tuile de Metro")], [109, L("Eco gardener", "Jardinier d'Eco")], [110, L("DORFic engineer", "Ingénieur de DORFic")], [111, L("Dark Aero pilot", "Pilote de Dark Aero")],
    [112, L("Aurora explorer", "Explorateur d'Aurora")], [113, L("Technozen monk", "Moine de Technozen")], [114, L("Glacier skier", "Skieur de Glacier")],
    [122, L("Knight", "Chevalier")], [123, L("Cool granny", "Mamie cool")], [124, L("Clown", "Clown")], [125, L("Alien", "Extraterrestre")], [126, L("Robot", "Robot")], [127, L("Vampire", "Vampire")], [128, L("Zombie", "Zombie")], [129, L("Ghost", "Fantôme")], [130, L("Superhero", "Super-héros")]];
  var HATS = [["", L("No hat", "Sans chapeau")], ["chapeau", L("Mayor's hat", "Chapeau de maire")], ["couronne", L("Crown", "Couronne")], ["bonnet", L("Beanie", "Bonnet")], ["casquette", L("Cap", "Casquette")], ["beret", L("Beret", "Béret")], ["casque", L("Headphones", "Casque audio")],
    ["bulle", L("Aero bubble", "Bulle d'Aero")], ["tuile", L("Metro tile", "Tuile de Metro")], ["feuilles", L("Eco crown", "Couronne d'Eco")], ["chantier", L("DORFic helmet", "Casque de DORFic")], ["visiere", L("Dark Aero visor", "Visière Dark Aero")],
    ["etoile", L("Aurora beanie", "Bonnet d'Aurora")], ["paille", L("Technozen hat", "Chapeau de Technozen")], ["cacheoreilles", L("Glacier earmuffs", "Cache-oreilles Glacier")], ["viking", L("Viking helmet", "Casque viking")], ["ninja", L("Ninja headband", "Bandeau ninja")]];
  var PETS = [["", L("No pet", "Sans familier")], ["chat", L("Cat", "Chat")], ["chien", L("Dog", "Chien")], ["lapin", L("Rabbit", "Lapin")], ["canard", L("Duck", "Canard")], ["pigeon", L("Pigeon", "Pigeon")], ["herisson", L("Hedgehog", "Hérisson")],
    ["chien-robot", L("Robot dog", "Chien-robot")], ["chat-noir", L("Black cat", "Chat noir")], ["renard", L("Fox", "Renard")], ["lapin-blanc", L("White rabbit", "Lapin blanc")], ["renne", L("Reindeer", "Renne")], ["grue", L("Crane", "Grue")],
    ["tanuki", L("Tanuki", "Tanuki")], ["pingouin", L("Penguin", "Pingouin")], ["renard-polaire", L("Arctic fox", "Renard polaire")]];
  var NAMES = ["Alex", "Sacha", "Lou", "Noa", "Eden", "Camille", "Charlie", "Kai", "Mira", "Yuki", "Nalu", "Ariel", "Kalani", "Zoé", "Leif", "Inès", "Hugo", "Amara"];
  var state = { look: 101, hat: "", pet: "chat", tab: "look" };
  var grid = document.getElementById("maker-grid"), pet = document.getElementById("maker-pet");
  var img = function (look, hat) { return (hat ? "url(img/perso/h" + look + "-" + hat + ".png), " : "") + "url(img/perso/p" + look + ".png)"; };
  var paint = function () {
    me.style.backgroundImage = img(state.look, state.hat);
    pet.className = "maker-pet" + (state.pet ? "" : " none");
    if (state.pet) pet.style.backgroundImage = "url(img/perso/a-" + state.pet + ".png)";
    document.getElementById("maker-look").textContent = LOOKS.filter(function (l) { return l[0] === state.look; })[0][1];
  };
  var fill = function () {
    grid.innerHTML = "";
    var list = state.tab === "look" ? LOOKS : state.tab === "hat" ? HATS : PETS;
    list.forEach(function (it) {
      var b = document.createElement("button"), sp = document.createElement("span");
      if (state.tab === "look") sp.style.backgroundImage = img(it[0], state.hat);
      else if (state.tab === "hat") sp.style.backgroundImage = img(state.look, it[0]);
      else if (it[0]) { sp.className = "pet"; sp.style.backgroundImage = "url(img/perso/a-" + it[0] + ".png)"; }
      else sp.className = "none";
      b.setAttribute("aria-pressed", String(state[state.tab] === it[0]));
      b.append(sp, document.createTextNode(it[1]));
      b.addEventListener("click", function () { state[state.tab] = it[0]; paint(); fill(); });
      grid.appendChild(b);
    });
  };
  document.querySelectorAll(".maker-tabs button").forEach(function (t) {
    t.addEventListener("click", function () {
      state.tab = t.dataset.tab;
      document.querySelectorAll(".maker-tabs button").forEach(function (o) { o.setAttribute("aria-selected", String(o === t)); });
      fill();
    });
  });
  var input = document.getElementById("maker-input"), name = document.getElementById("maker-name");
  input.addEventListener("input", function () { name.textContent = input.value.trim() || "…"; });
  var any = function (a) { return a[Math.floor(Math.random() * a.length)]; };
  document.getElementById("maker-random").addEventListener("click", function () {
    state.look = any(LOOKS)[0]; state.hat = any(HATS)[0]; state.pet = any(PETS)[0];
    input.value = any(NAMES); name.textContent = input.value;
    paint(); fill();
  });
  paint(); fill();
})();

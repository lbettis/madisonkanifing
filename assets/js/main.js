/* Madison–Kanifing Sister City — site behaviour (no dependencies) */
(function () {
  "use strict";

  // Mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Reveal-on-scroll
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -60px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // Gallery filters + lightbox
  var gallery = document.querySelector(".gallery");
  if (gallery) {
    var figures = Array.prototype.slice.call(gallery.querySelectorAll("figure"));
    var buttons = document.querySelectorAll(".gallery-filters button");

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter");
        buttons.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
        figures.forEach(function (fig) {
          fig.hidden = filter !== "all" && fig.getAttribute("data-cat") !== filter;
        });
      });
    });

    var box = document.querySelector(".lightbox");
    var boxImg = box.querySelector("img");
    var boxCap = box.querySelector("p");
    var current = 0;
    var lastFocus = null;

    function visible() { return figures.filter(function (f) { return !f.hidden; }); }

    function show(fig) {
      var img = fig.querySelector("img");
      boxImg.src = img.src;
      boxImg.alt = img.alt;
      boxCap.textContent = fig.querySelector("figcaption").textContent;
      current = visible().indexOf(fig);
    }

    function open(fig) {
      lastFocus = document.activeElement;
      show(fig);
      box.classList.add("open");
      document.body.style.overflow = "hidden";
      box.querySelector(".close").focus();
    }

    function close() {
      box.classList.remove("open");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }

    function step(d) {
      var list = visible();
      current = (current + d + list.length) % list.length;
      show(list[current]);
    }

    figures.forEach(function (fig) {
      fig.querySelector("button.open").addEventListener("click", function () { open(fig); });
    });
    box.querySelector(".close").addEventListener("click", close);
    box.querySelector(".prev").addEventListener("click", function () { step(-1); });
    box.querySelector(".next").addEventListener("click", function () { step(1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }

  // Contact form: opens the visitor's email app with the message pre-filled
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var d = new FormData(form);
      var name = (d.get("first") + " " + d.get("last")).trim();
      var subject = "[Website] " + d.get("topic") + " — " + name;
      var body = d.get("message") + "\n\n— " + name + "\n" + d.get("email");
      window.location.href = "mailto:" + form.getAttribute("data-to") +
        "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      var note = document.getElementById("form-status");
      if (note) note.textContent = "Your email app should now open with your message ready to send.";
    });
  }
})();

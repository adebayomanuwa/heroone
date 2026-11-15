/* ═══════════════════════════════════════════════════════════════════
   HERO ONE · portfolio.heroone.art
   Client interactions: glass header, nav spy, 333BI OS card spotlight/tilt,
   lightbox for press clippings & analytics receipts, and video deck controls.
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  function init() {
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    /* ── Header: Scrolled state + Mobile menu ────────────────────────── */
    var header = document.querySelector(".site-header");
    var menuBtn = document.querySelector(".menu-button");

    if (header) {
      var checkScroll = function () {
        header.classList.toggle("is-scrolled", window.scrollY > 15);
      };
      checkScroll();
      window.addEventListener("scroll", checkScroll, { passive: true });
    }

    if (header && menuBtn) {
      var toggleMenu = function (open) {
        header.classList.toggle("is-open", open);
        menuBtn.setAttribute("aria-expanded", String(open));
        menuBtn.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
      };

      menuBtn.addEventListener("click", function () {
        toggleMenu(!header.classList.contains("is-open"));
      });

      header.querySelectorAll(".site-nav a").forEach(function (link) {
        link.addEventListener("click", function () {
          toggleMenu(false);
        });
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && header.classList.contains("is-open")) {
          toggleMenu(false);
          menuBtn.focus();
        }
      });

      document.addEventListener("pointerdown", function (e) {
        if (header.classList.contains("is-open") && !header.contains(e.target)) {
          toggleMenu(false);
        }
      });
    }

    /* ── Nav Spy ─────────────────────────────────────────────────────── */
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav a[href^="#"]'));
    if (navLinks.length && "IntersectionObserver" in window) {
      var navMap = {};
      navLinks.forEach(function (a) {
        var id = a.getAttribute("href").slice(1);
        if (id) navMap[id] = a;
      });

      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && navMap[entry.target.id]) {
            navLinks.forEach(function (a) { a.classList.remove("is-active"); });
            navMap[entry.target.id].classList.add("is-active");
          }
        });
      }, { rootMargin: "-30% 0px -60% 0px" });

      Object.keys(navMap).forEach(function (id) {
        var target = document.getElementById(id);
        if (target) spy.observe(target);
      });
    }

    /* ── 333BI OS Spotlight + 3D Tilt Cards ──────────────────────────── */
    if (finePointer && !reduceMotion) {
      var tiltCards = document.querySelectorAll(".card, .stage-card");
      tiltCards.forEach(function (el) {
        var maxTilt = 4.5;
        el.addEventListener("pointermove", function (e) {
          var rect = el.getBoundingClientRect();
          var x = e.clientX - rect.left;
          var y = e.clientY - rect.top;
          el.style.setProperty("--mx", x + "px");
          el.style.setProperty("--my", y + "px");
          el.style.setProperty("--rx", ((y / rect.height) - 0.5) * -maxTilt + "deg");
          el.style.setProperty("--ry", ((x / rect.width) - 0.5) * maxTilt + "deg");
        });

        el.addEventListener("pointerleave", function () {
          el.style.setProperty("--rx", "0deg");
          el.style.setProperty("--ry", "0deg");
        });
      });
    }

    /* ── Lightbox for Analytics Receipts & Press Clippings ───────────── */
    var lightbox = document.getElementById("lightbox");
    var getTriggers = function () {
      return Array.prototype.slice.call(document.querySelectorAll("[data-receipt]"));
    };

    if (lightbox) {
      var lbImg = lightbox.querySelector("#lb-img");
      var lbCat = lightbox.querySelector("#lb-cat");
      var lbTitle = lightbox.querySelector("#lb-title");
      var lbDesc = lightbox.querySelector("#lb-desc");
      var lbDate = lightbox.querySelector("#lb-date");
      var lbOutlet = lightbox.querySelector("#lb-outlet");
      var lbMetric = lightbox.querySelector("#lb-metric");
      var lbDownload = lightbox.querySelector("#lb-download");
      var lbClose = lightbox.querySelector("#lb-close");
      var lbPrev = lightbox.querySelector("#lb-prev");
      var lbNext = lightbox.querySelector("#lb-next");

      var currentIndex = 0;

      var displayItem = function (item) {
        var d = item.dataset;
        if (lbImg) {
          lbImg.src = d.full || d.src || "";
          lbImg.alt = d.title || "Hero One industry receipt";
        }
        if (lbCat) lbCat.textContent = d.category || "Receipt";
        if (lbTitle) lbTitle.textContent = d.title || "Industry Proof";
        if (lbDesc) lbDesc.textContent = d.description || "";
        if (lbDate) lbDate.textContent = d.date || "2025 – 2026";
        if (lbOutlet) lbOutlet.textContent = d.outlet || "Hero One Catalog";
        if (lbMetric) lbMetric.textContent = d.metric || "Verified";
        if (lbDownload) {
          lbDownload.href = d.full || d.src || "#";
          lbDownload.setAttribute("download", (d.full || "receipt.png").split("/").pop());
        }
      };

      var openLightboxAt = function (index) {
        var triggers = getTriggers();
        if (!triggers.length) return;
        currentIndex = (index + triggers.length) % triggers.length;
        displayItem(triggers[currentIndex]);
        if (typeof lightbox.showModal === "function") {
          lightbox.showModal();
        } else {
          lightbox.setAttribute("open", "");
        }
      };

      var changeIndex = function (direction) {
        var triggers = getTriggers();
        if (!triggers.length) return;
        openLightboxAt(currentIndex + direction);
      };

      // Delegated click handler
      document.addEventListener("click", function (e) {
        var trigger = e.target.closest("[data-receipt]");
        if (trigger) {
          e.preventDefault();
          var triggers = getTriggers();
          var idx = triggers.indexOf(trigger);
          openLightboxAt(idx !== -1 ? idx : 0);
        }
      });

      // Delegated keyboard handler for accessibility
      document.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          var trigger = document.activeElement ? document.activeElement.closest("[data-receipt]") : null;
          if (trigger) {
            e.preventDefault();
            var triggers = getTriggers();
            var idx = triggers.indexOf(trigger);
            openLightboxAt(idx !== -1 ? idx : 0);
          }
        }
      });

      if (lbClose) {
        lbClose.addEventListener("click", function () {
          if (typeof lightbox.close === "function") lightbox.close();
          else lightbox.removeAttribute("open");
        });
      }

      if (lbPrev) {
        lbPrev.addEventListener("click", function () {
          changeIndex(-1);
        });
      }

      if (lbNext) {
        lbNext.addEventListener("click", function () {
          changeIndex(1);
        });
      }

      lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) {
          if (typeof lightbox.close === "function") lightbox.close();
          else lightbox.removeAttribute("open");
        }
      });

      document.addEventListener("keydown", function (e) {
        if (!lightbox.hasAttribute("open") && !lightbox.open) return;
        if (e.key === "ArrowLeft") changeIndex(-1);
        else if (e.key === "ArrowRight") changeIndex(1);
      });
    }

    window.__portfolioReady = true;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

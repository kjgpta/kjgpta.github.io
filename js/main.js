(() => {
  const root = document.documentElement;
  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".mobile-drawer");
  const backdrop = document.getElementById("nav-backdrop");
  const themeToggle = document.querySelector(".theme-toggle");
  const themeColorMeta = document.getElementById("theme-color-meta");
  const yearEl = document.getElementById("year");

  const themeColors = {
    dark: "#171512",
    light: "#F4F1E9",
  };

  const getTheme = () =>
    root.getAttribute("data-theme") === "dark" ? "dark" : "light";

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
      localStorage.setItem("theme-dir", "offprint");
    } catch (_) {
      /* ignore */
    }
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", themeColors[theme]);
    }
    if (themeToggle) {
      const next = theme === "dark" ? "light" : "dark";
      themeToggle.setAttribute("aria-label", `Switch to ${next} theme`);
    }
  };

  applyTheme(getTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      applyTheme(getTheme() === "dark" ? "light" : "dark");
    });
  }

  try {
    localStorage.removeItem("persona");
  } catch (_) {
    /* ignore */
  }

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const setScrolled = () => {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  setScrolled();
  window.addEventListener("scroll", setScrolled, { passive: true });

  if (toggle && menu) {
    let lastFocus = null;

    const getFocusable = () =>
      Array.from(
        menu.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

    const setMenuOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);

      if (backdrop) {
        backdrop.classList.toggle("is-open", open);
      }

      if (open) {
        lastFocus = document.activeElement;
        const focusable = getFocusable();
        const first = focusable[0];
        if (first) {
          window.requestAnimationFrame(() => first.focus());
        }
      } else if (lastFocus && typeof lastFocus.focus === "function") {
        lastFocus.focus();
        lastFocus = null;
      }
    };

    const closeMenu = () => setMenuOpen(false);

    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      setMenuOpen(!open);
    });

    if (backdrop) {
      backdrop.addEventListener("click", closeMenu);
    }

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || toggle.getAttribute("aria-expanded") !== "true") {
        return;
      }

      const focusable = getFocusable();
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 920) closeMenu();
    });
  }

  /* Focus track: All / Application / Research */
  const trackControl = document.querySelector("[data-track-control]");
  const trackButtons = trackControl
    ? Array.from(trackControl.querySelectorAll("[data-track]"))
    : [];
  const trackIndicator = document.querySelector("[data-track-indicator]");
  const trackable = () =>
    document.querySelectorAll("[data-tracks], [data-track-copy]");

  const readTrackFromUrl = () => {
    try {
      const focus = new URLSearchParams(window.location.search).get("focus");
      if (focus === "app" || focus === "research" || focus === "all") return focus;
    } catch (_) {
      /* ignore */
    }
    return null;
  };

  const moveTrackIndicator = (activeBtn) => {
    if (!trackIndicator || !trackControl || !activeBtn) return;
    const controlBox = trackControl.getBoundingClientRect();
    const btnBox = activeBtn.getBoundingClientRect();
    const x = btnBox.left - controlBox.left;
    trackIndicator.style.width = `${btnBox.width}px`;
    trackIndicator.style.transform = `translateX(${x}px)`;
  };

  const applyTrack = (track) => {
    const next = track === "app" || track === "research" ? track : "all";
    document.documentElement.setAttribute("data-focus", next);

    trackButtons.forEach((btn) => {
      const active = btn.getAttribute("data-track") === next;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-checked", String(active));
      btn.tabIndex = active ? 0 : -1;
    });

    trackable().forEach((el) => {
      if (el.hasAttribute("data-track-copy")) {
        const match = el.getAttribute("data-track-copy") === next;
        el.hidden = !match;
        el.classList.toggle("is-track-hidden", !match);
        return;
      }
      const tracks = (el.getAttribute("data-tracks") || "all")
        .split(/\s+/)
        .filter(Boolean);
      const visible = tracks.includes(next);
      el.classList.toggle("is-track-hidden", !visible);
      if (el.matches("section, .proof-row, li")) {
        el.setAttribute("aria-hidden", String(!visible));
      }
    });

    document
      .querySelectorAll(".nav-links-mobile li:not(.is-track-hidden) .nav-index")
      .forEach((el, i) => {
        el.textContent = String(i + 1).padStart(2, "0");
      });

    document
      .querySelectorAll(".proof-strip .proof-row:not(.is-track-hidden) .proof-idx")
      .forEach((el, i) => {
        el.textContent = String(i + 1).padStart(2, "0");
      });

    const activeBtn = trackButtons.find((btn) => btn.getAttribute("data-track") === next);
    window.requestAnimationFrame(() => moveTrackIndicator(activeBtn));

    try {
      localStorage.setItem("focus-track", next);
    } catch (_) {
      /* ignore */
    }

    try {
      const url = new URL(window.location.href);
      if (next === "all") url.searchParams.delete("focus");
      else url.searchParams.set("focus", next);
      window.history.replaceState({}, "", url);
    } catch (_) {
      /* ignore */
    }
  };

  if (trackControl && trackButtons.length) {
    let initial = "all";
    try {
      const saved = localStorage.getItem("focus-track");
      if (saved === "app" || saved === "research" || saved === "all") initial = saved;
    } catch (_) {
      /* ignore */
    }
    const fromUrl = readTrackFromUrl();
    if (fromUrl) initial = fromUrl;

    trackButtons.forEach((btn) => {
      btn.addEventListener("click", () => applyTrack(btn.getAttribute("data-track")));
    });

    trackControl.addEventListener("keydown", (event) => {
      const order = ["all", "app", "research"];
      const current = document.documentElement.getAttribute("data-focus") || "all";
      const idx = order.indexOf(current);
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        applyTrack(order[(idx + 1) % order.length]);
        trackButtons.find((b) => b.classList.contains("is-active"))?.focus();
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        applyTrack(order[(idx - 1 + order.length) % order.length]);
        trackButtons.find((b) => b.classList.contains("is-active"))?.focus();
      } else if (event.key === "Home") {
        event.preventDefault();
        applyTrack("all");
        trackButtons[0]?.focus();
      } else if (event.key === "End") {
        event.preventDefault();
        applyTrack("research");
        trackButtons[trackButtons.length - 1]?.focus();
      }
    });

    window.addEventListener("resize", () => {
      const activeBtn = trackButtons.find((btn) => btn.classList.contains("is-active"));
      moveTrackIndicator(activeBtn);
    });

    applyTrack(initial);
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target || target.classList.contains("is-track-hidden")) return;
      event.preventDefault();
      const offset = nav ? nav.offsetHeight + 12 : 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });

      // Keep the hash in sync so deep links and the back button still work.
      try {
        const url = new URL(window.location.href);
        url.hash = id;
        window.history.pushState(null, "", url);
      } catch (_) {
        /* ignore */
      }
    });
  });

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(
    ".nav-links-desktop a[href^='#'], .nav-links-mobile a[href^='#']"
  );

  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.target.classList.contains("is-track-hidden")) return;
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            const active = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("is-active", active);
          });
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => spy.observe(section));
  }

})();

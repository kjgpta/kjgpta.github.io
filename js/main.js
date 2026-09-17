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
    localStorage.removeItem("focus-track");
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

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
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

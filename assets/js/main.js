(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {

        /* =========================================================
           MOBILE DRAWER / MENU
        ========================================================= */

        var burger = document.getElementById("burger");
        var drawer = document.getElementById("drawer");

        /*
         * Some pages may not have the menu.
         * In that case, simply stop this part without causing errors.
         */
        if (burger && drawer) {

            function setDrawer(open) {

                drawer.classList.toggle("open", open);

                document.body.classList.toggle("lock", open);

                burger.setAttribute(
                    "aria-expanded",
                    open ? "true" : "false"
                );

                burger.setAttribute(
                    "aria-label",
                    open ? "Close menu" : "Open menu"
                );
            }


            /* Burger button */
            burger.addEventListener("click", function () {

                var isOpen = drawer.classList.contains("open");

                setDrawer(!isOpen);

            });


            /* Close drawer when clicking a menu link */
            drawer.addEventListener("click", function (e) {

                var link = e.target.closest("a");

                if (link) {
                    setDrawer(false);
                }

            });


            /* Close with ESC */
            document.addEventListener("keydown", function (e) {

                if (e.key === "Escape") {

                    if (drawer.classList.contains("open")) {
                        setDrawer(false);
                    }

                }

            });


            /* Close menu when resizing to desktop */
            window.addEventListener("resize", function () {

                if (window.innerWidth > 900) {
                    setDrawer(false);
                }

            });

        }


        /* =========================================================
           HEADER SCROLL EFFECT
        ========================================================= */

        var header = document.querySelector(".egtv-header");

        if (header) {

            function headerScroll() {

                if (window.scrollY > 30) {
                    header.classList.add("scrolled");
                } else {
                    header.classList.remove("scrolled");
                }

            }

            window.addEventListener("scroll", headerScroll);

            headerScroll();

        }


        /* =========================================================
           SMOOTH SCROLL
        ========================================================= */

        var scrollLinks = document.querySelectorAll(
            'a[href^="#"]:not([href="#"])'
        );

        scrollLinks.forEach(function (link) {

            link.addEventListener("click", function (e) {

                var targetId = this.getAttribute("href");
                var target = document.querySelector(targetId);

                if (!target) return;

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });


        /* =========================================================
           REVEAL ANIMATION
        ========================================================= */

        var revealElements = document.querySelectorAll(".reveal");

        if (revealElements.length) {

            if ("IntersectionObserver" in window) {

                var observer = new IntersectionObserver(
                    function (entries) {

                        entries.forEach(function (entry) {

                            if (entry.isIntersecting) {

                                entry.target.classList.add("active");

                                observer.unobserve(entry.target);

                            }

                        });

                    },
                    {
                        threshold: 0.15
                    }
                );

                revealElements.forEach(function (element) {
                    observer.observe(element);
                });

            } else {

                revealElements.forEach(function (element) {
                    element.classList.add("active");
                });

            }

        }


        /* =========================================================
           CURRENT NAVIGATION LINK
        ========================================================= */

        var currentPage = window.location.pathname.split("/").pop();

        if (currentPage === "") {
            currentPage = "index.html";
        }

        var navLinks = document.querySelectorAll(
            ".egtv-nav a, .egtv-drawer a"
        );

        navLinks.forEach(function (link) {

            var href = link.getAttribute("href");

            if (!href) return;

            var linkPage = href.split("/").pop().split("#")[0];

            if (linkPage === "") {
                linkPage = "index.html";
            }

            if (linkPage === currentPage) {
                link.classList.add("active");
            }

        });


        /* =========================================================
           BACK TO TOP
        ========================================================= */

        var backTop = document.querySelector(".back-to-top");

        if (backTop) {

            window.addEventListener("scroll", function () {

                if (window.scrollY > 400) {
                    backTop.classList.add("show");
                } else {
                    backTop.classList.remove("show");
                }

            });

            backTop.addEventListener("click", function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            });

        }

    });

})();
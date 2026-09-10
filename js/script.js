document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("open");

            const isOpen = navLinks.classList.contains("open");
            menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
            menuBtn.innerHTML = isOpen ? "✕" : "☰";
        });

        // Close menu when a navigation link is clicked
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.innerHTML = "☰";
            });
        });
    }


    /* =====================================================
       ACTIVE NAVIGATION LINK
       ===================================================== */

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(link => {
        const linkPage = link.getAttribute("href");

        if (
            linkPage === currentPage ||
            (currentPage === "" && linkPage === "index.html")
        ) {
            link.classList.add("active");
        }
    });


    /* =====================================================
       SERVICE FILTERS
       ===================================================== */

    const filterButtons = document.querySelectorAll(".filter");
    const serviceCards = document.querySelectorAll(
        "#servicesGrid .service-card"
    );

    if (filterButtons.length && serviceCards.length) {

        filterButtons.forEach(button => {

            button.addEventListener("click", () => {

                const selectedFilter = button.dataset.filter;

                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove("active");
                });

                // Add active class to clicked button
                button.classList.add("active");

                // Show/hide service cards
                serviceCards.forEach(card => {

                    const category = card.dataset.category;

                    if (
                        selectedFilter === "all" ||
                        category === selectedFilter
                    ) {
                        card.classList.remove("is-hidden");
                    } else {
                        card.classList.add("is-hidden");
                    }

                });

            });

        });

    }


    /* =====================================================
       FAQ ACCORDION
       ===================================================== */

    const faqItems = document.querySelectorAll(".faq-item");

    if (faqItems.length) {

        faqItems.forEach(item => {

            const question = item.querySelector(".faq-q");

            if (!question) return;

            question.setAttribute("aria-expanded", "false");

            question.addEventListener("click", () => {

                const isCurrentlyOpen = item.classList.contains("open");

                // Close all FAQ items
                faqItems.forEach(otherItem => {

                    otherItem.classList.remove("open");

                    const otherQuestion =
                        otherItem.querySelector(".faq-q");

                    if (otherQuestion) {
                        otherQuestion.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }

                });

                // Open clicked item if it was previously closed
                if (!isCurrentlyOpen) {

                    item.classList.add("open");

                    question.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            });

        });

    }


    /* =====================================================
       SCROLL REVEAL ANIMATION
       ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if (revealElements.length) {

        const revealObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        revealObserver.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    }


    /* =====================================================
       BACK TO TOP BUTTON
       ===================================================== */

    const backTop = document.querySelector(".back-top");

    if (backTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {
                backTop.classList.add("show");
            } else {
                backTop.classList.remove("show");
            }

        });

        backTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       BOOKING / FORM SUCCESS MESSAGE
       ===================================================== */

    const forms = document.querySelectorAll("form");

    forms.forEach(form => {

        form.addEventListener("submit", event => {

            /*
             * If the form has an action that points somewhere,
             * allow normal form submission.
             */
            const action = form.getAttribute("action");

            if (action && action !== "#" && action.trim() !== "") {
                return;
            }

            event.preventDefault();

            const successBox = form.querySelector(".success-box");

            if (successBox) {
                successBox.classList.remove("hidden");

                successBox.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            } else {
                showToast("Your request has been submitted successfully.");
            }

        });

    });


    /* =====================================================
       TRACKING FORM
       ===================================================== */

    const trackingForm = document.querySelector(".tracking-form");

    if (trackingForm) {

        trackingForm.addEventListener("submit", event => {

            const action = trackingForm.getAttribute("action");

            if (action && action !== "#" && action.trim() !== "") {
                return;
            }

            event.preventDefault();

            const trackingInput =
                trackingForm.querySelector("input");

            const trackingResult =
                document.querySelector(".tracking-result");

            if (!trackingInput || !trackingResult) {
                return;
            }

            const trackingNumber = trackingInput.value.trim();

            if (!trackingNumber) {
                showToast("Please enter your tracking number.");
                trackingInput.focus();
                return;
            }

            trackingResult.classList.remove("hidden");

            trackingResult.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        });

    }


    /* =====================================================
       TOAST MESSAGE
       ===================================================== */

    function showToast(message) {

        let toast = document.querySelector(".toast");

        if (!toast) {

            toast = document.createElement("div");

            toast.className = "toast";

            document.body.appendChild(toast);

        }

        toast.textContent = message;
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);

    }


    /* =====================================================
       CLOSE FAQ WITH ESCAPE KEY
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") return;

        faqItems.forEach(item => {

            item.classList.remove("open");

            const question = item.querySelector(".faq-q");

            if (question) {
                question.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });

    });


});
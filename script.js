// FutureHub Main Script

document.addEventListener("DOMContentLoaded", function () {

    // Hero Slider Data
    const slides = [
        {
            title: "Earn, Learn & Grow Your Future",
            text: "Jobs, Freelance, Education, Marketplace, Matrimony & AI Assistance",
            button: "Explore Now"
        },
        {
            title: "Find Jobs & Freelance Work",
            text: "Discover thousands of opportunities and start earning today.",
            button: "Browse Jobs"
        },
        {
            title: "Learn New Skills Online",
            text: "Free and premium courses to boost your career.",
            button: "Start Learning"
        },
        {
            title: "AI Tools For Everyone",
            text: "Use powerful AI tools to improve productivity.",
            button: "Try AI Center"
        }
    ];

    let currentSlide = 0;

    const heroTitle = document.getElementById("hero-title");
    const heroText = document.getElementById("hero-text");
    const heroBtn = document.getElementById("hero-btn");

    function updateSlide() {

        if (!heroTitle || !heroText || !heroBtn) return;

        heroTitle.textContent = slides[currentSlide].title;
        heroText.textContent = slides[currentSlide].text;
        heroBtn.textContent = slides[currentSlide].button;

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
    }

    updateSlide();

    setInterval(updateSlide, 4000);

    // Search Function

    const searchInput = document.getElementById("search-box");

    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            console.log("Searching:", this.value);
        });
    }

    // Notice Marquee

    const notices = [
        "Welcome to FutureHub",
        "New Jobs Added Daily",
        "Free Learning Courses Available",
        "AI Center Now Live",
        "Marketplace Updated"
    ];

    let noticeIndex = 0;

    const noticeText = document.getElementById("notice-text");

    function changeNotice() {

        if (!noticeText) return;

        noticeText.textContent = notices[noticeIndex];

        noticeIndex++;

        if (noticeIndex >= notices.length) {
            noticeIndex = 0;
        }
    }

    changeNotice();

    setInterval(changeNotice, 3000);

});

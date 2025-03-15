document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".section");

    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            let targetId = this.getAttribute("href").substring(1);
            
            sections.forEach(section => {
                section.classList.remove("active");
            });

            document.getElementById(targetId).classList.add("active");
        });
    });
});

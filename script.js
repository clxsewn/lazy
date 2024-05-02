document.addEventListener("DOMContentLoaded", function() {
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                const downloadingImage = new Image();

                downloadingImage.onload = function() {
                    setTimeout(() => {
                        entry.target.classList.add("blur")
                    }, 400)

                    setTimeout(() => {
                        entry.target.src = this.src
                    }, 550)

                    setTimeout(() => {
                        entry.target.classList.remove("blur")
                    }, 700)
                };

                observer.unobserve(entry.target)
                downloadingImage.src = entry.target.dataset.src
            }
        })
    }, { threshold: 0.3 })

    document.querySelectorAll("img.lazy").forEach((img) => {
        observer.observe(img)
    })

    function lazyOnResize() {
        document.querySelectorAll("img.lazy").forEach((img) => {
            if (img.getAttribute("width") && img.getAttribute("height")) {
                const ratio = img.getAttribute("width") / img.getAttribute("height")
                img.style.height = (img.width / ratio) + 'px'
            }
        })
    }

    lazyOnResize()

    window.addEventListener("resize", lazyOnResize)
})
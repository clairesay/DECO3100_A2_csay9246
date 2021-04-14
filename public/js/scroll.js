// each divisible section
var sections = document.querySelectorAll('.info-plot')
// just the text area of each section
var textHalf = document.querySelectorAll('.text-half');

// the dot container and dots
var dotContainer = document.getElementsByClassName('dot-container')[0]
var dot = dotContainer.getElementsByClassName('dot');

sections.forEach(function(value, index) {
    // noting the current index
    let currentIndex = index;

    // noting the section height
    let sectionHeight = sections[index].clientHeight;

    // if a specific section is in focus
    value.addEventListener('mouseenter', function() {
        // append the dot container to this specific section so we can interact with it
        textHalf[index].appendChild(dotContainer)

        // we check how many paragraphs there are and create a new dot for each of them
        let paragraphs = textHalf[index].getElementsByClassName('paragraph')
        for (let j = 0; j < paragraphs.length; j ++) {

            let createDot = document.createElement('a')
            createDot.classList = 'dot';
            dotContainer.appendChild(createDot);
            
            // if we click on a dot, we navigate to the respective information
            createDot.addEventListener('click', function() {
                sections[currentIndex].scrollTo({top: j * sectionHeight, behavior: 'smooth'})
            })

        }

        // always update the dot to reflect the scroll position
        let scrollPosition = Math.round(this.scrollTop / sectionHeight);
        if (dot.length > scrollPosition) {
            dot[scrollPosition].classList = 'dot active'
        }
    })

    // if user leaves the section, remove all dots
    value.addEventListener('mouseleave', function() {
        while (dotContainer.firstChild) {
            dotContainer.removeChild(dotContainer.firstChild);
        }
    })

    // on scroll, test the scroll position, making the correct dot active, and other dots inactive by toggling classes
    value.addEventListener('scroll', function() {
        let scrollPosition = Math.round(this.scrollTop / sectionHeight);
        
        if (dot.length > scrollPosition) {
            dot[scrollPosition].classList = 'dot active'
            for (let k = 0; k < dot.length; k ++) {
                if (k !== scrollPosition) {
                    dot[k].classList = 'dot'
                } 
            }
        }
    })
})



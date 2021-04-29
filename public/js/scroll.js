// smooth scrolling found on stack exchange
// https://stackoverflow.com/questions/7717527/smooth-scrolling-when-clicking-an-anchor-link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// entire page
var scrollContainer = document.getElementById('scroll-container')
// each divisible section
var sections = document.querySelectorAll('.paragraph')

// the dot container and dots
var dotContainer = document.getElementsByClassName('dot-container')[0]
var dot = dotContainer.getElementsByClassName('dot');
var sectionHeight = sections[0].clientHeight;
var indice;
var dotIndices = []
var storeIndex = -1;

// for each of the indexes with an ID
sections.forEach(function(value, index) {
    indice = index;
    // check if the ID for this problem is true
    if (value.hasAttribute('id')) {
        let dotLabel = document.createElement('label');
        let dotText = document.createElement('h6');
        let createDot = document.createElement('a');
        // if so, create a dot
        createDot.setAttribute('class', 'dot')
        // mark the id next to the dot
        createDot.setAttribute('href', '#' + value.id)
        dotText.innerHTML = value.id;
        // append to the correct containers
        dotLabel.appendChild(createDot);
        dotLabel.appendChild(dotText)
        dotContainer.appendChild(dotLabel);
        
        // when the user clicks on a dot, smooth scroll to the corresponding height
        createDot.addEventListener('click', function(event) {
            event.preventDefault();
            scrollContainer.scrollTo({top: (index + 1)*sectionHeight, behavior: 'smooth'})
        })

        // we want to store the index at which each dot links to 
        storeIndex += 1
        dotIndices.push(storeIndex)
    } else {
        dotIndices.push(storeIndex)
    }

    // checking where the user has scrolled in the page
    scrollContainer.addEventListener('scroll', function() {

        let dotLabelText = document.querySelectorAll('label h6')
        let dots = document.querySelectorAll('label a.dot')

        var currentIndex = Math.round(this.scrollTop/sectionHeight) - 1

        // decide the active display of the dot containers
        // i.e. for the landing page, don't show it
        if (currentIndex == -1) {
            dotContainer.style.opacity = 0;
            dotContainer.style.display = 'none';
            dotLabelText[0].classList = ''
            dots[0].classList = 'dot'
        } else if (currentIndex == dotIndices.length) {
            dotContainer.style.opacity = 1;
            dotContainer.style.display = 'flex';
        } else {
            dotContainer.style.opacity = 1;
            dotContainer.style.display = 'flex';
            // if the user is within the range of a certain id, highlight its corresponding dot
            for (let i = 0; i < dots.length; i ++) {

                if (i == dotIndices[currentIndex]) {
                    dotLabelText[i].classList = 'active'
                    dots[i].classList = 'dot active'
                } else {
                    dotLabelText[i].classList = ''
                    dots[i].classList = 'dot'
                }
            }
            // default is that all dots are inactive
            dotLabelText[dotIndices[currentIndex]].classList = 'active'
            dots[dotIndices[currentIndex]].classList = 'dot active'
        }
    })
})

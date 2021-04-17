// entire page
var scrollContainer = document.getElementById('scroll-container')
// each divisible section
var sections = document.querySelectorAll('.paragraph')
// just the text area of each section
// var textHalf = document.querySelectorAll('.text-half');

// the dot container and dots
var dotContainer = document.getElementsByClassName('dot-container')[0]
var dot = dotContainer.getElementsByClassName('dot');
var sectionHeight = sections[0].clientHeight;
var indice;
var dotIndices = []
var storeIndex = -1;
sections.forEach(function(value, index) {
    indice = index;
    // check if the ID for this problem is true
    if (value.hasAttribute('id')) {
        // if so,  create a dot
        // mark the id next to the dot
        // console.log(value.id)

        let dotLabel = document.createElement('label');
        let dotText = document.createElement('h6');
        let createDot = document.createElement('a');
        createDot.setAttribute('class', 'dot')
        createDot.setAttribute('href', '#' + value.id)

        dotText.innerHTML = value.id;

        dotLabel.appendChild(createDot);
        dotLabel.appendChild(dotText)
        dotContainer.appendChild(dotLabel);
        
        createDot.addEventListener('click', function(event) {
            event.preventDefault();
            scrollContainer.scrollTo({top: (index + 1)*sectionHeight, behavior: 'smooth'})
        })
        storeIndex += 1
        dotIndices.push(storeIndex)
    } else {
        dotIndices.push(storeIndex)
    }

    scrollContainer.addEventListener('scroll', function() {

        let dotLabelText = document.querySelectorAll('label h6')
        let dots = document.querySelectorAll('label a.dot')

        var currentIndex = Math.round(this.scrollTop/sectionHeight) - 1

        if (currentIndex == -1) {
            dotContainer.style.opacity = 0;
            dotLabelText[0].classList = ''
            dots[0].classList = 'dot'
        } else if (currentIndex == dotIndices.length) {
            dotContainer.style.opacity = 1;
        } else {
            dotContainer.style.opacity = 1;
            for (let i = 0; i < dots.length; i ++) {

                if (i == dotIndices[currentIndex]) {
                    dotLabelText[i].classList = 'active'
                    dots[i].classList = 'dot active'
                } else {
                    dotLabelText[i].classList = ''
                    dots[i].classList = 'dot'
                }
            }
            dotLabelText[dotIndices[currentIndex]].classList = 'active'
            dots[dotIndices[currentIndex]].classList = 'dot active'
        }
    })
})

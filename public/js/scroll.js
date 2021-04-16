// entire page
const scrollContainer = document.getElementById('scroll-container')
// each divisible section
var sections = document.querySelectorAll('.info-plot')
// just the text area of each section
// var textHalf = document.querySelectorAll('.text-half');

// the dot container and dots
var dotContainer = document.getElementsByClassName('dot-container')[0]
var dot = dotContainer.getElementsByClassName('dot');
var sectionHeight = sections[0].clientHeight;

var dotIndices = []

sections.forEach(function(value, index) {
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
        // dotLabel.classList = 'dot';
        dotText.innerHTML = value.id;

        // createDot.textContent = value.id;
        // let dotDescriptor = document.createElement('label')

        dotLabel.appendChild(createDot);
        dotLabel.appendChild(dotText)
        dotContainer.appendChild(dotLabel);
        dotIndices.push(index + 1)

        // [1, 4]
        createDot.addEventListener('click', function(event) {
            event.preventDefault();
            scrollContainer.scrollTo({top: (index + 1)*sectionHeight, behavior: 'smooth'})
        })
    }
})

// console.log(dotIndices)

scrollContainer.addEventListener('scroll', function() {
    let dotLabelText = document.querySelectorAll('label h6')
    let dots = document.querySelectorAll('label a.dot')





    // this is the section index
    var currentIndex = Math.round(this.scrollTop/sectionHeight)

    // This is the dot being coloured
    if (dotIndices.includes(currentIndex)) {
        let activeDot = dotIndices.indexOf(currentIndex);
        dotLabelText[activeDot].classList = 'active'
        dots[activeDot].classList = 'dot active'

        for (let i = 0; i < dots.length; i ++) {
            if (i == activeDot) {
                dotLabelText[i].classList = 'active'
                dots[i].classList = 'dot active'
            } else {
                dotLabelText[i].classList = ''
                dots[i].classList = 'dot'
            }
        }
    } 
    

    // console.log('thisiscurrentindex: ' + currentIndex)
    // console.log('thisisactive: ' + activeDot)
    // console.log('thisisuntil: ' + untilIndex)

    // for (let i = 0; i < dots.length; i ++) {
    //     if (i == activeDot) {
    //         dotLabelText[i].classList = 'active'
    //         dots[i].classList = 'dot active'
    //     } else {
    //         dotLabelText[i].classList = ''
    //         dots[i].classList = 'dot'
    //     }
    // }
    
})

// var dots = document.querySelectorAll('label .dot')
// dots[1].style.backgroundColor = 'yellow';

// sections.forEach(function(value, index) {
//     // noting the current index
//     let currentIndex = index;

//     // noting the section height
//     let sectionHeight = sections[index].clientHeight;

//     // if a specific section is in focus
//     value.addEventListener('mouseenter', function() {
//         // append the dot container to this specific section so we can interact with it
//         textHalf[index].appendChild(dotContainer)

//         // we check how many paragraphs there are and create a new dot for each of them
//         let paragraphs = textHalf[index].getElementsByClassName('paragraph')
//         for (let j = 0; j < paragraphs.length; j ++) {

//             let createDot = document.createElement('a')
//             createDot.classList = 'dot';
//             dotContainer.appendChild(createDot);
            
//             // if we click on a dot, we navigate to the respective information
//             createDot.addEventListener('click', function() {
//                 sections[currentIndex].scrollTo({top: j * sectionHeight, behavior: 'smooth'})
//             })

//         }

//         // always update the dot to reflect the scroll position
//         let scrollPosition = Math.round(this.scrollTop / sectionHeight);
//         if (dot.length > scrollPosition) {
//             dot[scrollPosition].classList = 'dot active'
//         }
//     })

//     // if user leaves the section, remove all dots
//     value.addEventListener('mouseleave', function() {
//         while (dotContainer.firstChild) {
//             dotContainer.removeChild(dotContainer.firstChild);
//         }
//     })

//     // on scroll, test the scroll position, making the correct dot active, and other dots inactive by toggling classes
//     value.addEventListener('scroll', function() {
//         let scrollPosition = Math.round(this.scrollTop / sectionHeight);
        
//         if (dot.length > scrollPosition) {
//             dot[scrollPosition].classList = 'dot active'
//             for (let k = 0; k < dot.length; k ++) {
//                 if (k !== scrollPosition) {
//                     dot[k].classList = 'dot'
//                 } 
//             }
//         }
//     })
// })



var sections = document.querySelectorAll('.info-plot')
var textHalf = document.querySelectorAll('.text-half');
var dotContainers = document.getElementsByClassName('dot-container')

for (let i = 0; i < textHalf.length; i ++) {
    console.log('The text half length is' + textHalf.length)
    let paragraphs = textHalf[i].getElementsByClassName('paragraph')
    let dotContainer = dotContainers[0];
    
    // for (let j = 0; j < paragraphs.length; j ++) {

    //     let createDot = document.createElement('a')
    //     createDot.innerHTML = '0';
    //     createDot.classList = 'dot';
        
    //     dotContainer.appendChild(createDot);
    // }


    // dot[0].classList = 'dot active'
    
    // sections[i].addEventListener('scroll', function() {
    //     console.log(i)
        // let scrollPosition = Math.round(this.scrollTop / sectionHeight);
        // // console.log(scrollPosition)
        // dot[scrollPosition].classList = 'dot active';
        // for (let k = 0; k < dot.length; k ++) {
        //     if (k !== scrollPosition) {
        //         dot[k].classList = 'dot'
        //     }
        // }
    // })


    // const breakdownButton = document.querySelectorAll('.breakdown');
    // breakdownButton.forEach(function(btn) {
    //     btn.addEventListener('click', function() {
    //         console.log();
    //     });
    // });

}

sections.forEach(function(value, index) {
    let sectionHeight = sections[index].clientHeight;
    // let dot = document.querySelectorAll()
    // console.log(dotContainers[0])
    let dot = dotContainers[0].getElementsByClassName('dot');
    
    value.addEventListener('mouseenter', function() {
        console.log(index)

        let paragraphs = textHalf[index].getElementsByClassName('paragraph')
        let dotContainer = dotContainers[0];
        for (let j = 0; j < paragraphs.length; j ++) {

            let createDot = document.createElement('a')
            createDot.innerHTML = '0';
            createDot.classList = 'dot';
            
            dotContainer.appendChild(createDot);
        }
        // console.log(dotContainer.length)
    })

    value.addEventListener('mouseleave', function() {
        let paragraphs = textHalf[index].getElementsByClassName('paragraph')
        let dotContainer = dotContainers[0];
        while (dotContainer.firstChild) {
            dotContainer.removeChild(dotContainer.firstChild);
        }
        // for (let j = 0; j < paragraphs.length; j ++) {
        //     dotContainer.removeChild(dotContainer.childNodes[j])
        // }
        // for (let i = 0; i < dotContainer.length; i ++) {
        //     console.log('dawg')
        //     dotContainer.removeChild(dotContainer.childNodes[i])
        // }
    })

    value.addEventListener('scroll', function() {
        // console.log(index)
        // let scrollPosition = Math.round(this.scrollTop / sectionHeight);

        // dot[scrollPosition].classList = 'dot active';
        // for (let k = 0; k < dot.length; k ++) {
        //     if (k !== scrollPosition) {
        //         dot[k].classList = 'dot'
        //     }
        // }
    })
})

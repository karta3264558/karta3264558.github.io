(function() {
    let nav = document.querySelector('nav')

    function scrollHandler() {
        let st = window.scrollY
            // console.log(st)
        if (st > 50) {
            nav.classList.add('shrink')
        }
        if (st <= 50) {
            nav.classList.remove('shrink')
        }
    }
    document.addEventListener('scroll', scrollHandler)
    let overlay =  document.querySelector('.overlay')
    let sideNav = document.querySelector('#side-nav')
        // console.log(pushed)
    function openHandler(e) {
        console.log(e.target.className)
        if(e.target.className == 'nav-collapse font-color'){
            sideNav.classList.toggle('side-menu');
            overlay.classList.toggle('overlay-block');
        }
        
        
        if(e.target.className == 'overlay overlay-block'){
            sideNav.classList.remove('side-menu');
            overlay.classList.remove('overlay-block');
        }
    }


    document.addEventListener('click', openHandler);

})();
;(function(){
    const slides = document.querySelectorAll('.carousel-img')
    const indicators = document.querySelectorAll('.carousel-select')
    const carousel = document.querySelector('.carousel-container')
    const speed = 6000

    function carouselHide(num){
        indicators[num].setAttribute('data-state','')
        slides[num].setAttribute('data-state','')
        slides[num].style.opacity = '0'
    }

    function carouselShow(num){
        indicators[num].checked = true
        indicators[num].setAttribute('data-state','active')
        slides[num].setAttribute('data-state','active')
        slides[num].style.opacity = '1'

     }

    function switchSlide(){
        let nextSlide = 0

        for(let i = 0 ; i < indicators.length ; i++){
            if((indicators[i].getAttribute('data-state') === 'active')&&(i !== (indicators.length - 1))){
                nextSlide = i+1
            }
            carouselHide(i)
        }
        carouselShow(nextSlide)
    }

    function setSlide(slide){
        // return function(){

        // }
        //Reset All slides
        for(let i = 0;i<indicators.length;i++){
            indicators[i].setAttribute('data-state','')
            slides[i].setAttribute('data-state','')
            carouselHide(i)
        }
        // Set slides active
        indicators[slide].setAttribute('data-state','active')
        slides[slide].setAttribute('data-state','active')
        carouselShow(slide)
        // Stop auto play
        
        // clearInterval(switcher)
    }

    if(carousel){
        const switcher = setInterval(switchSlide,speed)


        for(let i = 0 ; i < indicators.length ; i++){
            indicators[i].addEventListener('click',setSlide(i))
        }
    }
})()
;(function(){
    const bg = document.querySelector('.background')
    const md = document.querySelector('.middleground')
    const lg = document.querySelector('.lastground')
    const title = document.querySelector('.firstPage h2')
    const firstPage = document.querySelector('.firstPage')
    const span = document.querySelectorAll('.secondPage h2 span')
    const parallaxPhone = document.querySelector('.parallax-img')
    const app = document.querySelector('.app')
    const imgs = document.querySelectorAll('.parallax-third-imgs img')
    const progressBar = document.querySelector('.progress')
    const parallaxPage = document.querySelector('.parallax')

    function parallaxHandler(){
        const yOff = window.pageYOffset
        const Mount_scroll = 500
        const transformEnd = 800
        const word_splite = 2300
        const end_parallax = 3450
        const start_static = 3335

        if(yOff < Mount_scroll){
            const perc = yOff / Mount_scroll
            title.style.transform = `scale(${1 + 0.35 * perc})`
            bg.style.transform = `scale(${1 + 0.04 * perc})`
            md.style.transform = `scale(${1 + 0.1 * perc})`
            lg.style.transform = `scale(${1 + 0.4 * perc})`
            firstPage.style.opacity = '1'

        }else if(yOff < transformEnd){
            parallaxPhone.style.transform = `scale(0)`
            const perc = (yOff - Mount_scroll) / (transformEnd - Mount_scroll)
            firstPage.style.opacity = `${1 - perc}`
            span.forEach(item =>{
                item.style.transform=`translate3d(0,0,0)`
            })
        }else if(yOff < word_splite){
            const offset = yOff - transformEnd 
            title.style.transform = `scale(1.35)`
            bg.style.transform = `scale(1.04)`
            md.style.transform = `scale(1.1)`
            lg.style.transform = `scale(1.4)`
            firstPage.style.opacity = '0'
            app.style.transform = `translate3d(0,0,0)`

            span[0].style.transform=`translate3d(0,-${offset}px,0)`
            span[1].style.transform=`translate3d(0,0,0)`
            span[2].style.transform=`translate3d(0,${offset}px,0)`
            if(offset > 300){
                span[1].style.transform=`translate3d(-${offset - 300}px,0,0)`
            }
            if(offset > 500){
                const perc = (offset - 500) / (word_splite - transformEnd - 500)
                parallaxPhone.style.transform=`scale(${1.2 * perc})`
            }
        }else if(yOff < end_parallax){
            const offset = yOff - word_splite
            const duration = end_parallax - word_splite
            app.style.transform = `translate3d(0,-${offset}px,0)`
            imgs[0].style.transform = `translate3d(0,-${offset * 0.1}px,0)`
            imgs[1].style.transform = `translate3d(0,-${offset * 0.25}px,0)`
        }else if(yOff > start_static){
            parallaxPage.classList.add('dp-none')
        }
        
        
        
    }

    window.addEventListener('scroll',parallaxHandler)
})()
;(function() {

    let weather = document.querySelector('.weathercontainer');
    let apiKey = 'b1ecbccd638b763d489602917ba47cc3';
    let arr = [];
    let change = false;
    function apiControl() {
        let cities = JSON.parse(this.response);
        let data = cities.list;
        if (cities.city.name === 'Select') return
            console.log(cities.city)
        let sliceData = data.slice(0, 15)
        const html = sliceData.map(e => {
            return `
                <tbody >
                    <tr>
                        <td>${e.dt_txt}</td>
                        <td>${e.weather[0].description}</td>
                        <td>${e.main.temp_max}</td>
                        <td>${e.main.temp_min}</td>
                    </tr>
                </tbody>
           `;
        })
        const thead = `
        <thead>
            <tr>
                <td>時間</td>
                <td>天氣</td>
                <td>最高溫</td>
                <td>最低溫</td>
            </tr>
        </thead>`
        weather.innerHTML = thead+html.join('');
    }

   
 
    function changeHndler() {
        weather.innerHTML = '';
        // console.log(this.value)
        let city = this.value;
        const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=zh_tw&units=metric`;
        let req = new XMLHttpRequest();
        req.addEventListener('load', apiControl);
        req.open('get', endpoint, true);
        req.send();
        if (city === 'select') return;
    }



    document.querySelector('#city').addEventListener('change', changeHndler);
})();


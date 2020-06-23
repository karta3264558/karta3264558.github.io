(function() {
    let nav = document.querySelector('nav')
    let overlay =  document.querySelector('.overlay')
    let sideNav = document.querySelector('#side-nav')
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
  
        // console.log(pushed)
    function openHandler(e) {
        if(e.target.className == 'nav-collapse font-color'){
            sideNav.classList.toggle('side-menu');
            overlay.classList.toggle('overlay-block');
            // console.log(11)
        }
        
        
        if(e.target.className == 'overlay overlay-block'){
            sideNav.classList.remove('side-menu');
            overlay.classList.remove('overlay-block');
        }
    }

    function checkWidth(){
        const wWidth = window.innerWidth
        console.log(111,wWidth)
        if(wWidth>767){
            overlay.classList.remove('overlay-block');
            sideNav.classList.remove('side-menu');

        }
    }
    document.addEventListener('click', openHandler);
    window.addEventListener('resize',checkWidth)
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
        console.log(this)
        return function (){
            for(let e = 0;e<indicators.length;e++){
                indicators[e].setAttribute('data-state','')
                slides[e].setAttribute('data-state','')
                carouselHide(e)
            }
            console.log(slide)
            // Set slides active
            indicators[slide].setAttribute('data-state','active')
            slides[slide].setAttribute('data-state','active')
            carouselShow(slide)
            
        }
        
    }
    

    if(carousel){
        const switcher = setInterval(switchSlide,speed)


        for(let i = 0 ; i < indicators.length ; i++){
            indicators[i].addEventListener('click',setSlide(i))
                
        }
    
    }
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

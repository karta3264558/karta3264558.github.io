(function() {
    let nav = document.querySelector('nav')

    function scrollHandler() {
        let st = window.scrollY
            // console.log(st)
        if (st > 150) {
            nav.classList.add('shrink')
        }
        if (st <= 150) {
            nav.classList.remove('shrink')
        }
    }
    document.addEventListener('scroll', scrollHandler)
    let overlay =  document.querySelector('.overlay')
    let sideNav = document.querySelector('#side-nav')
    let pushed = document.querySelectorAll('.pushed')
        // console.log(pushed)
    function openHandler(e) {
        sideNav.classList.toggle('side-menu');
        overlay.classList.toggle('overlay-block');
        
    }


    document.querySelector('.navbar-toggler').addEventListener('click', openHandler);

})();
(function() {

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


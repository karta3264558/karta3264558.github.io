;(function(){
  const burger = document.querySelector('.hamburger-menu')
  const sideNav = document.querySelector('.nav-menu')
  const overlay = document.querySelector('.overlay')
  const now_year = document.querySelector('#now_year')
  const nav = document.querySelector('nav')
  function getYear(){
    let now = new Date()
    let year = now.getFullYear()
    now_year.innerHTML=year
  }
  function openHandler(e){
    const target = e.target.className
    if( target=== 'hamburger-menu' || target=== 'hamburger-menu open'|| target === 'burger'){
      sideNav.classList.toggle('side-menu')
      burger.classList.toggle('open')
      overlay.classList.toggle('dp-block')
    }else if(target === 'overlay dp-block'){
      overlay.classList.remove('dp-block')
      sideNav.classList.remove('side-menu')
      burger.classList.remove('open')
    }
    
  }
  function navHandler(){
    const yOff = window.pageYOffset
    if(yOff > 10){
      nav.classList.add('nav-Shadow')
    }else{
      nav.classList.remove('nav-Shadow')
    }
  }
  getYear()
  document.addEventListener('click',openHandler)
  document.addEventListener('scroll',navHandler)

})()
;(function(){
  const slides = document.querySelectorAll('.img-slide')
  const indicators = document.querySelectorAll('.carousel-select')
  const carousel = document.querySelectorAll('.carousel')
  const speed = 5000
  let currentItem = 0

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
    for(let i = 0;i<indicators.length;i++){
      if((indicators[i].getAttribute('data-state') ==='active')&&(i !== (indicators.length - 1))){
        nextSlide = i+1
      }
      carouselHide(i)
    }
    carouselShow(nextSlide)
  }

  function setSlide(slide){
    return function(){
      // reset All slide
      for(let i = 0;i<indicators.length;i++){
        carouselHide(i)
      }
      carouselShow(slide)
    }


  }

  
  setInterval(switchSlide,speed)

    
  
  for(let i = 0;i<indicators.length;i++){
    indicators[i].addEventListener('click',setSlide(i))
  }
})()
;(function(){
  const message = document.querySelector('.message')
  const apiKey = 'AIzaSyBlXtGOVnJoq2dwzXgpcXgqX8ZFrf3l154'
  fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=UvO9yqRaf9Y&maxResults=6&key=${apiKey}`,{
    method:'GET'
  })
  .then(res=>{
    return res.json()
  }).then(data=>{
    const list = data.items
    const comments = list.map((e)=>{
      const comment = e.snippet.topLevelComment.snippet
      const time = new Date(comment.updatedAt).toLocaleString()
      
      return `
      <div class='col-md-12 comment d-flex justify-content-start align-items-center'>
          <img src='${comment.authorProfileImageUrl}' class='comment-img'>
          <div class='comment-user'>
            <div>
              <h4>${comment.authorDisplayName}</h4>
              <p>${time}</p>
              <p>${comment.textDisplay}</p>
            </div>
          </div>
        
      </div>     
      `
    }).join('')
    message.innerHTML = comments
  }).catch(err=>{
    console.log(err)
  })


})()

;(function(){
  const bg = document.querySelector('.background'), md = document.querySelector('.middleground'),
  lg = document.querySelector('.lastground')
  const firstPage = document.querySelector('.firstPage'),secondPage = document.querySelector('.secondPage'),
  thirdPage = document.querySelector('.thirdPage')
  const character = document.querySelector('#character')
  const app = document.querySelector('.app')
  const title = document.querySelector('.firstPage h2')
  const parallaxPhone = document.querySelector('.parallax-img')
  const span = document.querySelectorAll('.secondPage h2 span')
  const imgs = document.querySelectorAll('.parallax-third-imgs img')
  let setTime ;
  let lastScroll = 0
 
  
  
  function parallaxHandler(){
      const yOff = window.pageYOffset
      const Mount_scroll = 500
      const transformEnd = 800
      const word_splite = 2300
      const end_horiz = 15000
      const end_parallax = 2800
      
      const text = document.querySelector('.scroll-text')
       const body = document.querySelector('body')
      const first_width = firstPage.offsetWidth
      const second_width = secondPage.offsetWidth
      const third_width = thirdPage.offsetWidth
      body.style.height = `${first_width+second_width+third_width}px`


      console.log(`first:${first_width}`,`second:${second_width}`,`third:${third_width}`,`total:${first_width + second_width + third_width}px`
      ,`now_PageY:${yOff}`)
      text.innerHTML = Math.floor(yOff)
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
          secondPage.style.transform=`translate3d(0,0,0)`
          secondPage.style.opacity = 1

          span[0].style.transform=`translate3d(0,-${offset}px,0)`
          span[1].style.transform=`translate3d(0,0,0)`
          span[2].style.transform=`translate3d(0,${offset}px,0)`
          if(offset > 300){
              span[1].style.transform=`translate3d(-${offset - 300}px,0,0)`
          }
          if(offset > 500){
              const perc = (offset - 500) / (word_splite - transformEnd - 500)
              parallaxPhone.style.transform=`scale(${1.5 * perc})`
          }
      }else if(yOff < end_parallax){
          const offset = yOff - word_splite
          const perc = (yOff - word_splite) / (end_parallax - word_splite)
          secondPage.style.transform=`translate3d(-${offset}px,0,0)`
          secondPage.style.opacity = `${1-perc}`
          firstPage.classList.remove('dp-none')
          secondPage.classList.remove('dp-none')
          
          character.classList.add('invisible')
          thirdPage.style.transform=`translate3d(0,0,0)`
          // const duration = end_parallax - word_splite
          // app.style.transform = `translate3d(0,-${offset}px,0)`
          // imgs[0].style.transform = `translate3d(0,-${offset * 0.1}px,0)`
          // imgs[1].style.transform = `translate3d(0,-${offset * 0.25}px,0)`
          
        }else if(yOff < end_horiz){
          const wWidth = window.innerWidth 
          if(wWidth <= 512){
            let  perc = (yOff - end_parallax)*1.4
            displayPage(perc)
          }else if(wWidth <= 1024){
            let  perc = (yOff - end_parallax)*1.56
            displayPage(perc)
            console.log(13213)
          }else if(wWidth <= 1500){
            let  perc = (yOff - end_parallax)*1.44
            displayPage(perc)
          }else if(wWidth <= 2560){
            let  perc = (yOff - end_parallax)*1.5
            displayPage(perc)
          }
          
          firstPage.classList.add('dp-none')
          secondPage.classList.add('dp-none')
          character.classList.remove('invisible')
          clearTimeout(setTime)
          setTime = setTimeout(function(){
            character.classList.remove('walking')
          },100)
          if(yOff>lastScroll){
            character.classList.remove('left')
            character.classList.add('walking')
          }else{
            console.log('left')
            character.classList.add('left')
            character.classList.add('walking')
          }
        }
      
        lastScroll = yOff 

      
      
  }
  function displayPage(paramenters){
    thirdPage.style.transform=`translate3d(-${paramenters}px,0,0)`

  }
  window.addEventListener('scroll',parallaxHandler)
})()

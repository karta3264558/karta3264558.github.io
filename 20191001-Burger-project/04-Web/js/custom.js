$(function () {
    $('.owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplaySpeed: 1200,
        autoplayHoverPause: true,
        margin: 30,
        navSpeed: 1200,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        //animate.css feature:
        // animateOut: 'lightSpeedOut',
        // animateIn: 'lightSpeedIn'
    });
});
// GOTOP
$(function () {
    $('#gotop').click(function () {
        $('html,body').animate({
            scrollTop: 0
        }, 'slow');
        return;
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 400) {
            $('#gotop').fadeIn();
        } else {
            $('#gotop').fadeOut();
        }
    });
});
// ScrollNAV
$(function () {
    $(window).scroll(function () {
        let st = $(window).scrollTop();
        let dropitem = $('.bg-down');
        let dropdown = $('.dropdown');
        if (st > 150) {
            $('nav').addClass('shrink');
            dropdown.hover(function () {
                dropitem.addClass('shrink-dropdown-awake')
            });
        }
        if (st <= 150) {
            $('nav').removeClass('shrink');
            dropdown.hover(function () {
                dropitem.removeClass('shrink-dropdown-awake');
            });
        }
    })
});
// Youtube XMLHttpRequest
// (function(){
//     let apiKey = 'AIzaSyBlXtGOVnJoq2dwzXgpcXgqX8ZFrf3l154'
//     let q = document.querySelector('#search')
//     function htpRE(){
//         function apiHandler(){
//             console.log(JSON.parse(this.response))
//         }
//         let xml = new XMLHttpRequest();
//         xml.addEventListener('load',apiHandler);
//         xml.open('get',`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${apiKey}&type=video&q=${q.value}&maxResults=6&order=viewCount`,true);
//         xml.send();

//     }
//     document.querySelector('#submit').addEventListener('click',htpRE)
// })()
// Youtube Ajax
$(function () {
    let apiKey = 'AIzaSyBlXtGOVnJoq2dwzXgpcXgqX8ZFrf3l154'
    let q = $('#search')
    $('#submit').on('click', function (e) {
        e.preventDefault();
        youtubeSearchApi();

    });

    function youtubeSearchApi() {
        $.ajax({
            url: `https://www.googleapis.com/youtube/v3/search`,
            type: 'get',
            data: {
                key: apiKey,
                part: 'snippet',
                type: 'video',
                q: $('#search').val(),
                maxResults: 5,
                order: 'viewCount',
                publishedAfter: '2018-01-01T00:00:00Z'
            },
            dataType: 'json',
            success: function (data) {
                let items = data.items
                let videoList,videoplayer
                // console.log(items, data)
                $.each(items, (key,e) => {
                    // console.log(e.id.videoId)
                    console.log(e)
                    console.log( videoList)
                    videoList += `
                        <li class='video-li page-link' data-id=${e.id.videoId}>
                        <div><img alt='${e.snippet.tittle}' src='${e.snippet.thumbnails.default.url}' class='video-img'></div>
                        <div>
                            <div>${e.snippet.title}</div>
                            <div>${e.snippet.channelTitle}</div>
                        </div>
                        </li>
                    `
                });
                videoplayer = `
                        <div id='video'></div>
                    `
                $('#result-list').html(videoplayer + videoList)                
                let player;
                function onYtPlayer(){
                    player = new YT.Player('video', {
                        videoId:'07MdzMu2nS8',
                        height: '300',
                        width: '100%',
                        events: {
                            // API event handlers
                            'onReady': onPlayerReady,
                            'onStateChange': onPlayerStateChange
                        }
                    })
                }
                onYtPlayer();
                $('.video-li').on('click', function (e) {
                    let dataId = e.currentTarget.dataset.id
                    let url = $(this).attr('data-id')
                    player.loadVideoById(dataId)
                    console.log(player) 
                })
                function onPlayerReady(event) {
                    event.target.playVideo();
                }

                function onPlayerStateChange(event) {
                    console.log(event.data)
                }
                q.val('')
            },
            error() {
                console.log('ERROR!!!ERROR')
            }
        })
    }

})

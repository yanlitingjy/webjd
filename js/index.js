window.onload = function(){
    // 头部搜索js效果
    searchEffect();
    // 轮播图
    bannerEffech();
    //秒杀
    countTime();
}

function searchEffect(){
    var banner = document.querySelector('.jd_banner');
    var bannerH = banner.offsetHeight;
    var search = document.querySelector('.jd_search');
    window.onscroll = function(){
        var opacity = 0;
        var offsetTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(offsetTop<bannerH){
            opacity = offsetTop/bannerH;
            search.style.backgroundColor="rgba(233,35,34,"+opacity+")";
        }
    }
}

function bannerEffech(){
    var banner = document.querySelector('.jd_banner');
    var banner_ul = banner.querySelector('ul:nth-child(1)');
    //获取第一张图片
    var first = banner.querySelector('li:first-of-type');
    //获取最后一张图片
    var last = banner.querySelector('li:last-of-type');
    //在首尾插入两张图片
    banner_ul.insertBefore(last.cloneNode(true),first);
    banner_ul.appendChild(first.cloneNode(true));

    //设置样式
    var lis = banner_ul.querySelectorAll('li');
    var count = lis.length;
    var bannerW = banner.offsetWidth;
    banner_ul.style.width = count*bannerW+"px";
    //设置每个li的宽度
    for(var i=0;i<lis.length;i++){
        lis[i].style.width = bannerW+'px';
    }

    var index = 1;
    //默认偏移
    banner_ul.style.left = -bannerW +'px';

    window.onresize = function(){
        bannerW = banner.offsetWidth;
        banner_ul.style.width = count*bannerW+"px";
        for(var i=0;i<lis.length;i++){
            lis[i].style.width = bannerW+'px';
        }
        banner_ul.style.left = -bannerW +'px';
    }

    var timed;
    var startTime = function(){
        timed=setInterval(function(){
            index++;
            //增加过度
            banner_ul.style.transition = "left 0.5s ease-in-out";
            //设置偏移
            banner_ul.style.left = (-index*bannerW) +'px';
            setTimeout(function(){
                if(index==count-1){
                    index=1;
                    banner_ul.style.transition = 'none';
                    banner_ul.style.left = (-index*bannerW) +'px';
                }
            },500);
            
        },1000);
    }
    startTime();

    var startControls = function(index){
        var jd_bannerControls = document.querySelector('.jd_bannerControls');
        var jd_bannerControlsLis = jd_bannerControls.querySelectorAll('li');
        for(var i=0;i<jd_bannerControlsLis.length;i++){
            jd_bannerControlsLis[i].classList.remove('current');
        }
        jd_bannerControlsLis[index-1].classList.add('current');
    }

    banner_ul.addEventListener("webkitTransitionEnd",function(){
        startControls(index);
        clearInterval(timed);
        startTime();
    },false);


    //滑动轮播
    var startX,moveX,distanceX;
    banner_ul.addEventListener('touchstart',function(event){
        clearInterval(timed);
        startX = event.touches[0].clientX;
    },false);

    banner_ul.addEventListener('touchmove',function(event){
        moveX = event.touches[0].clientX;
        distanceX = moveX - startX;
        banner_ul.style.transition = 'none';
        banner_ul.style.left = (-index*bannerW+distanceX)+'px';
    },false);

    banner_ul.addEventListener('touchend',function(){
        //向右
        if(distanceX>100){
            index--;
        }else if(distanceX<-100){
            index++;
        }

        banner_ul.style.transition = "left 0.5s ease-in-out";
        banner_ul.style.left = -index*bannerW+'px';
    },false);

}

 //搜索按钮
 var keyword = document.getElementById('keyword');
 keyword.onkeypress = function(e){
     var keycode = e.keyCode;
     var searchName = keyword.value;
    if(keycode=="13"){
     document.activeElement.blur();//软键盘收起
      e.preventDefault();
    }
 };


//秒杀
function countTime(){
    //获取当前时间
    var date = new Date();
    var now  = date.getTime();

    //截止时间
    var str = "2018/8/8 00:00:00";
    var endDate = new Date(str);
    var end  = endDate.getTime();

    //时间差
    var leftTime = end - now;
    
    var d,h,m,s;

    if(leftTime>=0){
        d = Math.floor(leftTime/1000/24/60/60);
        h = Math.floor(leftTime/1000/60/60%24);
        m = Math.floor(leftTime/1000/60%60);
        s = Math.floor(leftTime/1000%60);
    }
    if(h.toString().length<2){
        h = '0'+h;
    }
    if(m.toString().length<2){
        m = '0'+m;
    }
    if(s.toString().length<2){
        s = '0'+s;
    }
    var sk_time=document.querySelector('.jd_sk_time');
    sk_time.querySelector('span:first-child').innerHTML = h;
    sk_time.querySelector('span:nth-child(3)').innerHTML = m;
    sk_time.querySelector('span:last-child').innerHTML = s;

    setTimeout(countTime, 1000);
}
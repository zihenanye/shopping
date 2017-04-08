/**
 * Created by Administrator on 2017/3/25.
 */
/**
 * Created by Na on 2017/3/24.
 */
var pullUp, pullUpOffset, myScroll, count, pullDownEl, pullDownOffset, count;
count = 0;
pullUp = document.getElementById('pullUp');
pullUpOffset = pullUp.offsetHeight;
pullDownEl = document.getElementById("pullDown");
pullDownOffset = 20;
function loaded() {
    myScroll = new iScroll('wrapper', {
        topOffset: pullDownOffset,
        onScrollMove: function () {
           if (this.y > 15 && !(pullDownEl.className.match("flip"))) {
                pullDownEl.className = "flip";
                pullDownEl.querySelector(".pullDownLabel").innerHTML = "释放刷新";
            }else if (this.y < (this.maxScrollY - 5) && !(pullUp.className.match('filp'))) {
                pullUp.className = 'filp';
                pullUp.querySelector('.pullUpLabel').innerHTML = '释放刷新';
            }
        },
        onScrollEnd: function () {
           if (pullDownEl.className.match("flip")) {
                pullDownEl.className = "loading";
                pullDownEl.querySelector(".pullDownLabel").innerHTML = "正在加载";
            }else if (pullUp.className.match('filp')) {
                pullUp.className = 'loading';
                pullUp.querySelector('.pullUpLabel').innerHTML = '正在加载';
            };
            request();
        },
        onRefresh: function () {
            if (pullDownEl.className.match("loading")) {
                pullDownEl.className = "";
                pullDownEl.querySelector(".pullDownLabel").innerHTML = "下拉刷新";
            }else if (pullUp.className.match('loading')) {
                pullUp.className = '';
                pullUp.querySelector('.pullUpLabel').innerHTML = '加载更多';
            }
        }
    })
}
loaded();
function request() {
    $.ajax({
        url: "js/data/data.json",
        success: function (data) {
            //console.log(data)
            var str = "";
            $.each(data, function (key, v) {
                str += '<dl>' +
                    '<dt><img src="' + v.img + '" alt=""></dt>' +
                    '<dd>' +
                    '<b>' + v.title + '</b><p class="hot"><span>' + v.label + '</span><span><strong>' + v.price + '</strong>起   <i class="fa fa-angle-right"></i></span></p>' +
                    '<p class="num">已订<i>' + v.num + '</i>  5.0分 <em>' + v.cost + '</em></p>' +
                    '</dd>' +
                    '</dl>';
            })
            $(".info").append(str);
            myScroll.refresh();
        }
    });
}
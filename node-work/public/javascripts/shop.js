var ww = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var counT = document.getElementsByClassName("count");
var reduceNum = document.getElementsByClassName("reduce");
var countNum = document.getElementsByClassName("num");
var addNum = document.getElementsByClassName("add");
var addcar = document.getElementsByClassName("addcar");
var wareinfo = document.getElementsByClassName("wareinfo");
var warepic = document.getElementsByClassName("warepic");
var ware = document.getElementsByClassName("ware");
for (var i = 0; i < reduceNum.length; i++) {

    ware[i].setAttribute("data-index", i);
    reduceNum[i].setAttribute("data-index", i);
    addNum[i].setAttribute("data-index", i);
    addcar[i].setAttribute("data-index", i);
    addcar[i].setAttribute("data-mystep", 0);
    reduceNum[i].addEventListener("click", function () {
        var nowSort = this.dataset.index;
        var thisNum = parseInt(countNum[nowSort].innerHTML);
        countNum[nowSort].innerHTML = thisNum - 1 < 1 ? 1 : thisNum - 1;
    });
    addNum[i].addEventListener("click", function () {
        var nowSort = this.dataset.index;
        var thisNum = parseInt(countNum[nowSort].innerHTML);
        countNum[nowSort].innerHTML = thisNum + 1;
    });
    addcar[i].addEventListener("click", function () {
        var nowSort = this.dataset.index;
        var thisNum = parseInt(countNum[nowSort].innerHTML);
        var thisshopname = ware[nowSort].parentNode.getElementsByTagName("h3")[0].innerText;
        var thispic = warepic[nowSort].getElementsByTagName("img")[0].getAttribute("src");
        var thisware = wareinfo[nowSort].getElementsByTagName("p")[0].innerText;
        var thisprice = wareinfo[nowSort].getElementsByTagName("p")[1].innerText;

        var thiscarinfo = {
            shopname: thisshopname,
            warename: thisware,
            gernum: thisNum,
            price: thisprice,
            picsrc: thispic,
            wareid: nowSort
        }
        var changinfo = JSON.stringify(thiscarinfo);
        var arradd = nowSort + "warenumpostcarinfo";

        if (localStorage.getItem(arradd) !== null) {
            var getlocalStorage = JSON.parse(localStorage.getItem(arradd));
            var oldgernum = parseInt(getlocalStorage.gernum);
            var newgernum = oldgernum + parseInt(thisNum);
            thiscarinfo.gernum = newgernum
            window.localStorage.removeItem(arradd);
            window.localStorage.setItem(arradd, JSON.stringify(thiscarinfo));

        } else {
            window.localStorage.setItem(arradd, changinfo);
        }
        alert("加入购物车成功");
    });

}
// window.addEventListener("storage",EventHandle,true);






































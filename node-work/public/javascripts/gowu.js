
window.onload = function () {
    var holdshop = document.getElementsByClassName("holdshop")[0];
    var countNum = document.getElementsByClassName("num");
    var getwarekeyname = new Array();
    // 生成key
    for (var i = 0; i < localStorage.length; i++) {
        var allLocalStorgekey = localStorage.key(i);
        if (/^\d{1,}warenumpostcarinfo$/.test(allLocalStorgekey)) {
            getwarekeyname.push(allLocalStorgekey);
        }
    }
    //将所有符合的key进行输出
    var allLocalStorge = new Array();
    for (var i = 0; i < getwarekeyname.length; i++) {
        var Info = localStorage.getItem(getwarekeyname[i]);
        if (Info !== null) {
            // 将本地存储反字符串化
            var stringChang = JSON.parse(Info)
            allLocalStorge.push(stringChang);
        }

    }
    // 提取所有符合的本地存储数据中的店铺名
    var allshop = new Array();
    var comallshop = new Array();
    /*这里得到一个未重新排序的全部店铺名 */
    var nosortallshop = new Array();
    for (var i = 0; i < allLocalStorge.length; i++) {
        if (allLocalStorge[i].shopname !== null) {
            var getshopname = allLocalStorge[i].shopname;
            comallshop.push(getshopname);
            nosortallshop.push(getshopname);
        }
    }




    //判断有几个店铺
    comallshop.sort();
    var allshopget = comallshop[0];
    allshop.push(allshopget);
    var reduceshopstep = 1;
    for (var i = 0; i < allLocalStorge.length; i++) {
        var thisaddindex = allshop.indexOf(allshopget);
        comallshop.splice(thisaddindex, 1);
        if (comallshop[reduceshopstep] !== allshopget) {
            allshopget = comallshop[reduceshopstep];
            reduceshopstep = reduceshopstep + 1;
            if (allshopget == undefined) {
                break;
            }
            allshop.push(allshopget);
        }
    }

    // 生成店铺
    if (getwarekeyname.length > 0) {
        var printnum = new Array();
        for (var i = 0; i < allshop.length; i++) {
            printnum[i] = document.createElement("div")
            printnum[i].innerHTML = '<div class=\"shopcheckallinput\"><input type=\"checkbox\" name=\"\" id=\"\" class=\"shopcheckall\" data-index=' + i + '><p></p></div>';
            printnum[i].setAttribute("class", "shop");

            holdshop.appendChild(printnum[i]);
            var thisoneshopname = document.getElementsByClassName("shopcheckallinput");
            var writethisoneshopname = thisoneshopname[i].getElementsByTagName("p")[0];
            writethisoneshopname.innerHTML = allshop[i];
        }
    } else {
        donowareshow();
    }
    // 当购物车为空时购物车展示此内容
    function donowareshow() {
        var noware = document.createElement("div");
        noware.innerHTML = '<div class="noware w"><div class=\"nowarepic\"><h2>您的购物车空空如也，赶紧去选购吧！</h2></div></div>';
        holdshop.appendChild(noware);
    }

    // 将得到的所有商品按店铺进行排列生成
    var getallLocalStorgelength = allLocalStorge.length;
    var getfristshop = allshop[0];
    var shop = document.getElementsByClassName("shop");
    var getanothershopname = 1;
    var thisstepshopnum = 0;
    for (var n = 0; n < getallLocalStorgelength; n++) {
        var thiswriteindex = nosortallshop.indexOf(getfristshop);
        if (thiswriteindex == -1) {

            getfristshop = allshop[getanothershopname];
            thiswriteindex = nosortallshop.indexOf(getfristshop);
            getanothershopname = getanothershopname + 1;
            thisstepshopnum = thisstepshopnum + 1;

        }
        if (allLocalStorge[thiswriteindex].shopname == allshop[thisstepshopnum]) {
            var warename = allLocalStorge[thiswriteindex].warename;
            var gernum = allLocalStorge[thiswriteindex].gernum;
            var price = allLocalStorge[thiswriteindex].price;
            var picsrc = allLocalStorge[thiswriteindex].picsrc;
            var thiswareid = allLocalStorge[thiswriteindex].wareid;
            var writeshopware = '<input type=\"checkbox\" name=\"\" id=\"\" class=\"checkone\"><div class=\"wareinfo\"><div class=\"warepic\"><img src=\"\" alt=\"\"></div><div class=\"warename\"></div><div class=\"dollor\"></div><div class=\"wareprice\"></div><div class=\"warenum\"><button class=\"reduce\" data-wareid=\"' + thiswareid + '\">-</button><div class=\"num\">1</div><button class=\"add\"data-wareid=\"' + thiswareid + '\">+</button></div><div class="dollor"><p>￥</p></div><div class=\"wareallprice\"></div><div class=\"waredel setdel\" data-wareid=\"' + thiswareid + '\">删除</div></div>';
            var setdiv = document.createElement('div');
            setdiv.setAttribute("class", "ware");
            setdiv.innerHTML = writeshopware;
            shop[thisstepshopnum].appendChild(setdiv);
            var warepic = document.getElementsByClassName("warepic");
            var wareimage = warepic[n].getElementsByTagName("img")[0];
            var writewarename = document.getElementsByClassName("warename");
            var wareprice = document.getElementsByClassName("wareprice");




            // 跟综统计单个商品数量改变后的价格（这是显示在商品里的不是页面最后的总价格）
            var wareallprice = document.getElementsByClassName("wareallprice");
            wareimage.src = picsrc;
            writewarename[n].innerHTML = warename;
            wareprice[n].innerHTML = price;
            countNum[n].innerHTML = gernum;
            var nowNum = countNum[n].innerHTML;
            wareallprice[n].innerHTML = (parseFloat(price) * parseInt(nowNum)).toFixed(2);

            nosortallshop.splice(thiswriteindex, 1, "used");
        }

    }

    // 增减商品数
    setchangindex();
    function setchangindex() {
        console.log(allshop);
        var reduceNum = document.getElementsByClassName("reduce");

        var addNum = document.getElementsByClassName("add");
        for (var i = 0; i < reduceNum.length; i++) {

            reduceNum[i].setAttribute("data-index", i);
            addNum[i].setAttribute("data-index", i);

            // 减少商品数量
            reduceNum[i].addEventListener("click", function () {
                var nowSort = this.dataset.index;
                var thisNum = parseInt(countNum[nowSort].innerHTML);
                countNum[nowSort].innerHTML = thisNum - 1 < 1 ? 1 : thisNum - 1;
                var thisWare = document.getElementsByClassName("ware");
                var thisoneprice = thisWare[nowSort].getElementsByTagName("div")[0].getElementsByTagName("div")[3];

                var changcenowprice = (parseFloat(thisoneprice.innerHTML) * parseInt(countNum[nowSort].innerHTML)).toFixed(2);
                wareallprice[nowSort].innerHTML = changcenowprice;
                doaccount();
                // 商品数量改变的同时改变本地储存的数据
                var getthiswareid = this.dataset.wareid;
                var delkey = getthiswareid + "warenumpostcarinfo";
                var getlocalStorage = JSON.parse(localStorage.getItem(delkey));
                var oldgernum = parseInt(getlocalStorage.gernum);
                var newgernum = oldgernum - 1 < 1 ? 1 : oldgernum - 1;
                getlocalStorage.gernum = newgernum
                window.localStorage.removeItem(delkey);
                window.localStorage.setItem(delkey, JSON.stringify(getlocalStorage));
            });
            // 增加商品数量
            addNum[i].addEventListener("click", function () {
                var nowSort = this.dataset.index;

                var thisNum = parseInt(countNum[nowSort].innerHTML);
                countNum[nowSort].innerHTML = thisNum + 1;
                var thisWare = document.getElementsByClassName("ware");
                var thisoneprice = thisWare[nowSort].getElementsByTagName("div")[0].getElementsByTagName("div")[3];
                var changcenowprice = (parseFloat(thisoneprice.innerHTML) * parseInt(countNum[nowSort].innerHTML)).toFixed(2);
                wareallprice[nowSort].innerHTML = changcenowprice;
                doaccount();
                // 商品数量改变的同时改变本地储存的数据
                var getthiswareid = this.dataset.wareid;
                var delkey = getthiswareid + "warenumpostcarinfo";
                var getlocalStorage = JSON.parse(localStorage.getItem(delkey));
                var oldgernum = parseInt(getlocalStorage.gernum);
                var newgernum = oldgernum + 1;
                getlocalStorage.gernum = newgernum
                window.localStorage.removeItem(delkey);
                window.localStorage.setItem(delkey, JSON.stringify(getlocalStorage));

            });

        }
    }
    // 商品的全选和全不选
    var checkall = document.getElementsByClassName("checkall");
    var shopcheckall = document.getElementsByClassName("shopcheckall");
    var checkedallcheckone = document.getElementsByClassName("checkone");
    var allinput = document.getElementsByTagName("input");
    // 页面商品全选/全不选
    for (var i = 0; i < checkall.length; i++) {
        checkall[i].addEventListener("click", docheckall);
        checkall[i].setAttribute("data-index", i);
    }
    // 店铺商品全选/全不选
    for (var i = 0; i < shop.length; i++) {
        shopcheckall[i].addEventListener("click", doshopcheckall);
    }
    // 对所有input按钮绑定事件进行对选中商品数量和页面最后选中总价格进行统计
    for (var i = 0; i < allinput.length; i++) {
        allinput[i].addEventListener("click", doaccount)
    }
    // 对所有商品的删除按钮绑定事件
    var waredel = document.getElementsByClassName("waredel");
    for (var i = 0; i < waredel.length; i++) {
        waredel[i].addEventListener("click", dodelware);
        waredel[i].setAttribute("data-index", i);
    }
    // 对多选商品删除按钮绑定事件
    var morewaredel = document.getElementsByClassName("morewaredel")[0];
    morewaredel.addEventListener("click", domoredel)
    // 页面全选
    function docheckall() {
        var thisindex = this.dataset.index;
        var anotherindex = parseInt(thisindex) - 1 < 0 ? 1 : 0;
        for (var i = 0; i < checkedallcheckone.length; i++) {
            for (var n = 0; n < shopcheckall.length; n++) {
                if (this.checked == true) {
                    shopcheckall[n].checked = true;
                    checkedallcheckone[i].checked = true;
                    checkall[anotherindex].checked = true;

                } else {
                    shopcheckall[n].checked = false;
                    checkedallcheckone[i].checked = false;
                    checkall[anotherindex].checked = false;
                }
            }
        }
    }
    // 单个店铺全选
    function doshopcheckall() {
        var getnowshopindex = this.dataset.index;

        var checkone = shop[getnowshopindex].getElementsByClassName("checkone");
        for (var n = 0; n < checkone.length; n++) {
            if (shopcheckall[getnowshopindex].checked == true) {
                if (checkone[n].checked !== true) {
                    checkone[n].checked = true;
                }
            } else {
                if (checkone[n].checked == true) {
                    checkone[n].checked = false;
                }
            }
        }
    }

    // 计算最终价格和商品数量
    function doaccount() {
        var holdprice = new Array();
        for (var i = 0; i < checkedallcheckone.length; i++) {
            if (checkedallcheckone[i].checked == true) {
                var getthiswareinfo = checkedallcheckone[i].nextSibling;
                var getthiswareallprice = getthiswareinfo.getElementsByClassName("wareallprice")[0];
                holdprice.push(getthiswareallprice.innerHTML);
            }
        }
        var lastprice;
        sum(holdprice);
        function sum(holdprice) {
            return lastprice = eval(holdprice.join('+'));
        }
        var statistics = document.getElementsByClassName("statistics")[0];
        statistics.getElementsByTagName("p")[0].innerText = holdprice.length;
        if (lastprice == undefined) {
            lastprice = 0;
        }
        var consolelastprice = document.getElementsByClassName("finalprice")[0].getElementsByTagName("p")[0];
        consolelastprice.innerText = lastprice;
    }
    // 删除单个商品和本地储存
    function dodelware() {
        var getthiswareid = this.dataset.wareid;
        var delkey = getthiswareid + "warenumpostcarinfo";
        var getthisdelinfo = this.parentNode.parentNode;
        var getthisdelinfoparent = getthisdelinfo.parentNode;
        var finaldel = getthisdelinfoparent.parentNode;
        var ware = document.getElementsByClassName("ware");
        getthisdelinfoparent.removeChild(getthisdelinfo);
        var comparewarenum = getthisdelinfoparent.childNodes;
        if (comparewarenum.length < 2) {
            finaldel.removeChild(getthisdelinfoparent);
        }
        window.localStorage.removeItem(delkey);
        if (ware.length == 0) {
            donowareshow();
        }
        doaccount();
        setchangindex();
    }
    // 批量删除商品
    function domoredel() {
        for (var i = 0; i < getwarekeyname.length; i++) {
            if (checkedallcheckone[0].checked == true) {
                var getthiswareinfo = checkedallcheckone[0].nextSibling;
                var getthiswareid = getthiswareinfo.getElementsByClassName("waredel")[0].dataset.wareid;
                var delkey = getthiswareid + "warenumpostcarinfo";
                var getthisdelinfo = checkedallcheckone[0].parentNode;
                var getthisdelinfoparent = getthisdelinfo.parentNode;
                var finaldel = getthisdelinfoparent.parentNode;
                var ware = document.getElementsByClassName("ware");
                getthisdelinfoparent.removeChild(getthisdelinfo);
                var comparewarenum = getthisdelinfoparent.childNodes;
                if (comparewarenum.length < 2) {
                    finaldel.removeChild(getthisdelinfoparent);
                }
                window.localStorage.removeItem(delkey);
                if (ware.length == 0) {
                    donowareshow();
                }
                setchangindex();
            }
        }
    }
}
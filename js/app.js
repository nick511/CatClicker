function Cat(name){
	this.clickCnt = 0;
	this.name = name;
  this.imgSrc = "";
}

Cat.totalCats = 0;
Cat.prototype.create = function(){
	var cat = this;
	var catDom = $("#catTemplate").clone();
  catDom.attr("id", "cat_" + Cat.totalCats);
  $(".name", catDom).html(this.name);
  $(".clickCnt", catDom).html(this.clickCnt);
  $(".catImg", catDom).attr("src", this.imgSrc);
  $(".catImg", catDom).click(function(){
  	$(".clickCnt", catDom).html(cat.addClickCnt());
  });
  catDom.appendTo("body");
  catDom.show();
  Cat.totalCats++;
};

Cat.prototype.addClickCnt = function(){
	return ++this.clickCnt;
};

var names = ["Cat1","Cat2","Cat3","Cat4","Cat5",];
var imgUrls = ["https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426","https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496","https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454","https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a.jpeg","http://pngimg.com/upload/cat_PNG1631.png",];

for (var i = 0, l = names.length; i < l; i++){
	var cat = new Cat(names[i]);
  cat.imgSrc = imgUrls[i];
  cat.create();
  
  var link = $("<a />").html(names[i]);
  link.data("id", "cat_" + i);
  link.click(function(){
  	$(".catDiv").hide();
    $("#" + $(this).data("id")).show();
  });
  link.appendTo("#catList");
}

$("#catList a").first().click();




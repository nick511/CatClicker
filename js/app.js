

$(function() {
  "use strict";

  //Model
  function Cat(name){
    this.id = this.generateId();
    this.name = name;
    this.imgSrc = "";
    this.clickCnt = 0;
  }

  Cat.list = [];
  Cat.totalClickCnt = 0;
  Cat.init = function() {
    var names = ["Cat1","Cat2","Cat3","Cat4","Cat5",];
    var imgUrls = [
      "https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426",
      "https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496",
      "https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454",
      "https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a.jpeg",
      "http://pngimg.com/upload/cat_PNG1631.png",
    ];

    for (var i = 0, l = names.length; i < l; i++){
      var cat = new Cat(names[i]);
      cat.imgSrc = imgUrls[i];
    }
  };

  Cat.prototype.generateId = function() {
    var id = Cat.list.length;
    Cat.list[id] = this;
    return id;
  };

  Cat.prototype.addClickCnt = function() {
    this.clickCnt++;
    Cat.totalClickCnt++;
    return this.clickCnt;
  };


  //MV*
  var octopus = {
    init: function() {
      Cat.init();
      view.init();
    },

    getCatById: function(id) {
      return Cat.list[id];
    },

    getAllCats: function() {
      return Cat.list;
    },

    getTotalClickCnt: function() {
      return Cat.totalClickCnt;
    },
  };


  //View
  var view = {
    init: function() {

      view.catLinkTemplate = $("#catLinkTemplate").html();

      view.catLinksDiv = $("#catLinks");
      view.catDiv = $("#catDiv");
      view.catName = $(".name", view.catDiv);
      view.catClickCnt = $(".clickCnt", view.catDiv);
      view.catImg = $(".catImgDiv .catImg", view.catDiv);
      view.heart = $(".catImgDiv .heart", view.catDiv);
      
      view.totalClickCnt = $("#totalClickCnt");

      //set event
      view.catImg.click(function(){
        var cat = octopus.getCatById($(this).data("id"));
        view.catClickCnt.html(cat.addClickCnt());
        view.totalClickCnt.html(octopus.getTotalClickCnt());
      });

      view.render();
    },

    render: function() {
      //render all links
      octopus.getAllCats().forEach(function(cat) {
        view.renderLink(cat);
      });
      view.catLinks = view.catLinksDiv.children();
      //init state
      view.catLinks.first().click();
    }, 

    renderLink: function(cat) {
      var link = view.makeCatLinkTemplate();
      link.html(cat.name);
      link.click(function(){
        view.renderCat(cat);
        var activeClass = "active";
        view.catLinks.removeClass(activeClass);
        $(this).addClass(activeClass);
      });
      link.appendTo(view.catLinksDiv);
    },

    renderCat: function(cat) {
      var catDom = view.catDiv.data("id", cat.id);
      view.catName.html(cat.name);
      view.catClickCnt.html(cat.clickCnt);
      view.catImg.data("id", cat.id)
        .attr("src", cat.imgSrc);
    },

    makeCatLinkTemplate: function(id) {
      return $(view.catLinkTemplate);
    }

  };

  octopus.init();

}());




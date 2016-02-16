

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
    var cats = [
      {
        name: "Cat1",
        imgSrc: "img/cat1.jpg"
      },
      {
        name: "Cat2",
        imgSrc: "img/cat2.jpg"
      },
      {
        name: "Cat3",
        imgSrc: "img/cat3.jpg"
      },
      {
        name: "Cat4",
        imgSrc: "img/cat4.jpg"
      },
      {
        name: "Cat5",
        imgSrc: "img/cat5.png"
      },
    ];

    for (var i = 0, l = cats.length; i < l; i++){
      var cat = new Cat(cats[i].name);
      cat.imgSrc = cats[i].imgSrc;
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
      view.catImgDiv = $(".catImgDiv", view.catDiv);
      view.catImg = $(".catImgDiv .catImg", view.catDiv);
      view.heart = $(".catImgDiv .heart", view.catDiv);
      
      view.totalClickCnt = $("#totalClickCnt");

      //set event
      view.catImgDiv.click(function(){
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
      view.catImgDiv.data("id", cat.id);
      view.catImg.attr("src", cat.imgSrc);
    },

    makeCatLinkTemplate: function(id) {
      return $(view.catLinkTemplate);
    }

  };

  octopus.init();

}());




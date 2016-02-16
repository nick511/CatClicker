

$(function() {
  "use strict";

  //Model
  function Cat(name){
    this.id = this.generateId();
    this.name = name;
    this.imgSrc = "";
    this.clickCnt = 0;
    Cat.list[this.id] = this;
  }

  Cat.list = [];
  Cat.totalClickCnt = 0;

  Cat.prototype.generateId = function() {
    return Cat.list.length;
  };

  Cat.prototype.addClickCnt = function() {
    this.clickCnt++;
    Cat.totalClickCnt++;
    return this.clickCnt;
  };


  //MV*
  var octopus = {
    init: function() {
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
      
      view.render();

      //set image click event
      $("#catDiv .catImg").click(function(){
        var cat = octopus.getCatById($(this).data("id"));
        $("#catDiv .clickCnt").html(cat.addClickCnt());
        $("#totalClickCnt").html(octopus.getTotalClickCnt());
      });

      //init state
      $("#catLinks a").first().click();
    },

    render: function() {
      //render all links
      octopus.getAllCats().forEach(function(cat) {
        view.renderLink(cat);
      });
    }, 

    renderLink: function(cat) {
      var link = view.makeTemplate("#catLinkTemplate");
      link.html(cat.name);
      link.click(function(){
        view.renderCat(cat);
      });
      link.appendTo("#catLinks");
    },

    renderCat: function(cat) {
      var catDom = $("#catDiv").data("id", cat.id);
      $(".name", catDom).html(cat.name);
      $(".clickCnt", catDom).html(cat.clickCnt);
      $(".catImg", catDom).data("id", cat.id)
        .attr("src", cat.imgSrc);
    },

    makeTemplate: function(id) {
      return $($(id).html());
    }

  };

  octopus.init();

}());




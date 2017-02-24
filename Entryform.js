$(function(){
    var newForm = EntryForm();
});
function EntryForm() {
    var field = "div._fld";
    var allInputs = "div._sel input, div._inp input";
    var inputs = "div._inp input";
    var selects = "div._sel input";
    var selectList = "ul.dropdown";
    var selectItem = "ul.dropdown li";
    var plusBtn = "div.btn";
    var focusInColor = "#423c35";
    var focusOutColor = "#ccc";
    var arrowUp = "fa-caret-up";
    var arrowDown = "fa-caret-down";
    
    //callback functions
    function inputStyle(thisInput, color) {
        thisInput.parents(field).animate({borderColor: color}, "fast");
    };
    function flipArrow(dropdown, from, to) {
        dropdown.next().removeClass(from).addClass(to);
    };
    
    //handle built in events
    var fnAllInputs = {
        focus: function(e) {inputStyle($(e.target), focusInColor);},
        focusout: function(e) {inputStyle($(e.target), focusOutColor);}            
    };
    var fnSelects = {
        focusout: function(e) {flipArrow($(e.target).next(selectList), arrowUp, arrowDown);},
        click: function(e) {
            var dropdown = $(e.target).next(selectList);
            dropdown.slideDown("fast", function() {flipArrow(dropdown, arrowDown, arrowUp);});
            //flipArrow(dropdown, arrowDown, arrowUp);
        },
        keyup: function(e) {
            if (e.keyCode === 38 || e.keyCode === 40) {
                return;
            }
            $(e.target).removeAttr("class");
            var thisVal = $(e.target).val().toLowerCase().replace(" ","_");
            var dropdown = $(e.target).next(selectList);
            var dropdownList = dropdown.children("li");
            if (thisVal === '') {
                dropdown.slideUp("fast");
                dropdownList.show();
                return;
            }
            dropdown.slideDown("fast");
            dropdownList.hide();
            dropdown.children("[class^=" +  thisVal + "]").show();
        }
    };
    var fnSelectItem = {
        click: function(e) {
            var dropdown = $(e.target).parent("ul.dropdown");
            var inputTag = dropdown.prev();
            inputTag.val($(e.target).text());
            inputTag.removeAttr("class").addClass($(e.target).attr("id"));
            dropdown.slideUp("fast");
        }
    };
    
    //attach events
    $(document)
        .on(fnAllInputs, allInputs)
        .on(fnSelects, selects)
        .on(fnSelectItem, selectItem)
        .on("click", plusBtn, function() {$(this).parent().next().slideDown("fast");})
        .mouseup(function(e){
            var slider = new Slider();
            var container = $(selectList);
            if (slider.isOutSide(container, e)) {
                container.children().show();
                slider.hideMe(container, "fast");
            }
        });
}

function Slider() {
    this.isOutSide = function(container, e) {

        if (!container.is(e.target) && container.has(e.target).length === 0 && e.target != $('html').get(0)) { return true; } 
        else { return false ;}
    };
    this.hideMe = function(name, speed) {
        if ($(name).is(":visible")) {
            name.slideUp(speed);
        }
    };
    this.showMe = function(name, speed) {
        if (!$(name).is(":visible")) {
            $(name).slideDown(speed);
        }
    };
}                
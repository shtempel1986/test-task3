"use strict";

/**
 * Created by Павел on 31.03.2017.
 */
$(document).ready(function () {
    var testData = void 0,
        $testForm = $("<form>").addClass("test-form"),
        formVal = "",
        $eduWrapper = $("<div>").addClass("modal-wrapper").hide().appendTo("body").css({
        width: $(window).width(),
        height: $(window).height()
    }),
        educationStep = 0;

    var testEducation = function testEducation() {
        var $eduEdit = $(".edit").eq(0),
            $eduInput = $("input").eq(0),
            $modal = $(".modal").appendTo($eduWrapper),
            eduMessage = ["\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u0434\u043B\u044F \u043D\u0430\u0447\u0430\u043B\u0430 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F", "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u0432\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435, \u043F\u043E\u0441\u043B\u0435 \u0447\u0435\u0433\u043E \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0438\u043B\u0438 \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F"];
        if (educationStep == 0) {
            $eduWrapper.fadeIn(1000, function () {
                $eduEdit.css("z-index", 200);
                $modal.show().css({
                    top: $eduEdit.offset().top + $eduEdit.height() - 50,
                    left: $eduEdit.offset().left + $eduEdit.width() + 20
                }).children("div").text(eduMessage[educationStep]);
                $eduEdit.click(function () {
                    $eduWrapper.hide();
                    $eduEdit.off("click");
                    educationStep++;
                    testEducation();
                    $eduEdit.css("z-index", 0);
                });
            });
        }
        if (educationStep == 1) {
            $modal.css({
                top: $eduInput.offset().top + $eduInput.height() - 50,
                left: $eduInput.offset().left + $eduInput.width() + 20
            }).children("div").text(eduMessage[educationStep]);
            $eduWrapper.fadeIn(1000, function () {
                $eduInput.css("z-index", 200).off("blur").change(function () {
                    $eduWrapper.hide();
                    educationStep++;
                    $eduInput.css("z-index", 0);
                });
                $modal.show();
            });
        }
    };

    var testChange = function testChange() {
        $testForm.appendTo("body").submit(function (event) {
            event.preventDefault();
        });
        $("input").on("change", function () {
            if (formVal != $(this).val()) {
                if (confirm("Заменить значения?")) {
                    var index = $(this).data("tag-number");
                    testData.tags[index].value = $(this).val();
                    var str = "";
                    str = "Option: " + testData.Option + " \n                    tags:[";
                    testData.tags.forEach(function (item) {
                        str += "\n                        {" + item.title + ": " + item.value + "}";
                    });
                    str += "\n                    ]";
                    alert(str);
                }
            }
            testAppend(testData, $testForm);
            testEdit();
        }).blur(function () {
            $(this).attr("disabled", "disabled");
        });
    };

    var testAppend = function testAppend(testData, $testForm) {
        $testForm.html("");
        $("<legend>").html("" + testData.Option).appendTo($testForm);
        testData.tags.forEach(function (item, index) {
            var $label = $("<label>").html("<span>" + item.title + "</span>");
            $("<input>").attr("disabled", "disabled").data("tag-number", index).val("" + item.value).appendTo($label);
            $label.appendTo($testForm);
            $("<button>").html("<i class ='fa fa-edit'>").addClass("edit").appendTo($label);
        });
        testChange();
        testEdit();
        if (educationStep == 0) testEducation();
    };

    var testEdit = function testEdit() {
        $(".edit").click(function (event) {
            event.preventDefault();
            formVal = $(this).siblings("input").removeAttr("disabled").focus().val();
        });
    };

    $.getJSON("test2.json", function (data) {
        testData = data;
        testAppend(testData, $testForm);
    });
});
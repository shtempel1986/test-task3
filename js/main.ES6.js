/**
 * Created by Павел on 31.03.2017.
 */
$(document).ready(()=> {
    let testData,
        $testForm = $("<form>").addClass("test-form"),
        formVal = "",
        $eduWrapper = $("<div>").addClass("modal-wrapper").hide().appendTo("body").css({
            width: $(window).width(),
            height: $(window).height()
        }),
        educationStep = 0;

    let testEducation = function () {
        let $eduEdit = $(".edit").eq(0),
            $eduInput = $("input").eq(0),
            $modal = $(".modal").appendTo($eduWrapper),
            eduMessage = [
                `Нажмите для начала редактирования`,
                `Введите новое значение, после чего подтвердите или отмените изменения`
            ];
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
        if(educationStep ==1){
            $modal.css({
                top: $eduInput.offset().top + $eduInput.height() - 50,
                left: $eduInput.offset().left + $eduInput.width() + 20
            }).children("div").text(eduMessage[educationStep]);
            $eduWrapper.fadeIn(1000, ()=>{
                $eduInput.css("z-index", 200).off("blur").change(()=>{
                    $eduWrapper.hide();
                    educationStep++;
                    $eduInput.css("z-index", 0);
                });
                $modal.show();

            })
        }
    };

    let testChange = function () {
        $testForm.appendTo("body").submit((event)=> {
            event.preventDefault();
        });
        $("input").on("change", function () {
            if (formVal != $(this).val()) {
                if (confirm("Заменить значения?")) {
                    let index = $(this).data("tag-number");
                    testData.tags[index].value = $(this).val();
                    let str = "";
                    str = `Option: ${testData.Option} 
                    tags:[`;
                    testData.tags.forEach((item)=> {
                        str += `
                        {${item.title}: ${item.value}}`;
                    });
                    str += `
                    ]`;
                    alert(str);
                }
            }
            testAppend(testData, $testForm);
            testEdit();
        }).blur(function () {
            $(this).attr("disabled", "disabled");
        });
    };

    let testAppend = function (testData, $testForm) {
        $testForm.html("");
        $("<legend>").html(`${testData.Option}`).appendTo($testForm);
        testData.tags.forEach((item, index)=> {
            let $label = $("<label>").html(`<span>${item.title}</span>`);
            $("<input>").attr("disabled", "disabled").data("tag-number", index).val(`${item.value}`)
                .appendTo($label);
            $label.appendTo($testForm);
            $("<button>").html("<i class ='fa fa-edit'>").addClass("edit").appendTo($label);
        });
        testChange();
        testEdit();
        if (educationStep == 0) testEducation();
    };

    let testEdit = function () {
        $(".edit").click(function (event) {
            event.preventDefault();
            formVal = $(this).siblings("input").removeAttr("disabled").focus().val();
        });
    };

    $.getJSON("test2.json", (data)=> {
        testData = data;
        testAppend(testData, $testForm);
    });
});
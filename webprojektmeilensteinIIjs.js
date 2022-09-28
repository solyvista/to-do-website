(function ($) {
    'use strict';
    $(function () {
      var todoListItem = $('.todo-list');
      var todoListInput = $('.todo-list-input');
      $('.todo-list-add-btn').on("click", function (event) {
        event.preventDefault();
  
        var item = $(this).prevAll('.todo-list-input').val();
  
        if (item) {
          todoListItem.append("<li><div class='form-check'><label class='form-check-label'><input class='checkbox' type='checkbox'/>" + item + "<i class='input-helper'></i></label></div><i class='remove mdi mdi-close-circle-outline'></i></li>");
          todoListInput.val("");
        }
  
      //GET Request

      $.ajax({

url: "https://api.techstarter.dev/todos",
type: 'GET',

        dataType: 'json',

        success: function(data) { //data := Array mit todos

            //Todo liste leeren

            //Todos der todolist hinzufügen

            console.log(data);

        }

    });


      });
  
      todoListItem.on('change', '.checkbox', function () {
        if ($(this).attr('checked')) {
          $(this).removeAttr('checked');
        } else {
          $(this).attr('checked', 'checked');
        }
  
        $(this).closest("li").toggleClass('completed');
  
      });
  
      todoListItem.on('click', '.remove', function () {
        $(this).parent().remove();
      });
  
    });
  })(jQuery);
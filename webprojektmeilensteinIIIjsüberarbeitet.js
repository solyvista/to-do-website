(function ($) {
    $(function () {

        var todoListItem = $('.todo-list');
        var todoListInput = $('.todo-list-input');

        $.ajax({
            url: 'https://api.techstarter.dev/todos',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                updateList(data);
            },
            error: function () {
                alert('Failed to load items');
            }
        });

        $('.todo-list-add-btn').on('click', function (event) {
            event.preventDefault();
            var item = $(this).prevAll('.todo-list-input').val();
            if (item) {
                todoListInput.val('');
                $.ajax({
                    url: 'https://api.techstarter.dev/todos',
                    type: 'POST',
                    data: JSON.stringify(
                        { name: item },
                    ),
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    success: function (data) {
                        updateList(data);
                    },
                    error: function () {
                        alert('Failed to create item');

                    }
                });
            }
        });
        todoListItem.on('change', '.checkbox', function () {
            var id = $(this).closest('li').attr('id');
            var isDone = $(this).closest('li').hasClass('completed');
            $.ajax({
                url: 'https://api.techstarter.dev/todos',
                type: 'PUT',
                data: JSON.stringify(
                    { id: id, done: !isDone },
                ),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    updateList(data);
                },
                error: function () {
                    alert('Failed to update item');
                }
            });
        });

        todoListItem.on('click', '.remove', function () {
            var id = $(this).closest('li').attr('id');
            $.ajax({
                url: 'https://api.techstarter.dev/todos/' + id,
                type: 'DELETE',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    updateList(data);
                },
                error: function () {
                    alert('Failed to delete item');
                }
            });
        });

        function updateList(data) {
            todoListItem.empty();
            $.each(data, function (key, value) {
                var name = value['name']
                var done = value['done']
                var id = value['id']
                var item
                if (done === 'true') {
                    item = "<li id=" + id + " class='completed'><div class='form-check'><label class='form-check-label'><input class='checkbox' type='checkbox' checked='true'/>" + name + "<i class='input-helper'></i></label></div><i class='remove mdi mdi-close-circle-outline'></i></li>"
                } else {
                    item = "<li id=" + id + "><div class='form-check'><label class='form-check-label'><input class='checkbox' type='checkbox'/>" + name + "<i class='input-helper'></i></label></div><i class='remove mdi mdi-close-circle-outline'></i></li>"
                }
                todoListItem.append(item);
            });
        }
    });
})(jQuery);
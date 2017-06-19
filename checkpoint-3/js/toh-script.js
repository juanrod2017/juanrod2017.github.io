'use strict';

$(function() {

  var gameover = false;
  var stack = $('[data-stack]');
  var block = $('[data-block]');

  var movable = $('[data-block]:last-child');
  movable.addClass("movable");


  block.draggable({
    revert: true
  });

  stack.droppable({
    accept: ".movable",
    drop: function(event, ui) {
      if (!gameover) {
        if (goodToDrop($(this), ui.draggable)) {
          ui.draggable.draggable('option', 'revert', false);
          $(this).append(ui.draggable.detach());
          ui.draggable.css({
            'top': 0,
            'left': 0
          });

          movable = $('[data-block]:last-child');
          $('[data-block]').removeClass("movable");
          movable.addClass("movable");
          block.draggable({
            revert: true
          });

          checkForWin();
        }
      } else {
        resetGame();
      }
    }
  });

  function goodToDrop(stack, block) {
    var $last_block = stack.children().last();
    if (parseInt(block.attr("data-block")) < parseInt($last_block.attr("data-block")) || stack.children().length === 0) {
      return true;
    } else {
      return false;
    }
  }

  function checkForWin() {
    if ($('[data-stack="3"]').children().length === 4) {
      $('#announce-game-won').html("You the winner!");
      gameover = true;

    }
  }



  $("#clear").click(function(){
    location.reload();
  });



});

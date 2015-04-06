// YOUR CODE HERE:

var App = function() {

};

App.prototype.init = function() {
  var thisApp = this;
  $(".username").click(function() {
    thisApp.addFriend(this.textContent);
  });

  var html = '<form id="send"><input type="submit" class="submit"></form>'
  $("#main").append(html);
  $("#send .submit").submit(function() {
    thisApp.handleSubmit();
  });
};

App.prototype.send = function(message) {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data){
      console.log(data);
    },
    error: function(){
      console.log('hey error');
    }
  });
};

App.prototype.fetch = function() {
  return $.ajax({
    url: undefined, //'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    success: function(data){
      return data;
    },
    error: function(){
      console.error('hey error');
    }
  });
};

App.prototype.clearMessages = function() {
  $("#chats").remove();
};

App.prototype.addMessage = function(message) {
  var html = '<div id="chats"><span class="username">' + message.username + '</span></div>';
  //html += '<span class = "message">' + message.text + '</span>';
  //html += '<aside class = "roomname">' + message.roomname + '</aside>';
  $("#main").html(html);
};

App.prototype.addRoom = function(roomName) {
  var html = '<div id="roomSelect"><a href="#">' + roomName + '</a></div>';
  $("#main").html(html);
};

App.prototype.addFriend = function(username) {

};

App.prototype.handleSubmit = function(message) {

};

var app = new App();

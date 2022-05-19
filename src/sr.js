$(function () {
    console.log("heyyyyyyyyyyy")
    var connection = new signalR.hubConnectionBuilder().writeUrl("/myHub").build();

    connection.start();

    console.log("hye");

    $('#message-input-form').submit(() => {
        //console.log('sending: ' + $('textarea').val());
        console.log("heyyyyyy");
        connection.invoke("Changed", "kkkkk");
    });

    connection.on("ChangedRecived", function (value) {
        console.log('recieved: ' + value);
      //  $('textarea').val(value);
    });
});
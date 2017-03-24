var create = function(document, firebase, timestamp) {
    var input = document.getElementById('message');
    var message = input.value;
    firebase.database().ref('news/' + timestamp).set({
        message: message,
        timestamp: timestamp
    });
    input.value = '';
};

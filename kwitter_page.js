var firebaseConfig = {
      apiKey: "AIzaSyCQHKtpyv4OeC9VqR6A8tRgVqTjKTeQWdc",
      authDomain: "kwitter-main-5ad39.firebaseapp.com",
      databaseURL: "https://kwitter-main-5ad39-default-rtdb.firebaseio.com",
      projectId: "kwitter-main-5ad39",
      storageBucket: "kwitter-main-5ad39.appspot.com",
      messagingSenderId: "456012806616",
      appId: "1:456012806616:web:e30307f3ed7788a5fe5aad"
};


firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref("user_name").push({
            name: user_name,
            message: msg,
            likes: 0
      });
      document.getElementById("msg").value = "";
}




function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];

                        name_with_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + "value =" + like + "onclick='updateLikes(this.id)'>";
                        span_with_tag = "<span class ='glyphicon glyphicon-thumbs-up'>like: " + like + "</span> </button><hr>";

                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML += row;


                        //End code
                  }
            });
      });
}
getData();

function updateLikes(message_id) {
      console.log("Clicked on like button" + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });
}

function logout() {
      localStorage.removeItem("room_name");
      localStorage.removeItem("user_name");
      window.location.replace("index.html");
}
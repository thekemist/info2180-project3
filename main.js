$(document).ready(function(){

	$("#logBtn").on('click', function(event){

		event.preventDefault(); //don't change, button submits immediately otherwise


		var username = $("#usname").val();

		var password = $("#pass").val();


		var urlInfo = "username="+ username + "&password=" + password;

		var XMLhttp = new XMLHttpRequest();


		XMLhttp.onreadystatechange = function(){

			if (this.readystatechange == 4)

				if(this.status==200){

					//get homepage for user

					if (XMLhttp.responseText == "User Found"){

						$("#main").load("home.html")

					} else{

						$("#status").text("Username/Password incorrect!")

					}

				} else{

					$("#status").text("Error: unknown.")

				}

		}

	});

	XMLhttp.open("POST", "cheapo.php", true);

    XMLhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    XMLhttp.send(urlInfo);


    function read(divID, messageID){

        

        var info = "read_id="+messageID;

        var aXMLhttp = new XMLHttpRequest();

        

        aXMLhttp.onreadystatechange = function() {

            if (this.readyState == 4){

                if (this.status == 200) {

                    if (aXMLhttp.responseText == "Read"){

                        $(divID).addClass("read");

                    }

                }

            }

        };

        

        aXMLhttp.open("POST", "cheapo.php", true);

        aXMLhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        aXMLhttp.send(info);

    }


    function fetch(){

        var link = 'cheapo.php?mail=true';

        $.ajax(link,{ method: 'GET' }).done(function(result){

            $("#msglist").html(result); 

        }).fail(function(){

            $("#msglist").html("<p>Error: Unknown</p>");

        });

    }


    if ($(this).attr("href") == "home.html"){

        $("#logout").on('click', function(event){

            

        

            var XMLhttp = new XMLHttpRequest();

            

            var info ="logout=true";

        

            XMLhttp.onreadystatechange = function() {

                if (this.readyState == 4){

                    if (this.status == 200) {

                        $("#main").load("index.html");

                    }

                }

            };

        

            XMLhttp.open("POST", "cheapo.php", true);

            XMLhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            XMLhttp.send(info);

        }

    } 

});

}
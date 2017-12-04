/* global $ */

/* global jQuery */

$(document).ready(function(){

    

    $("#wf-form").on('submit',function(event){

        

        event.preventDefault();

        

        //adds methods to test if it's names and username is Alphanumeric and the Password is Strong

		jQuery.validator.addMethod("isStrong", function(value, element) {

		 return this.optional(element) || /^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[a-z])(?=.*[^\w\d\s])).{8,30}$/gm.test(value);

		}, "Your password must contain a capital letter, lowercase letter, a number and special character");


		jQuery.validator.addMethod("IsAlphanumeric", function(value, element) {

		 return this.optional(element) || /(?!.*[\s\-]{2,})^[a-zA-Z0-9\s\-]{1,24}$/gm.test(value);

		}, "Must only contain alpha characters, hyphens or spaces");


        ////End of new methods



		$("#wf-form").validate({

	 rules: {

	 firstname: {

                    required: true

	 IsAlphanumeric: true

	 },lastname: {

                    required: true

	 IsAlphanumeric: true

	 },username: {

                    required: true

	 	IsAlphanumeric: true

	 },password: {

                    required: true

	 	isStrong: true

	 }

	 }, message: {

                firstname{

                    required: "Required"

                    IsAlphanumeric: "Has to be Alphanumeric ONLY"

                },

                lastname:{

                    required: "Required"

                    IsAlphanumeric: "Has to be Alphanumeric ONLY"

                },

                username:{

                    required: "Required"

                    IsAlphanumeric: "Has to be Alphanumeric ONLY"

                },

                password:{

                    required:"Required"

                    isStrong: "Not strong enough: must contain ONLY"

                }

            }


	 submitHandler: function (form) {

                var fistname = $("#fname").val();

                var lastname = $("#lname").val();

                var username = $("#username").val();

                var password = $("#password").val();

                

                var linkInfo = 'firstname='+firstname+'&lastname='+lastname+'&username='+username+'&password='+password;

                

                var XMLhttp = new XMLHttpRequest();

                

                XMLhttp.onreadystatechange = function() {

                    if (this.readyState == 4){

                        if (this.status == 200) {

                            $("#result").text(XMLhttp.responseText);

                        }else{

                            $("#result").text("Error: Unknown");

                        }

                    }

                };

                

                XMLhttp.open("POST", "cheapo.php", true);

                XMLhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                XMLhttp.send(linkInfo);

	 return true;

	 }

		});

    });

});
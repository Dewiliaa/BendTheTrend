var card=document.getElementById("card");         
function openRegister()
     {
     card.style.transform = "rotateY(-180deg)";	
     }	
function openLogin()
     {
         card.style.transform = "rotateY(0deg)";	
     }	

     document.addEventListener("DOMContentLoaded", function() {
          var loginForm = document.getElementById("loginForm");
          var registerForm = document.getElementById("registerForm");
      
          loginForm.addEventListener("submit", function(event) {
              event.preventDefault(); // Prevent default form submission behavior
              window.location.href = "HTML/Home.html"; // Redirect to Home.html
          });
      
          registerForm.addEventListener("submit", function(event) {
              event.preventDefault(); // Prevent default form submission behavior
              window.location.href = "HTML/Home.html"; // Redirect to Home.html
          });
      });
      

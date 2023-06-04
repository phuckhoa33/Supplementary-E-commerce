
function ShowLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('sign-up-form').style.display = 'none';
    document.getElementById('login-button').classList.toggle('active');
    document.getElementById('sign-up-button').classList.toggle('active');
  }
  
  function ShowSignUpForm() {
    document.getElementById('sign-up-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('login-button').classList.toggle('active');
    document.getElementById('sign-up-button').classList.toggle('active');
  }
  
  
  
  var pass = document.getElementById("password-indicator");
  pass.addEventListener( 'keyup', function() {
    
    var indicator = passwordStrength(pass.value);
    
    if (indicator < 2) {
      pass.style.borderBottom = "2px solid red";
    } else if (indicator == 2) {
      pass.style.borderBottom = "2px solid darkorange";
    } else if (indicator == 3) {
      pass.style.borderBottom = "2px solid yellow";
    } else if (indicator > 3) {
      pass.style.borderBottom = "2px solid green";
    }
  });
  
  
  /* 
  Author: Oliver Kurmis
  See at his blog: https://www.kurmis.com/2019/11/01/password-strength-javascript.html 
  Function will check password per regex and returns an indicator value between 0 and 5
  */
  function passwordStrength(pw) {
    return /.{8,}/.test(pw) * (  /* at least 8 characters */
      /.{12,}/.test(pw)          /* bonus if longer */
      + /[a-z]/.test(pw)         /* a lower letter */
      + /[A-Z]/.test(pw)         /* a upper letter */
      + /\d/.test(pw)            /* a digit */
      + /[^A-Za-z0-9]/.test(pw)  /* a special character */
     )
  }
  
  
  /* 
  Options for iTyped (automatic typing animations)
  See@: https://github.com/luisvinicius167/ityped
  */
  var options = {
      strings: ['Fast & secure online banking', 
                'Invest into cool stuff',
                'Try to type a strong password!',
                'A very cool App',
                'Do you see this fancy login screen?'],
      typeSpeed: 55, 
      backSpeed: 30, 
      startDelay: 500, 
      backDelay: 1500, 
      loop: true, 
      showCursor: false,
      onFinished: function(){}
  }
  
  ityped.init('#feature-slider', options);
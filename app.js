//handling sections
var profile = document.getElementById('profile')  
var login = document.getElementById('login')
var registrar = document.getElementById('register')
var validCode = document.getElementById('valid-code')
var sendCode= document.getElementById('send-code')
var ingresar = document.getElementById('ingresar')
var iniciarSesion = document.getElementById('iniciar-sesion')

iniciarSesion.addEventListener('click', function(){
login.setAttribute('class','hide')
ingresar.setAttribute('class','show')
})

/********** general functions *********/
//show profile 
// function showProfile(user){
//     firebase.database().ref('phone/users/'+user.uid).update({
//         uid:user.uid,
//         email:user.email,
//         displayName:user.displayName,
//         phoneNumber:user.phoneNumber,
//         photoURL:user.photoURL
//     }).then(function(){
//         profile.setAttribute('class', 'show')
//         login.setAttribute('class', 'hide')

//         firebase.database().ref('phone/users/'+user.uid).on('value', function(res){            
//             if (res.val().phoneNumber) document.getElementById('phone').value = res.val().phoneNumber        
//             if (res.val().email) document.getElementById('useremail').value = res.val().email
//             if (res.val().displayName) document.getElementById('username').value = res.val().displayName
//             if (res.val().name) document.getElementById('name').value = res.val().name
//             if (res.val().bio) document.getElementById('bio').value = res.val().bio
//             if (res.val().photoURL) document.getElementById('photo').src = res.val().photoURL
//         })  
//     })    
// }
//handle errors
function elError(e){
    var error = document.getElementById('error')
    if(e.message) error.innerHTML = e.message
    else error.innerHTML = e
}
// //hide profile 
// function hideProfile(){
//     profile.setAttribute('class', 'hide')
//     login.setAttribute('class', 'show')
// }
// //edit profile 
// var editar = document.getElementById('editar')
// editar.addEventListener('click', function(){
//     //var uid = JSON.parse(localStorage.getItem('user'))    
//     var user = firebase.auth().currentUser;    
//     var name = document.getElementById('name').value
//     var bio = document.getElementById('bio').value
//     firebase.database().ref('phone/users/'+user.uid).update({
//         name:name,
//         bio:bio,     
//     })
// })
// //logout
// var logout = document.getElementById('logout')
// logout.addEventListener('click', function(){
//     firebase.auth().signOut().then(function() {
//         hideProfile()
//         //localStorage.removeItem('user')
//       }).catch(function(error) {
//         console.log(error)
//       });
// })
// //check if user is logged
// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//         //localStorage.setItem('user', JSON.stringify(user.uid))                
//         showProfile(user)
//     } else {
//         hideProfile()
//     }
//   });



/*********** phone authentication ***********/
var numberButton = document.getElementById('numberButton')
var validateButton = document.getElementById('validate')
var bienvenido = document.getElementById('bienvenido')
//send message
numberButton.addEventListener('click', function(){
    
    var number = document.getElementById('number').value
    console.log(number)
   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
     "recaptcha-container",
     {
       size: "invisible",
       callback: function(response) {
         // reCAPTCHA solved, allow signInWithPhoneNumber.
         onSignInSubmit();
       }
     }
   );
    var appVerifier = window.recaptchaVerifier;
    
    firebase.auth().signInWithPhoneNumber(number, appVerifier)
        .then(function (confirmationResult) {                
        console.log(confirmationResult)    
          sendCode.setAttribute("class", "hide");
          validCode.setAttribute("class", "show");    
        //confirm(code)
        window.confirmationResult = confirmationResult                       
        }).catch(function (error) {
        // Error; SMS not sent
        console.log(error)
        elError(error)
        // ...
        });

})
//validateUser
validateButton.addEventListener('click', function(){

    var code = document.getElementById('code').value
    console.log(code)
    window.confirmationResult.confirm(code)
    .then(function (result) {
    // User signed in successfully.
        var user = result.user;      
        validCode.setAttribute("class", "hide");
        bienvenido.setAttribute("class", "show");
    // ...
    }).catch(function (error) {
    // User couldn't sign in (bad verification code?)
    // ...
    console.log(error)
    elError(error)
    });
})   
/*********** email/password authentication ***********/
//registration
var register = document.getElementById('register')

register.addEventListener('click', function(){
    

    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(result){
            var user = result.user;
            login.setAttribute("class", "hide");
            sendCode.setAttribute("class", "show");
        })
        .catch(function(error){
            console.log(error)
            elError(error)
        })
})

var emailLogin = document.getElementById('emailLogin')
//login
emailLogin.addEventListener('click', function(){


    var email2 = document.getElementById('email2').value
    var password2 = document.getElementById('password2').value

    firebase.auth().signInWithEmailAndPassword(email2, password2)
        .then(function(result){
 ingresar.setAttribute("class", "hide");
             login.setAttribute("class", "hide");
             bienvenido.setAttribute("class", "show");
            var user = result.user            
          
        })
        .catch(function(error){
            console.log(error)
            elError(error)
        })
})
/*********** Social authentication ***********/
//google
var google = document.getElementById('google')
google.addEventListener('click', function(){
     login.setAttribute("class", "hide");
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
         login.setAttribute("class", "hide");
         bienvenido.setAttribute("class", "show");
       
        var user = result.user            
      
        console.log(user)
    })
    .catch(function(error){
        console.log(error)
        elError(error)
    })
})
//facebook
var facebook = document.getElementById('facebook')
facebook.addEventListener('click', function(){
     login.setAttribute("class", "hide");
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
        
         bienvenido.setAttribute("class", "show");
        var user = result.user            
        
        console.log(user)
    })
    .catch(function(error){
        console.log(error)
        elError(error)
    })
})
//twitter
var twitter = document.getElementById('twitter')
twitter.addEventListener('click', function(){
  login.setAttribute("class", "hide");
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
          
          bienvenido.setAttribute("class", "show");
        var user = result.user            

        console.log(user)
    })
    .catch(function(error){
        console.log(error)
        elError(error)
    })
})
//github
var github = document.getElementById('github')
github.addEventListener('click', function(){
    
         login.setAttribute("class", "hide");
    var provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
       
         bienvenido.setAttribute("class", "show");
        var user = result.user            
        
        console.log(user)
    })
    .catch(function(error){
        console.log(error)
        elError(error)
    })
})             
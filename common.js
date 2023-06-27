var Success = {"install": function (Vue, options) {

  Vue.prototype.copylink = function () {
    var copyText = document.getElementById("correctlink");
    copyText.select();
    document.execCommand("copy");
  };

  Vue.prototype.successImage = function () {
    var gifs = [
    'https://media.giphy.com/media/nXxOjZrbnbRxS/giphy.gif',
    'https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif',
    'https://media.giphy.com/media/geslvCFM31sFW/giphy.gif',
    'https://media.giphy.com/media/vmon3eAOp1WfK/giphy.gif',
    'https://media.giphy.com/media/WUq1cg9K7uzHa/giphy.gif',
    'https://media.giphy.com/media/NbXTwsoD7hvag/giphy.gif',
    'https://media.giphy.com/media/GCvktC0KFy9l6/giphy.gif',
    'https://media.giphy.com/media/8xSnw21AM7OQo/giphy.gif',
    'https://media.giphy.com/media/d2YV5Qqb5n1WOwCs/giphy.gif',
    'https://media.giphy.com/media/1dagNhv8Oqu6l8U3ZK/source.gif',
    'https://media.giphy.com/media/l0MYxef0mpdcnQnvi/giphy.gif',
    'https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif',
    'https://media.giphy.com/media/wIIEhq3uoiTdabD2pv/giphy.gif',
    'https://media.giphy.com/media/EcUs5ri6QmzaU/giphy.gif',
    'https://i.pinimg.com/originals/d6/7b/af/d67baffb519cab66bf603e565d9298f1.gif',
    'https://media.giphy.com/media/DYH297XiCS2Ck/giphy.gif',
    'https://media.giphy.com/media/31lPv5L3aIvTi/giphy.gif',
    'https://media.giphy.com/media/kEKcOWl8RMLde/giphy.gif'
    ];
  
    if(gifs[this.antal]){
      return gifs[this.antal];
    }
    return gifs[Math.floor(Math.random()*gifs.length)];
    }
  }
}

var SaveAndRestore = {
  "install": function (Vue, options) {
    Vue.mixin({
      data: function(){
        return {"email":""};
      },
      methods: {
        save: function() {
          localStorage.setItem(this.taskname+this.email,JSON.stringify(this.$data))
        },
        getemail: function(){
          return window.localStorage["email"];
        },
        setemail: function(){
          localStorage.setItem("email", this.email);
        },
        restore: function () {
          if(window.localStorage[this.taskname+this.email]){
            var myApp = this;
            var stored = JSON.parse(window.localStorage[this.taskname+this.email]);
            myApp.questions = stored.questions;
            myApp.antal = stored.antal;
          }
        },
        handinlink: function(){
          return 'https://train.ltgee.se/kodstatus.html#'+btoa(this.taskname+'-'+this.email+'-'+this.questions);
        },
        reset: function(){
          localStorage.removeItem(this.taskname+this.email);
          alert('Laddaom sidan för att återställa helt');
        }
      },
      created: function () {
         this.next();
      },
      mounted: function(){
        try {
          this.email = window.location.href.split("?")[1].split("email=")[1].split("&")[0]
        } catch (error) {
          cmail = this.getemail();
          this.email = prompt("Fyll i din e-post adress:", cmail);
        }
        this.setemail();
        this.restore();
      },
    })
  }
}

function onSignIn(result) {
  console.log(result);
  var profile = JSON.parse(atob(result.credential.split(".")[1]));
  app.email = profile.email;
  app.restore();
}
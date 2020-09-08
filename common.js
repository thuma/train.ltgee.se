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
          localStorage.setItem(this.taskname,JSON.stringify(this.$data))
        },
        handinlink: function(){
          return 'https://script.google.com/a/macros/educ.goteborg.se/s/AKfycbx2w--Ik14mFi79rob0DA5QgFnNtOEejjAsvq-ll8WWaskVlv0/exec?page=kod&kod='+btoa(this.taskname+'-'+this.email+'-'+this.questions);
        },
        reset: function(){
          localStorage.removeItem(this.taskname);
          alert('Laddaom sidan för att återställa helt');
        }
      },
      created: function () {
        if(window.localStorage[this.taskname]){
          var myApp = this;
          var stored = JSON.parse(window.localStorage[this.taskname]);
          Object.keys(stored).forEach(function (field){
            myApp[field] = stored[field];
          });
        }
        else {
         this.next();
        }
      }
    })
  }
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  app.email = profile.getEmail();
}
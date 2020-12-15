


document.addEventListener('DOMContentLoaded', function() {
    var but = document.getElementById("submit_button");
    console.log(but);
    but.addEventListener('click',function clickHandler(e){

        if(document.getElementById("email").checkValidity() == true){
            e.preventDefault();
            var self = this;
            setTimeout(function(){
                self.className = 'loading';
            },125);

            setTimeout(function(){
                self.className = 'ready';
            },4300);
        }

        

    },false);

});

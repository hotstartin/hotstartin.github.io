jQuery(document).ready(function($) {
  "use strict";

  //Contact
  $('form.contactForm').submit(function() {
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (!i.attr('checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    else var str = $(this).serialize();
    // $.ajax({
    //   type: "POST",
    //   url: "contactform/contactform.php",
    //   data: str,
    //   success: function(msg) {
    //     // alert(msg);
    //     if (msg == 'OK') {
    //       $("#sendmessage").addClass("show");
    //       $("#errormessage").removeClass("show");
    //       $('.contactForm').find("input, textarea").val("");
    //     } else {
    //       $("#sendmessage").removeClass("show");
    //       $("#errormessage").addClass("show");
    //       $('#errormessage').html(msg);
    //     }

    //   }
    // });
    jQuery.support.cors = true;
    var phone = $("#phone").val();
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();

    $.ajax({
        // url:"http://localhost:3000",
        url:"https://79w0g9yxe0.execute-api.us-east-1.amazonaws.com/prod",
        dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
        async: false,
        cache: false,
        type:"GET",
        crossDomain: true,
        jsonpCallback: "sendmail",
        data: { "phone":phone, "name":name, "email":email, "message":message,format: "json" },
        success:function(json){
          // console.log("success");
          // console.log(json);
          // if (json.success==true) {
            $('.contactForm').find("input, textarea").val("");
            $("#errormessage").hide();
            $("#sendmessage").show();
            // } else {
              // $("#sendmessage").removeClass("show");
              // $("#errormessage").addClass("show");
              // $('#errormessage').html("Express Request Error!");
              // }
            },
            error:function(xhr, status, msg){
              $("#sendmessage").hide();
              $("#errormessage").show();
              // console.log(xhr);
              console.log(status);
              console.log(msg);
              // $("#sendmessage").removeClass("show");
              // $("#errormessage").addClass("show");
              // $('#errormessage').html("Some Error Occured! Please try sending us email on info@hotstart.in");
        }  
        
    });
    return false;
  });

});

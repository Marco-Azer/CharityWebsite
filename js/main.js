/**
 * Created by marcoazer on 2016-10-30.
 */

$(function(){
    // Navigators animation
        $('#nav li').hover(function () {
            $(this).css(
                {
                    'padding-bottom': '7px',
                    'border-bottom': "solid white 2px"
                }
            ).animate({
                'padding-bottom': '1px'
            }, 250);
        },
        function(){
            $(this).css({
                'border-bottom': '0px'
            })
        });

        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 750);
                    return false;
                }
            }
        });

        $('#LearnMore').click(function(){
            $('html, body').animate({
                scrollTop: $('#About').offset().top
            }, 750);
            return false;
        });

        $(window).bind('scroll', function(){
            if($(window).scrollTop() > 50){
                $('navigator').css({
                    'position': 'fixed'
                });
            }
            else{
                $('navigator').css({
                    'position': 'relative'
                });
            }
        });

        var allowedItems = [
            "./images/clothes.png",
            "./images/toys.jpg",
            "./images/bags.png",
            "./images/shoes.jpg",
            "./images/accessories.jpg",
            "./images/linens.jpg"
        ];

        var allowedImagesNum = allowedItems.length;
        var allowedImagesIndex = 1;

        function allowedImageCollage(){
            $('#AllowedCollage').fadeOut(2000, function(){
                $(this).attr('src', allowedItems[allowedImagesIndex]).fadeIn(2000, function(){
                    allowedImagesIndex = (allowedImagesIndex + 1) % allowedImagesNum;
                });
            });
        }

        setInterval(allowedImageCollage, 4000);

        var nonAllowedItems = [
            './images/no-lotions.jpg',
            './images/no-makeup.jpg',
            './images/no-hand-sanitizer.jpg',
            './images/no-perfumes.jpg',
            './images/no-soap.png'
        ];

        var nonAllowedImagesNum = nonAllowedItems.length;
        var nonAllowedImagesIndex = 1;

        function nonAllowedImageCollage(){
            $('#NonAllowedCollage').fadeOut(2000, function(){
                $(this).attr('src', nonAllowedItems[nonAllowedImagesIndex]).fadeIn(2000,function(){
                    nonAllowedImagesIndex = (nonAllowedImagesIndex + 1) % nonAllowedImagesNum;
                });
            });
        }

        setInterval(nonAllowedImageCollage, 4000);

        var validateInput = function (regExp, str) {
            return regExp.test(str);
        };

        $('.ma-input').on('input', function(){
            $('#SubmitMessage').css({
                'visibility': 'hidden'
            });
            $(this).removeClass('has-warning');
        });

        // Submit button
        $('#submit').click(function(){
            // Reset from previous press
            var nameRegex = /^([A-Z]|[a-z])+ ([A-Z]|[a-z])+ *$/;
            var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var phoneRegex = /^\+?[0-9]+$/;
            var messageRegex = /.+/;

            if(!validateInput(nameRegex, $('#name').val())){
                $('#name').addClass('has-warning');
                $('#SubmitMessage').html('Please enter full name').css({
                    'background-color': 'red',
                    'visibility': 'visible'
                });
                return;
            }
            else{
                $('#name').removeClass('has-warning');
            }

            if(!validateInput(emailRegex, $('#email').val())){
                $('#email').addClass('has-warning');
                $('#SubmitMessage').html('Please enter valid email address').css({
                    'background-color': 'red',
                    'visibility': 'visible'
                });
                return;
            }
            else{
                $('#email').removeClass('has-warning');
            }
            if(!validateInput(phoneRegex, $('#phone').val())){
                $('#phone').addClass('has-warning');
                $('#SubmitMessage').html('Please enter a valid phone number').css({
                    'background-color': 'red',
                    'visibility': 'visible'
                });
                return;
            }
            else{
                $('#phone').removeClass('has-warning');
            }

            console.log($('#message').val());

            if(!validateInput(messageRegex, $('#message').val())){
                $('#message').addClass('has-warning');
                $('#SubmitMessage').html('Please enter a message').css({
                    'background-color': 'red',
                    'visibility': 'visible'
                });
                return;
            }
            else{
                $('#message').removeClass('has-warning');
            }

            // Valid Inputs
            $('#SubmitMessage').css({
                'visibility': 'hidden'
            });

            $.ajax({
                type: "POST",
                url: 'http://35.162.118.191:80/email',
                data: {
                    'name': $('#name').val(),
                    'email': $('#email').val(),
                    'phone': $('#phone').val(),
                    'message': $('#message').val()
                },
                success: function(){
                    $('#SubmitMessage').html('Message is sent').css({
                        'background-color': 'green',
                        'visibility': 'visible'
                    });
                    $('#name').val('');
                    $('#email').val('');
                    $('#phone').val('');
                    $('#message').val('');
                }
                ,
                fail: function () {
                    $('#SubmitMessage').html('Message is not sent').css({
                        'visibility': 'visible'
                    });
                }
            });

        });
    }
);

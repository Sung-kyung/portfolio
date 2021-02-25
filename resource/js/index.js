$(function () {
    $(".slider-div").slick({
      slide: "div", //슬라이드 되어야 할 태그 ex) div, li
    //   infinite: true, //무한 반복 옵션
      slidesToShow: 5, // 한 화면에 보여질 컨텐츠 개수
      slidesToScroll: 1, //스크롤 한번에 움직일 컨텐츠 개수
      speed: 100, // 다음 버튼 누르고 다음 화면 뜨는데까지 걸리는 시간(ms)
      arrows: true, // 옆으로 이동하는 화살표 표시 여부
      dots: false, //크롤바 아래 점으로 페이지네이션 여부
      autoplay: false, // 자동 스크롤 사용 여부
      autoplaySpeed: 10000, // 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
      pauseOnHover: true, // 슬라이드 이동	시 마우스 호버하면 슬라이더 멈추게 설정
      vertical: false, // 세로 방향 슬라이드 옵션
      draggable: true, //드래그 가능 여부
    });
  });
  
  $(document).ready(function () {
    var $topBar = $(".top-bar");

    var windowHeight = $(window).height();

    $(window).resize(function () {
        windowHeight = $(window).height();
    });

    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();

        if (scrollTop > 0) {
            $topBar.addClass("show");
        } else {
            $topBar.removeClass("show");
        }
    });
});

function ActiveOnVisible__initOffset() {
    $(".active-on-visible").each(function (index, node) {
        var $node = $(node);

        var offsetTop = $node.offset().top;
        $node.attr("data-active-on-visible-offsetTop", offsetTop);

        if (!$node.attr("data-active-on-visible-diff-y")) {
            $node.attr("data-active-on-visible-diff-y", "0");
        }

        if (!$node.attr("data-active-on-visible-delay")) {
            $node.attr("data-active-on-visible-delay", "0");
        }
    });

    ActiveOnVisible__checkAndActive();
}

function ActiveOnVisible__checkAndActive() {
    $(".active-on-visible").each(function (index, node) {
        var $node = $(node);

        var offsetTop = parseInt(
            $node.attr("data-active-on-visible-offsetTop")
        );
        var diffY = parseInt($node.attr("data-active-on-visible-diff-y"));
        var delay = parseInt($node.attr("data-active-on-visible-delay"));

        if ($(window).scrollTop() + $(window).height() + diffY > offsetTop) {
            setTimeout(function () {
                $node.addClass("active");
            }, delay);
        }
    });
}

//contact 실행
function sendEmailFormSubmit(form) {
    if (form.receiverName.value.length == 0) {
        alert('폼안에 receiverName 의 value 를 입력해주세요.');
        return false;
    }

    if (form.receiverEmail.value.length == 0) {
        alert('폼안에 receiverEmail 의 value 를 입력해주세요.');
        return false;
    }

    form.senderName.value = form.senderName.value.trim();

    if (form.senderName.value.length == 0) {
        alert('당신의 이름을 입력해주세요.');
        form.senderName.focus();
        return false;
    }

    form.senderEmail.value = form.senderEmail.value.trim();

    if (form.senderEmail.value.length == 0) {
        alert('당신의 이메일을 입력해주세요.');
        form.senderEmail.focus();
        return false;
    }

    form.body.value = form.body.value.trim();

    if (form.body.value.length == 0) {
        alert('내용을 입력해주세요.');
        form.body.focus();
        return false;
    }

    var senderName = form.senderName.value;
    var senderEmail = form.senderEmail.value;
    var title = '[이력서 보고 연락 드립니다]';
    var body = nl2br(form.body.value);
    var receiverName = form.receiverName.value;
    var receiverEmail = form.receiverEmail.value;

    var url = 'https://email.oa.gg/doSendEmail2.php?senderName=' + senderName + '&senderEmail=' + senderEmail + '&receiverName=' + receiverName + '&receiverEmail=' + receiverEmail + '&title=' + title + '&body=' + body;

    //console.log("URL : " + url);

    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}

function nl2br(str) {
    return str.replace(/\n/g, "<br />");
}

function Email__callback(data) {
    if (data.resultCode.substr(0, 2) == 'S-') {
        document.sendEmailForm.reset();
    }

    alert(data.msg);
}


$(function () {
  // 스크롤 이벤트
  ActiveOnVisible__initOffset();

  setTimeout(function () {
      ActiveOnVisible__checkAndActive();
  }, 100);

  $(window).resize(ActiveOnVisible__initOffset);
  $(window).scroll(ActiveOnVisible__checkAndActive);
});
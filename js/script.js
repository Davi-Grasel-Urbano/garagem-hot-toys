$(document).ready(function () {
  // Progress Bar
  let containerA = document.getElementById("circleA");

  let circleA = new ProgressBar.Circle(containerA, {
    color: "rgba(208, 188, 3, 1)",
    strokeWidth: 8,
    duration: 1400,
    from: { color: "rgba(150, 0, 0, 1)" },
    to: { color: "rgba(208, 188, 3, 1)" },

    step: function (state, circle) {
      circle.path.setAttribute("stroke", state.color);

      let value = Math.round(circle.value() * 60);

      circle.setText(value);
    },
  });
  let containerB = document.getElementById("circleB");

  let circleB = new ProgressBar.Circle(containerB, {
    color: "rgba(208, 188, 3, 1)",
    strokeWidth: 8,
    duration: 1600,
    from: { color: "rgba(150, 0, 0, 1)" },
    to: { color: "rgba(208, 188, 3, 1)" },

    step: function (state, circle) {
      circle.path.setAttribute("stroke", state.color);

      let value = Math.round(circle.value() * 54);

      circle.setText(value);
    },
  });
  let containerC = document.getElementById("circleC");

  let circleC = new ProgressBar.Circle(containerC, {
    color: "rgba(208, 188, 3, 1)",
    strokeWidth: 8,
    duration: 2000,
    from: { color: "rgba(150, 0, 0, 1)" },
    to: { color: "rgba(208, 188, 3, 1)" },

    step: function (state, circle) {
      circle.path.setAttribute("stroke", state.color);

      let value = Math.round(circle.value() * 9);

      circle.setText(value);
    },
  });
  let containerD = document.getElementById("circleD");

  let circleD = new ProgressBar.Circle(containerD, {
    color: "rgba(208, 188, 3, 1)",
    strokeWidth: 8,
    duration: 2200,
    from: { color: "rgba(150, 0, 0, 1)" },
    to: { color: "rgba(208, 188, 3, 1)" },

    step: function (state, circle) {
      circle.path.setAttribute("stroke", state.color);

      let value = Math.round(circle.value() * 72839);

      circle.setText(value);
    },
  });

  // Iniciar animação quando o usuário rolar a página

  let dataAreaOffset = $("#data-area").offset();
  let stop = 0;

  $(window).scroll(function (e) {
    let scroll = $(window).scrollTop();

    if (scroll > dataAreaOffset.top - 400 && stop == 0) {
      circleA.animate(1.0);
      circleB.animate(1.0);
      circleC.animate(1.0);
      circleD.animate(1.0);

      stop = 1;
    }
  });

  // Parallax
  setTimeout(function () {
    $("#data-area").parallax({ imageSrc: "img/bannertest.png" });
    $("#apply-area").parallax({ imageSrc: "img/galaxia.png" });
  }, 250);
});

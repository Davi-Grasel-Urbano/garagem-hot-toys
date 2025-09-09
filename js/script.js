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

  // Função auto-executada para evitar poluir o escopo global
  (function () {
    // Atualiza o conteúdo textual do card com base no slide ativo
    function applySlideData($carousel) {
      // Pega qual card deve ser atualizado (ex.: "#info-chopeiras")
      var infoSelector = $carousel.data("target-info");

      // Slide ativo
      var $active = $carousel.find(".carousel-item.active");

      // Lê os atributos de dados do slide
      var title = $active.data("title") || "";
      var desc = $active.data("desc") || "";
      var price = $active.data("price") || "";
      var p1 = $active.data("p1") || "";
      var p2 = $active.data("p2") || "";
      var p3 = $active.data("p3") || "";

      // Atualiza os elementos dentro do card
      var $info = $(infoSelector);
      if (!$info.length) return;

      $info.find(".product-title").text(title);
      $info.find(".product-desc").text(desc);
      $info.find(".price-value").text(price);
      $info.find(".feature-1").text(p1);
      $info.find(".feature-2").text(p2);
      $info.find(".feature-3").text(p3);
    }

    // Para cada carrossel de produto...
    $(".product-carousel").each(function () {
      var $c = $(this);

      // Aplica os dados iniciais (primeiro slide)
      applySlideData($c);

      // Quando mudar de slide, atualiza
      $c.on("slid.bs.carousel", function () {
        applySlideData($c);
      });
    });
  })();

  (function () {
    // Se quiser incluir o herói do topo, mantenha #mainSlider aqui
    var $carousels = $("#mainSlider, .product-carousel");

    // Define (ou respeita) o intervalo de cada carrossel
    $carousels.each(function () {
      var $el = $(this);
      var interval = $el.data("interval") || 5000; // 5s por padrão
      $el.carousel({ interval: interval });
      $el.carousel("pause"); // começa pausado
    });

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            var $el = $(entry.target);
            // visível o suficiente? (≈ metade do bloco)
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              $el.carousel("cycle");
            } else {
              $el.carousel("pause");
            }
          });
        },
        {
          root: null,
          threshold: [0, 0.25, 0.5, 0.75, 1],
          rootMargin: "0px",
        }
      );

      $carousels.each(function () {
        io.observe(this);
      });
    } else {
      // Fallback simples para navegadores sem IntersectionObserver
      function check() {
        var vh = window.innerHeight || document.documentElement.clientHeight;
        $carousels.each(function () {
          var el = this;
          var rect = el.getBoundingClientRect();
          var visibleH = Math.max(
            0,
            Math.min(rect.bottom, vh) - Math.max(rect.top, 0)
          );
          var ratio = visibleH / Math.max(1, rect.height);
          var $el = $(el);
          if (ratio >= 0.5) $el.carousel("cycle");
          else $el.carousel("pause");
        });
      }
      $(window).on("scroll resize", check);
      check();
    }

    // Pausa tudo quando a aba/janela perde foco (economia de CPU)
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) $carousels.carousel("pause");
    });
  })();
});

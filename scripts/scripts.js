// Footer updates the year
const newDate = new Date();
const currentFullYear = newDate.getFullYear();
const footerText = document.getElementById("footer-text");
footerText.innerHTML = "© 2019–" + currentFullYear;

// menu text animations triggered on hamburger click
window.onload = showThemColors();
function showThemColors() {
  const rfx1 = document.querySelector("#rfx1");
  const rfx2 = document.querySelector("#rfx2");
  const rfx3 = document.querySelector("#rfx3");
  const rfx4 = document.querySelector("#rfx4");
  const menutogglerjs = document.querySelector("#menu-toggler-js");
  const numSelect = document.querySelector("#num1");
  const numSelect2 = document.querySelector("#num2");
  const numSelect3 = document.querySelector("#num3");
  const numSelect4 = document.querySelector("#num4");
  const textWrapper = document.querySelector(".ml10 .letters");
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );

  const revealSettings = {
    bgColors: ["#0a0f2c"],
    duration: 600,
    delay: 0,
    direction: "tb",
    onStart: function (contentEl, revealerEl) {
      contentEl.style.opacity = 0;
    },
    onHalfway: function (contentEl, revealerEl) {
      contentEl.style.opacity = 1;
    },
    onComplete: function (contentEl) {},
  };

  const revealSettings2 = {
    bgColors: ["#0a0f2c"],
    duration: 666,
    delay: 0,
    direction: "tb",
    onStart: function (contentEl, revealerEl) {
      contentEl.style.opacity = 0;
    },
    onHalfway: function (contentEl, revealerEl) {
      contentEl.style.opacity = 1;
    },
    onComplete: function () {},
  };

  const revealSettings3 = {
    bgColors: ["#0a0f2c"],
    duration: 728,
    delay: 0,
    direction: "tb",
    onStart: function (contentEl, revealerEl) {
      contentEl.style.opacity = 0;
    },
    onHalfway: function (contentEl, revealerEl) {
      contentEl.style.opacity = 1;
    },
    onComplete: function () {},
  };

  const revealSettings4 = {
    bgColors: ["#0a0f2c"],
    duration: 794,
    delay: 0,
    direction: "tb",
    onStart: function (contentEl, revealerEl) {
      contentEl.style.opacity = 0;
    },
    onHalfway: function (contentEl, revealerEl) {
      contentEl.style.opacity = 1;
    },
    onComplete: function () {},
  };

  const revealerEffect1 = new RevealFx(rfx1, {
    layers: 1,
    isContentHidden: true,
    revealSettings: revealSettings,
  });

  const revealerEffect2 = new RevealFx(rfx2, {
    layers: 1,
    isContentHidden: true,
    revealSettings: revealSettings2,
  });
  const revealerEffect3 = new RevealFx(rfx3, {
    layers: 1,
    isContentHidden: true,
    revealSettings: revealSettings3,
  });
  const revealerEffect4 = new RevealFx(rfx4, {
    layers: 1,
    isContentHidden: true,
    revealSettings: revealSettings4,
  });

  menutogglerjs.onclick = function menuOpens() {
    revealSettings.easing = "cubicBezier(0.19, 1, 0.22, 1)";
    revealSettings2.easing = "cubicBezier(0.19, 1, 0.22, 1)";
    revealSettings3.easing = "cubicBezier(0.19, 1, 0.22, 1)";
    revealSettings4.easing = "cubicBezier(0.19, 1, 0.22, 1)";
    revealerEffect1.reveal(revealSettings);
    revealerEffect2.reveal(revealSettings2);
    revealerEffect3.reveal(revealSettings3);
    revealerEffect4.reveal(revealSettings4);

    numSelect.classList.toggle("translate-number");
    numSelect2.classList.toggle("translate-number2");
    numSelect3.classList.toggle("translate-number3");
    numSelect4.classList.toggle("translate-number4");

    anime.timeline({ loop: false }).add({
      targets: ".ml10 .letter",
      translateX: ["10rem", 0],
      duration: 3000,
      easing: "easeOutExpo",
      delay: (el, i) => 50 * i,
    });
  };
}

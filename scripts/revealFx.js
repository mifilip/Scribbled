(function(window) {
  "use strict";
  function extend(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }
  function createDOMEl(type, className, content) {
    var el = document.createElement(type);
    el.className = className || "";
    el.innerHTML = content || "";
    return el;
  }
  function createStyleForDOMEL(
    el,
    position,
    top,
    left,
    width,
    height,
    color,
    background,
    opacity,
    pointerEvents,
    zIndex
  ) {
    el.style.position = position || "absolute";
    el.style.top = top || "0";
    el.style.left = left || "0";
    el.style.color = color || "#fff";
    el.style.width = width || "100%";
    el.style.height = height || "100%";
    el.style.backgroundColor = background || "#f0f0f0";
    el.style.opacity = opacity || "0";
    el.style.pointerEvents = pointerEvents || "none";
    el.style.zIndex = zIndex || 0;
  }
  function RevealFx(el, options) {
    this.el = el;
    this.revealLayers = [];
    this.options = extend({}, this.options);
    extend(this.options, options);
    this._init();
  }
  RevealFx.prototype.options = {
    isContentHidden: true,
    layers: 1,
    revealSettings: {
      direction: "lr",
      bgColors: ["#111"],
      duration: 500,
      easing: "easeInOutQuint",
      coverArea: 0,
      delay: 100,
      onHalfway: function(contentEl, revealerEl) {
        return false;
      },
      onStart: function(contentEl, revealerEl) {
        return false;
      },
      onComplete: function(contentEl, revealerEl) {
        return false;
      }
    }
  };
  RevealFx.prototype._init = function() {
    this._layout();
  };
  RevealFx.prototype._layout = function() {
    var position = getComputedStyle(this.el).position;
    if (
      position !== "fixed" &&
      position !== "absolute" &&
      position !== "relative"
    ) {
      this.el.style.position = "relative";
    }
    var heightOfEl = 100;
    var widthOfEl = 100;
    this.content = createDOMEl(
      "div",
      "block-revealer__content",
      this.el.innerHTML
    );
    if (this.options.isContentHidden) {
      this.content.style.opacity = 0;
    }
    this.el.innerHTML = "";
    this.el.appendChild(this.content);
    var topOfRevealerElement = 0;
    var leftOfRevalerElement = 0;
    const numberOfLayers = this.options.layers;
    var colorOfBlockLayer = "#111";
    for (var i = 0; i < numberOfLayers; i++) {
      this.revealLayers.push(createDOMEl("div", "block-revealer__element"));
      if (this.options.revealSettings.bgColors[i])
        colorOfBlockLayer = this.options.revealSettings.bgColors[i];
      else colorOfBlockLayer = "#111111";
      if (
        this.options.revealSettings.direction === "tb" ||
        this.options.revealSettings.direction === "bt"
      ) {
        var widthOfIndividualBlock = widthOfEl / numberOfLayers;
        createStyleForDOMEL(
          this.revealLayers[i],
          "absolute",
          "0%",
          leftOfRevalerElement + "%",
          widthOfIndividualBlock + "%",
          "100%",
          "#fff",
          colorOfBlockLayer,
          "0",
          "none"
        );
        leftOfRevalerElement = leftOfRevalerElement + widthOfIndividualBlock;
      } else {
        var heightOfIndividualBlock = heightOfEl / numberOfLayers;
        createStyleForDOMEL(
          this.revealLayers[i],
          "absolute",
          topOfRevealerElement + "%",
          "0%",
          "100%",
          heightOfIndividualBlock + 0.5 + "%",
          "#fff",
          colorOfBlockLayer,
          "0",
          "none"
        );
        topOfRevealerElement = topOfRevealerElement + heightOfIndividualBlock;
      }
      this.el.classList.add("block-revealer");
      this.el.appendChild(this.revealLayers[i]);
    }
  };
  RevealFx.prototype._getTransformSettings = function(direction) {
    var origin, origin_2, val;
    switch (direction) {
      case "lr":
        val = "scaleY(1)";
        origin = "0 50%";
        origin_2 = "100% 50%";
        break;
      case "rl":
        val = "scaleY(1)";
        origin = "100% 50%";
        origin_2 = "0 50%";
        break;
      case "tb":
        val = "scaleX(1)";
        origin = "50% 0";
        origin_2 = "50% 100%";
        break;
      case "bt":
        val = "scaleX(1)";
        origin = "50% 100%";
        origin_2 = "50% 0";
        break;
      default:
        val = "scaleY(1)";
        origin = "0 50%";
        origin_2 = "100% 50%";
        break;
    }
    return {
      val: val,
      origin: {
        initial: origin,
        halfway: origin_2
      }
    };
  };
  RevealFx.prototype.reveal = function(revealSettings) {
    if (this.isAnimating) {
      return false;
    }
    this.isAnimating = true;
    var defaults = {
        duration: 500,
        easing: "easeInOutQuint",
        delay: 100,
        bgColors: ["#111111"],
        direction: "lr",
        coverArea: 0
      },
      revealSettings = revealSettings || this.options.revealSettings,
      direction = revealSettings.direction || defaults.direction,
      delay = revealSettings.delay || defaults.delay,
      transformSettings = this._getTransformSettings(direction);
    for (var i = 0; i < this.revealLayers.length; i++) {
      this.revealLayers[i].style.WebkitTransform = this.revealLayers[
        i
      ].style.transform = transformSettings.val;
      this.revealLayers[i].style.WebkitTransformOrigin = this.revealLayers[
        i
      ].style.transformOrigin = transformSettings.origin.initial;
      this.revealLayers[i].style.opacity = 1;
      if (revealSettings.bgColors[i])
        this.revealLayers[i].style.backgroundColor = revealSettings.bgColors[i];
      else this.revealLayers[i].style.backgroundColor = defaults.bgColors[0];
    }
    var self = this,
      animationSettings_2 = {
        targets: self.revealLayers,
        delay: anime.stagger(parseInt(delay)),
        complete: function(anim) {
          if (typeof revealSettings.onComplete === "function") {
            revealSettings.onComplete(self.content, self.revealLayers);
          }
          self.isAnimating = false;
        }
      },
      animationSettings = {
        targets: self.revealLayers,
        delay: anime.stagger(parseInt(delay)),
        complete: function() {
          for (var i = 0; i < self.revealLayers.length; i++) {
            self.revealLayers[
              i
            ].style.WebkitTransformOrigin = self.revealLayers[
              i
            ].style.transformOrigin = transformSettings.origin.halfway;
          }
          if (typeof revealSettings.onHalfway === "function") {
            revealSettings.onHalfway(self.content, self.revealLayers);
          }
          anime(animationSettings_2);
        }
      };
    animationSettings.duration = animationSettings_2.duration =
      revealSettings.duration || defaults.duration;
    animationSettings.easing = animationSettings_2.easing =
      revealSettings.easing || defaults.easing;
    var coverArea = revealSettings.coverArea || defaults.coverArea;
    if (direction === "lr" || direction === "rl") {
      animationSettings.scaleX = [0, 1];
      animationSettings_2.scaleX = [1, coverArea / 100];
    } else {
      animationSettings.scaleY = [0, 1];
      animationSettings_2.scaleY = [1, coverArea / 100];
    }
    if (typeof revealSettings.onStart === "function") {
      revealSettings.onStart(self.content, self.revealLayers);
    }
    anime(animationSettings);
  };
  window.RevealFx = RevealFx;
})(window);

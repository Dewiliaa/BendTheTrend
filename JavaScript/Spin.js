  /**
 * Prize data will space out evenly on the deal wheel based on the amount of items available.
 * @param text [string] name of the prize
 * @param color [string] background color of the prize
 * @param reaction ['resting' | 'dancing' | 'laughing' | 'shocked'] Sets the reaper's animated reaction
 */

  // Array for prize and colors
  const prizes = [
    {
      text: "10% Off Capped at $10",
      color: "hsl(197 30% 43%)",
      reaction: "dancing"
    },
    { 
      text: "$50 OFF!",
      color: "hsl(173 58% 39%)",
      reaction: "shocked"
    },
    { 
      text: "Better Luck Next Time!",
      color: "hsl(43 74% 66%)",
      reaction: "shocked" 
    },
    {
      text: "5% Off",
      color: "hsl(27 87% 67%)",
      reaction: "shocked"
    },
    {
      text: "$2 Off Shipping",
      color: "hsl(12 76% 61%)",
      reaction: "dancing"
    },
    {
      text: "Better Luck Next Time!",
      color: "hsl(350 60% 52%)",
      reaction: "laughing"
    },
    {
      text: "Free Shipping",
      color: "hsl(91 43% 54%)",
      reaction: "laughing"
    },
    {
      text: "One Solid Hug",
      color: "hsl(140 36% 74%)",
      reaction: "dancing"
    }
  ];
  
  const wheel = document.querySelector(".deal-wheel");
  const spinner = wheel.querySelector(".spinner");
  const trigger = wheel.querySelector(".btn-spin");
  const ticker = wheel.querySelector(".ticker");
  const reaper = wheel.querySelector(".grim-reaper");
  const prizeSlice = 360 / prizes.length;
  const prizeOffset = Math.floor(180 / prizes.length);
  const spinClass = "is-spinning";
  const selectedClass = "selected";
  const spinnerStyles = window.getComputedStyle(spinner);
  let tickerAnim;
  let rotation = 0;
  let currentSlice = 0;
  let prizeNodes;
  let hasSpun = false;
  
  const createPrizeNodes = () => {
    prizes.forEach(({ text, color, reaction }, i) => {
      const rotation = ((prizeSlice * i) * -1) - prizeOffset;
      
      spinner.insertAdjacentHTML(
        "beforeend",
        `<li class="prize" data-reaction=${reaction} style="--rotate: ${rotation}deg">
          <span class="text">${text}</span>
        </li>`
      );
    });
  };
  
  const createConicGradient = () => {
    spinner.setAttribute(
      "style",
      `background: conic-gradient(
        from -90deg,
        ${prizes
          .map(({ color }, i) => `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`)
          .reverse()
        }
      );`
    );
  };
  
  
  const setupWheel = () => {
    createConicGradient();
    createPrizeNodes();
    prizeNodes = wheel.querySelectorAll(".prize");
  };
  
  const spinertia = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  const runTickerAnimation = () => {
    // https://css-tricks.com/get-value-of-css-rotation-through-javascript/
    const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
    const a = values[0];
    const b = values[1];  
    let rad = Math.atan2(b, a);
    
    if (rad < 0) rad += (2 * Math.PI);
    
    const angle = Math.round(rad * (180 / Math.PI));
    const slice = Math.floor(angle / prizeSlice);
  
    if (currentSlice !== slice) {
      ticker.style.animation = "none";
      setTimeout(() => ticker.style.animation = null, 10);
      currentSlice = slice;
    }
  
    tickerAnim = requestAnimationFrame(runTickerAnimation);
  };
  
  const selectPrize = () => {
    const selected = Math.floor(rotation / prizeSlice);
    prizeNodes[selected].classList.add(selectedClass);
    reaper.dataset.reaction = prizeNodes[selected].dataset.reaction;

    // Trigger event based on the selected prize
  const selectedPrize = prizes[selected];
  if (selectedPrize.text === "10% Off Capped at $10") {
    alert("Congratulations! Apply the code to your next order and get 10% Off Capped at $10!\nCode: Get10off");
  } else if (selectedPrize.text === "$50 OFF!") {
    alert("Jackpot! Apply the code to your next order and get $50 Off!\nCode: OnceInALifeTime");
  } else if (selectedPrize.text === "Better Luck Next Time!") {
    alert("Aww Try Again Next Time :>");
  } else if (selectedPrize.text === "5% Off") {
    alert("Here you go! Apply the code to your next order and get 5% Off Capped at $5!\nCode: Off5");
  } else if (selectedPrize.text === "$2 Off Shipping") {
    alert("Woohoo :> Apply the code to your next order and get $2 off shipping\nCode: 2OffShipping");
  } else if (selectedPrize.text === "Free Shipping") {
    alert("Yay to free shipping! Apply the code to your next order and get free shipping\nCode: ShipFree24");
  } else if (selectedPrize.text === "One Solid Hug") {
    alert("Aww, Hugs & Kisses xoxo");
  }
};
  
trigger.addEventListener("click", () => {
  if (hasSpun) {
    // If user has already spun, do nothing
    return;
  }

  if (reaper.dataset.reaction !== "resting") {
    reaper.dataset.reaction = "resting";
  }
  
    trigger.disabled = true;
    rotation = Math.floor(Math.random() * 360 + spinertia(2000, 5000));
    prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
    wheel.classList.add(spinClass);
    spinner.style.setProperty("--rotate", rotation);
    ticker.style.animation = "none";
    runTickerAnimation();
  

  hasSpun = true;
});
  
  spinner.addEventListener("transitionend", () => {
    cancelAnimationFrame(tickerAnim);
    trigger.disabled = false;
    trigger.focus();
    rotation %= 360;
    selectPrize();
    wheel.classList.remove(spinClass);
    spinner.style.setProperty("--rotate", rotation);
});
  
  setupWheel();
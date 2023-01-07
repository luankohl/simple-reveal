class Reveal {
  #elements
  #disabled = false
  #windowHeight
  visibilityDistance = 120
  transitionTime = 0.4
  distanceToTransition = 50
  screenSizeToDisableAnimations = 768

  constructor(props) {
    this.#elements = document.querySelectorAll(".reveal")
    this.#windowHeight = window.innerHeight

    this.#validateProps(props)

    this.#run()
  }

  // Fade In
  #reveal(element) {
    if (element.dataset.delay) {
      setTimeout(() => {
        element.classList.add("revealed")
      }, parseInt(element.dataset.delay))
    } else {
      element.classList.add("revealed")
    }
  }

  // Fade out
  #unreveal(element) {
    element.classList.remove("revealed")
  }

  // Animates the elements if is the correct moment
  #animate() {
    if (!this.#disabled) {
      for (let i = 0; i < this.#elements.length; i++) {
        const element = this.#elements[i]
  
        if (
          element.getBoundingClientRect().top <
          this.#windowHeight - this.visibilityDistance
        ) {
          this.#reveal(element)
        } else {
          this.#unreveal(element)
        }
      }
    }
  }

  // Inserts mandatory styles to work correctly
  #prepareStyles() {
    const head = document.head || document.getElementsByTagName("head")[0]
    let style = document.createElement("style")
    const css = `
      @media screen and (min-width: ${this.screenSizeToDisableAnimations + 1}px) {
        .reveal {
          opacity: 0;
          visibility: hidden;
          transform: translate3d(0, ${this.distanceToTransition}px, 0);
          transition: all ${this.transitionTime}s ease-in-out 0s;
        }
        
        .reveal.revealed {
          opacity: 1;
          visibility: visible;
          transform: translate3d(0, 0, 0);
        }
      }
    `

    head.appendChild(style)
    style.type = "text/css"
    if (style.styleSheet) {
      style.styleSheet.cssText = css
    } else {
      style.appendChild(document.createTextNode(css))
    }
  }

  // Validate constructor props
  #validateProps(props) {
    if (props) {
      if (typeof props !== "object") {
        throw new Error("Invalid Props Format, use Object{} instead.")
      }

      for (let i = 0; i < Object.keys(props).length; i++) {
        const [key, value] = Object.entries(props)[i]
        if (typeof value !== 'number') {
          throw new Error(`Property ${key} needs to be a number (int of float).`)
        }
      }

      this.visibilityDistance = props.visibilityDistance ?? this.visibilityDistance;
      this.transitionTime = props.transitionTime ?? this.transitionTime;
      this.distanceToTransition = props.distanceToTransition ?? this.distanceToTransition;
      this.screenSizeToDisableAnimations = props.screenSizeToDisableAnimations ?? this.screenSizeToDisableAnimations;
    }
  }

  // Used to verify if is needed to disabled animation
  #verifyWindowSize() {
    window.addEventListener('resize', () => {
      this.#windowHeight = window.innerHeight
      if (window.innerWidth < (this.screenSizeToDisableAnimations + 1)) {
        return this.#disabled = true
      }
      return this.#disabled = false
    })
  }

  // Makes it Happen
  #run() {
    this.#prepareStyles()

    setTimeout(() => {
      this.#animate()

      window.addEventListener("scroll", () => {
        this.#animate()
      })

      this.#verifyWindowSize()
    }, 200)

  }
}

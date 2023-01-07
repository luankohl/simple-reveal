# SimpleTilt.js

A simple javascript plugin to reveal elements on scroll.

### Usage

```html
<!DOCTYPE html>
<body style="min-height: 3000px; display: flex; flex-direction: column; gap: 30px;">
  <!-- reveal is a required class on elements that needs to be affected -->
  <div class="div reveal"></div>
  <div class="div reveal"></div>
  <div class="div reveal"></div>
  <div class="div reveal"></div>
  <div class="div reveal"></div>
  <!-- delay dataset is optional -->
  <div class="div reveal" data-delay="200"></div>
  <div class="div reveal" data-delay="400"></div>
  <div class="div reveal" data-delay="600"></div>

  <script src="./reveal.js"></script>

  <script>
    new Reveal({
      visibilityDistance: 120, // Default Value
      transitionTime: 0.4, // Default Value
      distanceToTransition: 50, // Default Value
      screenSizeToDisableAnimations: 768, // Default Value
    });
  </script>
</body>
```

export default {
  methods: {
    showSpinner(show) {
      let spinner = document.getElementById("SPINNER");
      let topbar = document.getElementById("top-bar");
      if (show) {
        spinner.classList.add("--shown");
        topbar.classList.add("--loading");
        // setInterval(() => topbar.classList.add("--loading"), 300);
      } else {
        spinner.classList.remove("--shown");
        spinner.classList.add("--hidden");
        topbar.classList.remove("--loading");
      }
    },
  },
};

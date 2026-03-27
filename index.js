document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll("#nav-tabs .tab");
  const viewport = document.getElementById("viewport");

  tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      // 1. Prevent native page redirect
      e.preventDefault();

      // 2. Clear current visual active states
      tabs.forEach(t => t.classList.remove("active"));

      // 3. Highlight the clicked tab
      tab.classList.add("active");

      // 4. Resolve the target file and push it into the viewport window
      const targetPage = tab.getAttribute("href");
      viewport.src = targetPage;
    });
  });
});

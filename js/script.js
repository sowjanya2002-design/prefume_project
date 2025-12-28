
document.addEventListener("DOMContentLoaded", function () {

  // ================= IMAGE GALLERY ================= //

  const imageList = [
    "https://res.cloudinary.com/dchveeguh/image/upload/v1765797743/a206a3992f8dd3b83e58b96d68af3ba37d448aff_logvcz.png",
    "https://res.cloudinary.com/dchveeguh/image/upload/c_thumb,w_200,g_face/v1765797934/f7d2a29c6a0c7e783b9b54e2b2dd33f72b786b44_blkgye.jpg",
    "https://res.cloudinary.com/dchveeguh/image/upload/c_lfill,g_face,w_200/v1765798025/a8c8f067b9a3a2d097a82012c1bf9fd831a81dcb_ykkeuv.jpg",
    "https://res.cloudinary.com/dchveeguh/image/upload/c_thumb,w_200,g_face/v1765817858/0f17cfd29207b586b6636514f0a6a41abb0984fd_vycn1z.jpg",
    "https://res.cloudinary.com/dchveeguh/image/upload/c_lfill,g_face,w_200/v1765862202/aed0e9a718e6863cb177edc099de63dbd908eb05_w6ft5f.jpg"
  ];

  let activeIndex = 0;
  const mainImg = document.getElementById("mainPerfumeImg");

  function updateGallery(index) {
    if (index >= imageList.length) index = 0;
    if (index < 0) index = imageList.length - 1;

    activeIndex = index;
    mainImg.src = imageList[activeIndex];

    for (let i = 0; i < imageList.length; i++) {
      document.getElementById("dot" + i).classList.remove("active");
    }
    document.getElementById("dot" + activeIndex).classList.add("active");
  }

  document.getElementById("rightArrow").onclick = () => updateGallery(activeIndex + 1);
  document.getElementById("leftArrow").onclick = () => updateGallery(activeIndex - 1);

  for (let i = 0; i < imageList.length; i++) {
    document.getElementById("dot" + i).onclick = () => updateGallery(i);
  }
    // ================= FIX THUMBNAIL CLICK ================= //

  for (let i = 1; i <= 8; i++) {
    const thumb = document.getElementById("thumb" + i);
    if (!thumb) continue;

    thumb.addEventListener("click", function () {
      mainImg.src = this.src;
    });
  }
});

 


// single subcription //

function toggleSingleSubscription() {
  const content = document.getElementById("single-subscription-content");
  const icon = document.getElementById("single-toggle-icon");
  const card = document.getElementById("single-card");

  if (!content) return;

  const isOpen = content.classList.toggle("show-content");

  // single Toggle icon color //
  if (isOpen) {
    icon.classList.add("active");
  } else {
    icon.classList.remove("active");
  }
}


// double subscription //
function toggleDoubleSubscription() {
  const content = document.getElementById("double-subscription-content");
  const btn = document.getElementById("purchase-double");

  if (!content) return;

  const isOpen = content.classList.toggle("show-content");
  // double Toggle icon color//
  if (isOpen) {
    btn.classList.add("active");
  } else {
    btn.classList.remove("active");
  }
}


// our collections section//
function toggleCard(id) {
  const content = document.getElementById(id);
  const icon = document.getElementById("icon-" + id);

  if (!content || !icon) return;

  if (content.style.display === "block") {
    content.style.display = "none";
    icon.textContent = "+";
  } else {
    content.style.display = "block";
    icon.textContent = "−";
  }
}


 //================== PERCENTAGE ANIMATION ================= //

  const section = document.getElementById("percentageSection");
  const counters = [
    document.getElementById("count1"),
    document.getElementById("count2"),
    document.getElementById("count3"),
    document.getElementById("count4")
  ];

  let animated = false;

  function animateCounter(counter) {
    const target = Number(counter.dataset.target);
    const duration = 2000;
    const startTime = performance.now();

    function update(time) {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(eased * target) + "%";

      if (progress < 1) requestAnimationFrame(update);
      else counter.textContent = target + "%";
    }

    requestAnimationFrame(update);
  }

  function startCounters() {
    if (animated) return;
    animated = true;
    counters.forEach(c => c && animateCounter(c));
  }

  if (section) {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        startCounters();
        observer.disconnect();
      }
    }, { threshold: 0.3 });

    observer.observe(section);

    //  fallback if observer doesn't fire //
    setTimeout(startCounters, 1200);
  }


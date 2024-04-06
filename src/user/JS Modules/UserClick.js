const toggleSidebar = (sidebarId) => {
  const sidebar = document.getElementById(sidebarId);
  const containerHeader = document.querySelector(".user-container-header");
  const main = document.getElementById("main");
  const footer = document.querySelector("footer");

  if (sidebar.style.right === "0px") {
    sidebar.style.right = "-26%"; // Hide sidebar if it's already displayed
    containerHeader.style.right = "0"; // Move containerHeader back to its original position
    footer.style.right = "0"; // Move footer back to its original position
    containerHeader.classList.remove("darken");
    main.classList.remove("darken");
    footer.classList.remove("darken");
    main.style.right = "0"; // Move main back to its original position
  } else {
    sidebar.style.right = "0"; // Show sidebar sliding from right to left
    sidebar.classList.toggle("active");
    containerHeader.style.right = "26%"; // Move containerHeader to the right by 26%
    footer.style.right = "26%"; // Move footer to the right by 26%
    containerHeader.classList.toggle("darken");
    main.classList.toggle("darken");
    footer.classList.toggle("darken");
    main.style.right = "26%"; // Push main to the right by 26%
  }
};

export const SearchIconClick = () => {
  toggleSidebar("sidebar-find");
};

export const CartIconClick = () => {
  toggleSidebar("sidebar-cart");
};


export const addToCart = () => {
  var notify = document.getElementById("notify-add-to-cart");
  if (notify) {
    notify.style.display = "block"; // Hiển thị thông báo
    var containerHeader = document.querySelector(".user-container-header");
    var main = document.getElementById("main");
    var footer = document.querySelector("footer");
    // Thêm sự kiện click cho nút "X"
    var closeButton = document.getElementById("close-notify");
    closeButton.addEventListener("click", function () {
      notify.style.display = "none"; // Ẩn thông báo khi nhấp vào nút "X"
      containerHeader.classList.remove("darken"); // Xóa lớp 'darken' cho user-container-header
      main.classList.remove("darken"); // Xóa lớp 'darken' cho main
      footer.classList.remove("darken"); // Xóa lớp 'darken' cho footer
    });

    // Thêm dark overlay
    containerHeader.classList.add("darken"); // Thêm lớp 'darken' cho user-container-header
    main.classList.add("darken"); // Thêm lớp 'darken' cho main
    footer.classList.add("darken"); // Thêm lớp 'darken' cho footer
  } else {
    console.error("Element with id 'notify-add-to-cart' not found.");
  }
};


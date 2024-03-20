export const SearchIconClick = () => {
  var sidebar = document.getElementById("sidebar-find");
  var containerHeader = document.querySelector(".user-container-header");
  var main = document.getElementById("main");
  var footer = document.querySelector("footer");
  if (sidebar.style.right === "0px") {
    sidebar.style.right = "-26%"; // Ẩn sidebar nếu đã hiển thị
    containerHeader.classList.remove("darken"); // Xóa lớp 'darken' cho user-container-header
    main.classList.remove("darken"); // Xóa lớp 'darken' cho main
    footer.classList.remove("darken"); // Xóa lớp 'darken' cho footer
  } else {
    sidebar.style.right = "0"; // Hiển thị sidebar từ phải sang trái
    sidebar.classList.toggle("active"); // Thêm hoặc xóa lớp 'active' cho sidebar
    containerHeader.classList.toggle("darken"); // Thêm hoặc xóa lớp 'darken' cho user-container-header
    main.classList.toggle("darken"); // Thêm hoặc xóa lớp 'darken' cho main
    footer.classList.toggle("darken"); // Thêm hoặc xóa lớp 'darken' cho footer
  }
};

export const CartIconClick = () => {
  var sidebar = document.getElementById("sidebar-cart");
  var containerHeader = document.querySelector(".user-container-header");
  var main = document.getElementById("main");
  var footer = document.querySelector("footer");

  if (sidebar.style.right === "0px") {
    sidebar.style.right = "-26%"; // Ẩn sidebar nếu đã hiển thị
    containerHeader.classList.remove("darken"); // Xóa lớp 'darken' cho user-container-header
    main.classList.remove("darken"); // Xóa lớp 'darken' cho main
    footer.classList.remove("darken"); // Xóa lớp 'darken' cho footer
  } else {
    sidebar.style.right = "0"; // Hiển thị sidebar từ phải sang trái
    sidebar.classList.toggle("active"); // Thêm hoặc xóa lớp 'active' cho sidebar
    containerHeader.classList.toggle("darken"); // Thêm hoặc xóa lớp 'darken' cho user-container-header
    main.classList.toggle("darken"); // Thêm hoặc xóa lớp 'darken' cho main
    footer.classList.toggle("darken"); // Thêm hoặc xóa lớp 'darken' cho footer
  }
};

export const addToCart = () => {
  var notify = document.getElementById("notify-add-to-cart");
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
};

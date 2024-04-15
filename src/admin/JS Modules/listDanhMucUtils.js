export const toggleForm = () => {
  const adminMain = document.querySelector('.admin-main-content');
  if (adminMain) {
    adminMain.classList.toggle('dark-overlay');
  }
  
  const adminSidebar = document.querySelector('.admin-sidebar');
  if (adminSidebar) {
    adminSidebar.classList.toggle('dark-overlay');
  }

  const adminHeader = document.getElementById('admin-header');
  if (adminHeader) {
    adminHeader.classList.toggle('dark-overlay');
    adminHeader.style.backgroundColor = adminHeader.style.backgroundColor === '#D9D9D9' ? '#030000ac' : '#D9D9D9';
  }
};

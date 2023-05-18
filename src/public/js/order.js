
// Lấy tất cả các tab
function changeTabColor(event, tab) {
    // Ngăn chặn hành vi mặc định của liên kết
    event.preventDefault();
  
    // Xóa lớp active từ tất cả các tab
    const tabs = document.getElementsByClassName('order_management');
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('active');
    }
  
    // Thêm lớp active vào tab được bấm 
    tab.classList.add('active');
}






  
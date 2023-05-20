function changeTabColor(event, tab,statusId) {
    event.preventDefault();
    
    // Xóa lớp active từ tất cả các tab
    const tabs = document.getElementsByClassName('order_management');
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('active');
    }

    tab.classList.add('active');
    console.log("STATUS:"+statusId)
    if(statusId==-1){
        window.location.href = `http://localhost:3000/order/`;
    }
    else{

        window.location.href = `http://localhost:3000/order/${statusId}`;
    }
    
  

}
// Lưu trạng thái của tab vào query parameter khi trang được tải
// document.addEventListener('DOMContentLoaded', function() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const currentTab = urlParams.get('tab');
//     if (currentTab) {
//         changeTab(currentTab);
//     }
// });

function viewDetailClick(productId){
  var currentURL = window.location.href;
  window.location.href = `http://localhost:3000/order/order_detail/${productId}`;
  console.log(currentURL);
}

function reviewClick(productId){
    var currentURL = window.location.href;
    window.location.href = `http://localhost:3000/order/review/${productId}`;
    console.log(window.location.href);
}

document.getElementById("reviewForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form

  const ratingInputs = document.getElementsByName("rating");
  let selectedRating = null;

  // Lặp qua các input radio rating để tìm rating đã được chọn
  for (let i = 0; i < ratingInputs.length; i++) {
    if (ratingInputs[i].checked) {
      selectedRating = ratingInputs[i].value;
      break;
    }
  }
})

window.addEventListener("DOMContentLoaded", function() {
  const tabs = document.getElementsByClassName("order_management");

  // Xác định tab đang được chọn mặc định là tab All
  const defaultTab = document.getElementById("-1");
  defaultTab.classList.add("active");

  // Thêm sự kiện click cho từng tab
  
});

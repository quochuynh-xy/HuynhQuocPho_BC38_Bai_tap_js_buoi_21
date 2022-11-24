var listOfStaff = [];
/*************************** */
document.getElementById("btnThemNV").onclick = function () {
  if (form_validate()) add_Staff();
};
document.getElementById("btnCapNhat").style.display = "none";
// document.getElementById("btnXoa").style.display = "none"
/*************************** */
function add_Staff() {
  // if (!form_validate()) {
  //   console.log("Sai cmnr");
  //   return}
  var _staffID = document.getElementById("tknv").value;
  var _staffFullName = document.getElementById("name").value;
  var _staffEmail = document.getElementById("email").value;
  var _staffPassword = document.getElementById("password").value;
  var _staffWorkingDay = document.getElementById("datepicker").value;
  var _staffBasicSalary = document.getElementById("luongCB").value * 1;
  var _staffPosition = document.getElementById("chucvu").value;
  var _staffTotalWorkingHours = document.getElementById("gioLam").value * 1;
  var staff = new Staff(
    _staffID,
    _staffFullName,
    _staffEmail,
    _staffPassword,
    _staffWorkingDay,
    _staffBasicSalary,
    _staffPosition,
    _staffTotalWorkingHours
  );
  for (var i = 0; i < listOfStaff.length; i++) {
    if (
      listOfStaff[i].staffID == _staffID ||
      listOfStaff[i].staffEmail == _staffEmail
    ) {
      return alert("Sai thông tin");
    }
  }
  listOfStaff.push(staff);
  //console.log(listOfStaff);
  // console.log(staff.staffTotalSalary());
  // console.log(staff.staffRate());
  render_Staff();
  saveStaffToLocal();
}
/************************************** */
function delete_Staff() {
  var id = document.getElementById("tknv").value;
  for (let i = 0; i < listOfStaff.length; i++) {
    if (listOfStaff[i].staffID === id) {
      listOfStaff.splice(i, 1);
    }
  }
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("gioLam").value = "";
  render_Staff();
  saveStaffToLocal();
}
/************************************** */
// var btnClose = document.getElementById("btnDong");
// btnClose.onclick = function () {
//   console.log("click vào nút close");
//   setTimeout(cancel_edit_Staff, 500);
//   // console.log(ăoejoawjeo);
// };

function edit_Staff(id) {
  // if (!form_validate()) {
  //   console.log("Sai cmnr");
  //   return}
  // form UI
  var modal = document.getElementById("myModal");
  var modalTitle = document.getElementById("header-title");
  var modalFooter = document.getElementById("modal-footer");
  var btnAdd = document.getElementById("btnThemNV");
  var btnClose = document.getElementById("btnDong");
  document.getElementById("btnCapNhat").style.display = "block";
  modal.style.backgroundColor = "#7becd880";
  if (!document.getElementById("btnXoa") == true) {
    var btnXoa = document.createElement("button");
    btnXoa.innerHTML = "Xóa";
    btnXoa.id = "btnXoa";
    btnXoa.className = "btn btn-secondary";
    btnXoa.onclick = delete_Staff;
    modalFooter.appendChild(btnXoa);
  }
  modalTitle.innerHTML = "Edit employ";
  btnAdd.style.display = "none";
  btnClose.onclick = cancel_edit_Staff;
  btnClose.onclick = function () {
    console.log("click vào nút close");
    setTimeout(cancel_edit_Staff, 500);
    // console.log(ăoejoawjeo);
  };
  // console.log("nhìn con chimmmmmmmmmmmmmmm");

  //form display content
  var index = find_StaffByID(id);
  document.getElementById("tknv").value = listOfStaff[index].staffID;
  document.getElementById("name").value = listOfStaff[index].staffFullName;
  document.getElementById("email").value = listOfStaff[index].staffEmail;
  document.getElementById("password").value = listOfStaff[index].staffPassword;
  document.getElementById("datepicker").value =
    listOfStaff[index].staffWorkingDay;
  document.getElementById("luongCB").value =
    listOfStaff[index].staffBasicSalary;
  document.getElementById("chucvu").value = listOfStaff[index].staffPosition;
  document.getElementById("gioLam").value =
    listOfStaff[index].staffTotalWorkingHours;
}
////////////////////////////////////////////
// Reset modal when close
var modal = document.getElementById("myModal");
modal.addEventListener("mousedown", function (event) {
  if (event.target !== modal) return;
  if (event.target == modal) {
    setTimeout(cancel_edit_Staff, 500);
  }
});

/////////////////////////////////////////
function cancel_edit_Staff() {
  document.getElementById("btnCapNhat").style.display = "none";
  if(document.getElementById("btnXoa")) {
    document.getElementById('btnXoa').style.display = "none";;
  }
  var modal = document.getElementById("myModal");
  modal.style.backgroundColor = "transparent";
  var btnAdd = document.getElementById("btnThemNV");
  btnAdd.style.display = "block";
  var modalTitle = document.getElementById("header-title");
  modalTitle.innerHTML = "login";
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("gioLam").value = "";
  //hide arlert:
  var notifyList = document.querySelectorAll(".js-tb");
  for (let i = 0; i < notifyList.length; i++) {
    notifyList[i].innerHTML = "";
    notifyList[i].style.display = "none";
  }
}
/************************************** */
function find_StaffByID(id) {
  for (var i = 0; i < listOfStaff.length; i++) {
    if (listOfStaff[i].staffID === id) return i;
  }
  return -1;
}
/************************************** */
document.getElementById("btnCapNhat").onclick = function () {
  if (form_validate()) update_Staff();
  return;
};
function update_Staff() {
  var id = document.getElementById("tknv").value;
  var index = find_StaffByID(id);
  if (index < 0) return;
  var _newName = document.getElementById("name").value;
  var _newEmail = document.getElementById("email").value;
  var _newPassword = document.getElementById("password").value;
  var _newWorkingDay = document.getElementById("datepicker").value;
  var _newBasicSalary = document.getElementById("luongCB").value * 1;
  var _newPosition = document.getElementById("chucvu").value;
  var _newTotalWorkingHours = document.getElementById("gioLam").value * 1;
  listOfStaff[index].staffFullName = _newName;
  listOfStaff[index].staffEmail = _newEmail;
  listOfStaff[index].staffPassword = _newPassword;
  listOfStaff[index].staffWorkingDay = _newWorkingDay;
  listOfStaff[index].staffBasicSalary = _newBasicSalary;
  listOfStaff[index].staffPosition = _newPosition;
  listOfStaff[index].staffTotalWorkingHours = _newTotalWorkingHours;
  render_Staff();
  saveStaffToLocal();
}
/************************************** */
document.getElementById("searchName").oninput = function () {
  if (document.getElementById("searchName").value == "") {
    render_Staff();
  }
};
document.getElementById("btnTimNV").onclick = search_Staff;
document.getElementById("btnTimNV").addEventListener("mouseover", function () {
  document.getElementById("btnTimNV").style.cursor = "pointer";
  document.getElementById("btnTimNV").style.backgroundColor = "#7a8cd6";
  document.getElementById("btnTimNV").style.color = "#fff";
  document.getElementById("btnTimNV").style.transition = "0.5s";
});
document.getElementById("btnTimNV").addEventListener("mouseout", function () {
  document.getElementById("btnTimNV").style.cursor = "pointer";
  document.getElementById("btnTimNV").style.backgroundColor = "initial";
  document.getElementById("btnTimNV").style.color = "initial";
});
function search_Staff() {
  var keywords = document
    .getElementById("searchName")
    .value.toLowerCase()
    .trim();
  var filtered = [];
  for (var i = 0; i < listOfStaff.length; i++) {
    // console.log(listOfStaff[i].staffRate());
    if (listOfStaff[i].staffRate().includes(keywords)) {
      filtered.push(listOfStaff[i]);
    }
  }
  render_Staff(filtered);
  return filtered;
}
/************************************** */
/**
 * config {
 *  min
 *  max
 *  htmlID (errorID)
 *  patten
 * }
 */
//Required
function check_required(input, config) {
  if (input.length == 0) {
    document.getElementById(config.errorID).innerHTML = "Không được để trống";
    document.getElementById(config.errorID).style.display = "inline-block";
    console.log("chưa nhập");
    return false;
  }
  document.getElementById(config.errorID).innerHTML = "";
  document.getElementById(config.errorID).style.display = "none";
  console.log("đã nhập");
  return true;
}
//Check Length
function check_length(value, config) {
  if (value.length < config.min || value.length > config.max) {
    document.getElementById(
      config.errorID
    ).innerHTML = `*Độ dài từ ${config.min} đến ${config.max} ký tự`;
    document.getElementById(config.errorID).style.display = "inline-block";
    console.log("Sai độ dài");
    return false;
  }
  document.getElementById(config.errorID).innerHTML = "";
  document.getElementById(config.errorID).style.display = "none";
  console.log("đúng độ dài");
  return true;
}
//Check Input patten
function check_patten(value, config) {
  var warningContent = "";
  var checking = config.errorID;
  switch (checking) {
    case "tbTKNV": {
      warningContent = "Chứa số từ 0 - 9";
      break;
    }
    case "tbTen": {
      warningContent = "Chỉ chấp nhận chữ in thường và in hoa";
      break;
    }
    case "tbEmail": {
      warningContent = "Vui lòng nhập đúng định dạng email";
      break;
    }
    case "tbMatKhau": {
      warningContent =
        "Từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)";
      break;
    }
    case "tbNgay": {
      warningContent = "Nhập đúng ngày-tháng-năm";
      break;
    }
    // case "tbLuongCB": {
    //   warningContent = "Lương cơ bản sai";
    //   break;
    // }
    case "tbChucVu": {
      warningContent = "Chưa chọn chức vụ ";
      break;
    }
    case "tbGiolam": {
      warningContent = "Nhập số từ 0-9";
    }
  }
  if (!config.patten.test(value)) {
    document.getElementById(config.errorID).innerHTML = warningContent;
    document.getElementById(config.errorID).style.display = "inline-block";
    console.log("Sai patten");
    return false;
  }
  document.getElementById(config.errorID).innerHTML = "";
  document.getElementById(config.errorID).style.display = "none";
  console.log("đúng patten");
  return true;
}
// Check Salary
function check_value(value, obj) {
  // let min = 1000000;
  // let max = 20000000;
  if (value >= obj.min && value <= obj.max) {
    document.getElementById(obj.errorID).innerHTML = "";
    document.getElementById(obj.errorID).style.display = "none";
    console.log("Giá trị OK");
    return true;
  }
  document.getElementById(
    obj.errorID
  ).innerHTML = `Có giá trị từ ${obj.min} đến ${obj.max}`;
  document.getElementById(obj.errorID).style.display = "inline-block";
  console.log("Giá trị sai");
  return false;
}
// Check Position
function check_staffPosition(value) {
  // let pos_1 = "Sếp";
  // let pos_2 = "Trưởng phòng";
  // let pos_3 = "Nhân viên";
  let positions = ["Sếp", "Trưởng phòng", "Nhân viên"];
  for (let i = 0; i < positions.length; i++) {
    if (positions[i] == value) {
      document.getElementById("tbChucVu").style.display = "none";
      document.getElementById("tbChucVu").innerHTML = "";
      return true;
    }
  }
  // if( value == pos_1 || value == pos_2 || value == pos_3) {
  //   document.getElementById('tbChucVu').style.display = "none";
  //   document.getElementById('tbChucVu').innerHTML ="";
  //   return true
  // }
  document.getElementById("tbChucVu").style.display = "inline-block";
  document.getElementById("tbChucVu").innerHTML = "Vui lòng chọn chức vụ";
  return false;
}
//VALIDATE FORM
function form_validate() {
  var pattenID = /^([0-9])+$/g;
  var pattenName = /^([A-z ])+$/g;
  var pattenEmail = /[A-z_0-9.-]+@[A-z-]+(.)(com|edu|net)/g;
  // var pattenPassWord = /^(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+{}|:";'<>,.?/])[a-zA-Z\d~!@#$%^&*()_+{}|:";'<>,.?/]{6,10}$/g
  var pattenPassWord =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+{}|:";'<>,.?/])[a-zA-Z\d~!@#$%^&*()_+{}|:";'<>,.?/]{6,10}$/g;
  // *****valid ID: không để trống, dài từ 4 đến 6 ký tự, patten phải là số: xong.
  var id = document.getElementById("tknv").value;
  var idValid =
    check_required(id, { errorID: "tbTKNV" }) &&
    check_length(id, { errorID: "tbTKNV", min: 4, max: 6 }) &&
    check_patten(id, { errorID: "tbTKNV", patten: pattenID });

  // *****valid ID: không để trống, patten phải là chữ và khoảng trắng: xong
  var staffName = document.getElementById("name").value;
  var nameValid =
    check_required(staffName, { errorID: "tbTen" }) &&
    check_patten(staffName, { errorID: "tbTen", patten: pattenName });

  // *****valid ID: không để trống, đúng patten: xong
  var staffEmail = document.getElementById("email").value;
  var emailValid =
    check_required(staffEmail, { errorID: "tbEmail" }) &&
    check_patten(staffEmail, { errorID: "tbEmail", patten: pattenEmail });

  // *****valid PW: không để trống, chứa số, chữ hoa, ký tự đặc biệt: xong
  var staffPW = document.getElementById("password").value;
  var passwordValid =
    check_required(staffPW, { errorID: "tbMatKhau" }) &&
    check_patten(staffPW, { errorID: "tbMatKhau", patten: pattenPassWord });

  // ********ngày tháng năm: ĐÉO ĐƯỢC

  // *****valid salary: không để trống, từ 1tr đến 20tr: xong
  var salary = document.getElementById("luongCB").value;
  // console.log(typeof salary);
  // console.log(typeof Number(salary));
  var salaryValid =
    check_required(salary, { errorID: "tbLuongCB" }) &&
    check_value(Number(salary), {
      errorID: "tbLuongCB",
      min: 1000000,
      max: 20000000,
    });

  // *****valid chức vụ: không để trống: xong
  var position = document.getElementById("chucvu").value;
  var positionValid = check_staffPosition(position);

  // *****valid giờ làm: không để trống, 80h đến 200h
  var workingHours = document.getElementById("gioLam").value;
  var workingHoursValid =
    check_required(workingHours, { errorID: "tbGiolam" }) &&
    check_value(Number(workingHours), {
      errorID: "tbGiolam",
      min: 80,
      max: 200,
    });
  var isAcceptForm =
    idValid &&
    nameValid &&
    emailValid &&
    passwordValid &&
    salaryValid &&
    positionValid &&
    workingHoursValid;
  // check_length
  console.log(isAcceptForm);
  return isAcceptForm;
}
/************************************** */
function render_Staff(data) {
  var dataRender = data || listOfStaff;
  var HTML = "";
  for (var i = 0; i < dataRender.length; i++) {
    var id = dataRender[i].staffID;
    var fullName = dataRender[i].staffFullName;
    var email = dataRender[i].staffEmail;
    var pickDate = dataRender[i].staffWorkingDay;
    var position = dataRender[i].staffPosition;
    var totalSalary = dataRender[i].staffTotalSalary();
    var rate = dataRender[i].staffRate();
    HTML += `<tr>
                    <td>${id}</td>
                    <td>${fullName}</td>
                    <td>${email}</td>
                    <td>${pickDate}</td>
                    <td>${position}</td>
                    <td>${totalSalary}</td>
                    <td>${rate}</td>
                    <td>
                        <i class="fa fa-edit"
                        data-toggle="modal" 
                        data-target="#myModal"
                        onclick="edit_Staff('${dataRender[i].staffID}')"></i>
                    </td>
                </tr>`;
  }
  document.getElementById("tableDanhSach").innerHTML = HTML;
}
/************************************** */
function saveStaffToLocal() {
  var localData = JSON.stringify(listOfStaff);
  localStorage.setItem("staff", localData);
}
/************************************** */
function mapStaffData() {
  var getdata = localStorage.getItem("staff");
  var loadedData = JSON.parse(getdata);
  if (!loadedData) {
    return;
  }
  for (var i = 0; i < loadedData.length; i++) {
    var _staffID = loadedData[i].staffID;
    var _staffFullName = loadedData[i].staffFullName;
    var _staffEmail = loadedData[i].staffEmail;
    var _staffPassword = loadedData[i].staffPassword;
    var _staffWorkingDay = loadedData[i].staffWorkingDay;
    var _staffBasicSalary = loadedData[i].staffBasicSalary * 1;
    var _staffPosition = loadedData[i].staffPosition;
    var _staffTotalWorkingHours = loadedData[i].staffTotalWorkingHours * 1;
    var loaded_staff = new Staff(
      _staffID,
      _staffFullName,
      _staffEmail,
      _staffPassword,
      _staffWorkingDay,
      _staffBasicSalary,
      _staffPosition,
      _staffTotalWorkingHours
    );
    listOfStaff.push(loaded_staff);
  }
}
window.onload = function () {
  mapStaffData();
  render_Staff();
};

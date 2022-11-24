function Staff(
  _staffID,
  _staffFullName,
  _staffEmail,
  _staffPassword,
  _staffWorkingDay,
  _staffBasicSalary,
  _staffPosition,
  _staffTotalWorkingHours
  //   _staffTotalSalary,
  //   _staffRate
) {
  (this.staffID = _staffID),
    (this.staffFullName = _staffFullName),
    (this.staffEmail = _staffEmail),
    (this.staffPassword = _staffPassword),
    (this.staffWorkingDay = _staffWorkingDay),
    (this.staffBasicSalary = _staffBasicSalary),
    (this.staffPosition = _staffPosition),
    (this.staffTotalWorkingHours = _staffTotalWorkingHours),
    (this.staffTotalSalary = function () {
      var position = this.staffPosition;
      var totalSalary = this.staffBasicSalary;
      switch (position) {
        case "Sếp": {
          totalSalary = this.staffBasicSalary * 3;
          break;
        }
        case "Trưởng phòng": {
          totalSalary = this.staffBasicSalary * 2;
          break;
        }
        case "Nhân viên": {
          totalSalary = this.staffBasicSalary * 1;
          break;
        }
      }
      return totalSalary;
    });
  this.staffRate = function () {
    var Rate = "";
    if (this.staffTotalWorkingHours >= 192) {
      return (Rate = "Nhân viên xuất sắc");
    } else if (this.staffTotalWorkingHours >= 176) {
      return (Rate = "Nhân viên giỏi");
    } else if (this.staffTotalWorkingHours >= 160) {
      return (Rate = "Nhân viên khá");
    } else {
      return (Rate = "Nhân viên trung bình");
    }
  };
}

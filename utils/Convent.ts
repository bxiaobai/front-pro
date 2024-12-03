class DateTimeFormatter {
  /**
   * 格式化日期时间
   * @param {Date | string | number} dateTime - 需要格式化的日期时间对象、字符串或时间戳
   * @returns {string} 格式化后的日期时间字符串
   */
  static format(dateTime: Date | string | number): string {
    // 确保输入是Date对象
    const date = dateTime instanceof Date ? dateTime : new Date(dateTime);

    // 获取年月日时分秒
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // 拼接成YYYY-MM-DD HH:MM:SS格式
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  /**
   * 格式化日期时间
   * @param {Date | string | number} dateTime - 需要格式化的日期时间对象、字符串或时间戳
   * @returns {string} 格式化后的日期时间字符串
   */
  static formatTime(dateTime: Date | string | number): string {
    // 确保输入是Date对象
    const date = dateTime instanceof Date ? dateTime : new Date(dateTime);

    // 获取年月日时分秒
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    // 拼接成YYYY-MM-DD HH:MM:SS格式
    return `${year}-${month}-${day}`;
  }

  /**
   * 根据BMI值判断体重状况
   *
   * @param bmi BMI值
   * @return 体重状况分类
   */
  static evaluateBMI(bmi: number): string {
    if (bmi <= 18.4) {
      return '偏瘦';
    } else if (bmi <= 23.9) {
      return '正常';
    } else if (bmi <= 27.9) {
      return '过重';
    } else {
      return '肥胖';
    }
  }

  static calculateAge(birthdayString) {
    // 将出生日期字符串转换为Date对象
    const birthday = new Date(birthdayString);
    // 获取当前日期
    const today = new Date();
    // 计算年份差异
    let age = today.getFullYear() - birthday.getFullYear();
    // 考虑生日是否已经过了
    const monthDifference = today.getMonth() - birthday.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    return age;
  }

  static getWeek(date: number) {
    switch (date) {
      case 1:
        return '周一';
      case 2:
        return '周二';
      case 3:
        return '周三';
      case 4:
        return '周四';
      case 5:
        return '周五';
      case 6:
        return '周六';
      case 0:
        return '周日';
    }
  }
}

export default DateTimeFormatter;

export interface IValidatorModule {
  isEmail(email: string): boolean;
  isPhoneNumber(phone: string): boolean;
  isUrl(url: string): boolean;
  isDate(date: string): boolean;
  getDate(): string;
  isNumber(number: string): boolean;
  compareDate(date1: string, date2: string): number;
  convertCurrencyStringToNumber(currencyString: string):string;
}
export class ValidatorModule implements IValidatorModule {
  convertCurrencyStringToNumber(currencyString: string) {
     // Loại bỏ ký tự không phải số
  const number = parseFloat(currencyString.replace(/[^\d]/g, ''));

  // Chuyển đổi thành số và định dạng
  const formattedNumber = new Intl.NumberFormat('vi-VN').format(number);

  return formattedNumber + 'đ';
  }
  compareDate(d1: string, d2: string): number {
    const date1 = new Date(d1.split("-").reverse().join("-"));
    const date2 = new Date(d2.split("-").reverse().join("-"));
    if (date1 < date2) {
      return -1;
    } else if (date1 > date2) {
      return 1;
    } else {
      return 0;
    }
  }
  private regexValidator = {
    email: /[a-zA-Z0-9_-]+@(vku.udn.vn|gmail.com)/,
    phone: /(0|84)[0-9]{9}/,
    url: /^(ftp|http|https):\/\/[^ "]+$/,
    date: /^(0[1-9]|1[0-9]|2[0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
    number: /^-?\d+(\.\d+)?$/,
  };
  isNumber(number: string): boolean {
    return this.regexValidator.number.test(number);
  }
  isPhoneNumber(phone: string): boolean {
    return this.regexValidator.phone.test(phone);
  }
  isEmail(email: string): boolean {
    return this.regexValidator.email.test(email);
  }
  isUrl(url: string): boolean {
    return this.regexValidator.url.test(url);
  }
  getDate(): string {
    const date = new Date();
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
    );
  }
  isDate(date: string): boolean {
    return this.regexValidator.date.test(date);
  }
}
export const ValidatorCustomModule: IValidatorModule = new ValidatorModule();

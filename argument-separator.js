class Args {

  constructor(string) {
    this.string = string;
    this.index = 0;
  }

  nextArg() {
    let prevIndex = this.index;
    this.index = this.string.indexOf(Args.separator, prevIndex);
    if (!~this.index) this.index = this.string.length - 1;
    return this.string.slice(prevIndex, this.index++);
  }

  rest() {
    let prevIndex = this.index;
    this.index = this.string.length;
    return this.string.slice(prevIndex);
  }

}
Args.separator = " ";

module.exports = Args;

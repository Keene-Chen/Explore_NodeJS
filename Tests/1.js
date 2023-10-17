class Person {
  name = 'KeeneChen';
  static age = 20;
  static score = 100;

  constructor(name, age, score) {
    this.name = name;
    this.age = age;
    this.score = score;
  }
  getName() {
    return this.name;
  }
  getAge() {
    return this.age;
  }
  getScore() {
    return this.score;
  }
  setName(name) {
    this.name = name;
  }
}

const stu1 = new Person('zhangsan', 20, 109);
console.log('%c [ stu1 ]-26', 'font-size:13px; background:pink; color:#bf2c9f;', stu1);

console.log('%c [  ]-29', 'font-size:13px; background:pink; color:#bf2c9f;');

console.log(stu1.getName());

// const stu2 = new Person();
// stu2.setName('lishi');
console.log(Person['name']);

# Decorator trong TypeScript

## Decorator là gì?

### Khái niệm

Decorator là feature cải tiến của TypeScript phục vụ lập trình Metaprogramming[1], áp dụng lên class, method, properties, accessor, parameter.

TypeScript không hỗ trợ built-in decorator: nếu bạn muốn sử dụng nó, bạn phải hoặc là cài đặt hoặc import thư viện (ví dụ từ NPM).

### Cú pháp

Để hiểu cách decorator hoạt động, tham khảo ví dụ:

```ts
@serialize
class CourseController(){
    getAllCourses(): Course[]{
        ...
    }
}
```

`serialize` là một decorator, đứng sau flag `@`. Nếu không sử dụng decorator, bạn có thể code theo kiểu truyền thống:

```ts
let CourseController = serialize(
    class CourseController(){
        getAllCourses(): Course[]{
        ...
        }
    }
)
```
### Các kiểu decorator
Official documentation thể hiện 5 kiểu decorator, gồm: class, method, properties, accessor và parameter decorator. 
Cần tuân theo type signature[2] của từng kiểu khi cài đặt decorator.

Kiểu | Type signature
-----|---------------
Class decorator | `(Constructor: {new(...any[]) => any}) => any`
Method decorator | `(classPrototype: {}, methodName: string, descriptor: PropertyDescriptor ) => any`
Properties decorator | `(classPrototype: {}, propertyName: string) => any`
Accessor decorator | `(classPrototype: any, accessorName: string, descriptor: PropertyDescriptor ) => any`
Parameter decorator |  `(classPrototype: {}, paramName: string, index: number) => void`


#### Class decorator
```ts
function changeAmount<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    amount = 3;
  };
}

@changeAmount
class CourseController {
  amount = 2;

  getAllCourses(): string {
    return 'Course';
  }
}

const courseController = new CourseController();
console.log('amount', courseController.amount);  // amount 3

```
#### Method decorator
```ts
function mistransmit() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.value = function () {
      const result = 'I says somethings different';
      return result;
    };

    return descriptor;
  };
}

class Person {
  public name: string;
  public surname: string;

  constructor(name: string, surname: string) {
    this.name = name;
    this.surname = surname;
  }

  @mistransmit()
  public saySomething(something: string, somethingElse: string): string {
    return (
      this.name +
      ' ' +
      this.surname +
      ' says: ' +
      something +
      ' ' +
      somethingElse
    );
  }
}

var p = new Person('remo', 'jansen');
const says = p.saySomething('I love playing', 'halo');
console.log(says); // I says somethings different
```
#### Properties decorator
```ts
```
#### Accessor decorator
#### Parameter decorator
## Tại sao và khi nào dùng decorator

## Hạn chế


## Chú thích
[1] _Metaprogramming_:  Metaprogramming is a programming technique in which computer programs have the ability to treat other programs as their data. It means that a program can be designed to read, generate, analyze or transform other programs, and even modify itself while running.
## Acknowledge

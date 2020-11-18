# Dependency Injection

This is a document about Dependency Injection and things around it, written and collected by a newbie developer.

## What is **Dependency Injection**?

**Dependency** is a outsider module, let say, in a simple example, is a class. **Injection** a dependency to another module(vi. Tiêm), to my understading, is letting that module use the "content" of the dependency.

**Dependency Injection** is associated with SOLID priciple, in the letter D: "_Dependency inversion principle_". This principle suggests that: One should **depend upon abstractions, not concretions.**

This is, I've read, is a practice of **Inversion of Control** (IoC) technique, which associated with **Dependency Inversion Principle**

#### What is Dependency Inversion Principle?

Dependency Inversion Principle is a principle in Factory design pattern.

> **Principle**<br>
> Depend upon abstractions. Do not depend upon concrete classes.

It suggests that our high-level components should not depend on our low-level components; rather, they should both depend on abstractions.

For example, if I plan to implement a `PizzaFactory` class, I should not base or extend from a specific kind of Pizza, let say `PizzaMushroom`, but instend base all of them on an interface `Pizza`

![](https://github.com/ngankhanh98/coursebox-server/blob/main/docs/img/dependency_inversion_img.png?raw=true)

_"The “inversion” in the name Dependency Inversion
Principle is there because it inverts the way you
typically might think about your OO design... the
low-level components now depend on a higher level
abstraction."_ - Head First Design Pattern

## Dependency Injection in Nest

**Providers** are a fundamental concept in Nest. The main idea of a provider is that it can inject dependencies.  
By placing `@Injectable()` decorator we tell Nest that this class is a Nest provider.

Let's create a provider, say **teachers.service.ts**:

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class TeachersService {
  private readonly teachers: Teacher[] = [];

  getAll() {
    return this.teachers;
  }
}
```

Now, inject this provider into **teacher.controller.ts**
```ts
import { Controller, Get } from '@nestjs/common';

@Controller('teachers')
export class TeachersController {
    constructor(private teachersService: TeachersService){}
  
  @Get('/')
  getAll(){
      return this.teachersService.getAll()
  }
}

```
`private` assure `teachersService` instance to be declared and initialized immediatedly.

_"In the example below, Nest will resolve the `teachersService` by creating and returning an instance of `TeachersService` (or, in the normal case of a singleton, returning the existing instance if it has already been requested elsewhere). This dependency is resolved and passed to controller's constructor (or assigned to the indicated property)."_ - Nest Docs

But what under the cover is?
1. In `teachers.service.ts`, the `@Injectable()` decorator declares the `TeachersService` class as a class that can be managed by the Nest IoC container.

2. In `teachers.controller.ts`, `TeachersController` declares a dependency on the **TeachersService token** with constructor injection:
```ts
  constructor(private teachersService: TeachersService)
```
In `app.module.ts`, we associate the token TeachersService with the class TeachersService from the Teachers.service.ts file. 

When the Nest IoC container instantiates a `TeachersController`, it first looks for any dependencies. When it finds the TeachersService dependency, it performs a lookup on the TeachersService token, which returns the `TeachersService` class Assuming SINGLETON scope (the default behavior), Nest will then either create an instance of `TeachersService`, cache it, and return it, or if one is already cached, return the existing instance.

### Custom token
So far, we've used class names as our provider tokens. We can also replace it as a string
```ts
@Injectable()
export class CatsRepository {
  constructor(@Inject('CONNECTION') connection: Connection) {}
}
```

### Dynamic inject
The `useFactory` syntax allows for creating providers dynamically. The actual provider will be supplied by the value returned from a factory function. 

```ts
const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: (optionsProvider: OptionsProvider) => {
    const options = optionsProvider.get();
    return new DatabaseConnection(options);
  },
  inject: [OptionsProvider],
};

@Module({
  providers: [connectionFactory],
})
export class AppModule {}

```

## Acknowledge
Nest Official Document, https://docs.nestjs.com/fundamentals/custom-providers#di-fundamentals

Wikipedia, https://en.wikipedia.org/wiki/Inversion_of_control, https://en.wikipedia.org/wiki/Inversion_of_control

Series dependency injection and inversion of control, https://toidicodedao.com/2015/11/10/dependency-injection-va-inversion-of-control-phan-2-ap-dung-di-vao-code/

Head First Design pattern, Elisabeth Freeman & Eric Freeman

With the kindly explaination in .NET area of Son [@thanhson391999](github.com/thanhson391999)
---
recommend: 20
title: Go Basic Syntax 2
tags:

- Go
- Basic Syntax
- Quick Start

---

# Go Basic Syntax: Pointer, Struct and Interface, Error Handling

## Pointer

The pointer format of Go language is as follows:

```go
package main

import "fmt"

func main() {
    var a int = 10
    var p *int
    p = &a
    fmt.Println("a is:", a)
    fmt.Println("a's address is:", &a)
    fmt.Println("p is:", p)
    fmt.Println("p's address is:", &p)
    fmt.Println("p points to:", *p)
}
```

## Struct

The struct format of Go language is as follows:

```go
package main

import "fmt"

// Define a struct
type Person struct {
    name string
    age  int
}

func main() {
    // Access struct member assignment
    var p1 Person
    p1.name = "Tom"
    p1.age = 11
    fmt.Println(p1)
    
    // Assign with struct literal
    p2 := Person{"Jerry", 22}
    fmt.Println(p2)
    
    // Assign with struct pointer
    p3 := &Person{"Spike", 33}
    fmt.Println(p3)
    
    // Access struct member
    fmt.Println(p3.name)
    fmt.Println(p3.age)
}
```

## Interface

The interface format of Go language is as follows:

```go
package main

import "fmt"

// Declare an interface
type Animal interface {
    Speak() string
}

// Dog struct, implements the Animal interface
type Dog struct {
}

// Dog implements the Animal interface
func (d Dog) Speak() string {
    return "Woof Woof"
}

func main() {
    var a Animal
    a = Dog{}
    fmt.Println(a.Speak())
}
```

## Error Handling

- The error handling format of Go language is different from other programming languages. The error handling of Go
  language is implemented through return values.
- In general, the last return value of a function is an `error` type. If the function is executed successfully, the
  value of `error` is `nil`, otherwise it is an error message.
- Error handling is not a mandatory requirement of Go language, but in actual development, error handling is very
  important and can improve the robustness of the program.

Handle errors in functions:

```go
package main

import (
    "errors"
    "fmt"
)

func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("The divisor cannot be 0")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 0)
    if err != nil {
        fmt.Println(err)
    } else {
        fmt.Println(result)
    }
}
```

In general, we handle errors in functions, but sometimes we can also handle errors in closures, which can reduce the
nesting of code.

Handle errors in closures:

```go
package main

import (
    "errors"
    "fmt"
)

func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("The divisor cannot be 0")
    }
    return a / b, nil
}

func main() {
    result, err := func() (int, error) {
        return divide(10, 0)
    }()
    if err != nil {
        fmt.Println(err)
    } else {
        fmt.Println(result)
    }
}
```

When using goroutines, we can use the `defer` keyword to handle errors, which ensures that the channel is closed after
the goroutine is executed.

```go

package main

import (
    "errors"
    "fmt"
)

func divide(a, b int, c chan int) {
    if b == 0 {
        c <- 0
        return
    }
    c <- a / b
}

func main() {
    c := make(chan int)
    go divide(10, 0, c)
    defer func() {
        if err := recover(); err != nil {
            fmt.Println(err)
        }
    }()
    result := <-c
    fmt.Println(result)
}
```

## Summary

The basic syntax of Go language includes pointers, structs, and interfaces. These contents are the foundation of
learning Go language, and mastering these contents is very important for learning Go language.

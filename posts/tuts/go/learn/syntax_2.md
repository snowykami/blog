---
recommend: 20
title: Go 基础语法2
tags:
  - Go
  - 基础语法
  - 速成
---

# Go 基础语法：指针，结构体及接口，错误处理

## 指针

Go 语言的指针格式如下：

```go
package main

import "fmt"

func main() {
    var a int = 10
    var p *int
    p = &a
    fmt.Println("a的值为：", a)
    fmt.Println("a的地址为：", &a)
    fmt.Println("p的值为：", p)
    fmt.Println("p的地址为：", &p)
    fmt.Println("p指向的值为：", *p)
}
```

## 结构体

Go 语言的结构体格式如下：

```go
package main

import "fmt"

// 定义一个结构体
type Person struct {
    name string
    age  int
}

func main() {
    // 访问结构体成员赋值
    var p1 Person
    p1.name = "张三"
    p1.age = 11
    fmt.Println(p1)
    
    // 使用结构体字面量赋值
    p2 := Person{"李四", 22}
    fmt.Println(p2)
    
    // 使用结构体指针赋值
    p3 := &Person{"王五", 33}
    fmt.Println(p3)
    
    // 访问结构体成员
    fmt.Println(p3.name)
    fmt.Println(p3.age)
}
```

## 接口

Go 语言的接口格式如下：

```go
package main

import "fmt"

// 声明一个接口
type Animal interface {
    Speak() string
}

// Dog 结构体，实现了 Animal 接口
type Dog struct {
}

// Dog 实现了 Animal 接口
func (d Dog) Speak() string {
    return "汪汪汪"
}

func main() {
    var a Animal
    a = Dog{}
    fmt.Println(a.Speak())
}
```

## 错误处理

- Go 语言的错误处理格式相较于其他编程语言有所不同，Go 语言的错误处理是通过返回值来实现的，
通常情况下，函数的最后一个返回值是一个 `error` 类型，如果函数执行成功，`error` 的值为 `nil`，否则为一个错误信息。
- 错误处理不是 Go 语言的强制要求，但是在实际开发中，错误处理是非常重要的，可以提高程序的健壮性。

在函数中处理错误：
```go
package main

import (
    "errors"
    "fmt"
)

func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("除数不能为0")
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

通常情况下，我们会在函数中处理错误，但是有时候我们也可以在闭包中处理错误，这样可以减少代码的嵌套。
在闭包中处理错误：

```go

package main

import (
    "errors"
    "fmt"
)

func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("除数不能为0")
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

在使用goroutine时，我们可以使用`defer`关键字来处理错误，这样可以保证goroutine执行完毕后，关闭通道。

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

## 总结

Go 语言的基础语法包括指针，结构体及接口，这些内容是学习 Go 语言的基础，掌握这些内容对于学习 Go 语言是非常重要的。
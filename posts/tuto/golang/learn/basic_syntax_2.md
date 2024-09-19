---
title: Go 基础语法2
tags:
  - Go
  - 基础语法
  - 速成
---

# Go 基础语法：指针，结构体及接口

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

## 总结

Go 语言的基础语法包括指针，结构体及接口，这些内容是学习 Go 语言的基础，掌握这些内容对于学习 Go 语言是非常重要的。
---
recommend: 10
title: Go 基础语法1
tags:
  - Go
  - 基础语法
  - 速成
---

# Go 基础语法：包及导入，变量，函数，分支及循环，容器

## 简介

- Go 语言是一门由 Google 开发的开源编程语言，Go 语言的设计目标是提高程序员的开发效率，Go 语言的语法简洁、易读、易写，适合于构建高效、可靠、简洁的软件。
- Go 语言的语法和 C 语言类似，但是去掉了一些冗余的语法，增加了一些新的特性，例如垃圾回收、并发编程等。
- 本文适合有一定编程基础(推荐为C)的读者阅读，主要介绍 Go 语言的基础语法并帮助读者快速上手 Go 语言。
- 零基础用户可以尝试阅读[Go 官方文档](https://golang.org/doc/)或[菜鸟教程](https://www.runoob.com/go/go-tutorial.html)。

## 程序

一个简单的go程序由包声明、导入包、函数声明和函数体组成。
Go 语言的程序入口是 `main` 函数，`main` 函数所在的包必须是 `main` 包。

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

## 包

包是 Go 语言的基本组织单元，每个 Go 文件都属于一个包。包的声明是通过 `package` 关键字实现的，包名和文件夹名可以不一致，但是推荐保持一致。

声明包的语法如下：

## 导入

Go 语言的导入语法如下：

```go
import "fmt"
```

多行导入

```go
import (
    "fmt"
    "os"
)
```

从git仓库导入标准go包

```go
import "github.com/cloudwego/kitex"
```

导入后可以使用包中的函数、变量等。

```go
import (
    "fmt",
    "github.com/cloudwego/kitex"
)

func main() {
    fmt.Println("Hello, World!")
    s := kitex.NewServer()
}
```

```go
package main
```

## 变量

Go 语言的变量声明格式如下(类型后置)：

```go
var 变量名 类型
```

例如

```go
var a int
var b string
```

Go 语言的变量声明还可以使用 `var` 关键字的同时初始化变量，格式如下：

```go
var 变量名 类型 = 表达式
```

Go 语言的变量声明还可以使用 `:=` 运算符，格式如下：(只能在函数内使用)

```go
变量名 := 表达式
```

## 函数

Go 语言的函数声明格式如下：

```go
func 函数名(参数列表) (返回值列表) {
    函数体
}
```

例如

```go
func add(a int, b int) int {
    return a + b
}
```

## 分支及循环

Go 语言的分支语句有 `if` 和 `switch` 两种，循环语句有 `for` 和 `range` 两种。

### if-else

```go
if condition {
    // do something
} else {
    // do something
}
```

### switch

```go
switch condition {
case 1:
    // do something
case 2:
    // do something
default:
    // do something
}
```

### for

```go
for i := 0; i < 10; i++ {
    // do something
}
```

### range

```go
for index, value := range array {
    // do something
}
```

## 容器

Go 语言的容器有数组、切片、字典、结构体等。

### 数组

```go
var arr [5]int
```

### 切片(可以理解为动态数组，而且切片是引用类型，数组是值类型，切片使用的场景相较于数组更多)

```go
var slice []int
```

### 字典

```go
var dict map[string]int
```

### 结构体

```go
type Person struct {
    Name string
    Age int
}
```

## 总结

本文介绍了 Go 语言的基础语法，包括包、变量、函数、分支及循环、容器等。希望对大家有所帮助。
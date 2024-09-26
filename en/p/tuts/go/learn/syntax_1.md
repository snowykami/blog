---
recommend: 10
title: Go Basic Syntax1
tags:
  - Go
  - Basic Syntax
  - Quick Start
---

# Go Basic Syntax: Package and Import, Variable, Function, Branch and Loop, Container

## Introduction

- Go is an open-source programming language developed by Google. The design goal of Go is to improve the development efficiency of programmers. The syntax of Go is simple, easy to read, and easy to write, suitable for building efficient, reliable, and concise software.
- The syntax of Go is similar to that of C, but some redundant syntax is removed, and some new features are added, such as garbage collection, concurrent programming, etc.
- This article is suitable for readers with a certain programming foundation (recommended for C) to read, mainly introducing the basic syntax of Go language and helping readers quickly get started with Go language.
- Zero-based users can try to read the [Go official documentation](https://golang.org/doc/) or [Runoob tutorial](https://www.runoob.com/go/go-tutorial.html).

## Basic Program

A simple Go program consists of package declaration, package import, function declaration, and function body.
The entry point of a Go program is the `main` function, and the package where the `main` function is located must be the `main` package.

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

## Package

A package is the basic organizational unit of Go language, and each Go file belongs to a package. The declaration of a package is implemented through the `package` keyword. The package name and folder name can be inconsistent, but it is recommended to keep them consistent.

The syntax of declaring a package is as follows:

## Import

The import syntax of Go language is as follows:

```go
import "fmt"
```

Multi-line import

```go
import (
    "fmt"
    "os"
)
```

Import standard Go packages from git repository

```go
import "github.com/cloudwego/kitex"
```

After importing, you can use functions, variables, etc. in the package.

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

## Variable

The variable declaration format of Go language is as follows (type postposition):

```go
var variable_name type
```

For example

```go
var a int
var b string
```

The variable declaration of Go language can also initialize variables while using the `var` keyword, the format is as follows:

```go
var variable_name type = expression
```

The variable declaration of Go language can also use the `:=` operator to initialize variables, the format is as follows: (can only be used in functions)

```go
variable_name := expression
```

## Function

The function declaration format of Go language is as follows:

```go
func function_name(parameter_list) (return_value_list) {
    function body
}
```

For example

```go
func add(a int, b int) int {
    return a + b
}
```

## Branch and Loop

Go language has `if` and `switch` two branch statements, and `for` and `range` two loop statements.

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

## Container

Go language has arrays, slices, dictionaries, structures, etc.

### Array

```go
var arr [5]int
```

### Slice (can be understood as a dynamic array, and the slice is a reference type, the array is a value type, the slice is used in more scenarios than the array)

```go
var slice []int
```

### Dictionary

```go
var dict map[string]int
```

### Structure

```go
type Person struct {
    Name string
    Age int
}
```

## Summary

This article introduces the basic syntax of Go language, including packages, variables, functions, branches and loops, containers, etc. I hope it will be helpful to everyone.
```

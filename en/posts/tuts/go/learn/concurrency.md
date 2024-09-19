---
recommend: 30
title: Go 并发编程
tags:
  - Go
  - 并发
  - 协程
  - 速成
---

# Go 并发编程：协程及通道，select，锁

## 简介

- 并发编程是指程序中包含多个独立的执行单元，这些执行单元可以并发执行，提高程序的运行效率。
  Go以抗高并发而著称，Go的并发编程模型是基于协程的，协程是一种轻量级的线程，可以在程序中创建成千上万个协程，而不会导致系统资源的耗尽。
- Go的`goroutine`是一种协程，`goroutine`的创建和销毁都非常快，`goroutine`的调度是由Go运行时系统自动完成的，程序员无需关心。
- `channel`是Go语言中用于协程间通信的数据结构，`channel`是类型安全的，可以避免数据竞争问题。
- `sync`包提供了一些锁机制，例如`sync.Mutex`，`sync.RWMutex`，`sync.WaitGroup`等，可以保证共享资源的安全访问。

## 协程

- Go语言的协程格式如下：

```go
package main

import (
    "fmt"
    "time"
)

func say(s string) {
    for i := 0; i < 5; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(s)
    }
}

func main() {
    go say("world")
    say("hello")
}
```

以上代码中，`say`函数是一个协程，`go say("world")`创建了一个协程，`say("hello")`是主协程。
运行结果

```shell
hello
world
```

也许这样还不够直观，我们可以多次循环输出两个字符串，看看协程的执行顺序。

```go
func main() {
    for i := 0; i < 5; i++ {
        go say("world")
        say("hello")
    }
}
```

运行结果

```shell
hello
world
hello
hello
world
world
hello
world
hello
world
```

可以看到，协程的执行顺序是不确定的，这是因为协程的调度是由Go运行时系统自动完成的。

## 通道

- Go语言的通道是一种类型安全的数据结构，用于协程间通信。
- 通道的声明格式如下：

### 声明

```go
// var 通道名 chan 元素类型
var intChan chan int
```

### 创建

- 通道无缓冲区的通道创建格式如下：

```go
// 通道名 = make(chan 元素类型)
intChan = make(chan int)
```

### 发送及接收

- 通道的发送和接收格式如下：

```go
// 发送
// 通道名 <- 元素
intChan <- 1

// 接收
// 元素 = <- 通道名
i := <-intChan
```

### 缓冲区

- 缓冲区是指通道中可以存放的元素个数，在缓冲区满时，发送操作会阻塞，直到有空间为止，在缓冲区空时，接收操作会阻塞，直到有元素为止。
- 通道的缓冲区大小可以通过`make`函数的第二个参数指定，默认为0，例如：

```go
intChan = make(chan int, 10)
```

### 总示例

```go
package main

import "fmt"

func routine1(c chan int) {
    for i := 0; i < 10; i++ {
        c <- i
    }
    close(c)
}

func routine2(c chan int) {
    for {
        i, ok := <-c
        if !ok {
            break
        }
        fmt.Println(i)
    }
}

func main() {
    c := make(chan int)
    go routine1(c)
    go routine2(c)
    select {}
}
```
在以上代码中，`routine1`函数向通道`c`发送0到9的整数，`routine2`函数从通道`c`接收整数并打印，`select{}`是一个空的`select`语句，用于阻塞主协程。
运行结果

```shell
0
1
2
3
4
5
6
7
8
9
```

## select语句

- `select`语句用于处理多个通道的发送和接收操作，`select`语句会随机选择一个可用通道执行，如果没有可用通道，则会阻塞。
- `select`语句的格式如下：

```go
select {
case <-ch1:
    // do something
case ch2 <- 1:
    // do something
default:
    // do something
}
```

## 锁

- Go语言的`sync`包提供了一些锁机制，例如`sync.Mutex`，`sync.RWMutex`，`sync.WaitGroup`等，可以保证共享资源的安全访问。
- 以下是一个使用`sync.Mutex`的示例：

```go
package main

import (
    "fmt"
    "sync"
)

var count int
var lock sync.Mutex

func increment() {
    lock.Lock()
    defer lock.Unlock()
    count++
}

func main() {
    var wg sync.WaitGroup
    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            increment()
        }()
    }
    wg.Wait()
    fmt.Println(count)
}
```

### 扩展
- 除了使用锁，还可以使用`atomic`包来保证共享资源的安全访问。这个包保证了操作的[原子性](https://zh.wikipedia.org/wiki/%E5%8E%9F%E5%AD%90%E6%93%8D%E4%BD%9C)。

```go
package main

import (
    "fmt"
    "sync"
    "sync/atomic"
)

var count int32

func increment() {
    atomic.AddInt32(&count, 1)
}

func main() {
    var wg sync.WaitGroup
    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            increment()
        }()
    }
    wg.Wait()
    fmt.Println(count)
}
```

## 总结

- Go语言的并发编程模型是基于协程的，协程是一种轻量级的线程，合理使用协程可以提高程序的运行效率。
- 通道是Go语言中用于协程间通信的数据结构，通道是类型安全的，可以避免数据竞争问题。


// 以下是对应的英文版本
---
recommend: 30
title: Go Concurrency
tags:
  - Go
  - Concurrency
  - Goroutine
  - Quick Start
---

# Go Concurrency: Goroutine and Channel, Select, Lock

## Introduction

- Concurrency programming refers to the presence of multiple independent execution units in a program that can execute concurrently, improving the efficiency of the program.
  Go is known for its high concurrency, and its concurrency programming model is based on goroutines, which are lightweight threads that can create thousands of goroutines in a program without exhausting system resources.
- Go's `goroutine` is a kind of coroutine, and the creation and destruction of `goroutine` are very fast. The scheduling of `goroutine` is automatically completed by the Go runtime system, and the programmer does not need to care about it.
- `channel` is a data structure used for communication between goroutines in Go language. `channel` is type-safe
- `sync` package provides some locking mechanisms, such as `sync.Mutex`, `sync.RWMutex`, `sync.WaitGroup`, etc., which can ensure the safe access of shared resources.

## Goroutine

- The format of Go language goroutine is as follows:

```go
package main

import (
    "fmt"
    "time"
)

func say(s string) {
    for i := 0; i < 5; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(s)
    }
}

func main() {
    go say("world")
    say("hello")
}
```

In the above code, the `say` function is a goroutine, `go say("world")` creates a goroutine, and `say("hello")` is the main goroutine.

Run the result

```shell
hello
world
```

Perhaps this is not intuitive enough, we can output two strings multiple times in a loop to see the execution order of the goroutine.

```go
func main() {
    for i := 0; i < 5; i++ {
        go say("world")
        say("hello")
    }
}
```

Run the result

```shell
hello
world
hello
hello
world
world
hello
world
hello
world
```

As you can see, the execution order of the goroutine is not determined, because the scheduling of the goroutine is automatically completed by the Go runtime system.

## Channel

- The channel in Go language is a type-safe data structure used for communication between goroutines.

### Declaration

```go
// var channel_name chan element_type
var intChan chan int
```

### Create

- The creation format of a channel without a buffer is as follows:

```go
// channel_name = make(chan element_type)
intChan = make(chan int)
```

### Send and Receive

- The format of sending and receiving channels is as follows:

```go
// Send
// channel_name <- element
intChan <- 1

// Receive
// element = <- channel_name
i := <-intChan
```

### Buffer

- The buffer refers to the number of elements that can be stored in the channel. When the buffer is full, the send operation will block until there is space. When the buffer is empty, the receive operation will block until there are elements.
- The buffer size of the channel can be specified by the second parameter of the `make` function, which is 0 by default, for example:

```go
intChan = make(chan int, 10)
```

### Total Example

```go
package main

import "fmt"

func routine1(c chan int) {
    for i := 0; i < 10; i++ {
        c <- i
    }
    close(c)
}

func routine2(c chan int) {
    for {
        i, ok := <-c
        if !ok {
            break
        }
        fmt.Println(i)
    }
}

func main() {
    c := make(chan int)
    go routine1(c)
    go routine2(c)
    select {}
}
```

In the above code, the `routine1` function sends integers from 0 to 9 to the channel `c`, the `routine2` function receives integers from the channel `c` and prints them, and the `select{}` is an empty `select` statement used to block the main goroutine.

Run the result

```shell
0
1
2
3
4
5
6
7
8
9
```

## Select Statement

- The `select` statement is used to handle multiple channel send and receive operations. The `select` statement randomly selects an available channel to execute. If there is no available channel, it will block.
- The format of the `select` statement is as follows:

```go
select {
case <-ch1:
    // do something
case ch2 <- 1:
    // do something
default:
    // do something
}
```

## Lock

- The `sync` package of Go language provides some locking mechanisms, such as `sync.Mutex`, `sync.RWMutex`, `sync.WaitGroup`, etc., which can ensure the safe access of shared resources.

Here is an example using `sync.Mutex`:

```go
package main

import (
    "fmt"
    "sync"
)

var count int
var lock sync.Mutex

func increment() {
    lock.Lock()
    defer lock.Unlock()
    count++
}

func main() {
    var wg sync.WaitGroup
    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            increment()
        }()
    }
    wg.Wait()
    fmt.Println(count)
}
```

### Extension

- In addition to using locks, you can also use the `atomic` package to ensure the safe access of shared resources. This package ensures the [atomicity](https://en.wikipedia.org/wiki/Atomicity) of operations.

```go

package main

import (
    "fmt"
    "sync"
    "sync/atomic"
)

var count int32

func increment() {
    atomic.AddInt32(&count, 1)
}

func main() {
    var wg sync.WaitGroup
    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            increment()
        }()
    }
    wg.Wait()
    fmt.Println(count)
}
```

## Summary

- Go language's concurrency programming model is based on goroutines, which are lightweight threads. Reasonable use of goroutines can improve the efficiency of the program.
- Channels are data structures used for communication between goroutines in Go language. Channels are type-safe
- The `sync` package provides some locking mechanisms, such as `sync.Mutex`, `sync.RWMutex`, `sync.WaitGroup`, etc., which can ensure the safe access of shared resources.
- The `atomic` package can be used to ensure the safe access of shared resources. This package ensures the [atomicity](https://en.wikipedia.org/wiki/Atomicity) of operations.
---
recommend: 31
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
        wg.Add(1)x
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

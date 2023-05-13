---

category: 编程语言

tag: Java

order: 11

excerpt: Java 高级

---
# :frog: Java-高级
## 异常
在计算机中，有许许多多的异常，会出现各种各样的错误。

程序想要读取某个文件，但是用户给删掉了
```java
// 用户删除了该文件：
String t = readFile("C:\\abc.txt"); // FileNotFoundException!
```
有些错误是无法避免的，比如网络中断，不能连接服务器；内存耗尽，程序不能进行下去...

一个健壮的程序必须能处理可能出现的各种错误。

Java提供了一套异常处理机制。
```java
try {
    String s = processFile(“C:\\test.txt”);
    // ok:
} catch (FileNotFoundException e) {
    // file not found:
} catch (SecurityException e) {
    // no read permission:
} catch (IOException e) {
    // io error:
} catch (Exception e) {
    // other error:
}
```
Java中，程序执行过程中的异常事件可以分为两类
- `Error`(错误)，一般无能为力。例如
    - `OutOfMemoryError`：内存耗尽
    - `NoClassDefFoundError`：无法加载某个Class
    - `StackOverflowError`：栈溢出

- `Exception`运行时的错误，可以被捕获并处理
    - `RuntimeException`以及它的子类；
    - 非`RuntimeException`（包括`IOException`、`ReflectiveOperationException`等等）

Java规定
- 必须捕获的异常，包括`Exception`及其子类，但不包括`RuntimeException`及其子类，这种类型的异常称为`Checked Exception`。

- 不需要捕获的异常，包括`Error`及其子类，`RuntimeException`及其子类。

也就是说，`Error`及子类不需要捕获，`RuntimeException`不强制捕获，其他的强制捕获。
### 捕获异常
在Java中，我们用`try...catch`语句来捕获异常，`try{...}`语句中放可能发生异常的语句。`catch`语句来捕获异常并处理。
```java
public static void main(String[] args) {
    try {
        process1();
        process2();
        process3();
    } catch (IOException e) {
        System.out.println(e);
    } catch (NumberFormatException e) {
        System.out.println(e);
    }
}
```
分析一下上面的代码，若`try`语句发生异常，从上到下匹配异常，若匹配到`catch (NumberFormatException e)`，则会把`System.out.println(e);`执行。

由于捕获的匹配是从上到下，因此子类一定要放在前面进行匹配
```java
public static void main(String[] args) {
    try {
        process1();
        process2();
        process3();
    } catch (IOException e) {
        System.out.println("IO error");
    } catch (UnsupportedEncodingException e) { // 永远捕获不到
        System.out.println("Bad encoding");
    }
}
```
上面的例子中，`UnsupportedEncodingException`这个异常类继承自`IOException`，若发生`IOException`异常，一定是`IOException`被匹配到，`UnsupportedEncodingException`永远无法被匹配。

有的时候我们希望无论有没有异常都需要执行一些代码，那么我们就可以把他放在`finally`里。
```java
public static void main(String[] args) {
    try {
        process1();
        process2();
        process3();
    } catch (UnsupportedEncodingException e) {
        System.out.println("Bad encoding");
    } catch (IOException e) {
        System.out.println("IO error");
    } finally {
        System.out.println("END");
    }
}
```
无论有没有异常，`System.out.println("END");`一定会执行。

### 抛出异常

有的时候在写方法的时候碰到可能会出现异常的语句，但是我不想处理，于是就可以把它通过`throws`语句把它抛出去。让调用它的人去捕获异常，处理异常
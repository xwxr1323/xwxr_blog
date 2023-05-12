---

category: 编程语言

tag: Java

order: 9

excerpt: Java 面向对象3

---
# :frog: Java-面向对象3

## 包
如果小明写了一个`Person`类，小万也写了一个`Person`类，小康既想用小明的也想用小万的怎么办。Java提供了`package`来解决名字冲突。

Java中，类似`Person`这样的类名只是简写，真正的完整的类名是`包名.类名`

例如

- 小明的`Person`类存放在包`ming`下面，因此，完整类名是`ming.Person`；

- 小红的`Person`类存放在包`hong`下面，因此，完整类名是`hong.Person`；

因此在定义类时，我们需要在第一行声明包名。
```java
package ming;
public class Person{

}
```
JVM只看完整的类名，只要包名不同，就表示不是一个相同的类。

包可以是多层结构，用`.`隔开。例如`java.util`
:::warning
包没有父子关系。`java.util`和`java.util.zip`是两个不同的包
:::
### import
我们通常在一个类中引用其他的类，有两种引用的写法。
1.  直接写出完整类名
```java
package ming;
public class Person{
    public void run(){
         mr.jun.Arrays arrays = new mr.jun.Arrays();
    }
}
```
2. 用`import`导入类
```java
// Person.java
package ming;

// 导入完整类名:
import mr.jun.Arrays;

public class Person {
    public void run() {
        Arrays arrays = new Arrays();
    }
}
```
## 作用域
### 访问修饰符
我们经常看到`public` `protected` `private`这些修饰符，我们来看看他们的作用域。
|访问修饰符|本类|同包|子类|不同包|
|:-:|:-:|:-:|:-:|:-:|
|`public`|:white_check_mark:|:white_check_mark:|:white_check_mark:|:white_check_mark:|
|`protected`|:white_check_mark:|:white_check_mark:|:white_check_mark:|:x:|
|`默认`|:white_check_mark:|:white_check_mark:|:x:|:x:|
|`private`|:white_check_mark:|:x:|:x:|:x:|

我们可以很清晰的看到他们能被什么地方的类所访问。
### 局部变量
在方法内部定义的变量称为局部变量，局部变量作用域从变量声明处开始到对应的块结束。方法参数也是局部变量。
### final
`final`与访问权限不冲突

- 修饰`class`阻止被继承
- 修饰`method`阻止被子类重写
- 修饰`field`属性阻止被重新赋值
- 修饰形参阻止被重新赋值`public void run(final int t)`

总而言之，被`final`修饰的不允许被修改
## 静态属性和静态方法
在一个`class`定义的属性和方法我们称之为`实例属性和实例方法`，每一个实例都拥有属于自己的属性和方法，他们互不干扰。
```java
public class A {
    public int age;
    public String name;
    public A(int age,String name){
        this.age = age;
        this.name = name;
    }
}
public class Main{
    public static void main(String[] args){
        A xm = new A(18,"xm");
        A xl = new A(10,"xl");
    }
}
```
我们画张图来表示。

![](/Java/26.png)

每个实例化出来的对象都拥有自己独立的空间，拥有独立的属性和方法。

当属性或者方法被`static`修饰时，他变成了静态方法，静态属性，也称作类变量，类方法。它不属于实例，它属于类，它只在类被加载时初始化一次，无论类被实例化多少次，类变量和类方法只初始化一次。我们来看下面的例子。
```java
public class A {
    public int age;
    public String name;
    public int num = 200;
    public A(int age,String name){
        this.age = age;
        this.name = name;
    }
}
public class Main{
    public static void main(String[] args){
        A xm = new A(18,"xm");
        A xl = new A(10,"xl");
    }
}
```
我们来看看他们在内存中的表现。

![](/Java/27.png)

在加载类时，会在堆内存中开辟一块空间存放类变量和类方法，虽然每个实例都有类变量和类方法，但本质上类变量不属于任何一个实例，实例的类变量只是指向这片内存。

因此我们不使用`实例.变量`来使用类变量，我们使用`类名.变量`来使用类变量。
```java
Person.number = 99;
System.out.println(Person.number);
```
静态方法经常用于工具类。例如：

- Arrays.sort()

- Math.random()

静态方法也经常用于辅助方法。注意到Java程序的入口`main()`也是静态方法。
## 抽象类
```java
class Person{
    public void eat(){
        System.out.println("吃");
    }
}
class Student extends Person{
    @Override
    public void eat(){
        System.out.println("吃饭");
    }
}
class Teacher extends Person{
    @Override
    public void eat(){
        System.out.println("吃牛排");
    }
}
```
在上面的例子中，两个子类都重写了父类的`eat`方法，这样的话，父类写`eat`方法就没意义了，反正子类也要重写，但是不写呢，又不能使用多态，于是，Java提供了一种叫`抽象方法`的概念。就是在父类只写方法名，不需要实现，由继承的子类去实现这个方法，称之`抽象方法`。我们使用`abstract`去声明抽象方法，当一个类存在抽象方法，我们必须把类也声明成`抽象类`。
```java
abstract class Person{
    abstract public void eat();
}
class Student extends Person{
    @Override
    public void eat(){
        System.out.println("吃饭");
    }
}
class Teacher extends Person{
    @Override
    public void eat(){
        System.out.println("吃牛排");
    }
}
```

注意:
- 抽象类不能被实例化
- 抽象类可以用于任意成员
- 抽象方法不能实现，也就是不能有`{}`
- 如果一个类继承了抽象类，它必须实现抽象类的所有抽象方法，除非它自己也声明为`abstract`类。
## 接口
接口是一种规范，用户需要实现某个功能就必须按照这种规范去实现。现实生活中，USB口就是一种接口，你的数码产品想用连接我的电脑就必须实现这个接口。换句话说，USB口这个接口是一种规范，它的长宽高，引脚数量规定好了，如果用户需要通过USB口连接电脑，就必须实现这个规范，怎么实现，就是设计和USB口互补的口插进去，这就是实现规范。

接口就是公共的行为规范标准，大家在实现是，只要符合规范标准，就可以通用。举个实际的例子。

想象这样的一种场景，我们定义了2种不同的类。
```java
class Cat{
    public void run(){
        System.out.println("Cat running...")
    }
}
class Robot{
    public void run(){
        System.out.println("Robot running...")
    }
}
```
我们现在需要在一个方法内调用`run`方法。但是这个形参怎么设计呢，按照之前的想法，向上转型，利用多态实现。或者抽象类
```java
abstract class Template{
    public abstract void run();
}
class Cat extends Template{
    public void run(){
        System.out.println("Cat running...")
    }
}
class Robot extends Template{
    public void run(){
        System.out.println("Robot running...")
    }
}
class Main{
    public void testRun(Template test){
        test.run();
    }
}
```
但是，如果我们的`Cat`继承`Animal`怎么办，就不能继承`Template`，按照现实的逻辑来说，`Robot`和`Cat`也不能继承自同一个类，他们并没有逻辑上的相同点，但是按照接口来说，我们设计一个接口，他有一个`run`方法。也就是说，我们设计一种规范(接口),`Cat`类和`Robot`类都按照我的接口去实现`run`方法，那么是不是可以通用了。
```java
Interface class Template{
    public abstract void run();
}
class Cat implement Template{
    public void run(){
        System.out.println("Cat running...")
    }
}
class Robot implement Template{
    public void run(){
        System.out.println("Robot running...")
    }
}
class Main{
    public void testRun(Template test){
        test.run();
    }
}
```
这就是接口的实际作用。

在Java中，我们使用`Interface`来定义接口。用`implement`来实现接口。
```java
public interface Electronic {
    // 常量
    String LED = "LED";

    // 抽象方法
    int getElectricityUse();

    // 静态方法
    static boolean isEnergyEfficient(String electtronicType) {
        return electtronicType.equals(LED);
    }

    // 默认方法
    default void printDescription() {
        System.out.println("电子");
    }
}

```
注意
- 一个类可以实现多个接口，用`,`隔开
- 接口定义的常量前缀为`public static final`。
- 若没有使用`private` `default` `static` 修饰则默认为`public abstract`抽象方法。不允许实现
- 接口允许定义静态方法。只允许用`接口名.方法名`调用。允许实现
- 接口提供`default`默认方法。它必须实现，用途是给一些类没有实现这个方法提供一个默认的实现。
- 接口不允许被实例化
- 实现接口必须实现接口的所有抽象方法

## 内部类
一个类的内部完整嵌套了另一个类结构，被嵌套的类称为内部类，嵌套内部类的类叫外部类。最直接的作用就是内部类可以访问外部类的私有属性。
### 成员内部类(成员)
定义在外部类的成员位置，可以用修饰符修饰，可以访问外部类的所有属性和方法
```java
public class Main {
    public static void main(String[] args) {
        Outer outer = new Outer("Nested"); // 实例化一个Outer
        Outer.Inner inner = outer.new Inner(); // 实例化一个Inner
        inner.hello();
    }
}

class Outer {
    private String name;

    Outer(String name) {
        this.name = name;
    }

    class Inner {
        void hello() {
            System.out.println("Hello, " + Outer.this.name);
        }
    }
}
```
### 静态内部类(成员)
顾名思义，用`static`修饰的成员内部类。
```java
public class App {
    public static void main(String[] args) {
        Outer.Inner inner = new Outer.Inner();
        inner.hello();
    }
}
class Outer {
    private String name;

    Outer(String name) {
        this.name = name;
    }

    static class Inner {
        void hello() {
            System.out.println("Hello");
        }
    }
}
```
不需要实例化外部类，直接使用`Outer.Inner`去实例化内部类。可以访问外部类的静态变量，无论私有还是共有。
### 局部内部类(方法内)
```java
class Outer{
    private n1 = 100;
    public void m1(){
        class Innter{   //定义在方法内的类  可以访问外部类的私有属性
            public void f1(){
                System.out.println("n1="+n1);
            }
        }
    }
}
```
- 定义在方法内
- 不能添加访问修饰符，地位是局部变量，只能使用`final`
- 作用域只能在方法内，所以只能在方法内`new`
- 可以访问外部类的所有属性和方法
```java
class Outer{
    private n1 = 100;
    public void m1(){
        class Innter{   //定义在方法内的类  可以访问外部类的私有属性
            public void f1(){
                System.out.println("n1="+n1);
            }
        }
        Innter in = new Innter();
        in.f1();
    }
}
class Main(){
    public static void main(String[] args){
        Outer out = new Outer();
        out.m1();
    }
}
```
Main类不能直接创建Innter类，在方法内创建，在方法内new
### 匿名内部类(方法内)
想象这样一种场景。
```java
interface AA {
    void run();
}
```
我们定义了一个接口`AA`，按照传统方式，我们需要写一个类去实现这个接口。
```java
class BB implements AA{
    @Override
    public void run(){
        System.out.println("B run");
    }
}
```
但是上级要求这个类只需要用一次，如果我们写一个类的话会十分浪费资源。Java提供了一种匿名内部类的语法，帮助我们完成这种需求。
```java
public class App {
    public static void main(String[] args) {
        
    }
    public static void test(){
        AA a = new AA() {
            @Override
            public void run() {
                System.out.println("实现了run方法");
            }
        };
        a.run();
    }
}
interface AA {
    void run();
}
```
一般我们使用`new AA()`来实例化一个对象，但是接口是不允许这么做的。在`{}`我们用定义一个类去实现接口的方式去写，和传统方式一样。它的底层是怎样的呢。

java在编译时看到`new AA(){}`实例化时还有一个`{}`他会在底层定义这样一个类。
```java
class APP$1 implements AA {

    @Override
    public void run() {
        System.out.println("实现了run方法");
    }
}
```
实例化出来一个对象，并将地址给了`AA a`。由于我们只需要使用一次类，我们就不用额外定义类了。

除了接口外，匿名类也可以完全继承普通类。
```java
public class App {
    public static void main(String[] args) {

    }
    public static void test(){
        AA a = new AA("wjj") {
            @Override
            public void run() {
                System.out.println("实现了run方法");
            }
        };
        a.run();
    }
}
class AA {
    public AA(String name) {
    }

    public void run() {
        
    }
}
```
在底层。java定义了一个类去继承`AA`类，并实例化出来地址给`a`
```java
class APP$1 extends AA {

    @Override
    public void run() {
        System.out.println("实现了run方法");
    }
}
```
匿名内部类最主要的应用便是在实参。
```java
public class App {
    public static void main(String[] args) {
        test(new AA("wjj") {
            @Override
            public void run() {
                System.out.println("实现了run方法");
            }
        });
    }
    public static void test(AA a){
        a.run();
    }
}
class AA {
    public AA(String name) {
    }

    public void run() {

    }
}
```
`test`的形参是`AA`对象，我们可以直接将匿名内部类传递进去，高效简洁。
## classpath和jar
::: info
来自[廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/1252599548343744/1260466914339296)

:::
在Java中，我们经常听到`classpath`这个东西。网上有很多关于“如何设置`classpath`”的文章，但大部分设置都不靠谱。

到底什么是`classpath`？

`classpath`是JVM用到的一个环境变量，它用来指示JVM如何搜索class。

因为Java是编译型语言，源码文件是`.java`，而编译后的`.class`文件才是真正可以被JVM执行的字节码。因此，JVM需要知道，如果要加载一个`abc.xyz.Hello`的类，应该去哪搜索对应的`Hello.class`文件。

所以，`classpath`就是一组目录的集合，它设置的搜索路径与操作系统相关。例如，在Windows系统上，用;分隔，带空格的目录用""括起来，可能长这样：
```sh
C:\work\project1\bin;C:\shared;"D:\My Documents\project1\bin"
```
在Linux系统上，用:分隔，可能长这样：
```sh
/usr/shared:/usr/local/bin:/home/liaoxuefeng/bin
```
现在我们假设classpath是.;`C:\work\project1\bin;C:\shared`，当JVM在加载`abc.xyz.Hello`这个类时，会依次查找：

- <当前目录>\abc\xyz\Hello.class

- C:\work\project1\bin\abc\xyz\Hello.class

- C:\shared\abc\xyz\Hello.class

注意到`.`代表当前目录。如果JVM在某个路径下找到了对应的`class`文件，就不再往后继续搜索。如果所有路径下都没有找到，就报错。

`classpath`的设定方法有两种：

在系统环境变量中设置classpath环境变量，不推荐；

在启动JVM时设置classpath变量，推荐。

我们强烈不推荐在系统环境变量中设置classpath，那样会污染整个系统环境。在启动JVM时设置classpath才是推荐的做法。实际上就是给java命令传入-classpath或-cp参数：
```sh
java -classpath .;C:\work\project1\bin;C:\shared abc.xyz.Hello
```
或者使用-cp的简写：
```sh
java -cp .;C:\work\project1\bin;C:\shared abc.xyz.Hello
```
没有设置系统环境变量，也没有传入-cp参数，那么JVM默认的classpath为.，即当前目录：
```sh
java abc.xyz.Hello
```
上述命令告诉JVM只在当前目录搜索Hello.class。

在IDE中运行Java程序，IDE自动传入的-cp参数是当前工程的bin目录和引入的jar包。

通常，我们在自己编写的class中，会引用Java核心库的class，例如，String、ArrayList等。这些class应该上哪去找？

有很多“如何设置classpath”的文章会告诉你把JVM自带的rt.jar放入classpath，但事实上，根本不需要告诉JVM如何去Java核心库查找class，JVM怎么可能笨到连自己的核心库在哪都不知道？
:::tip
 不要把任何Java核心库添加到classpath中！JVM根本不依赖classpath加载核心库！
:::
更好的做法是，不要设置classpath！默认的当前目录.对于绝大多数情况都够用了。
### jar包
如果有很多.class文件，散落在各层目录中，肯定不便于管理。如果能把目录打一个包，变成一个文件，就方便多了。

jar包就是用来干这个事的，它可以把package组织的目录层级，以及各个目录下的所有文件（包括.class文件和其他文件）都打成一个jar文件，这样一来，无论是备份，还是发给客户，就简单多了。

jar包实际上就是一个zip格式的压缩文件，而jar包相当于目录。如果我们要执行一个jar包的class，就可以把jar包放到classpath中：
```sh
java -cp ./hello.jar abc.xyz.Hello
```
这样JVM会自动在hello.jar文件里去搜索某个类。

那么问题来了：如何创建jar包？

因为jar包就是zip包，所以，直接在资源管理器中，找到正确的目录，点击右键，在弹出的快捷菜单中选择“发送到”，“压缩(zipped)文件夹”，就制作了一个zip文件。然后，把后缀从.zip改为.jar，一个jar包就创建成功。

jar包还可以包含一个特殊的/META-INF/MANIFEST.MF文件，MANIFEST.MF是纯文本，可以指定Main-Class和其它信息。JVM会自动读取这个MANIFEST.MF文件，如果存在Main-Class，我们就不必在命令行指定启动的类名，而是用更方便的命令：
```sh
java -jar hello.jar
```
在大型项目中，不可能手动编写MANIFEST.MF文件，再手动创建zip包。Java社区提供了大量的开源构建工具，例如Maven，可以非常方便地创建jar包。
## 模块
从Java 9开始，JDK又引入了模块（Module）。

什么是模块？这要从Java 9之前的版本说起。

我们知道，`.class`文件是JVM看到的最小可执行文件，而一个大型程序需要编写很多Class，并生成一堆`.class`文件，很不便于管理，所以，jar文件就是class文件的容器。

在Java 9之前，一个大型Java程序会生成自己的jar文件，同时引用依赖的第三方jar文件，而JVM自带的Java标准库，实际上也是以jar文件形式存放的，这个文件叫`rt.jar`，一共有60多M。

如果是自己开发的程序，除了一个自己的app.jar以外，还需要一堆第三方的jar包，运行一个Java程序，一般来说，命令行写这样：
```sh
java -cp app.jar:a.jar:b.jar:c.jar com.liaoxuefeng.sample.Main]
```
:::tip
 注意：JVM自带的标准库rt.jar不要写到classpath中，写了反而会干扰JVM的正常运行。
:::
如果漏写了某个运行时需要用到的jar，那么在运行期极有可能抛出
```sh
ClassNotFoundException。
```
所以，jar只是用于存放class的容器，它并不关心class之间的依赖。

从Java 9开始引入的模块，主要是为了解决“依赖”这个问题。如果`a.jar`必须依赖另一个`b.jar`才能运行，那我们应该给`a.jar`加点说明啥的，让程序在编译和运行的时候能自动定位到`b.jar`，这种自带“依赖关系”的class容器就是模块。

为了表明Java模块化的决心，从Java 9开始，原有的Java标准库已经由一个单一巨大的`rt.jar`分拆成了几十个模块，这些模块以`.jmod`扩展名标识，可以在`$JAVA_HOME/jmods`目录下找到它们：
```sh
java.base.jmod
java.compiler.jmod
java.datatransfer.jmod
java.desktop.jmod
...
```
这些`.jmod`文件每一个都是一个模块，模块名就是文件名。例如：模块java.base对应的文件就是java.base.jmod。模块之间的依赖关系已经被写入到模块内的`module-info.class`文件了。所有的模块都直接或间接地依赖java.base模块，只有java.base模块不依赖任何模块，它可以被看作是“根模块”，好比所有的类都是从Object直接或间接继承而来。

把一堆class封装为jar仅仅是一个打包的过程，而把一堆class封装为模块则不但需要打包，还需要写入依赖关系，并且还可以包含二进制代码（通常是JNI扩展）。此外，模块支持多版本，即在同一个模块中可以为不同的JVM提供不同的版本。

### 编写模块
那么，我们应该如何编写模块呢？还是以具体的例子来说。首先，创建模块和原有的创建Java项目是完全一样的，以oop-module工程为例，其中，bin目录存放编译后的class文件，src目录存放源码，按包名的目录结构存放，仅仅在src目录下多了一个module-info.java这个文件，这就是模块的描述文件。在这个模块中，它长这样：
```java
module hello.world {
	requires java.base; // 可不写，任何模块都会自动引入java.base
	requires java.xml;
}
```
其中，`module`是关键字，后面的`hello.world`是模块的名称，它的命名规范与包一致。花括号的`requires xxx;`表示这个模块需要引用的其他模块名。除了java.base可以被自动引入外，这里我们引入了一个`java.xml`的模块。

当我们使用模块声明了依赖关系后，才能使用引入的模块。例如，Main.java代码如下：
```java
package com.itranswarp.sample;

// 必须引入java.xml模块后才能使用其中的类:
import javax.xml.XMLConstants;

public class Main {
	public static void main(String[] args) {
		Greeting g = new Greeting();
		System.out.println(g.hello(XMLConstants.XML_NS_PREFIX));
	}
}
```
如果把`requires java.xml;`从`module-info.java`中去掉，编译将报错。可见，模块的重要作用就是声明依赖关系。

下面，我们用JDK提供的命令行工具来编译并创建模块。

首先，我们把工作目录切换到oop-module，在当前目录下编译所有的.java文件，并存放到bin目录下，命令如下：
```sh
$ javac -d bin src/module-info.java src/com/itranswarp/sample/*.java
```
下一步，我们需要把bin目录下的所有class文件先打包成jar，在打包的时候，注意传入`--main-class`参数，让这个jar包能自己定位main方法所在的类：
```sh
$ jar --create --file hello.jar --main-class com.itranswarp.sample.Main -C bin .
```
现在我们就在当前目录下得到了hello.jar这个jar包，它和普通jar包并无区别，可以直接使用命令java -jar hello.jar来运行它。但是我们的目标是创建模块，所以，继续使用JDK自带的jmod命令把一个jar包转换成模块：
```sh
$ jmod create --class-path hello.jar hello.jmod
```
于是，在当前目录下我们又得到了hello.jmod这个模块文件，这就是最后打包出来的传说中的模块！

### 运行模块
要运行一个jar，我们使用``ava -jar xxx.jar`命令。要运行一个模块，我们只需要指定模块名。试试：
```sh
$ java --module-path hello.jmod --module hello.world
```
结果是一个错误：
```sh
Error occurred during initialization of boot layer
java.lang.module.FindException: JMOD format not supported at execution time: hello.jmod
```
原因是.jmod不能被放入--module-path中。换成.jar就没问题了：
```sh
$ java --module-path hello.jar --module hello.world
Hello, xml!
```
那我们辛辛苦苦创建的hello.jmod有什么用？答案是我们可以用它来打包JRE。

### 打包JRE
前面讲了，为了支持模块化，Java 9首先带头把自己的一个巨大无比的rt.jar拆成了几十个.jmod模块，原因就是，运行Java程序的时候，实际上我们用到的JDK模块，并没有那么多。不需要的模块，完全可以删除。

过去发布一个Java应用程序，要运行它，必须下载一个完整的JRE，再运行jar包。而完整的JRE块头很大，有100多M。怎么给JRE瘦身呢？

现在，JRE自身的标准库已经分拆成了模块，只需要带上程序用到的模块，其他的模块就可以被裁剪掉。怎么裁剪JRE呢？并不是说把系统安装的JRE给删掉部分模块，而是“复制”一份JRE，但只带上用到的模块。为此，JDK提供了jlink命令来干这件事。命令如下：
```sh
$ jlink --module-path hello.jmod --add-modules java.base,java.xml,hello.world --output jre/
```
我们在--module-path参数指定了我们自己的模块hello.jmod，然后，在--add-modules参数中指定了我们用到的3个模块java.base、java.xml和hello.world，用,分隔。最后，在--output参数指定输出目录。

现在，在当前目录下，我们可以找到jre目录，这是一个完整的并且带有我们自己hello.jmod模块的JRE。试试直接运行这个JRE：
```sh
$ jre/bin/java --module hello.world
Hello, xml!
```
要分发我们自己的Java应用程序，只需要把这个jre目录打个包给对方发过去，对方直接运行上述命令即可，既不用下载安装JDK，也不用知道如何配置我们自己的模块，极大地方便了分发和部署。

### 访问权限
前面我们讲过，Java的class访问权限分为public、protected、private和默认的包访问权限。引入模块后，这些访问权限的规则就要稍微做些调整。

确切地说，class的这些访问权限只在一个模块内有效，模块和模块之间，例如，a模块要访问b模块的某个class，必要条件是b模块明确地导出了可以访问的包。

举个例子：我们编写的模块hello.world用到了模块java.xml的一个类javax.xml.XMLConstants，我们之所以能直接使用这个类，是因为模块java.xml的module-info.java中声明了若干导出：
```java
module java.xml {
    exports java.xml;
    exports javax.xml.catalog;
    exports javax.xml.datatype;
    ...
}
```
只有它声明的导出的包，外部代码才被允许访问。换句话说，如果外部代码想要访问我们的hello.world模块中的com.itranswarp.sample.Greeting类，我们必须将其导出：
```java
module hello.world {
    exports com.itranswarp.sample;

    requires java.base;
	requires java.xml;
}
```
因此，模块进一步隔离了代码的访问权限。
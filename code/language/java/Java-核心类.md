---

category: 编程语言

tag: Java

order: 10

excerpt: Java 核心类

---
# :frog: Java-核心类
## String
在Java中，`String`是一个引用类型，它的本质是一个`class`，在Java中，由于`String`特别常见，对它有特殊的处理，用字面量`"..."`来表示一个字符串。
```java
String s = "world";
```
在`String`内部，字符串是通过一个`private final char[]`私有不可变的数组实现的。
```java
String s2 = new String(new char[] {'h', 'e', 'l', 'l', 'o'});
```
Java的编译器看到`"hello"`这样的字面量。他会转换成`new String(new char[] {'h', 'e', 'l', 'l', 'o'})`
我们可以看到，字符串是不可变的。`toLowerCase();`返回的是一个新的字符串。
```java
    String s1 = "hello";
    String s2 = "HELLO".toLowerCase();
```
`s1 == s2`为`false`，我们一般使用`s1.equals(s2)`来判断两个字符串是否相等。
### 子串
`String`类提供了许多方法来搜索字串，提取字串。
```java
// 是否包含子串:
"Hello".contains("ll"); // true
"Hello".indexOf("l"); // 2
"Hello".lastIndexOf("l"); // 3
"Hello".startsWith("He"); // true
"Hello".endsWith("lo"); // true
"Hello".substring(2); // "llo"
"Hello".substring(2, 4); "ll"
```
### 去除首尾空白字符
使用`trim()`方法可以去除字符串首尾空白字符，包括`\t` `\r` `\n`.返回一个新的字符串。
```java
"  \tHello\r\n ".trim(); // "Hello"
```
`strip()`方法也可以去除，除了`trim()`的那些，中文的空格`\u3000`也会被移除。
```java
"\u3000Hello\u3000".strip(); // "Hello"
" Hello ".stripLeading(); // "Hello "
" Hello ".stripTrailing(); // " Hello"
```
`String`还提供了方法来判断是否为空
```java
"".isEmpty(); // true，因为字符串长度为0
"  ".isEmpty(); // false，因为字符串长度不为0
"  \n".isBlank(); // true，因为只包含空白字符
" Hello ".isBlank(); // false，因为包含非空白字符
```
### 替换字符
- 根据字串或者字符串来替换
```java
String s = "hello";
s.replace('l', 'w'); // "hewwo"，所有字符'l'被替换为'w'
s.replace("ll", "~~"); // "he~~o"，所有子串"ll"被替换为"~~"
```
- 正则替换
```java
String s = "A,,B;C ,D";
s.replaceAll("[\\,\\;\\s]+", ","); // "A,B,C,D"
```
将满足正则的字串替换成`,`
### 分割字符
使用`split()`来分割字串，传入正则，返回`String[]`数组.
```java
String s = "A,B,C,D";
String[] ss = s.split("\\,"); // {"A", "B", "C", "D"}
```
### 拼接字符串
```java
String[] arr = {"A", "B", "C"};
String s = String.join("***", arr); // "A***B***C"
```
### 格式化字符串
```java
public class Main {
    public static void main(String[] args) {
        String s = "Hi %s, your score is %d!";
        System.out.println(s.formatted("Alice", 80));
        System.out.println(String.format("Hi %s, your score is %.2f!", "Bob", 59.5));
    }
}
```
- %s：显示字符串；
- %d：显示整数；
- %x：显示十六进制整数；
- %f：显示浮点数
### 类型转换
使用静态方法`valueOf()`可以将其他类型转换为字符串，它是一个重载方法，会根据参数类型不同调用不同的方法。
```java
String.valueOf(123); // "123"
String.valueOf(45.67); // "45.67"
String.valueOf(true); // "true"
String.valueOf(new Object()); // 类似java.lang.Object@122221112
```
将字符串转换为其他类型参考下面的例子
```java
int n1 = Integer.parseInt("123"); // 123
int n2 = Integer.parseInt("ff", 16); // 按十六进制转换，255
boolean b1 = Boolean.parseBoolean("true"); // true
boolean b2 = Boolean.parseBoolean("FALSE"); // false

char[] cs = "Hello".toCharArray(); // String -> char[]
String s = new String(cs); // char[] -> String
```
## StringBuilder
在Java中，我们可以直接使用`+`对`String`进行拼接
```java
String s = "";
for (int i = 0; i < 1000; i++) {
    s = s + "," + i;
}
```
但是由于`String`是不可变的，每一次`+`都会生成一个新的字符串，扔掉旧字符串，特别浪费。

Java提供了`StringBuilder`来解决这个问题。它是一个可变对象，预分配缓冲区，我们在增加字符时不需要创建临时对象。
```java
StringBuilder sb = new StringBuilder(1024);
for (int i = 0; i < 1000; i++) {
    sb.append(',');
    sb.append(i);
}
String s = sb.toString();
```
由于`append`方法返回的是`this`，我们可以在`.append()`后面接`.append()`
```java
public class Main {
    public static void main(String[] args) {
        var sb = new StringBuilder(1024);
        sb.append("Mr ")
          .append("Bob")
          .append("!")
          .insert(0, "Hello, ");
        System.out.println(sb.toString());
    }
}
```
:::info 
对于连续多个`+`，编译器会自动的转换为`StringBuilder`操作
:::
## StringJoiner
有的时候我们需要用分隔符来拼接，比如`String[] names = {"B","a","as"}`
,我们需要拼接成`B,a,as`，显然的，用`StringBuilder`拼接`.append().append(",")`再把末位的`,`删掉。`sb.delete(sb.length() - 2, sb.length());`

Java提供了`StringJoiner`来实现分隔符拼接数组
```java
public class Main {
    public static void main(String[] args) {
        String[] names = {"Bob", "Alice", "Grace"};
        var sj = new StringJoiner(", ", "Hello ", "!");
        for (String name : names) {
            sj.add(name);
        }
        System.out.println(sj.toString());
    }
}
```
第一个参数是分割的符号，第二个参数是开头，第三个参数是结尾
## 包装类
我们如何把基本类型变成引用类型呢。

想要把`int`基本类型变成一个引用类型，我们可以定义一个`Integer`类，它只包含一个实例字段`int`，这样，`Integer`类就可以视为`int`的包装类（Wrapper Class）：
```java
public class Integer {
    private int value;

    public Integer(int value) {
        this.value = value;
    }

    public int intValue() {
        return this.value;
    }
}
```
对于基本数据类型，Java都提供了对应的包装类型。
|基本类型|包装类|
|:-:|:-:|
|boolean	|java.lang.Boolean|
|byte	|java.lang.Byte|
|short	|java.lang.Short|
|int	|java.lang.Integer|
|long	|java.lang.Long|
|float	|java.lang.Float|
|double	|java.lang.Double|
|char	|java.lang.Character|

```java
public class Main {
    public static void main(String[] args) {
        int i = 100;
        // 通过new操作符创建Integer实例(不推荐使用,会有编译警告):
        Integer n1 = new Integer(i);
        // 通过静态方法valueOf(int)创建Integer实例:
        Integer n2 = Integer.valueOf(i);
        // 通过静态方法valueOf(String)创建Integer实例:
        Integer n3 = Integer.valueOf("100");
        System.out.println(n3.intValue());
    }
}
```
我们一般使用静态方法`valueOf`创建`Integer`对象，该方法返回`new Integer(i)`
### 自动转换
```java
Integer n = 100; // 编译器自动使用Integer.valueOf(int)
int x = n; // 编译器自动使用Integer.intValue()
```
### 进制转换
我们使用静态方法`parseInt()`将字符串解析成一个整数
```java
int x1 = Integer.parseInt("100"); // 100
int x2 = Integer.parseInt("100", 16); // 256,因为按16进制解析
```
`Integer`重写了`toString`方法，可以格式化任意进制的字符串
```java
public class Main {
    public static void main(String[] args) {
        System.out.println(Integer.toString(100)); // "100",表示为10进制
        System.out.println(Integer.toString(100, 36)); // "2s",表示为36进制
        System.out.println(Integer.toHexString(100)); // "64",表示为16进制
        System.out.println(Integer.toOctalString(100)); // "144",表示为8进制
        System.out.println(Integer.toBinaryString(100)); // "1100100",表示为2进制
    }
}
```
## JavaBean

若`class`的定义符合下面的规范，我们称这个`class`为`JavaBean`
- `private`修饰属性
- 通过`public`方法来读取和修改这些属性

下面的`class`就是典型的`JavaBean`
```java
public class Person {
    private String name;
    private int age;

    public String getName() { return this.name; }
    public void setName(String name) { this.name = name; }

    public int getAge() { return this.age; }
    public void setAge(int age) { this.age = age; }
}
```
## 枚举类
有的时候，我们需要判断某个值是不是等于某些值中的一个。
```java
public class Weekday {
    public static final int SUN = 0;
    public static final int MON = 1;
    public static final int TUE = 2;
    public static final int WED = 3;
    public static final int THU = 4;
    public static final int FRI = 5;
    public static final int SAT = 6;
}
```
我们可以使用`static final`来定义。
使用的时候可以这么用
```java
int day = 3;
day == Weekday.SAT;
```
这么写有点问题，对于日期而言，只能0-6，编译器不会检查`day`的合理性,如果是`if(day==6||day==7)`week并没有7，用户自己去定义day范围是不合理的，所有我们需要一个类型，把值固定在某些范围，编译器可以检查出来。
```java
public class Main {
    public static void main(String[] args) {
        Weekday day = Weekday.SUN;
        if (day == Weekday.SAT || day == Weekday.SUN) {
            System.out.println("Work at home!");
        } else {
            System.out.println("Work at office!");
        }
    }
}

enum Weekday {
    SUN, MON, TUE, WED, THU, FRI, SAT;
}
```
这样编译器就会检查day的类型，必须是Weekday，而且若用到的值不是枚举的值，也会报错。

我们用`==`判断两个枚举类型是不是相同的，尽管枚举类型是引用类型。
```java
if (day == Weekday.FRI) { // ok!
}
if (day.equals(Weekday.SUN)) { // ok, but more code!
}
```
### 底层
```java
enum Weekday {
    MON(1, "星期一"), TUE(2, "星期二"), WED(3, "星期三"), THU(4, "星期四"), FRI(5, "星期五"), SAT(6, "星期六"), SUN(0, "星期日");

    public final int dayValue;
    private final String chinese;

    private Weekday(int dayValue, String chinese) {
        this.dayValue = dayValue;
        this.chinese = chinese;
    }

    @Override
    public String toString() {
        return this.chinese;
    }
}

```
编译出来的`class`像下面这样
```java
public final class Weekday extends Enum { 
    public static final Weekday MON = new Weekday(1, "星期一");
    public static final Weekday TUE = new Weekday(2, "星期二");
    public static final Weekday WED = new Weekday(3, "星期三");
    public static final Weekday THU = new Weekday(4, "星期四");
    public static final Weekday FRI = new Weekday(5, "星期五");
    public static final Weekday SAT = new Weekday(6, "星期六");
    public static final Weekday SUN = new Weekday(0, "星期日");
    // private构造方法，确保外部无法调用new操作符:
    public final int dayValue;
    private final String chinese;

    private Weekday(int dayValue, String chinese) {
        this.dayValue = dayValue;
        this.chinese = chinese;
    }

    @Override
    public String toString() {
        return this.chinese;
    }
}
```
每一个`day`都是一个`Weekday`对象
### name()
返回常量名
```java
String s = Weekday.SUN.name(); // "SUN"
```
### ordinal()
返回定义的常量的顺序，从0开始计数
```java
int n = Weekday.MON.ordinal(); // 1
```
## BigInteger
::: info 
来自[廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/1252599548343744/1279767986831393)
:::
在Java中，由CPU原生提供的整型最大范围是64位long型整数。使用long型整数可以直接通过CPU指令进行计算，速度非常快。

如果我们使用的整数范围超过了long型怎么办？这个时候，就只能用软件来模拟一个大整数。`java.math.BigInteger`就是用来表示任意大小的整数。BigInteger内部用一个int[]数组来模拟一个非常大的整数：
```java
BigInteger bi = new BigInteger("1234567890");
System.out.println(bi.pow(5)); // 2867971860299718107233761438093672048294900000
```
对BigInteger做运算的时候，只能使用实例方法，例如，加法运算：
```java
BigInteger i1 = new BigInteger("1234567890");
BigInteger i2 = new BigInteger("12345678901234567890");
BigInteger sum = i1.add(i2); // 12345678902469135780
```
和long型整数运算比，BigInteger不会有范围限制，但缺点是速度比较慢。

也可以把BigInteger转换成long型：
```java
BigInteger i = new BigInteger("123456789000");
System.out.println(i.longValue()); // 123456789000
System.out.println(i.multiply(i).longValueExact()); // java.lang.ArithmeticException: BigInteger out of long range
```
使用longValueExact()方法时，如果超出了long型的范围，会抛出ArithmeticException。

BigInteger和Integer、Long一样，也是不可变类，并且也继承自Number类。因为Number定义了转换为基本类型的几个方法：

- 转换为byte：byteValue()
- 转换为short：shortValue()
- 转换为int：intValue()
- 转换为long：longValue()
- 转换为float：floatValue()
- 转换为double：doubleValue()

因此，通过上述方法，可以把BigInteger转换成基本类型。如果BigInteger表示的范围超过了基本类型的范围，转换时将丢失高位信息，即结果不一定是准确的。如果需要准确地转换成基本类型，可以使用intValueExact()、longValueExact()等方法，在转换时如果超出范围，将直接抛出ArithmeticException异常。
# JavaSE知识点



[TOC]

## 一、基础补漏

### 1.数据类型

   基本数据类型

​	Long类型要在数字后面加个L, Float 类型要在数字后面加个F

```
long a = 202420242024l;
float b = 3.14f
```

​	引用数据类型：类、接口、数据

​		String 为引用数据类型

### 2.类型转换

<img src="C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240417215200143.png" alt="image-20240417215200143" style="zoom:" />

- 强制转换，（类型）变量名，容量由高到低  

- 自动转换，容量由低到高

- 注意转换时可能存在内容溢出或是精度问题；

  ```java
  // 强制转换
  int a = 100;
  short b = (short)a;
  
  // 自动转换
  int i = 100;
  float j = i;
  ```

### 3.Scanner对象

通过Scanner类来获取用户输入

* **next()**

  一定要读取到有效字符才可以结束输入
  对输入有效字符之前遇到的空白，next()方法会将其去掉
  只有输入有效字符后才将其后面输入的空白作为结束符
  next()不能得到带有空格的字符串

* **nextLine()**

  Enther作为结束符，即返回输入回车之前所有的字符
  nextLine()可以获取空白

* 最后加上**Scanner.close**进行关闭

~~~java
//从键盘接收数据
Scanner scanner = new Scanner(System.in);
System.out.println("请输入数据：");

String str = scanner.nextLine();
System.out.println("输入的内容为："+str);
scanner.close();
~~~



## 二、方法

### 1.方法的定义

~~~java
修饰符 返回值类型 方法名（参数类型 参数名,...）{
   方法体...
   return 返回值；
}
~~~

### 2.方法的调用

**调用其他类的方法时，除非是static静态方法，不然必须要对这个类进行实例化处理(new)**

* 不同类之间调用静态方法

  ~~~java
  类名.方法名(实参列表);
  ~~~

* 不同类之间调用非静态方法

  * 首先实例化这个类,再进行调用

    ~~~java
    /* 对象类型 对象名 = 对象值;
    *  对象名.方法名;
    */
    Student student = new Student();
    student.say(); 
    ~~~

  * 同一个类中，静态方法中不能调用非静态方法

    原因：

    * 静态方法：和类一起加载的
    * 非静态方法：类实例化之后才存在

### 3.方法的重载

* 重载是在一个类中，有相同的方法名，参数列表不同的方法。

* 方法重载的规则：

  方法名称必须相同
  参数列表必须不同（个数、参数类型、或排序不同）
  返回类型可以相同也可以不相同
  仅仅返回类型不同不足以成为方法的重载

* 实现理论

  方法名称相同时，编译器会根据调用方法的参数个数、参数类型等去逐个匹配，以选择对应的方法，如果匹配失败，则编译器报错。

~~~Java
public static void men(){
    
}
public int men(int a,int b){
    return a+b;
}
public int men(double a,double b){
    return a+b;
}
~~~



## 三、数组

### 1. 数组的初始化

* 静态初始化

  ~~~Java
  //静态初始化：创建+赋值
  int[] a={1,2,3};
  Man[] mans={new Man(1,1),new Man(2,2)}
  ~~~

* 动态初始化

  ~~~java
  //包含默认初始化
  //类型 数组名 [] = new 类型 [];
  int[] a=new int[2]; //默认值为0
  a[0]=1;
  a[1]=2;
  ~~~

* 默认初始化
  
  - 数组是引用类型，它的元素相当于类的实例变量，因此数组一经分配空间，其中的每个元素也被按照实例变量同样的方式被隐式初始化。

### 2.Arrays类

- 数组的工具类java.util.Arrays
- 由于数组对象本身并没有什么方法可以供我们使用，但API提供了一个工具类Arrays供我们使用。
- Array类中的方法都是static修饰的静态方法，使用时直接使用类名进行调用，可以不用对象调用。

<img src="C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240417222523716.png" alt="image-20240417222523716" style="zoom:50%;" />

~~~java
int[] a = {1,2,3,4,9000,32145,451,21};
System.out.println(a); // [I@28d93b30 (hashcode)

//Arrays.toString 打印数组元素
System.out.println(Arrays.toString(a)); //[1, 2, 3, 4, 9000, 32145, 451, 21]

// 升序排序
Arrays.sort(a);

//二分法查找某值 返回下标
System.out.println(Arrays.binarySearch(a, 9000)); // 4

//填充
Arrays.fill(a,2,4,0); //数组[a[2]~a[4])之间填充0
System.out.println(Arrays.toString(a)); //[1, 2, 0, 0, 9000, 32145, 451, 21]

//升序排序
Arrays.sort(a);
~~~

### 3.冒泡排序

**两层循环，外层冒泡轮数，里层依次比较**

* 比较数组中两个相邻的元素，如果第一个数比第二个数大，则交换他们的位置

* 每一次比较都会产生出一个最大，或者最小的数字

* 下一轮则可以少一次排序比较

* 依次循环，直到结束

  ~~~Java
  package com.wudreamer;
  
  import java.util.Arrays;
  
  public class maopao {
      public static void main(String[] args) {
          int[] a = {1,34,45,2,5,634,34,5,6,55,5};
          int[] sort = sort(a);
          System.out.println(Arrays.toString(sort));
      }
      public static int[] sort(int[] arry){
          // 临时变量
          int temp = 0;
          // 外层循环，判断要走都少次，长度-1由于比较到最后一次则无需再比较；
          for (int i = 0; i < arry.length-1; i++) {
              // 内层循环，比较判断两个数，如果第一个数比第二个数大，则交换位置
              // 长度-1-i 是由于前面已经比较i次找出i个最值了，则无需再比较；
              for (int j = 0; j < arry.length-1-i ; j++){
                  // 从大到小排降序
                  if (arry[j+1]>arry[j]){
                      temp = arry[j];
                      arry[j] = arry[j+1];
                      arry[j+1] = temp;
                  }
              }
          }
          return arry;
      }
  }
  ~~~

### 4.稀疏数组

<img src="C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240417231856044.png" alt="image-20240417231856044" style="zoom:60%;" />

|      |         行         |         列         |          值          |
| :--: | :----------------: | :----------------: | :------------------: |
| [0]  |   该数组共多少行   |   该数组共多少列   | 该数组共多少有值元素 |
| [1]  | 第一个元素所在行数 | 第一个元素所在列数 |    第一个元素的值    |
| ...  |                    |                    |                      |
| [n]  | 第n个元素所在行数  | 第n个元素所在列数  |    第n个元素的值     |

<img src="C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240417232343715.png" alt="image-20240417232343715" style="zoom:80%;" />

~~~java
//创建一个二维数组 11*11  0：没有棋子，1：黑棋  2：白棋
int[][] array1 = new int[11][11];
array1[1][2] = 1;
array1[2][3] = 2;
//输出原始的数组
System.out.println("原始的数组：");
//第一个for循环表示行
for (int[] array : array1) {
    //第二个for循环表示列
    for (int i : array) {
        System.out.print(i+"\t");
    }
    System.out.println();
}

//转换为稀疏数组保存
//1.有效值的个数 
int sum = 0; //有效值总数
for (int i = 0; i < 11; i++) {
    for (int j = 0; j < 11; j++) {
        if(array1[i][j]!=0){
            sum++;
        }
    }
}
//2.创建一个稀疏数组
int[][] array2 = new int[sum+1][3];
array2[0][0] = 11;
array2[0][1] = 11;
array2[0][2] = sum;

//3.遍历二维数组，将有效值存放到稀疏数组
int count = 0;
for (int i = 0; i < array1.length; i++) {
    for (int j = 0; j < array1[i].length; j++) {
        if(array1[i][j]!=0){
            count++;
            array2[count][0] = i;
            array2[count][1] = j;
            array2[count][2] = array1[i][j];
        }
    }
}

//4.输出稀疏数组
System.out.println("稀疏数组：");
for (int i = 0; i < array2.length; i++) {
    for (int j = 0; j < array2[i].length; j++) {
        System.out.print(array2[i][j]+"\t");
    }
    System.out.println();
}
/* 结果：
输出原始的数组
0	0	0	0	0	0	0	0	0	0	0	
0	0	1	0	0	0	0	0	0	0	0	
0	0	0	2	0	0	0	0	0	0	0	
0	0	0	0	0	0	0	0	0	0	0	
0	0	0	0	0	0	0	0	0	0	0	
0	0	0	0	0	0	0	0	0	0	0	
0	0	0	0	0	0	0	0	0	0	0	
0	0	0	0	0	0	0	0	0	0	0	
0	0	0	0	0	0	0	0	0	0	0	
0	0	0	0	0	0	0	0	0	0	0	
0	0	0	0	0	0	0	0	0	0	0	
稀疏数组
11	11	2	
1	2	1	
2	3	2	
*/
~~~



## 四、面向对象编程OOP

**本质：以类的方式组织代码，以对象的组织（封装）数据**

### 1.创建与初始化对象

* 使用new来创建对象。
* 使用new关键字创建的时候，除了分配内存之外，还会给创建好的对象进行默认的初始化，以及对类中构造器的调用。
* 类中的构造器也被称为构造方法，创建对象时必须要调用。有以下特点：
  * 必须和类的名字相同
  * 没有返回类型，也不能写void
* 一个类即使什么都不写，也会存在一个默认的构造方法

~~~java
public class Person {
    //一个类即使什么都不写，也会存在一个默认的无参构造方法
    //显示地定义构造器
    String name;
    
    //作用：1. 使用new关键字，本质是在调用构造器
    //2. 用来初始化对象的值
    public Person(){} //无参构造
    
    //3.一旦定义了有参构造，无参就必须显示定义
    //有参构造 
    public Person(String name){
        this.name=name;
    }
	//Alt+insert 快捷键插入构造方法
}
~~~

### 2.封装（数据的隐藏）

**“高内聚，低耦合”，属性私有：get/set**

**给属性提供public的方法**

* get：获取数据
* set：设置数据

作用：

* 提高程序的安全性，保护数据
* 隐藏代码的实现细节
* 统一接口
* 系统可维护性增加了

<img src="C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240418095954016.png" alt="image-20240418095954016" style="zoom:70%;" />

### 3.继承

#### （1）继承的使用

* 继承的本质是对某一批类的抽象，从而实现对世界更好地建模。
* **extends**的意思是”扩展“。子类是父类的扩展，使用关键字extends来表示。
* Java中类只有**单继承**，没有多继承！一个类只能继承一个父类。
* 继承是类与类之间的一种关系，此外还有依赖、组合、聚合等。
* 继承关系的两个类，一个为子类（派生类），一个为**父类（基类）**子类继承父类。
* 子类和父类之间，从意义上讲应该具有”is a“的关系。
* 子类继承了父类，就会拥有父类的全部方法，而private**私有属性及方法无法继承**。
* 在Java中，所有类，都默认直接或间接继承**Object**类 (Ctrl+H 可以查看类关系)
* **被final修饰的类**，无法被继承（断子绝孙）。

~~~java
//学生类(子类)继承 人类(父类)
public class Student extends Person{ /*Person extends Object*/
    ...
}
// ctrl+H 调出继承关系图
~~~

#### （2）super和this

* super()调用父类的构造方法，必须在构造方法的第一个

* super必须只能出现在子类的方法或构造方法中

* **super()和this()**不能同时调用构造方法，因为this也必须写在第一行

* super与this的区别：super代表父类对象的引用，只能在继承条件下使用；this调用自身对象，没有继承也可以使用。

  ![image-20240418101919100](C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240418101919100.png)

#### （3）方法的重写

* 重写：子类的方法必须与父类方法必须一致，方法体不同。
* 重写是方法的重写，与属性无关
* 重写方法只与非静态方法有关，与静态方法无关（静态方法不能被重写）
* 静态方法属于类，非静态方法属于对象
* 注意点：
  * 方法名、参数列表必须相同
  * 修饰符范围可以扩大，不能缩小（public>protect>private）
  * 抛出的异常 范围可以被缩小，不能扩大
  * 被**static(属于类，不属于实例)，final(常量方法)，private(私有)**修饰的方法不能重写

~~~java
public class B {
    public static void test(){ //静态方法
        System.out.println("B==>test()");
    }
}
~~~

~~~java
public class A extends B{ //继承
    public static void test(){
        System.out.println("A==>test()");
    }
}
~~~

~~~java
public class Application {
    public static void main(String[] args) {
        //方法的调用之和左边定义的类型有关
        A a = new A();
        a.test(); //打印 A==>test()

        //父类的引用指向了子类，但静态方法没有被重写
        B b = new A();
        b.test(); //打印 B==>test()
    }
}
~~~

**修改A.java, B.java**

~~~java
public class B {
    public void test(){ //非静态方法
        System.out.println("B==>test()");
    }
}
public class A extends B{
    @Override //重写了B的方法
    public void test() {
        System.out.println("A==>test()");
    }
}
~~~

~~~java
//父类的引用指向了子类
B b = new A(); //子类重写了父类的方法，执行子类的方法
b.test(); //打印变成了 A==>test()
/* 
静态方法是类的方法，非静态方法是对象的方法
有static时，b调用了B类的方法，因为b是b类定义的
没有static时，b调用的是对象的方法，而b是A类new出来的对象，调用A的方法
*/
~~~

### 4.多态

* 动态编译：类型
* **即同一方法可以根据发送对象的不同而采用不同的行为方式**
* 一个对象的实际类型是确定的，但可以指向对象的引用可以有很多
* 多态存在条件
  - 有继承关系
  - 子类重写父类方法
  - 父类引用指向子类对
* 注意点：
  1. **多态是方法的多态，没有属性的多态**
  2. 父类和子类，有联系 类型转换异常: ClassCastException
  3. 存在条件：继承关系，方法需要重写，父类引用指向子类对象！

![image-20240418104100792](C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240418104100792.png)

### 5.抽象类

* abstract修饰的类就是抽象类，修饰的方法就是抽象方法。

* 抽象类中可以没有抽象方法，但有抽象方法的类一定要声明为抽象类。

* 抽象类不能使用new来创建对象，它是用来让子类继承的。

* 抽象方法只有方法的声明，没有实现，让其子类实现。

* 子类继承抽象类，必须实现抽象类的所有方法，否则该子类也要声明为抽象类。

  ~~~Java
  //abstract 抽象类 类只能单继承（接口可以多继承）
  public abstract class Action {
  
      //约束~有人帮我们实现~
      //抽象方法只有方法名，没有方法的实现
      public abstract void doSth();
  
      //1.不能new抽象类，只能靠子类去实现它，仅作为一个约束
      //2.抽象方法只能出现在抽象类中，抽象类可以有普通方法
      //3.抽象类有构造器，可以派生子类
      //4.抽象类的意义：约束，提高开发效率。但是类只能单继承，所以有局限 用的不多
  }
  ~~~

### 6.接口(interface)

* 普通类：只有具体实现
* 抽象类：具体实现和规范(抽象方法)都有
* 接口：**只有规范，没有方法实现**，专业的约束！约束与实现分离：面向接口编程~

- 接口就是规范，定义的是一组规则，"你是什么…必须做什么…"的思想。

- **接口的本质是约束**，就像人间法律一样，制定好大家都遵守。

- 注意点

  - 接口没有构造方法，不能被实例化
  - 实现类必须要重写接口中的方法
  - 实现类（implements） 可以实现多个接

  ~~~java
  //interface接口,接口都要有继承类
  //实现类（implements 可以继承多个接口）
  //多继承，利用接口实现多继承
  public interface UserService {
      //定义的属性都是常量,默认修饰 public static final
      public static final int AGE = 99; //一般不用
      //所有的定义的方法都是抽象的 默认public abstract
      public abstract void run();
      void add();
      void query();
      void delete();
  }
  ~~~

### 7.内部类

- 内部类就是在一个类的内部再定义一个类，比如A类中定义了一个B类，那么B就是A的内部类，而A相对B来说就是外部类

  1. 成员内部类：**可以操作外部类的私有属性及方法**

  2. 静态内部类：static修饰，不能访问外部类私有属性

  3. 局部内部类：外部类的方法里定义的类

  4. 匿名内部类：没有名字初始化类

     ![image-20240418110727081](C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240418110727081.png)

## 五、异常

![image-20240418112229263](C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240418112229263.png)

### 1.简单分类

* 检查型异常：最具代表性异常是用户错误或问题引起的异常，这是程序员无法预见的。例如用户要打开一个不存在的文件时引发的异常，这些异常在编译时不能被简单地忽略。
* 运行时异常：是可能被程序员避免的异常，与检查性异常相反，运行时异常可以在编译时忽略。
* 错误Error：错误不是异常，而是脱离程序员控制的问题。错误在代码经常被忽略。例如当栈溢出，一个异常就发生了，它们在编译也检查不到。

![image-20240418112321462](C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240418112321462.png)

![image-20240418112339346](C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240418112339346.png)

![image-20240418112416594](C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240418112416594.png)

### 2.异常处理机制

- **抛出异常**
- **捕获异常**
- 异常处理关键字：**try、catch、finally、throw、throws**

~~~java 
public static void main(String[] args) {
    int a = 1;
    int b = 0;

    try { //try监控区域
        System.out.println(a/b);
    }catch (ArithmeticException e){ //catch 捕获异常
        System.out.println("程序出现异常，变量b不能为0");
    }catch (Exception e){
        e.printStackTrace();
    }finally { //一定会执行，处理善后工作，如关闭资源
        System.out.println("finally");
    }
    
    if(b==0){ //抛出异常一般在方法中使用
        throw new ArithmeticException(); //主动抛出异常
    }
}
//Ctrl+Alt+T 快捷键插入 try-catch
~~~

### 3.自定义异常

![image-20240418112604064](C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240418112604064.png)

![image-20240418112620140](C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240418112620140.png)

<img src="C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240418112814346.png" alt="image-20240418112814346" style="zoom:80%;" />

![image-20240418113007029](C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240418113007029.png)



## 六、多线程

### 1.核心概念

* 线程就是独立的执行路径
* 在程序运行时,即使没有自己创建线程,后台也会有多个线程,比如主线程,GC线程
* main()称之为主线程,为系统的入口,用于执行整个程序
* 在一个进程中,如果开辟了多个线程,线程的运行是由调度器（cpu）安排调度的,调度器是与操作系统紧密相关的,先后顺序是不能人为干预的
* 对同一份资源操作时mm会存在资源抢夺的问题,需要加入并发控制
* 线程会带来额外的开销,如CPU调度时间,并发控制开销
* 每个线程在自己的工作内存交互,内存控制不当会造成数据不一致

### 2.创建线程

<img src="C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240418145721322.png" alt="image-20240418145721322" style="zoom:60%;" />

* 实现Runnable接口
  * **推荐使用Runnable对象,因为Java单继承的局限性**
  * 自定义线程类实现`Runnable`接口
  * 实现`run()`方法,编写线程执行体
  * 创建线程对象,调用`start()`方法启动对象

~~~java
public class Demo1_CreateThread1 extends Thread {
    @Override
    public void run() {
        //run方法线程体
        for (int i = 0; i < 20; i++) {
            System.out.println("我在看代码----" + i);
        }
    }

    public static void main(String[] args) {
        //main线程，上线程
        //创建一个线程对象
        Demo1_CreateThread1 testThread = new Demo1_CreateThread1();
        //调用start（）开启线程
        testThread.start();
        for (int i = 0; i < 200; i++) {
            System.out.println("我在学习多线程----" + i);
        }
    }
}
~~~

龟兔赛跑案例：

~~~Java
package com.wudreamer;

public class Race implements Runnable{
    public String winner;
    // 1.重写run方法
    @Override
    public void run() {
        for (int i = 0; i <= 100; i++) {
            // 模拟兔子休息
            if (Thread.currentThread().getName().equals("兔子")&& i%10 ==0){
                try {
                    Thread.sleep(10);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            //判断比赛是否结束
            boolean flag = gameOver(i);
            if (flag){
                break;
            }
            System.out.println(Thread.currentThread().getName()+"跑了"+i+"步");
        }
    }

    private boolean gameOver(int steps) {
        //判断是否有胜利者
        if (winner !=null){
            return true;
        }else {
            if (steps>=100){
                winner = Thread.currentThread().getName();
                System.out.println("胜利的是："+winner);
            }
        }
        return false;
    }

    public static void main(String[] args) {
        Race race = new Race();
        new Thread(race,"兔子").start();
        new Thread(race,"乌龟").start();
    }
}
~~~

### 3.静态代理

* **总结**
  * 真实对象和代理对象都要实现一个接口
  * 代理对象要代理真实角色
* **好处**
  * 代理对象可以做很多真实对象做不了的事情
  * 真实对象专注做自己的事

### 4.敬请期待

………………

## 七、网络编程

### 1.网络通信的要素

**如何实现网络的通信**

- 通信双方的地址：

  - IP :192.168.16.124
  - 端口号 :3306

- 规则：网络通信的协议

  - TCP/IP参考模型

  网络编程中的要素：

  - IP和端口号：IP

  * 网络通信协议：UDP、TCP

<img src="C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240418195825088.png" alt="image-20240418195825088" style="zoom:60%;" />

### 2.IP

IP 地址：InetAddress

唯一定位一台网络上的计算机

127.0.0.1： 本机localhost

* IP地址的分类
  
* ipv4/ipv6
  
* 公网和私网

  * 公网：互联网

    ABCD类地址

    192.168.xx.xx ：专门给组织内部使用的

  * 私网：局域网

* 域名：记忆IP问题！

~~~java
package com.wudreamer;

import java.net.InetAddress;
import java.net.UnknownHostException;

/*
测试IP
 */
public class TestInetAddress {
    public static void main(String[] args) {
        try {
            //查询本机地址
            InetAddress inetAddress1 = InetAddress.getByName("127.0.0.1");
            System.out.println(inetAddress1);
            InetAddress inetAddress3 = InetAddress.getByName("localhost");
            System.out.println(inetAddress3);
            InetAddress inetAddress4 = InetAddress.getLocalHost();
            System.out.println(inetAddress4);

            //查询网站地址
            InetAddress inetAddress2 = InetAddress.getByName("www.baidu.com");
            System.out.println(inetAddress2);

            //常用方法
            System.out.println(inetAddress2.getAddress());//返回的为一个字节数组，返回此 InetAddress 对象的原始 IP 地址。结果按网络字节顺序：地址的高位字节位于 getAddress()[0] 中。
            System.out.println(inetAddress2.getCanonicalHostName()); //获取此 IP 地址的完全限定域名
            System.out.println(inetAddress2.getHostAddress());//返回 IP 地址字符串（以文本表现形式）。
            System.out.println(inetAddress2.getHostName()); //获取此 IP 地址的主机名。
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
    }
}
~~~

### 3.端口(Port)

端口表示计算机上的一个程序进程

不同的进程有不同的端口号！用软件来区分

* TCP, UDP: 65536 *2 ;

* tcp:80, udp:80可以吗？ 单个协议下，端口号不能冲突

端口的分类：

* 公有端口 0-1023
  http：80
  https：443
  FTP： 21
  TELENT： 23
* 程序注册端口：1024-49151
  Tomact：8080
  Mysql : 3306
  Oracle: 1521
* 动态、私有端口：49152-65536

### 4.通信协议

**网络通信协议**：速度、传输码率、代码结构、传输控制…

**TCP/IP协议簇：实际上是一组协议**

重要：

- TCP：用户传输协议
- UDP：用户数据报协议

出名的协议

- TCP
- IP:互联网协议

### 5.TCP

**TCP： 打电话**

- 连接，稳定
- 客户端、服务端
- 传输完成，释放连接，效率低

**UDP： 发短信**

- 不连接，不稳定
- 客户端、服务端：没有明确的界限
- 不管有没有准备好，都可以发给你
- DDOS：洪水攻击！发送垃圾信息 堵塞线路（饱和攻击）

客户端

1. 连接服务器Socket
2. 发送消息

~~~java
package lesson2;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

/*
客户端
 */
public class TCPClientDemo1 {
    public static void main(String[] args) {
        Socket socket = null;
        OutputStream outputStream  = null;
        try {
            //1.要知道服务器的地址
            InetAddress severIP = InetAddress.getByName("127.0.0.1");
            //端口号
            int port = 9999;
            //2.创建一个socket连接
            socket = new Socket(severIP,port);
            //3.发送消息
            outputStream = socket.getOutputStream();
            outputStream.write("xiaoqi".getBytes(StandardCharsets.UTF_8));

        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            if (outputStream!= null){
                try {
                    outputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (socket != null){
                try {
                    socket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
~~~

服务器

1. 建立服务端口SeverSocket
2. 等待用户的连接accept()
3. 接收用户消息

~~~java
package lesson2;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;

/*
服务端
 */
public class TCPSeverDemo2 {

    public static void main(String[] args) {
        ByteArrayOutputStream bos = null;
        InputStream inputStream  =null;
        Socket socket = null;
        ServerSocket serverSocket  = null;
        try {
            //1.我的有一个地址
            serverSocket = new ServerSocket(9999);
            while(true) {
                //2.等待客户端连接进来
                socket = serverSocket.accept();
                //3.读取客户端的消息
                inputStream = socket.getInputStream();

                /*在传输的过程中，可能会出现问题
                byte[] bytes = new byte[1024];
                int len;
                while((len = inputStream.read(bytes)) != -1){
                String s = new String(bytes,0,len);
                System.out.println(s);
                }*/

                //管道流
                bos = new ByteArrayOutputStream();
                byte[] bytes = new byte[1024];
                int len;
                while ((len = inputStream.read(bytes)) != -1) {
                    bos.write(bytes, 0, len);
                }
                System.out.println(bos.toString());
            }

        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            //关闭资源
            if (bos!=null){
                try {
                    bos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (inputStream != null){
                try {
                    inputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (socket != null){
                try {
                    socket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (serverSocket!= null){
                try {
                    serverSocket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
~~~

### 6.UDP

发短信：不用连接，需要知道对方的地址

### 7.URL

~~~java
协议：// ip地址：端口号/项目名/资源
~~~

~~~java
package lesson3;

import java.net.MalformedURLException;
import java.net.URL;

public class URLDemo1 {
    public static void main(String[] args) throws MalformedURLException {
        URL url = new URL("http://localhost:8080/helloworld/index.jsp?username=xiaoqi&password=123");
        System.out.println(url.getProtocol());//协议
        System.out.println(url.getHost());//主机ip
        System.out.println(url.getPort());//端口
        System.out.println(url.getPath());//文件
        System.out.println(url.getFile());//文件全路径
        System.out.println(url.getQuery());//参数
    }
}
~~~

**下载文件**

- 1.启动tomcat服务器；
- 2.在tomcat中放好文件；
- 3.进行相关测试。

~~~java
package lesson3;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class URLDown {
    public static void main(String[] args) throws Exception{
        // 1.下载地址
        URL url = new URL("http://localhost:8080/index/xiaoqi.html");
        // 2.连接到这个资源 HTTP
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        InputStream is = urlConnection.getInputStream();
        FileOutputStream stream = new FileOutputStream(new File("same.txt"));
        byte[] bytes = new byte[1024];
        int len = 0;
        while ((len = is.read(bytes)) != -1){
            stream.write(bytes,0,len);
        }
        stream.close();
        is.close();
        urlConnection.disconnect();
    }
}

```java

java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class URLDown {
    public static void main(String[] args) throws Exception{
        // 1.下载地址
        URL url = new URL("http://localhost:8080/index/xiaoqi.html");
        // 2.连接到这个资源 HTTP
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        InputStream is = urlConnection.getInputStream();
        FileOutputStream stream = new FileOutputStream(new File("same.txt"));
        byte[] bytes = new byte[1024];
        int len = 0;
        while ((len = is.read(bytes)) != -1){
            stream.write(bytes,0,len);
        }
        stream.close();
        is.close();
        urlConnection.disconnect();
    }
}
~~~



## 八、GUI编程





## 九、注解与反射

### 1.注解

#### （1）什么是注解

### ![image-20240418230011686](C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240418230011686.png)

#### （2）内置注解

### ![image-20240418230431999](C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240418230431999.png)



#### （3）元注解

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)![image-20240418230513531](C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240418230513531.png)



#### （4）自定义注解

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)![image-20240418230550661](C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240418230550661.png)

#### （5）@RequestMapping

@RequestMapping是Spring框架中的一个注解，用于将HTTP请求映射到特定的处理方法上。通过使用@RequestMapping注解，我们可以指定处理方法应该处理的URL路径和HTTP请求方法。

下面是一个简单的示例：

假设我们有一个UserController类，其中包含一个处理GET请求的方法getUserById：

```java
@Controller
@RequestMapping("/users")
public class UserController {

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        // 根据id查询用户信息
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
}![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)
```

在上面的示例中：
 \- @Controller注解表示这是一个控制器类。
 \- @RequestMapping("/users")指定了这个控制器处理的URL路径为"/users"，即所有以"/users"开头的请求都会交给这个控制器处理。
 \- @GetMapping("/{id}")指定了处理GET请求的方法getUserById，其中{id}是一个占位符，表示在实际请求中会传入一个id作为参数。
 \- @PathVariable注解用于将请求中的id参数映射到方法的id参数上。

当有一个GET请求发送到"/users/123"时，Spring框架会调用UserController类中的getUserById方法，并将123作为id参数传入。

 #### （6）@ResponseBody

当在 Spring MVC 中使用 `@ResponseBody` 注解时，以下是一些关键点需要注意：

1. **作用**：
      \- 将方法的返回值直接作为 HTTP 响应的内容返回给客户端，而不是跳转到一个视图页面。
      \- 通常用于返回数据，如 JSON 或 XML 格式的数据。

2. **适用范围**：
      \- 可以标记在 Controller 类的方法上。
      \- 也可以标记在 Controller 类上，表示该类的所有方法都会将返回值作为响应内容返回。

3. **消息转换器**：
      \- Spring MVC 使用消息转换器来将方法返回值转换为指定的格式，如 JSON 或 XML。
      \- 根据方法的返回类型自动选择合适的消息转换器进行转换。

4. **返回值类型**：
      \- 可以是任意类型的对象，Spring MVC 会根据返回值类型选择合适的消息转换器。
      \- 通常返回的是 POJO 对象，集合对象或原始数据类型。

5. **示例**：
      \- 例如，一个返回 JSON 数据的方法：

```java
     @RequestMapping("/user")
     @ResponseBody
     public User getUser() {
         User user = new User("John", 30);
         return user;
     }
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)
    在这个例子中，`User` 对象会被转换为 JSON 格式并作为 HTTP 响应返回给客户端。

通过使用 `@ResponseBody` 注解，可以方便地返回数据给客户端，并且更灵活地控制返回的数据格式，适用于前后端分离的开发模式。

![img](https://img-blog.csdnimg.cn/direct/ad826cee64324497b7b14506ffb10d41.png)



### 2.反射

####  反射机制

![image-20240418232515215](C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240418232515215.png)

~~~java
						Class c = Class.forName("java.lang.String");
~~~

#### Java 反射机制提供的功能

  1.在运行时判断任意一个对象所属的类
  2.在运行时构造任意一个类的对象
  3.在运行时判断任意一个类所具有的成员变量和方法
  4.在运行时获取泛型信息
  5.在运行时调用任意一个对象的成员变量和方法
  6.在运行时处理注解
  7.生成动态代理

#### 反射优缺点

优点:
  可以实现动态创建对象和编译，体现出很大的灵活性

缺点:
  对性能有影响。使用反射基本上是一种解释操作，我们可以告诉JVM，我们希望做什么并且它满足我们的要求。这类操作总是慢于直接执行相同的操作。

#### 反射相关主要API

  java.lang.Class :代表一个类

  java.lang.reflect.Method:代表类的方法

  java.lang.reflect.Field:代表类的成员变量

  java.lang.reflect.Constructor:代表类的构造器

~~~java
package com.deng.reflection;

import lombok.Data;

//什么叫反射?
public class Test02 {
    public static void main(String[] args) throws ClassNotFoundException {
        //通过反射获取类的Class对象
        Class c1 = Class.forName("com.deng.reflection.User");
        Class c2 = Class.forName("com.deng.reflection.User");
        Class c3 = Class.forName("com.deng.reflection.User");
        Class c4 = Class.forName("com.deng.reflection.User");
        //输出的hashCode相同，即一个类在内存中只有一个Class对象
        //一个类被加载后，类的整个结构都会被封装在Class对象中
        System.out.println(c2.hashCode());
        System.out.println(c3.hashCode());
        System.out.println(c4.hashCode());
        System.out.println(c1);
    }
}
//实体类 pojo/entity
@Data
class User{
    private String name;
    private int id;
    private int age;
}
~~~

### 3.Class类

~~~js
注意：Java中所有的类都会继承Object
~~~

在Object类中定义了一下的方法，此方法将被所有方法继承

~~~java
public final Class getClass()；
~~~

以上的方法返回值的类型是一个Class类，此类是Java反射的源头，实际上所谓反射从程序的运行结果来看也很好理解，即：可以通过对象反射求出类的名称.

![image-20210406164657679](https://img-blog.csdnimg.cn/img_convert/7e9289b503e1450ef6da625c62fe6a9b.png)

#### 对象照镜子后可以得到的信息

某个类的属性、方法和构造器、某个类到底实现了哪些接口。对于每个类而言，JRE都为其保留一个不变的Class类型的对象。一个Class对象包含了特定某个结构( class/interface/enum/ annotation/ primitive type/void/[])的有关信息。

* Class本身也是一个类
* Class对象只能由系统建立对象
* 一个加载的类在JVM中只会有一个Class实例
* 一个Class对象对应的是一个加载到JVM中的一个.class文件
* 每个类的实例都会记得自己是由哪个Class实例所生成
* 通过Class可以完整地得到一个类中的所有被加载的结构
* Class类是 Reflection的根源，针对任何你想动态加载、运行的类，唯有先获得相应的Class对象

![image-20240418234343621](C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240418234343621.png)

#### 获取Class对象的方式

* 若已知具体的类，通过类的class属性获取，该方法最为安全可靠，程序性能最高！

~~~java
Class clazz  = Person.class;
~~~

* 若已知某个类的实例，调用该实例的 getClass()方法获取Class对象

~~~java
Class clazz = person.getClass();
~~~

* 已知一个类的全类名，且该类在类路径下可通过Class类的静态方法forName()获取，可能抛出ClassNotFoundException

~~~java
Class clazz = Class.forName("com.deng.Person");
~~~

内置基本数据类型可以直接用类名**.Type**

~~~java
//测试获取Class对象的方式有哪些
public class Test03 {
    public static void main(String[] args) throws ClassNotFoundException {
        Person person = new Student();
        System.out.println("这个人是：" + person.name);
        //方式一：通过对象实例获得
        Class c1 = person.getClass();
        System.out.println(c1.hashCode());

        //方式二：forName获得
        Class c2 = Class.forName("com.deng.reflection.Student");  //注意抛出ClassNotFoundException
        System.out.println(c2.hashCode());

        //方式三：通过类名获得
        Class c3 = Student.class;
        System.out.println(c3.hashCode());

        //方式四：基本内置类型的包装类都有一个Type属性
        Class c4 = Integer.TYPE;
        System.out.println(c4);

        //获得父类类型
        Class c5 = c1.getSuperclass();
        System.out.println(c5);
    }
}
@ToString
@Data
class Person{
    public String name;
}

class Student extends Person{
    public Student(){
        this.name = "学生";
    }
}
class Teacher extends Person{
    public Teacher(){
        this.name = "老师";
    }
}
~~~

#### 哪些类型可以有Class对象

~~~java
//所有类型的class
public class Test04 {
    public static void main(String[] args) {
        //1.类
        Class c1 = Object.class;
        //2.接口
        Class c2 = Comparable.class;
        //3.数组
        Class c3 = String[].class;
        //4.二维数组
        Class c4 = int[][].class;
        //5.注解类型
        Class c5 = Override.class;
        //6.枚举类型
        Class c6 = ElementType.class;
        //7.基本数据类型
        Class c7 = Integer.class;
        //8.void
        Class c8 = void.class;
        //9.Class本身
        Class c9 = Class.class;

        System.out.println(c1);
        System.out.println(c2);
        System.out.println(c3);
        System.out.println(c4);
        System.out.println(c5);
        System.out.println(c6);
        System.out.println(c7);
        System.out.println(c8);
        System.out.println(c9);
        //只要元素类型与维度一样，就是同一个Class
        int a[] = new int[10];
        int b[] = new int[100];
        System.out.println(a.getClass().hashCode());
        System.out.println(b.getClass().hashCode());
    }
}
~~~









## 十、JUC并发编程





## 十一、JVM深入研究


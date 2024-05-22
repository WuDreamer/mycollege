# Mybatis

优点：

* 简单易学、灵活
* SQL和代码的分离，提高了可维护性
* 提供映射标签，支持对象与数据库的orm字段关系映射
* 提供对象关系映射标签，支持对象关系组建维护
* 提供xml标签，支持编写动态sql



## 一、起始步骤

### 1.1、搭建环境

* (1)搭建数据库

  ```mysql
  create database mybatis;
  use mybatis;
  create table user(
      id int(20) not null ,
      name varchar(30) default null,
      pwd varchar(30) default null,
      primary key (id)
  ) engine=innodb default charset=utf8;
  
  insert into user(id, name, pwd) VALUE
      (1,'张三','111'),
      (2,'李四','222'),
      (3,'王五','333');
  ```

* (2)新建项目
  * 创建一个普通的maven项目
  * 删除src
  * new一个maven工程

### 1.2、创建模块

* 编写mybatis的核心配置文件

  ```xml
  <?xml version="1.0" encoding="UTF8" ?>
  <!DOCTYPE configuration
          PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
          "http://mybatis.org/dtd/mybatis-3-config.dtd">
  <!--configuration核心配置文件-->
  <configuration>
      <environments default="development">
          <environment id="development">
              <transactionManager type="JDBC"></transactionManager>
              <dataSource type="POOLED">
                  <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                  <property name="url" value="jdbc:mysql://localhost:3306/mybatis?useSSL=true&amp;useUnicode=true&amp;characterEncoding=UTF-8"/>
                  <property name="username" value="root"/>
                  <property name="password" value="123456"/>
              </dataSource>
          </environment>
      </environments>
  
  <!--每个Mapper.xml都需要在mybatis核心配置文件中注册-->
      <mappers>
          <mapper resource="com/wudreamer/dao/UserMapper.xml"></mapper>
      </mappers>
  </configuration>
  ```


* 编写mybatis工具类

  ```java
  // 工具类 在utils包下
  public class MybatisUtils {
      // static{...}静态初始化块。在Java中，静态初始化块会在类被加载时执行，且只执行一次
      /*这段代码是MyBatis框架使用过程中的一个关键步骤，它负责设置和初始化MyBatis环境，为后续的数据库操作打下基础。
      一旦SqlSessionFactory对象被成功创建，就可以使用它来获取SqlSession，
      进而执行CRUD（创建、读取、更新、删除）操作或执行更复杂的数据库事务。*/
      private static SqlSessionFactory sqlSessionFactory;
      static {
          try {
              // 使用mybatis第一步： 获取sqlSessionFactory对象
              String resource = "mybatis-config.xml";
              InputStream inputStream = Resources.getResourceAsStream(resource);
              sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
          } catch (IOException e) {
              e.printStackTrace();
          }
      }
      // 既然有了sqlSessionFactory，就可以从中获取sqlSession的实例了。
      // sqlSession完全包含了面向数据库执行SQL命令的所有方法。
      public static SqlSession getSqlSession(){
          return sqlSessionFactory.openSession();
      }
  }
  ```

### 1.3 编写代码

* 实体类

  ```java
  //实体类 在pojo包下
  public class User {
      private int id;
      private String name;
      private String pwd;
      public User(){
      }
      public User(int id, String name, String pwd) {
          this.id = id;
          this.name = name;
          this.pwd = pwd;
      }
      public int getId() {
          return id;
      }
      public void setId(int id) {
          this.id = id;
      }
      public String getName() {
          return name;
      }
      public void setName(String name) {
          this.name = name;
      }
      public String getPwd() {
          return pwd;
      }
      public void setPwd(String pwd) {
          this.pwd = pwd;
      }
  }
  ```

* Dao接口

  ```java
  // dao包下的接口
  public interface UserDao {
      List<User> getUserList();
  }
  ```

* 接口实现类(由原来的UserDaoImpl转变为一个Mapper配置文件)

  ```xml
  <?xml version="1.0" encoding="UTF-8" ?>
  <!DOCTYPE mapper
          PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
          "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
  
  <!--namespace=绑定一个对应的Dao或者Mapper接口-->
  <mapper namespace="com.wudreamer.dao.UserDao">
      <!--select查询语句-->
      <!--id对应UserDao中方法的名字-->
      <select id="getUserList" resultType="com.wudreamer.pojo.User">
          select * from mybatis.user
      </select>
  </mapper>
  ```

### 1.4测试

* junit测试

  ```java
  public class UserDaoTest {
      @Test
      public void test(){
          // 第一步:获得SqlSession对象
          SqlSession sqlSession = MybatisUtils.getSqlSession();
  
          // 方式一：getMapper
          /* UserDao userDao = sqlSession.getMapper(UserDao.class);
           List<User> userList = userDao.getUserList();*/
  
          //方式二
          List<User> userList = sqlSession.selectList("com.wudreamer.dao.UserDao.getUserList");
          for (User user : userList) {
              System.out.println(user);
          }
          // 关闭SqlSession
          sqlSession.close();
  
      }
  }
  ```

截图：

<img src="C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240517234741872.png" alt="image-20240517234741872" style="zoom:80%;" />

![image-20240517234813509](C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240517234813509.png)



## 二、CRUD

CRUD指的是操控数据库的增删改查，程序员的术语。

### 2.1、注意点：

* namespace

  namespace中的包名要和Dao/mapper接口的包名一致！

  ![image-20240519123323939](C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240519123323939.png)

* 增删改操作需要提交事务

  ```java
  // 提交事务
  sqlSession.commit();
  ```

### 2.2、select

选择，查询语句

* id：对应namespace中的方法名

* resultType：SQL语句执行的返回值

* parameterType：参数类型

  ![image-20240519124135894](C:\Users\风之子\AppData\Roaming\Typora\typora-user-images\image-20240519124135894.png)

* 1、编写接口

  ```java
  // 查询全部用户
  List<User> getUserList();
  
  //根据id查询用户
  User getUserById(int id);
  ```

* 2、编写对应的mapper中的SQL语句

  ```xml
      <!--select查询语句-->
      <!--id对应UserDao中方法的名字-->
      <select id="getUserList" resultType="com.wudreamer.pojo.User">
          select * from mybatis.user
      </select>
      <select id="getUserById" parameterType="int" resultType="com.wudreamer.pojo.User">
          select * from mybatis.user where id = #{id}
      </select>
  ```

* 3、测试

  ```java
  // 查询全部用户
      @Test
      public void test(){
          // 第一步:获得SqlSession对象
          SqlSession sqlSession = MybatisUtils.getSqlSession();
  
          // 方式一：getMapper
          /* UserDao userDao = sqlSession.getMapper(UserDao.class);
           List<User> userList = userDao.getUserList();*/
  
          //方式二
          List<User> userList = sqlSession.selectList("com.wudreamer.dao.UserMapper.getUserList");
          for (User user : userList) {
              System.out.println(user);
          }
          // 关闭SqlSession
          sqlSession.close();
  
      }
      // 查询一个用户
      @Test
      public void getUserById(){
          SqlSession sqlSession = MybatisUtils.getSqlSession();
          UserMapper mapper = sqlSession.getMapper(UserMapper.class);
  
          User user = mapper.getUserById(1);
          System.out.println(user);
          sqlSession.close();
      }
  ```

### 2.3、Insert

* 1、编写接口

  ```java
      //insert一个用户
      int addUser(User user);
  ```

* 2、编写对应的mapper中的SQL语句

  ```xml
  <!--插入-->
      <insert id="addUser" parameterType="com.wudreamer.pojo.User" >
          insert into mybatis.user(id, name, pwd) VALUES (#{id},#{name},#{pwd})
      </insert>
  ```

* 3、测试

  ```java
   	// 添加 增删改需要提交事务
      @Test
      public void addUser(){
          SqlSession sqlSession = MybatisUtils.getSqlSession();
          UserMapper mapper = sqlSession.getMapper(UserMapper.class);
  
          mapper.addUser(new User(4,"陈陈","12121"));
          // 提交事务
          sqlSession.commit();
  
          sqlSession.close();
      }
  ```

### 2.4、Update

* 1、编写接口

  ```java
      // 修改用户
      int updateUser(User user);
  ```

* 2、编写对应的mapper中的SQL语句

  ```xml
  <!--修改-->
      <update id="updateUser" parameterType="com.wudreamer.pojo.User">
          update mybatis.user set name=#{name},pwd=#{pwd} where id = #{id}
      </update>
  ```

* 3、测试

  ```java
  	// 修改
      @Test
      public void updateUser(){
          SqlSession sqlSession = MybatisUtils.getSqlSession();
          UserMapper mapper = sqlSession.getMapper(UserMapper.class);
  
          mapper.updateUser(new User(4,"哈哈","444"));
          // 提交事务
          sqlSession.commit();
  
          sqlSession.close();
      }
  ```

### 2.5、Delete

* 1、编写接口

  ```java
  // 删除用户
      int deleteUser(int id);
  ```

* 2、编写对应的mapper中的SQL语句

  ```xml
  <!--删除-->
      <delete id="deleteUser" parameterType="int">
          delete from mybatis.user where id = #{id}
      </delete>
  ```

* 3、测试

  ```java
      // 删除
      @Test
      public void deleteUser(){
          SqlSession sqlSession = MybatisUtils.getSqlSession();
          UserMapper mapper = sqlSession.getMapper(UserMapper.class);
  
          mapper.deleteUser(4);
          // 提交事务
          sqlSession.commit();
          sqlSession.close();
      }
  ```




## 三、mybatis注解开发

### 3.1、面向接口编程

* 1.什么是面向接口编程
  面向接口编程就是先把客户的业务逻辑线提取出来，作为接口，业务具体实现通过该接口的实现类来完成。
  当客户需求变化时，只需编写该业务逻辑的新的实现类，通过更改配置文件(例如Spring框架)中该接口
  的实现类就可以完成需求，不需要改写现有代码，减少对系统的影响。
  复制代码

* 2.面向接口编程的优点

  * 降低程序的耦合性。

    其能够最大限度的解耦，所谓解耦既是解耦合的意思，它和耦合相对。耦合就是联系，耦合越强，联系越紧密。在程序中紧密的联系并不是一件好的事情，因为两种事物之间联系越紧密，你更换其中之一的难度就越大，扩展功能和debug的难度也就越大。

  * 易于程序的扩展；

  *  有利于程序的维护；

* 3.接口编程在设计模式中的体现：开闭原则

  其遵循的思想是：对扩展开放，对修改关闭。其恰恰就是遵循的是使用接口来实现。在使用面向接口的编程过程
  中，将具体逻辑与实现分开，减少了各个类之间的相互依赖，当各个类变化时，不需要对已经编写的系统进行
  改动，添加新的实现类就可以了，不在担心新改动的类对系统的其他模块造成影响。

### 3.2、使用注解开发

**本质：反射机制实现		底层：动态代理**

* 1.注解在接口上实现

  ```java
  public interface UserMapper {
      @Select("select * from user")
      List<User> getUsers();
  }
  ```

* 2.需要在核心配置文件中绑定接口

  ```xml
  <!--绑定接口-->
      <mappers>
          <mapper class="com.qjd.dao.UserMapper"/>
      </mappers>
  ```

* 3.测试

  ```java
  public class UserMapperTest {
  @Test
  public void  test(){
      SqlSession sqlSession = MybatisUtils.getSqlSession();
      //底层主要应用反射
      UserMapper mapper = sqlSession.getMapper(UserMapper.class);
      List<User> users = mapper.getUsers();
  
      for (User user : users) {
          System.out.println(user);
      }
      
      sqlSession.close();
  }
  }
  ```

### 3.3、Mybatis详细执行流程

![img](https://img-blog.csdnimg.cn/img_convert/f1a5090faf8ab054e372369ff5477f2f.png)

概要步骤：

* 在src/main/resources路径下建立mybatis-config.xml文件建立核心配置文件

* 在src/main/java/com/qjd/utils路径下编写工具类MybatisUtils.java读取配置文件获取sqlsessionfactory

* 在src/main/java/com/qjd/pojo路径下编写实体类User.java

* 在src/main/java/com/qjd/dao路径下编写接口UserMapper.java和UserMapper.xml

* 编写测试类

### 3.4、CRUD

在工具类创建的时候实现自动提交事务

```java
public  static SqlSession getSqlSession(){

    return sqlSessionFactory.openSession(true);
}
```

编写接口，增加注解

```java
public interface UserMapper {
    @Select("select * from user")
    List<User> getUsers();

  //方法存在多个参数，所有的参数前面前面必须加上 @Param("") 注解
    @Select("select * from user where id=#{id}")
    User getUserByID(@Param("id") int id);

    @Insert("insert into user(id,name,pwd) values(#{id},#{name},#{password})")
    int addUser(User user);

    @Update("update user set name=#{name},pwd=#{password} where id=#{id}")
    int updateUser(User user);

    @Delete("delete from user where id=#{uid}")
    int deleteUser(@Param("uid") int id);
}
```

测试类

* 注意：我们必须要将接口注册绑定到我们的核心配置文件中

```xml
<!--每一个Mapper.xml都需要在MyBatis核心配置文件中注册-->
    <mappers>
        <mapper resource="com/qjd/dao/UserMapper.xml"/>
    </mappers>

```

```java
public class UserMapperTest {

    @Test
    public void  test(){
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        //底层主要应用反射
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
       mapper.deleteUser(5);
        sqlSession.close();
    }
}
//        List<User> users = mapper.getUsers();
//
//        for (User user : users) {
//            System.out.println(user);
//        }

//    User userByID = mapper.getUserByID(1);
//        System.out.println(userByID);

//    mapper.addUser(new User(5,"hello","122964"));

// mapper.updateUser(new User(5,"nihao","385366"));
```

### 3.5、 @Param(“”) 注解

* 基本类型的参数或者String需要加上
* 引用类型不需要加
* 如果只有一个基本类型的话，可以忽略，但是建议大家都加上
* 我们在sql中引用的就是我们这里的@Param(“”)中设定的属性名

### 3.6、#{} 和 ${}
1、#{}是预编译处理，$ {}是字符串替换

2、mybatis在处理两个字符时，处理的方式也是不同的：

 (1)处理#{}时，会将sql中的#{}整体替换为占位符（即：?），调用PreparedStatement的set方法来赋值；
 (2)在处理 $ { } 时，就是把 ${ } 替换成变量的值。

3、假如用${}来编写SQL会出现：恶意SQL注入，对于数据库的数据安全性就没办法保证了

4、使用 #{} 可以有效的防止SQL注入，提高系统安全性：

​	预编译的机制。预编译是提前对SQL语句进行预编译，而后再调用SQL，注入的参数就不会再进行SQL编译。而SQL注入是发生在编译的过程中，因为恶意注入了某些特殊字符，最后被编译时SQL时轻而易举的通过，从而导致数据泄露。而预编译机制则可以很好的防止SQL注入。




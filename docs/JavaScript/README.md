# JS易混淆概念整理

> 2019.09.09 

## JS执行过程

预解释->全局足行执行



## JS内存管理

- 堆 (引用数据类型:Object,Array)
- 栈 (基本数据类型：Undefined,Null,Boolean,Number和String)
- 池 (常量:const)



#### 堆

用来存储引用数据类型的值->对象存储的是属性名和数据值, 函数存储的是代码字符串



#### 栈

用来提供一个JS代码执行的环境->**作用域**(全局/私有)
预解释阶段



#### 生命周期

当定义的变量未被引用将被垃圾回收 变量使用完也可以手动置空null让垃圾回收



#### 内存泄漏

```javascript
//以下会导致内存泄漏
function fn(){
    a = 10; //window.a = 10
}

function fn(){
    this.a = 10;
}
fn();//window.a = 10;

//nodejs性能监控 heapUsed:内存占用
console.log(process.memoryUsage());
```


## 声明(预解释)、定义

预解释会将声明提前，JS中预解释不会存在未声明(非预解释会存在未声明)只会存在未定义。
带var的声明会进行预解释，不带var不会预解释。
声明变量和函数不同同名，同名只有第一个有效之后的声明都无效。
自执行函数不预解释


```javascript
/*先声明在定义*/
var num; //声明
num = 12; //定义 

/*如果先定义后声明*/
console.log(a); //未定义undefined 因为预解释的原因JS会在执行前声明一个未定义的a
var a = 12;

/*函数 声明和定义会被提前(变量提升)*/
function fn(){
    return 1;
}
/*变量函数 定义只会在调用执行时才会预解释*/
var fn = function(){
    return 1;
}

/* 区别带var和不带var */
console.log(aa); // Uncaught ReferenceError: aa is not defined 未声明
console.log(bb); //undefined 未定义 带var会预解释
aa = 12; //相当于给全局window增加一个属性aa  window.aa=12
var bb = 34; //相当于给全局window增加一个属性bb  window.bb=34 同时增加一个全局变量bb
//以上代码会预解释成如下
var bb;
console.log(aa);
console.log(bb);
aa = 12;
bb = 34;

/*预解释*/
if(!("num" in window)){
   	var num = 12;
}
console.log(num); ///undefined

/*声明变量和函数不能同名*/
fn(); //2 是个函数
function fn(){console.log(1);}
fn(); //2 是个函数
var fn = 10; // fn=10 改变函数为变量
fn(); //Error: fn is not a function
function fn(){console.log(2);}
fn(); //不执行 上面已经Error报错中断了
//以上被预解释成如下
function fn(){console.log(1);}
function fn(){console.log(2);}
var fn;
fn();
fn();
fn();
fn();
```


## 作用域(全局/私有)

```javascript
var total = 0;
function fn(){
    console.log(total); //undefined 私有区域存在预解释total
    var total = 100;
}
fn();
console.log(total); //0
```

```javascript
var total = 0;
function fn(){
    console.log(total); //0
    total = 100;
}
fn();
console.log(total); //100
```

```javascript
total = 0;
function fn(){
    console.log(total); //undefined 私有区域存在预解释total
    var total = 100;
}
fn();
console.log(total); //0
```

```javascript
total = 0;
function fn(){
    console.log(total); //0
    total = 100;
}
fn();
console.log(total); //100
```

```javascript
var num = 12;
function fn(){
    var num = 120;
    return function(){
        console.log(num);
    }
}
fn(); //120 作用域window
var f = fn();
f(); //120 作用域window

~function(){
    var num = 1200;
    f(); //120 作用域window
}();
```


## 函数


#### 区分实参和形参

```javascript
//定义的参数是形参
function fn(a,b){
    return 1;
}

var x=12,y=34;
fn(x,y); //传递的参数是实参
```


#### 区分fn和fn()

```javascript
function fn(){
	return 1;
}
```

- fn是函数本身	function fn(){return 1;}
- fn()是函数返回 1


#### 自执行函数

```javascript
(function(num){})(100);
//如果不想用括号包裹函数提升优先级，也可用以下符号提升函数优先级
!function(num){}(100);
~function(num){}(100);
+function(num){}(100);
-function(num){}(100);
```


#### 函数和构造函数
| 普通函数 | 构造函数 |
| --- | --- |
| 驼峰式命名 建议首字母小写(区别构造函数) | 驼峰式命名 建议首字母大写(区别普通函数) |
| 直接调用 如:fn() | 使用 new关键字调用 如: new Fn() |
| 可以用return语句返回值 | 默认返回的是this及new实例的新对象，也可以return值（当return基本数据类型将被忽略依然返回this，当返回Object将不再返回this而是自定义的Object） |
| 普通函数内部不建议使用this关键字(因为这个时候this指向window全局对象) |  |
|  |  |



#### prototype属性和__proto__ 属性

对象：属性(变量)和方法(函数)的集合。每个对象都有一个__proto__属性指向这个对象的构造函数的原型对象。

构造函数：用来创建对象的函数，通过new关键字生成，函数名首字母建议大写。

原型对象：(原型对象在定义函数的同时被创建)每个函数都有个prototype属性，它是一个指向原型对象的指针。


#### call和apply函数


## 闭包

闭包只是机制，保护函数内的私有变量不受污染。


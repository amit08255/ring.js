---

---

FAQ
===

### How does Ring.js makes multiple inheritance?

Most inheritance systems in JavaScript (like John Resig's one) use prototype inheritance. They create a chain of
prototypes and the JavaScript virtual machine will recursively search that chain to find the methods to call.

Unfortunately this behavior makes it impossible to use multiple inheritance. So Ring.js uses a different system.

When a new class is created, Ring.js creates a completely new prototype by using the methods defined in its whole set of
base classes. To solve problems created by the diamond inheritances Ring.js linearize the classes graph using the [C3
algorithm as defined in the Python standard](http://www.python.org/download/releases/2.3/mro/).

### What browsers are supported?

* Internet Explorer from version 7
* Latest Chrome
* Latest Firefox

node.js is also supported.

### Is Ring.js fast?

Yes. When compared to similar libraries Ring.js has good performances.

When comparing classes libraries, it is necessary to explain the differences between them. Basically, if the
syntax is nice and easy to type it will be slower. To make it faster you have to remove features and makes the syntax
more and more ugly.

For Ring.js I tried to use a syntax as nice as possible while still keeping very good performances. This was quite
successful since, when compared to libraries providing similar features (mainly `this.$super` that gives access to the
super method), Ring.js has excellent performances. It can be much faster than some well-known libraries, notably John
Resig's inheritance. Additionally, none of these other class systems provide multiple inheritance. See the test result:

<img src="/static/img/perf.jpg" style="max-width: 100%"></img>

See [this link to the jsperf.com test.](http://jsperf.com/multiple-class-systems/5)

Some class systems can still have better performances. None of these have `this.$super` and require to use longer syntax
instead. But this type of performance difference should not be overestimated because it's only the measurement of pure
performances when calling a method. Real programs do a lot of other things rather that calling methods that performs
no operations.

Anyway, I think it's better to favor shorter and nicer syntax to improve the productivity of the programmers rather
than trying to gain some milliseconds every x millions calls, that's why I chose to use `this.$super` in Ring.js rather
than an uglier system.

### How to contribute?

[Go on the Github page](https://github.com/nicolas-van/ring.js).

Report bugs, propose improvements, improve the documentation. Any help will be welcomed!

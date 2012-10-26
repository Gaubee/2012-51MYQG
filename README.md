﻿ 2012-51MYQG
===========

闽江学院勤工助学指导中心网络部构建，用于维护开放数据、问题讨论与下载资料

* 该站点的[Wiki](https://github.com/Gaubee/2012-51MYQG/wiki)将在后期用于分类资料与简单文档。
* 有讨论价值的问题则在[Issues](https://github.com/Gaubee/2012-51MYQG/issues)中提出。
_（参与者应该拥有GitHub账户，并建议绑定能随时将信息推送到手机的Google mail账户）_
* 下载资料将提供在本站的[Download](https://github.com/Gaubee/2012-51MYQG/downloads)中，或者在提供文本外链。
* 本站点的[GitHub Page](http://gaubee.github.com/2012-51MYQG/) 目前用于网络部学习作品的展示与学习笔记共享。目前网站新构架(v2.1.0)正在测试中。

# 2012网络部干事学习计划

[Google可编辑文档](https://docs.google.com/document/d/1UjH0PbG8y1GR-mevPPxHXoAmwD76S1mFTq40efi9qSc/edit)
_要修改的什么东西直接在后面加上去就好，注明修改人的姓名和修改时间_
```
EG:要修改的什么东西直接在后面加上去就好，注明修改人的姓名和修改时间
*** 15:05 2012/10/6
```

# 第9届网络部公示栏
* 牛腩视频教程系列集合 :[百度网盘](http://pan.baidu.com/share/link?shareid=69304&uk=2567048257)
* 第九届的干部通讯录在[github.com/Gaubee/Gaubee/downloads](https://github.com/Gaubee/Gaubee/downloads)中可以找到各种格式的通讯录
* 注重培养学习效率与技巧

# 网络资源
* [前端开发网(W3Cfuns.com)](http://www.w3cfuns.com)
* [PS联盟--Photoshop专业教程网](http://www.68ps.com/)
* [知识库_博客园](http://kb.cnblogs.com/)

# 框架结构与设计理念
* 在一开始设计网站是，是沿着一般的网站思维去构建，通过 __github.js__来调用 __git API v3__，实现页面的数据获取，所需要做的就是构建好静态的网页，而后写一个解析功能，把需要的模块数据按需求写好。这是 __版本号v1.0.0__的构架。在本地完成基本的功能设计与测试后，推送到github page，却意外地发现……API出问题了，安全策略的限制，使得整个网站成为一堆废铁……重新构建框架确实花了不少时间，也是花了很大的勇气才下决定把网站以近似桌面程序的想法进行设计，简单的说，只有一个页面，带着简单基本的布局与大量的样式数据。而后近乎完全地通过js解析整个网站文件数据、dom操作控制页面数据与页面布局控制。而整个文件夹结构就是一个数据库。所以用户所要做的就是刚开始缓慢地载入样式数据，等待基本的数据完成解析后，接下来就是极为流畅的操作，对pc端或者是移动端都是良好的体验。
* __可移植性__是一个很值得考虑的东西，v2版本的网站把数据请求完全交给客户端的js，唯一用到的只有git API的一个API，用于获取整个网站文件信息，我所做的就是解析压缩这些数据，然后缓存到网站root目录下，等待客户端读取、按需求解压。也就是说当我需要移植整个网站时，要做的仅仅是写一个定时或者触发性地更新一个json文件。
* 快速地编写可被解析成html文件的md文件，由于网站是托管在github上，所以延袭了github的文件管理风格，即通过 __README.md__来描述整个文件夹信息。故网站通过ajax获取md数据再使用js解析md文件成html数据进行显示。 __快速与规范__。何况用 __Markdown__语法写东西确实是很惬意的事情。
* __可拓展性__！简单直观的双层结构，使得绝大多数功能的编写变得极为简单。因为主数据是一个包含着路径元素的json数据，所以可以十分简单地去访问上一层数据与下一层数据，而这些数据确是用平行的数组结构存储。所以通过封装的数据访问功能实现功能拓展变得极为简单。例如做一个搜索功能，可以实现关键字搜索、按类别搜索、或者搜索特定文件夹下的具体数据等等。
* 由于应用程序的设计思路，所以页面的布局采取了特殊地 __3：5：5__比例布局，以实现通过一个页面来展示数据，尽量完善客户体验。
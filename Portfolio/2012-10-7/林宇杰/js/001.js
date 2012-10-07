function denglu()
{
var a=document.form1.user.value;
var b=document.form1.mima.value;
if(a=="" || a==null){alert("用户名为空");return }
if(b=="" || b==null){alert("密码为空");return}


if((a=="a123456")&&(b=="123456")){alert("成功")}
else{alert("用户名或密码错误")
return;}
}
function aaa()
{
var m1=document.form1.mi1.value;
var m2=document.form1.mi2.value;

var reg=/^\w{6,18}$/g;
if(!reg.test(m1)){alert("密码为6-18位");return;}

var rn=document.form1.realname.value;
var reg=/^[\u4e00-\u9f5a]+$/g;
if(!reg.test(rn)){alert("只能输入中文");
return;}


if(m1!=m2){alert("两次输入的密码不一致");
return;}

var a=document.form1.xingming.value;
var b;
x=document.form1.xingbie[0].checked;
if(x){b=document.form1.xingbie[0].value}
else{b=document.form1.xingbie[1].value}
var c=document.form1.zu;
var d=""
for(var i=0;i<c.length;i++){
if(c[i].checked){d+=c[i].value+"."}}

var qt=document.form1.qita.value;
alert("姓名："+a+"\n密码："+m1+"\n真实姓名："+rn+" \n性别: "+b+" \n爱好"+d+"："+qt)
}
function bbb()
{
 document.form1.xingming.select();
}
function ccc()
{
var y=document.form1.xingming.value;
if(y=="" || y==null){alert("请输入姓名");
document.form1.xingming.focus()}

}
function qx(){
var c=document.form1.zu;
for(var i=0;i<c.length;i++)
{c[i].checked=true}
}
function qxqx(){
var c=document.form1.zu;
for(var i=0;i<c.length;i++)
{c[i].checked=false}

}
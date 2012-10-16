function aaa(){
var username =document.form1.username.value;
var key =document.form1.key.value;

alert("用户名："+username+"\n"+"密码："+key+"\n");}
function bbb(){
document.form1.username.value="";
}
function ccc(){
var ttt=document.form1.username.value;
if (ttt==""||ttt==null){alert("请输入您的用户名！");
document.form1.username.focus(); }
}function eee(){
document.form1.key.value="";
}
function fff(){
var ttt=document.form1.key.value;
if (ttt==""||ttt==null){alert("请输入您的密码！");
document.form1.key.focus(); }
}
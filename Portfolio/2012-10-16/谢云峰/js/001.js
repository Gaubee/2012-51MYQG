function aaa(){
var username =document.form1.username.value;
var key =document.form1.key.value;
var xingming =document.form1.xingming.value;
var x=document.form1.zhu1[0].checked;
var xingbie;
if(x){
xingbie=document.form1.zhu1[0].value;
}else{
xingbie=document.form1.zhu1[1].value;
}
var aihao="";

var xxx=document.form1.zhu2;
for(i=0;i<xxx.length;i++){
if (xx=document.form1.zhu2[i].checked){
aihao +=document.form1.zhu2[i].value+"、"}

}

alert("用户名："+username+"\n"+"密码："+key+"\n"+"姓名："+xingming+"\n"+"性别："+xingbie+"\n"+"爱好："+aihao);
}
function bbb(){
document.form1.username.value="";
}
function ccc(){
var ttt=document.form1.username.value;
if (ttt==""||ttt==null){alert("请输入您的用户名！");
document.form1.username.focus(); }
}
function ddd(){
document.form1.xingming.value="";
}
function eee(){
var ttt=document.form1.xingming.value;
if (ttt==""||ttt==null){alert("请输入您的姓名！");
document.form1.xingming.focus(); }
}
function fff(){
document.form1.key.value="";
}
function ggg(){
var ttt=document.form1.key.value;
if (ttt==""||ttt==null){alert("请输入您的密码！");
document.form1.key.focus(); }
}

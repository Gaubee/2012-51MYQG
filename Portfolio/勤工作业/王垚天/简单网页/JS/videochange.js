// JavaScript Document
function videochange01(){
	document.getElementById("video000").innerHTML="<embed src='http://www.tudou.com/v/ELJm8Xx07MQ/&resourceId=0_05_05_99&bid=05/v.swf' width='838' height='494' align='middle'/></embed>"
	}
	
function videochange02(){
	document.getElementById("video000").innerHTML="<embed src='http://www.tudou.com/v/_M7ckq9iD1Q/&rpid=69221296&resourceId=69221296_05_05_99&bid=05/v.swf' width='838' height='494' align='middle' ></embed>"
	}
	
function videochange03(){
	document.getElementById("video000").innerHTML="<embed src='http://www.tudou.com/v/zHNp1zOE1WQ/&rpid=69221296&resourceId=69221296_05_05_99&bid=05/v.swf' width='838' height='494' align='middle'></embed>"
	}
	
function submit01()
{ 
  var x=document.getElementById("commentary").value;
	if(x =="����������˵�Ļ�......"){
		alert("�ı�����Ϊ�գ�����")
		}
		else{alert("�ύ�ɹ�")}
	
}

function none(){
	var x=document.getElementById("commentary").value;
	if(x == "����������˵�Ļ�......"){
	document.getElementById("commentary").value=""
	}
	}
	
function appear(){
	var x=document.getElementById("commentary").value;
	if(x == ""||x == null){
		document.getElementById("commentary").value="����������˵�Ļ�......"
		}
	
	}
function check(){
		
	var y = document.getElementById("ENTER_name").value;
	if(y == ""||y == null)
	{
		alert("��������Ϊ�գ���");
		}
		return;
	}
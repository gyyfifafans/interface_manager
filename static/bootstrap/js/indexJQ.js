//页面处理
//http://www.365mini.com/page/jquery-prop.htm查看jquery的api

$(function(){
	//getAllData();  //初始化页面数据
	//projectNameList(); //获取项目名称list
	//$("#fileupload").attr("data-url",myUrl+'/import_excel');  //上传文件请求地址
	
	//add btn
	$(".add-btn").click(function(){
		$(".r-title").val("");
		$(".r-method option").removeProp("selected");//
		$(".r-method .method-sed").prop("selected","selected");//
		$(".r-reqparams").val("");
		$(".r-resparams").val("");
		$(".r-des").val("");
		$(".r-url").val("");
		$(".r-reqparams").val("");
		$(".r-project option").removeProp("selected");
		$(".r-project .method-sed").prop("selected","selected");
		$(".isJYrequst").removeClass("myckbox-visited").addClass("myckbox-normal");
		//多个属性确定一个标签
		$(".ctrl-pop .pop-tit").text("+ 新增");
		$(".ctrl-pop").removeClass("hidden");
		$(".sure").attr("data-type","add");
	})

	//cancle btn
	$(".cancle").click(function(){
		//div class="ctrl-pop hidden"
		$(".ctrl-pop").addClass("hidden");
	})
	
	//注意多选的情况
	//del btn
	$(".del-btn").click(function(){
		//alert("really??");
		var ch = document.getElementsByName("choose");
		for(var i=0;i<ch.length;i++){
			//alert(ch[i].checked);
			if(ch[i].checked == false)
			{
				alert("请选择一行！");
			}
			else{
				//alert(ch[i].id);
				var con = confirm("确定是要删除么？")==true?del(ch[i].id):ch[i].checked=false;
				break;
			}
			
		}
	})
	

	/*
	//	edit btn
	$("#msg-table").on("click",".edit",function(){
		$(".ctrl-pop").removeClass("hidden");
		$(".sure").attr("data-type","edit");
	})
	//tr title
	$("#msg-table").on("click",".tr-tit",function(){
		var nextTr=$(this).next();
		if(nextTr.hasClass("hidden")){
			nextTr.removeClass("hidden");
			$(this).css("background","#fcf5f0");
		}else{
			nextTr.addClass("hidden");
			$(this).css("background","#fff");
		}
		return false;
	})
	
//	file up
	$('#fileupload').fileupload({
        add: function (e, data) {
            data.submit();
        },
        done: function (e, data) {
        	if(data._response.result.msg=="fail"){
        		alert(data._response.result.remark);
        		return;
        	}
            alert('上传成功！');
           // getAllData();  //初始化页面数据
			//projectNameList(); //获取项目名称list
        }
    });
*/

})

//note 11/17
//获得标签的属性或text
//$(".test").text()
//$(".test").attr("")
//$(".test").val()
//jquery end
//getAllData()  impl




$(".test-pc").click(function(){
	$(".currentPage").text(">PC端")
	$.get("test/pc",function(data){
		result = JSON.parse(data);
		var trHtml="";
		$(".data").empty();
		for(var i=0;i<result.length;i++){
		   // $(".data").append(result[i]['method']);
		   trHtml+='<tr><td width="3%"><input type="checkbox" name="choose" class="PC" id='+(i+1)+'></td>'+
				'<td width="5%" class="t-title"><a class="a-title" href="#">'+result[i]['name']+'</a></td>'+
				'<td width="5%" class="t-methods">'+result[i]['method']+'</td>'+
				'<td width="18%" class="t-url">'+result[i]['url']+'</td>'+
				'<td width="2%" class="t-token">'+result[i]['token']+'</td>'+
				'<td width="5%" "class="t-page">'+result[i]['page']+'</td>'+
				'<td width="4%" class="t-source">'+result[i]['source']+'</td>'+
				//'<td width="3%" align="center" valign="middle" width="65px"><div class="btn-group"><button data-toggle="dropdown" class="btn btn-info dropdown-toggle btn-pc" name="btn-pc" id='+(i+1)+'> 操作 <span class="caret"></span></button><ul class="dropdown-menu" ><li><a class="checkout-btn" href="#" onclick="check()" >查看</a></li><li><a class="del-btn" href="#" onclick="del()">删除</a></li></ul></div>'+
				//'</td>
				'</tr>';
		  }
		//$(".test-ul").text(data);
		$(".data").append(trHtml);
	})
	return false;
	
});


$(".test-shunguang").click(function(){
	$(".currentPage").text(">顺逛端")
	$.get("test/shunguang",function(data){
		result = JSON.parse(data);
		var trHtml="";
		$(".data").empty();
		//alert(result[0]);
		//$(".test-ul").append(result[0]['method']);
		for(var i=0;i<result.length;i++){
		   // $(".data").append(result[i]['method']);
		   trHtml+='<tr><td width="3%"><input type="checkbox" name="choose" class="SHUNGUANG" id="'+(i+1)+'"></td>'+
		   //'<td width="3%">'+result[i]['id']+'</td>'+
				'<td width="5%" class="t-title"><a class="a-title" href="#">'+result[i]['name']+'</a></td>'+
				'<td width="5%" class="t-methods">'+result[i]['method']+'</td>'+
				'<td width="18%" class="t-url">'+result[i]['url']+'</td>'+
				'<td width="2%" class="t-token">'+result[i]['token']+'</td>'+
				'<td width="5%" class="t-page">'+result[i]['page']+'</td>'+
				'<td width="4%" class="t-source">'+result[i]['source']+'</td>'+
				//'<td width="3%" align="center" valign="middle" width="65px"><div class="btn-group"><button data-toggle="dropdown" class="btn btn-info dropdown-toggle" name="btn-shunguang" id='+(i+1)+'> 操作 <span class="caret"></span></button><ul class="dropdown-menu"><li><a class="checkout-btn" href="#" onclick="check()" >查看</a></li><li><a class="del-btn" href="#" onclick="del()">删除</a></li></ul></div>'+
				//'</td>
				'</tr>';
		  }
		//$(".test-ul").text(data);
		$(".data").append(trHtml);
	})
	return false;
});
//checkbox 
function allcheck(){
	var ch = document.getElementsByName("choose");
	if(document.getElementsByName("allchecked")[0].checked == true)
	{
		for(var i=0;i<ch.length;i++){
			ch[i].checked = true;
		}
	}
	else{
			for(var i=0;i<ch.length;i++){
				ch[i].checked = false;
			}
		}
	
	
};
//have problem maybe because of loading js at first,but the .a-title got at last
//1.write into $(test-pc)  ,put $(test-pc) into getAllData()
//2.搜索js live方法也可以
/*
$(".a-title").click(function(){
	alert(1);
	alert($(this));
	var tr_father = $(".title").parent().parent();
	var choose_id = tr_father.child('td').eq(0).child('input').id;
	alert(choose_id);
	
});
*/
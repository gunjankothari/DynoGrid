/* ==========================================================================
   Gunjan's custom styles
   
   var data = {
   
		'Developed By': 'Gunjan B Kothari',
		'Date': '03-12-2013',
		'Assignment_By': 'Meditab.com'
   
   };
   ========================================================================== */
 $('document').ready(function(){

	var selects = $('.pre').find('.article');
	
	var i=0;
	while(i<selects.length)
	{
			selects.eq(i).append('<div class="inner"></div>');
			selects.eq(i).find('.inner').append(selects.eq(i).find('.inner').siblings());
			i++;
	}
	
	
	
	count=1;
	var selects = $('.pre').find('.article');
	
	
	//Sorting Elements
	var i=0;
	while(i<selects.length)
	{
			var j=i+1;
			tmp_var = selects.eq(i+1);
			while(j<selects.length)
			{
				
				if((tmp_var.height()*tmp_var.width())<(selects.eq(j).height()*selects.eq(j).width()))
				{
					tmp_var = selects.eq(j);
				}
				j++;
			}
			if(tmp_var != selects.eq(i+1))
			{
				$(selects.eq(i)).insertAfter(tmp_var);
				selects = $('.pre').find('.article');
				$(tmp_var).insertBefore(selects.eq(i));
				selects = $('.pre').find('.article');
				
			}
			i++;
			
	}
	//End Sorting Elements
	
	
	//Arranging Grid
	var selects = $('.pre').find('.article');
	var count =1;
	while(selects.length >= 1 )
	{
		$('.render').append('<div id="'+count+'" class="container" style="height:'+selects.eq(0).height()+'px"></div>');
		fillTheBox(count,true);
		var selects = $('.pre').find('.article');
		count++;
	}
	//End Arranging Grid
	
});


function fillTheBox(container,flag)
{
	var element;
	var count=1;
	var empty={
			height : $('#'+container).height(),
			width : $('#'+container).width(),
			area : $('#'+container).height() * $('#'+container).width()
		}
	child=false;	
	while(element = getBestFit(empty))
	{
		//Creating and Appending a container element
		new_container = '<div id="'+container+'_'+count+'" class="base" style="height:'+empty.height+'px; width:'+element.width()+'px; "></div>';
		$('#'+container).append(new_container);
		
		//Appending Best Fit element inside newly created Container.
		$('#'+container+'_'+count).append(element);
		
		
		//Counts the empty space
		empty={
			height : empty.height,
			width : empty.width - element.width(),
			area : empty.area - element.width()*element.height()
		}
		
		//Calculate height and width for empty space div
		var cal_height = empty.height;
		var cal_width = element.width();
		if(!flag)
		{
			cal_height = $('#'+container+'_'+count).height() - element.height();
		}
		else
		{
			cal_height = $('#'+container+'_'+count).height() - element.height();
			cal_width = element.width();
		}
		
		//Creating and Appending a empty space div
		inner_empty='<div id="'+container+'_'+count+'_empty" class="empty" style="height:'+cal_height+'px; width:'+cal_width+'px"></div>';
		$('#'+container+'_'+count).append(inner_empty);
		
		//Call the function itself(recursion) to fill empty space of empty div
		fillTheBox(container+'_'+count+'_empty',false);
		
		//increment counter
		count++;
		
		child=true;
	}
	
	//This will fill the empty space, which has no fit element.
	if(child==false)
	{
		$('#'+container).siblings().height($('#'+container).parent('div').height());
		$('#'+container).remove();
	}
	/*else
	{
		var adjust_width = $('#'+container+'>div').last().width()+empty.width;
		$('#'+container+'>div').last().width(adjust_width);
		
		$('#'+container+'>div:nth-last-child(1) div').each(function(){
				$(this).width(adjust_width-20);	
		});		
	}*/	
}

//This function finds the best Fit Element from the given Div's
function getBestFit(empty)
{
	//Get all the element Ref in an object
	var selects2 = $('.pre').find('.article');
		var pointer={area:0};
		var element_pointer=null;
		var i=0;
		
		//Iteration to get element which can cover maximum area of empty space and has less height and width than empty space. 
		while(i<selects2.length) {
			var tmp={
				height : selects2.eq(i).height(),
				width : selects2.eq(i).width(),
				area : selects2.eq(i).height() * selects2.eq(i).width()
			}
			if((empty.height - tmp.height) >= 0  && (empty.width - tmp.width) >= 0 && (pointer.area < tmp.area) )
			{
				pointer = tmp;
				element_pointer = selects2.eq(i);
				
			}
			i++;
		};
		
		//If can't find fit element return false else return Ref. of the element. 
		if(pointer==empty || element_pointer==null)
			return false;
		else
			return element_pointer;

}
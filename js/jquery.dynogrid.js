/* ==========================================================================
   Gunjan's custom styles
   
   var data = {
   
		'Developed By': 'Gunjan B Kothari',
		'Date': '03-12-2013',
		'Assignment_By': 'Meditab.com'
   
   };
   ========================================================================== */
	var grid_container='';
	$.fn.gridify = function() {
		grid_container =this;
		$(this).parent().append('<div class="render"></div>');
		var selects = $(this).find('.article');
	
		
		var i=0;
		while(i<selects.length)
		{
			if(selects.eq(i).find('.grid-inner').length==0)
			{
				selects.eq(i).append('<div class="grid-inner"></div>');
				selects.eq(i).find('.grid-inner').append(selects.eq(i).find('.grid-inner').siblings());
			}
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
					
					if((tmp_var.outerHeight(true)*tmp_var.outerWidth(true))<(selects.eq(j).outerHeight(true)*selects.eq(j).outerWidth(true)))
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
		var selects = $(this).find('.article');
		var count =1;
		while(selects.length >= 1 )
		{
			$('.render').append('<div id="grid-'+count+'" class="grid_container" style="height:'+selects.eq(0).outerHeight(true)+'px; width:'+$(this).width()+'"></div>');
			fillTheBox('grid-'+count,true);
			var selects = $(this	).find('.article');
			count++;
		}
		$(this).html('');
		//End Arranging Grid
		
		$(this).append($('.render').html());
		$('.render').remove();
				
}

/*
var resize_timer;
$(window).resize(function(){
	clearTimeout(resize_timer);
	resize_timer = setTimeout(,500);
});
*/
var id;
$(window).resize(function() {
    clearTimeout(id);
    id = setTimeout(doneResizing, 500);
});

function doneResizing(){
  $(grid_container).gridifyResize();
}
$.fn.gridifyResize = function() {
	var selects = $(this).find('.article');
	$(this).parent().append('<div class="render"></div>');
	$('.render').append(selects);
	$(this).html('');
	
	$(this).append($('.render').html());
	$(this).find('.article').css('height', '');
	$('.render').remove();
	$(this).gridify();
 }


   

function fillTheBox(container,flag)
{
	var element;
	var count=1;
	var empty={
			height : $('#'+container).outerHeight(true),
			width : $('#'+container).outerWidth(true),
			area : $('#'+container).outerHeight(true) * $('#'+container).outerWidth(true)
		}
	child=false;	
	while(element = getBestFit(empty))
	{
		//Creating and Appending a container element
		new_container = '<div id="'+container+'_'+count+'" class="base" style="height:'+empty.height+'px; width:'+element.outerWidth(true)+'px; "></div>';
		$('#'+container).append(new_container);
		
		//Appending Best Fit element inside newly created Container.
		$('#'+container+'_'+count).append(element);
		
		
		//Counts the empty space
		empty={
			height : empty.height,
			width : empty.width - element.outerWidth(true),
			area : empty.area - element.outerWidth(true)*element.outerHeight(true)
		}
		
		//Calculate height and width for empty space div
		var cal_height = empty.height;
		var cal_width = element.outerWidth(true);
		if(!flag)
		{
			cal_height = $('#'+container+'_'+count).outerHeight(true) - element.outerHeight(true);
		}
		else
		{
			cal_height = $('#'+container+'_'+count).height() - element.outerHeight(true);
			cal_width = element.outerWidth(true);
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
		$('#'+container).siblings().outerHeight($('#'+container).parent('div').outerHeight(true));
		$('#'+container).remove();
	}
	
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
				height : selects2.eq(i).outerHeight(true),
				width : selects2.eq(i).outerWidth(true),
				area : selects2.eq(i).outerHeight(true) * selects2.eq(i).outerWidth(true)
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
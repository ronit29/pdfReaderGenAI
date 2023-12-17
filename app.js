$(document).ready(function() {
    console.log( "ready!" );

    const model_data = new Map();


    model_data.set("phase1", ["They had played all day but now that it was dark and difficult to see, they had nothing to do. They couldn’t play soccer because they couldn’t see the ball.", ""]);
    model_data.set("phase2", ["Finding Sally was easy. She always ran off and then circled back so she would be close to base,the safe place to get to before being tagged.", ""]);
    model_data.set("phase3", ["Sally was wondering what had happened. All she could remember was crawling under the big trunk of a fallen tree to hide.", ""]);
    model_data.set("phase4", ["When they arrived at Mark’s house, the police were there with the treasure box.",""]);
                

    let read = false;
    let t = null;
    let beat = new Audio();
    let last_beat = new Audio();
    let last_phase= "phase1";

    $('div.pf.w0.h0').click(function(){
        console.log(last_beat);
        var id = $(this).attr('data-page-no');
        var curr_div = "div.pc.pc"+id+".w0.h0"
        var curr_page = $(curr_div).children();
        last_beat.pause()

        if(read){
            read = false;
            clearTimeout(t);            
            curr_page.each(function() {
                if($(this).hasClass("t"))
                {  
                    $(this).css('backgroundPosition', 'right');
                }
            });
        }

        read = true;

        var curr_text = "";
        curr_page.each(function() {
            if($(this).hasClass("t"))
            {  
                curr_text += $(this).html();
            }
        });

        phase = null;
        for (let [key, value] of model_data) {
            if(curr_text.toLowerCase().replace(/\s/g, "").includes(value[0].toLowerCase().replace(/\s/g, ""))){
                phase = key;
                last_phase = phase;
            }
        }
        console.log(phase);
        if(phase!==null){
            beat = new Audio("audio/"+phase+".wav");
            last_beat = beat;
        }
        else{
            phase = last_phase;
            beat = last_beat
        }
        beat.play();
        if(typeof curr_page === 'object' && 'length' in curr_page && curr_page.length>0){
            var length  = curr_page.length;

            function  readtext(i){
                if(i>1){
                    var remove_img = "div#"+id+",img#"+(i-1);
                    $(remove_img).hide();
                }
                if($(curr_page[i]).hasClass( "t" )){
                    var img_tag = "<img src='gifs/"+phase+".jpg' width='70' height='65' id='"+i+"' />";
                    $(curr_page[i]).append(img_tag);
                    
                    $(curr_page[i]).css('backgroundPosition', 'left');
                }

                // if(beat.paused){ 
                //  beat.play();
                // }
                if(i<length && read){            
                    t = setTimeout(readtext, 4000, i+1);  
                    
                }
            }
            readtext(1);
 
        }
     
    });

});
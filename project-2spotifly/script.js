console.log("leys write javascript")
let currentsong=new Audio();
let songs;


async  function getSongs(){
    let a=await fetch("http://127.0.0.1:3000/project-2spotifly/songs/");
    let response=await a.text();
    let div=document.createElement("div");
    div.innerHTML=response;
    let as=div.getElementsByTagName("a");
    let songs=[];
    for(let i=0; i<as.length ;i++){
        const element=as[i];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href);
        }
    

    }

    return songs;
}


function formatTime(seconds) {
    // Calculate the number of minutes
    const minutes = Math.floor(seconds / 60);
  
    // Calculate the remaining seconds
    const remainingSeconds = Math.floor(seconds % 60);
  
    // Add a leading zero to the seconds if they are less than 10
    const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
  
    // Combine minutes and seconds into the final format
    return `${minutes}:${formattedSeconds}`;
  }



function playmusic(track,pause=false){
    currentsong.src=track;
    
    if(pause==false){
    currentsong.play();
    current.src="pause.svg";
    }
    
    document.querySelector(".playbar").getElementsByClassName("songname")[0].innerHTML=`${track.replaceAll("%20"," ").replaceAll("http://127.0.0.1:3000/project-2spotifly/songs/","").replaceAll("_64(PagalWorld.com.sb).mp3","")}`;
    document.querySelector(".playbar").getElementsByClassName("songtime")[0].innerHTML="00:00/00:00";

}





async function main(){
     songs= await getSongs();
   
    playmusic(songs[0],true);
    

    //lists the song of th epaylist in console with the urls
    console.log(songs);

    //lets create  a list of songs which we are given in your library inside the songsslist class and in the unorderd list

    let songUL=document.querySelector(".songsslist").getElementsByTagName("ul")[0];


    for(let i=0;i<songs.length;i++){
        songUL.innerHTML=songUL.innerHTML+`
        
         <li data-url="${songs[i]}">
                           
                            <div class="songwithicon">
                                <img src="music.svg" alt="" class="musicicon invert">
                                <div class="musicinfo">
                                <div>${songs[i].replaceAll("%20"," ").replaceAll("http://127.0.0.1:3000/project-2spotifly/songs/","").replaceAll("_64(PagalWorld.com.sb).mp3","")}</div>
                                <div> artist name</div>
                            </div>
                            </div>    
                                <div class="playthissong">
                                   <div> Play now</div>
                                    <img src="playsong.svg" class="invert ">


                                </div>
                           
                        </li>`;

    }

    //attaching event listener to the songsslist 
    Array.from(document.querySelector(".songsslist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".musicinfo").getElementsByTagName("div")[0].innerHTML);
            
            playmusic(e.getAttribute("data-url"));
           
            

        });
    });


    //attaching event listner to the play,next,previous
    current.addEventListener("click",()=>
    {
        if(currentsong.paused){
            currentsong.play();
            current.src="pause.svg";
        }
        else{
            currentsong.pause();
            current.src="playsong.svg"; 
        }
    })


    currentsong.addEventListener("timeupdate",()=>{
        console.log(formatTime(currentsong.currentTime),formatTime(currentsong.duration));
        document.getElementsByClassName("songtime")[0].innerHTML=`${formatTime(currentsong.currentTime)}/${formatTime(currentsong.duration)}`;
        document.querySelector(".circle").style.left=currentsong.currentTime/currentsong.duration*100+ "%";

    });

    document.querySelector(".seekbar").addEventListener("click",e=>{
        console.log(e.offsetX,e.target.getBoundingClientRect());
        document.querySelector(".circle").style.left=e.offsetX/e.target.getBoundingClientRect().width*100+"%";
        currentsong.currentTime=currentsong.duration*e.offsetX/e.target.getBoundingClientRect().width;
    })


    //applying enent listner to hamburger icon
    document.querySelector(".hamburger").addEventListener("click",()=>
    {
        document.querySelector(".left").style.left=0+"%"
    })

    //applying event listner to closee button

    document.querySelector(".closee").addEventListener("click",()=>
        {
            document.querySelector(".left").style.left=-110+"%"
        })


    
    
    agla.addEventListener("click",()=>{
        document
        

    })



    
            
    
}









main();

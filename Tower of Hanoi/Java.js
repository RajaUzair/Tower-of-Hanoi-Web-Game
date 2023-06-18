var disks, towers, draggedone, diskCount, moveElem, moves;
const inc = document.getElementById('incrementBtn');
const dec = document.getElementById('decrementBtn');
var moveElem = document.getElementById('moves');
var UnB = document.getElementById("UndoBtn")
var RedB = document.getElementById("RedoBtn")
var Rst =document.getElementById('RestartBtn')
var Und =[]; var Red=[]; var R;
moves = parseInt(moveElem.textContent, 10);
var Source, Destination,CurDisk;
var Dr = true;
let StTime=1;
let T = StTime*60;
const count = document.getElementById("Timer");
var Raf = setInterval(UpdateTimer,1000)


function init()
{
    diskCount = 3;
    disks = document.getElementsByClassName("Disk");
    towers = document.getElementsByClassName("Tower");
    for (var i = 0;i<disks.length;i++)
    {
        disks[i].draggable = false;
        disks[i].addEventListener("dragstart",dragstart);
    }
    for (var i = 0;i<towers.length;i++)
    {
        towers[i].addEventListener("dragover", dragover);
        towers[i].addEventListener("drop", drop);
        towers[i].addEventListener("dragenter", dragenter);

        towers[i].firstChild.draggable = true;
    }
}

function UpdateTimer()
{
  const Min = Math.floor(T/60);
  let Sec = T%60;

  Sec = Sec <10 ?'0' +Sec :Sec;
  count.innerHTML = `${Min}:${Sec}`;
  T--;

  if(T <=0)
  {

    for(var i = 1; i <= disks.length;i++)
    {
        const Dsk = document.getElementById("D" + i);
        Dsk.draggable=false;
    }

    alert("You Lose !");
    clearInterval(Raf);

  }
}
function dragstart(ev) 
{
  ev.dataTransfer.setData('text', ev.target.id);
  Source= ev.target.parentElement;
  CurDisk= ev.target;
  draggedone = ev.target.id;
}

function dragenter(ev) 
{
  var tower = ev.currentTarget; 
  var disk = draggedone;
  var disksOnTower = tower.getElementsByClassName("Disk"); 
  if (disksOnTower.length==0 || disksOnTower[0].id>disk)
  {
    tower.diskCanBeDroppedHere = true; 
     ev.preventDefault(); 
    return;
  }
  tower.diskCanBeDroppedHere = false;
}

function dragover(ev){
  if (ev.currentTarget.diskCanBeDroppedHere)
  {
      ev.preventDefault(); 
  }
 
}
  
function drop(ev)
 {

  var tower = ev.currentTarget;
  var disk = document.getElementById(ev.dataTransfer.getData('text'));
  ev.dataTransfer.dropEffect = 'move';
 
  tower.insertBefore(disk,tower.firstChild);

    moves++;
    moveElem.textContent = moves;

  for (var i=0; i<towers.length;i++)
  { 
    var e = towers[i].getElementsByClassName("Disk"); 

    if (e.length) e[0].draggable = true; 
    for (var j=1;j<e.length;j++)
    {
      e[j].draggable = false; 
    }
  }
  
  if(Dr == true)
  {
    Dr= false;
  }
  Destination= ev.target;
  Und.push({Source,Destination,CurDisk});
  console.log("Undo pushed");
  ev.preventDefault(); 

}
init();


inc.addEventListener('click', AddDisks);
function AddDisks()
{
   
    if(diskCount < 8 && Dr==true ){
        diskCount++;
        var tower1 = document.getElementById('T1');
        var disk = document.createElement('div');
        disk.classList.add('Disk');
        disk.id = 'D'+diskCount;
        disk.addEventListener('dragstart',dragstart);
        disk.draggable=false;
        console.log(disk.draggable);
        tower1.appendChild(disk);
    }
}

dec.addEventListener('click',RemDisks)
function RemDisks()
{
   
    if(diskCount >3 && Dr== true)
    {
        diskCount--;
        var tower1 = document.getElementById('T1');
        tower1.lastChild.remove();
    }
}

UnB.addEventListener('click',UndF)
function UndF()
{

  R =Und.pop();
  R.Source.prepend(R.CurDisk);
  Red.push(R);
}

RedB.addEventListener('click',RedF);
function RedF()
{
  if(Red.length >0)
  {
    R=Red.pop();
    R.Destination.prepend(R.CurDisk);
    Und.push(R);
  }
}

Rst.addEventListener('click',Restart);
function Restart()
{
  location.reload();
}
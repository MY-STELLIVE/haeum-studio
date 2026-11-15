const pages = ["home","live","schedule","analytics","archive","profile","gallery","lab","settings"];
const labels = {home:"STUDIO HOME",live:"LIVE CENTER",schedule:"SCHEDULE",analytics:"ANALYTICS",archive:"BROADCAST ARCHIVE",profile:"HAEUM PROFILE",gallery:"GALLERY",lab:"DATA LAB",settings:"SETTINGS"};
function navigate(page){
  if(!pages.includes(page)) return;
  document.querySelectorAll(".page").forEach(el=>el.classList.toggle("active",el.id===`page-${page}`));
  document.querySelectorAll("[data-page]").forEach(el=>el.classList.toggle("active",el.classList.contains("nav-item")&&el.dataset.page===page));
  document.getElementById("pageCrumb").textContent=labels[page];
  document.querySelector(".sidebar").classList.remove("open");
  document.getElementById("mobileOverlay").classList.remove("show");
  window.scrollTo({top:0,behavior:"smooth"});
}
document.addEventListener("click",e=>{
  const target=e.target.closest("[data-page]");
  if(target){e.preventDefault();navigate(target.dataset.page);}
});
const clock=document.getElementById("clock");
function updateClock(){const now=new Date();clock.textContent=new Intl.DateTimeFormat("ko-KR",{timeZone:"Asia/Seoul",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false}).format(now);document.getElementById("todayDate").textContent=new Intl.DateTimeFormat("ko-KR",{timeZone:"Asia/Seoul",year:"numeric",month:"2-digit",day:"2-digit"}).format(now).replaceAll(". ",".").replace(/\.$/,"");}
updateClock();setInterval(updateClock,1000);
const sidebar=document.querySelector(".sidebar"),overlay=document.getElementById("mobileOverlay");
document.getElementById("menuToggle").addEventListener("click",()=>{sidebar.classList.add("open");overlay.classList.add("show");});
overlay.addEventListener("click",()=>{sidebar.classList.remove("open");overlay.classList.remove("show");});
document.getElementById("searchButton").addEventListener("click",()=>alert("검색 기능은 다음 업데이트에서 추가할 예정입니다."));
const initialData={
  project:"HAEUM STUDIO",version:"1.0.0",asOf:"2026-11-14",
  profile:{name:"뭐해음",platform:"치지직",firstBroadcast:"2026-10-21",fandom:"토토단",chzzkFollowers:127,xFollowers:212},
  statistics:{broadcastSessions:22,totalHours:63.7,peakConcurrentViewers:20,peakAverageViewers:15},
  notes:["기존 대화 및 해음위키 정리 기록을 바탕으로 구성한 초기 데이터","실시간 치지직 연동 미구현","월별 상세 통계 및 개별 방송 데이터는 추후 입력"]
};
const preview=document.getElementById("dataPreview");
let currentData=initialData;
function renderData(){preview.textContent=JSON.stringify(currentData,null,2);}
renderData();
document.getElementById("exportData").addEventListener("click",()=>{
  const blob=new Blob([JSON.stringify(currentData,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="haeum-studio-backup.json";a.click();URL.revokeObjectURL(url);
});
document.getElementById("importData").addEventListener("change",async e=>{
  const file=e.target.files?.[0];if(!file)return;
  try{const parsed=JSON.parse(await file.text());currentData=parsed;renderData();alert("JSON 데이터를 불러왔습니다.");}
  catch(err){alert("JSON 파일을 읽을 수 없습니다. 파일 형식을 확인해 주세요.");}
  e.target.value="";
});

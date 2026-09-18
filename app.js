const guides=[...document.querySelectorAll('.guide')];
const viewer=document.querySelector('#viewer');
const viewerImage=document.querySelector('#viewerImage');
const viewerTitle=document.querySelector('#viewerTitle');
const viewerPosition=document.querySelector('#viewerPosition');
const downloadLink=document.querySelector('#downloadLink');
let currentIndex=0;

const guideDetails={
  'Kontrola pred záberom':{
    when:'Použi ju vždy, keď máš čas vedome pripraviť záber. Je to rutina, ktorá bráni technickým aj kompozičným chybám.',
    start:'Najprv pomenuj hlavný motív jednou vetou. Až potom skontroluj svetlo, pozadie, ostrenie a čas.',
    watch:'Okraje záberu a svetlé rušivé miesta. Tie si pri fotení často nevšimneš, no na monitore budú výrazné.',
    task:'Pred desiatimi zábermi prejdi celý zoznam. Porovnaj ich s desiatimi zábermi urobenými bez kontroly.'
  },
  'Expozičný trojuholník':{
    when:'Keď je fotografia príliš tmavá, pohyb je rozmazaný alebo hĺbka ostrosti nezodpovedá zámeru.',
    start:'Vyber clonu podľa vzhľadu, skontroluj potrebný čas a ISO nastav ako posledné podľa dostupného svetla.',
    watch:'Každá zmena má cenu: clona mení hĺbku ostrosti, čas pohyb a ISO množstvo viditeľného šumu.',
    task:'Odfoť rovnakú scénu tromi rôznymi kombináciami s podobným jasom. Sleduj rozdiel v pohybe a pozadí.'
  },
  'Ľudia v meste':{
    when:'Na street fotografiu a človeka zasadeného do mestského prostredia. Ohnisko okolo 24 mm ukáže človeka aj jeho kontext.',
    start:'Av, 24 mm, približne f/4 a ISO Auto. Pred záberom skontroluj, či čas pri chôdzi neklesol pod približne 1/250 s.',
    watch:'Najprv nájdi čistú scénu a dobré svetlo, až potom čakaj, kým do nej vstúpi človek.',
    task:'Nájdi jedno miesto a zostaň tam desať minút. Urob iba päť záberov, každý s iným gestom alebo krokom.'
  },
  'Reportáž':{
    when:'Keď chceš rozprávať príbeh výletu, trhu, podujatia alebo bežného dňa, nie iba vytvoriť jeden pekný obraz.',
    start:'Začni celkom, potom pridaj situáciu, človeka, detail a záver. Techniku drž jednoduchú, aby si nestratil moment.',
    watch:'Vzťahy medzi ľuďmi a drobné detaily, ktoré vysvetľujú miesto. Rešpektuj odmietnutie a citlivé situácie.',
    task:'Vytvor uzavretý príbeh presne v piatich rozdielnych záberoch bez dvoch takmer rovnakých fotografií.'
  },
  'Portrét':{
    when:'Pre jedného človeka, pokojnejší moment a prirodzenejšiu perspektívu. Objektív 40 mm na EOS 100D je vhodný najmä na polpostavu.',
    start:'Av, f/2.8 až f/4, jeden AF bod na bližšie oko. Človeka oddeľ od pozadia niekoľkými metrami.',
    watch:'Odlesk svetla v očiach, čisté pozadie a pohodlný výraz. Nechoď k tvári príliš blízko.',
    task:'Urob tri portréty pri okne: spredu, z boku a s tvárou mierne otočenou k svetlu. Porovnaj tiene.'
  },
  'Krajina':{
    when:'Keď chceš zachytiť priestor a vzťah medzi popredím, hlavným motívom a horizontom — nielen široký výhľad.',
    start:'Av, f/8, ISO 100 a ohnisko 18–35 mm. Z ruky kontroluj čas, na statíve použi dvojsekundovú samospúšť.',
    watch:'Vrstvy obrazu, smer prirodzených línií a prepaly v oblohe. Neostri automaticky iba na horizont.',
    task:'Na jednom mieste vytvor široký záber, stredný záber a detail. Vyber ten, ktorý najlepšie opisuje priestor.'
  },
  'Architektúra':{
    when:'Na celé budovy, fasády, interiéry aj geometrické detaily. Ohnisko vyber podľa toho, či ukazuješ priestor alebo tvar.',
    start:'Av, f/5.6 až f/8, ISO 100. Fotoaparát drž čo najrovnejšie; ak môžeš, radšej ustúp a neskôr orež.',
    watch:'Zbiehajúce sa zvislice, rohy záberu, opakujúce sa tvary a smer svetla na povrchu budovy.',
    task:'Odfoť jednu budovu tromi spôsobmi: celok na 18 mm, prirodzený pohľad okolo 24–35 mm a detail na 40–55 mm.'
  }
};

function showGuide(index){
  currentIndex=(index+guides.length)%guides.length;
  const guide=guides[currentIndex];
  const title=guide.dataset.title;
  const image=guide.dataset.image;
  viewerTitle.textContent=title;
  viewerImage.src=image;
  viewerImage.alt=`Fotografický ťahák: ${title}`;
  viewerPosition.textContent=`${currentIndex+1} / ${guides.length}`;
  downloadLink.href=image;
  downloadLink.download=`${title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,'-')}.png`;
  const detail=guideDetails[title];
  document.querySelector('#contextWhen').textContent=detail.when;
  document.querySelector('#contextStart').textContent=detail.start;
  document.querySelector('#contextWatch').textContent=detail.watch;
  document.querySelector('#contextTask').textContent=detail.task;
  if(!viewer.open)viewer.showModal();
  document.querySelector('.viewer-stage').scrollTop=0;
}

guides.forEach((guide,index)=>guide.querySelector('.guide-open').addEventListener('click',()=>showGuide(index)));
document.querySelector('#closeViewer').addEventListener('click',()=>viewer.close());
document.querySelector('#prevGuide').addEventListener('click',()=>showGuide(currentIndex-1));
document.querySelector('#nextGuide').addEventListener('click',()=>showGuide(currentIndex+1));
viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close()});
document.addEventListener('keydown',event=>{if(!viewer.open)return;if(event.key==='ArrowLeft')showGuide(currentIndex-1);if(event.key==='ArrowRight')showGuide(currentIndex+1)});

document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(item=>{item.classList.remove('active');item.setAttribute('aria-pressed','false')});
  button.classList.add('active');button.setAttribute('aria-pressed','true');
  const filter=button.dataset.filter;
  let visible=0;
  guides.forEach(guide=>{guide.hidden=filter!=='all'&&guide.dataset.category!==filter;if(!guide.hidden)visible++});
  document.querySelector('#counter').textContent=`${visible} ${visible===1?'ťahák':'ťahákov'}`;
}));

const themeButton=document.querySelector('#themeButton');
const savedTheme=localStorage.getItem('photo-guide-theme');
if(savedTheme==='light')document.body.classList.add('light');
themeButton.addEventListener('click',()=>{
  document.body.classList.toggle('light');
  localStorage.setItem('photo-guide-theme',document.body.classList.contains('light')?'light':'dark');
});

const chapterLinks=[...document.querySelectorAll('.chapter-index a')];
const chapterObserver=new IntersectionObserver(entries=>{
  const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
  if(!visible)return;
  chapterLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${visible.target.id}`));
},{rootMargin:'-20% 0px -65% 0px',threshold:[0,.15,.35]});
guides.forEach(guide=>chapterObserver.observe(guide));

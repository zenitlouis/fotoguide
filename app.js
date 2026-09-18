const guides=[...document.querySelectorAll('.guide')];
const viewer=document.querySelector('#viewer');
const viewerImage=document.querySelector('#viewerImage');
const viewerTitle=document.querySelector('#viewerTitle');
const viewerPosition=document.querySelector('#viewerPosition');
const downloadLink=document.querySelector('#downloadLink');
const languageButton=document.querySelector('#languageButton');
let currentIndex=0;
let currentLanguage=localStorage.getItem('photo-guide-language')||'sk';

const meta={
 checklist:{
  sk:{title:'Kontrola pred záberom',subtitle:'Rutina, vďaka ktorej nič dôležité neprehliadneš.',when:'Použi ju vždy, keď máš čas vedome pripraviť záber. Je to rutina, ktorá bráni technickým aj kompozičným chybám.',start:'Najprv pomenuj hlavný motív jednou vetou. Až potom skontroluj svetlo, pozadie, ostrenie a čas.',watch:'Okraje záberu a svetlé rušivé miesta. Tie si pri fotení často nevšimneš, no na monitore budú výrazné.',task:'Pred desiatimi zábermi prejdi celý zoznam. Porovnaj ich s desiatimi zábermi urobenými bez kontroly.'},
  en:{title:'Before you press the shutter',subtitle:'A quick routine that prevents avoidable mistakes.',when:'Use it whenever you have time to prepare a shot deliberately. It prevents both technical and compositional mistakes.',start:'Name the main subject in one sentence. Then check the light, background, focus and shutter speed.',watch:'Frame edges and bright distractions. They are easy to miss while shooting but obvious on a larger screen.',task:'Use the full checklist before ten shots. Compare them with ten shots made without the routine.'}
 },
 exposure:{
  sk:{title:'Expozičný trojuholník',subtitle:'Pochop vzťah medzi clonou, časom a ISO.',when:'Keď je fotografia príliš tmavá, pohyb je rozmazaný alebo hĺbka ostrosti nezodpovedá zámeru.',start:'Vyber clonu podľa vzhľadu, skontroluj potrebný čas a ISO nastav ako posledné podľa dostupného svetla.',watch:'Každá zmena má cenu: clona mení hĺbku ostrosti, čas pohyb a ISO množstvo viditeľného šumu.',task:'Odfoť rovnakú scénu tromi rôznymi kombináciami s podobným jasom. Sleduj rozdiel v pohybe a pozadí.'},
  en:{title:'Exposure triangle',subtitle:'Understand how aperture, shutter speed and ISO work together.',when:'Use it when the image is too dark, movement is blurred, or depth of field does not match your intention.',start:'Choose aperture for the look, check the shutter speed, then use ISO to reach a safe exposure.',watch:'Every change has a cost: aperture affects depth of field, shutter speed affects motion, and ISO affects visible noise.',task:'Photograph one scene with three combinations at similar brightness. Compare motion and background rendering.'}
 },
 city:{
  sk:{title:'Ľudia v meste',subtitle:'Človek v prostredí, pohyb a mestský moment.',when:'Na street fotografiu a človeka zasadeného do mestského prostredia. Ohnisko okolo 24 mm ukáže človeka aj jeho kontext.',start:'Av, 24 mm, približne f/4 a ISO Auto. Pri chôdzi kontroluj, či čas neklesol pod približne 1/250 s.',watch:'Najprv nájdi čistú scénu a dobré svetlo, až potom čakaj, kým do nej vstúpi človek.',task:'Nájdi jedno miesto a zostaň tam desať minút. Urob iba päť záberov, každý s iným gestom alebo krokom.'},
  en:{title:'People in the city',subtitle:'People, movement and everyday urban moments.',when:'For street photography and a person within an urban setting. Around 24 mm shows both the person and their context.',start:'Use Av, 24 mm, around f/4 and Auto ISO. For walking, keep the shutter speed near 1/250 s or faster.',watch:'Find a clean scene and good light first. Then wait for the right person to enter the frame.',task:'Choose one location and stay for ten minutes. Make only five shots, each with a different gesture or step.'}
 },
 reportage:{
  sk:{title:'Reportáž',subtitle:'Rozprávaj príbeh celkom, človekom a detailom.',when:'Keď chceš rozprávať príbeh výletu, trhu, podujatia alebo bežného dňa, nie iba vytvoriť jeden pekný obraz.',start:'Začni celkom, potom pridaj situáciu, človeka, detail a záver. Techniku drž jednoduchú, aby si nestratil moment.',watch:'Vzťahy medzi ľuďmi a drobné detaily, ktoré vysvetľujú miesto. Rešpektuj odmietnutie a citlivé situácie.',task:'Vytvor uzavretý príbeh presne v piatich rozdielnych záberoch bez dvoch takmer rovnakých fotografií.'},
  en:{title:'Reportage',subtitle:'Tell a story through place, people and detail.',when:'Use it to tell the story of a trip, market, event or ordinary day rather than making only one attractive image.',start:'Begin with a wide shot, then add the situation, person, detail and ending. Keep the technique simple.',watch:'Relationships between people and small details that explain the place. Respect refusal and sensitive situations.',task:'Create a complete story in exactly five different photographs, with no two near-duplicates.'}
 },
 portrait:{
  sk:{title:'Portrét',subtitle:'Oko, prirodzené svetlo a pokojné pozadie.',when:'Pre jedného človeka, pokojnejší moment a prirodzenejšiu perspektívu. Objektív 40 mm je vhodný najmä na polpostavu.',start:'Av, f/2.8 až f/4, jeden AF bod na bližšie oko. Človeka oddeľ od pozadia niekoľkými metrami.',watch:'Odlesk svetla v očiach, čisté pozadie a pohodlný výraz. Nechoď k tvári príliš blízko.',task:'Urob tri portréty pri okne: spredu, z boku a s tvárou mierne otočenou k svetlu. Porovnaj tiene.'},
  en:{title:'Portrait',subtitle:'The eye, natural light and a quiet background.',when:'For one person, a quieter moment and a natural perspective. The 40 mm lens works especially well for half-body portraits.',start:'Use Av, f/2.8–f/4 and one AF point on the nearer eye. Keep several metres between the person and background.',watch:'Catchlight in the eyes, a clean background and a relaxed expression. Do not move too close to the face.',task:'Make three window-light portraits: frontal, side-on and with the face turned slightly toward the light.'}
 },
 landscape:{
  sk:{title:'Krajina',subtitle:'Popredie, stred, pozadie a práca so svetlom.',when:'Keď chceš zachytiť priestor a vzťah medzi popredím, hlavným motívom a horizontom — nielen široký výhľad.',start:'Av, f/8, ISO 100 a ohnisko 18–35 mm. Z ruky kontroluj čas, na statíve použi dvojsekundovú samospúšť.',watch:'Vrstvy obrazu, smer prirodzených línií a prepaly v oblohe. Neostri automaticky iba na horizont.',task:'Na jednom mieste vytvor široký záber, stredný záber a detail. Vyber ten, ktorý najlepšie opisuje priestor.'},
  en:{title:'Landscape',subtitle:'Foreground, middle ground, background and light.',when:'Use it to show space and the relationship between foreground, main subject and horizon—not merely a wide view.',start:'Use Av, f/8, ISO 100 and 18–35 mm. Watch shutter speed handheld; on a tripod use the two-second timer.',watch:'Layers, the direction of natural lines and clipped highlights in the sky. Do not focus automatically on the horizon.',task:'At one place, make a wide shot, medium shot and detail. Choose the frame that best describes the space.'}
 },
 architecture:{
  sk:{title:'Architektúra',subtitle:'Perspektíva, rovné línie, rytmus a detaily.',when:'Na celé budovy, fasády, interiéry aj geometrické detaily. Ohnisko vyber podľa toho, či ukazuješ priestor alebo tvar.',start:'Av, f/5.6 až f/8, ISO 100. Fotoaparát drž čo najrovnejšie; ak môžeš, radšej ustúp a neskôr orež.',watch:'Zbiehajúce sa zvislice, rohy záberu, opakujúce sa tvary a smer svetla na povrchu budovy.',task:'Odfoť jednu budovu tromi spôsobmi: celok na 18 mm, prirodzený pohľad okolo 24–35 mm a detail na 40–55 mm.'},
  en:{title:'Architecture',subtitle:'Perspective, straight lines, rhythm and detail.',when:'For whole buildings, façades, interiors and geometric details. Choose focal length according to space or shape.',start:'Use Av, f/5.6–f/8 and ISO 100. Keep the camera level; when possible, step back and crop later.',watch:'Converging verticals, frame corners, repeating shapes and the direction of light across the building.',task:'Photograph one building three ways: full view at 18 mm, natural view at 24–35 mm and detail at 40–55 mm.'}
 }
};

const ui={
 sk:{brand:'Fotografický zápisník',brandSub:'7 praktických ťahákov',nav:['Domov','Ťaháky','Ako sa učiť'],eyebrow:'Canon EOS 100D · praktická príručka',headline:'Menej tápať.<br><em>Viac fotografovať.</em>',intro:'Sedem ťahákov, ktoré ti pomôžu rýchlejšie pochopiť fotoaparát, lepšie vidieť svet a fotografovať s väčšou istotou.',filters:['Všetko','Situácie','Základy'],chapterHead:'Obsah zápisníka',chapters:'7 kapitol',methodLabel:'Spôsob práce',methodTitle:'Ťahák nie je recept.<br>Je to štartovací bod.',steps:[['Pred fotením','Priprav sa, skontroluj nastavenia a pomenuj, čo chceš povedať.'],['V teréne','Používaj jeden ťahák, všímaj si svetlo a hľadaj lepšie uhly.'],['Po návrate','Vyber, uprav a pri každom zábere pomenuj, prečo funguje alebo nie.']],section:'Obsah zápisníka · 7 kapitol',open:'Otvorený ťahák',download:'Stiahnuť',prev:'← Predošlý',next:'Ďalší →',context:['Kedy ho použiť','Začni takto','Sleduj najmä','Úloha do terénu'],footer:'Malý fotoaparát. Veľké možnosti.',count:n=>`${n} ${n===1?'ťahák':'ťahákov'}`},
 en:{brand:'Photography field notes',brandSub:'7 practical cheat sheets',nav:['Home','Guides','How to learn'],eyebrow:'Canon EOS 100D · practical guide',headline:'Less guessing.<br><em>More photography.</em>',intro:'Seven visual guides to help you understand your camera faster, see light more clearly and photograph with greater confidence.',filters:['All','Situations','Foundations'],chapterHead:'Field notes index',chapters:'7 chapters',methodLabel:'Working method',methodTitle:'A guide is not a recipe.<br>It is a starting point.',steps:[['Before shooting','Prepare, check your settings and decide what you want the photograph to say.'],['In the field','Use one guide, observe the light and keep looking for a better angle.'],['Afterwards','Select, edit and name the specific reason why each photograph works—or does not.']],section:'Field notes · 7 chapters',open:'Open guide',download:'Download',prev:'← Previous',next:'Next →',context:['When to use it','Start here','Watch especially','Field exercise'],footer:'Small camera. Big possibilities.',count:n=>`${n} ${n===1?'guide':'guides'}`}
};

function applyLanguage(language){
 currentLanguage=language;
 const t=ui[language];
 document.documentElement.lang=language;
 localStorage.setItem('photo-guide-language',language);
 languageButton.textContent=language==='sk'?'EN':'SK';
 languageButton.setAttribute('aria-label',language==='sk'?'Switch to English':'Prepnúť do slovenčiny');
 document.querySelector('.brand strong').textContent=t.brand;
 document.querySelector('.brand small').textContent=t.brandSub;
 [...document.querySelectorAll('.main-nav a')].forEach((el,i)=>el.textContent=t.nav[i]);
 document.querySelector('.hero .eyebrow').textContent=t.eyebrow;
 document.querySelector('.hero h1').innerHTML=t.headline;
 document.querySelector('.hero-copy>p:not(.eyebrow)').textContent=t.intro;
 [...document.querySelectorAll('.filter')].forEach((el,i)=>el.textContent=t.filters[i]);
 document.querySelector('.chapter-head span').textContent=t.chapterHead;
 document.querySelector('.chapter-head b').textContent=t.chapters;
 document.querySelector('.method-title>p').textContent=t.methodLabel;
 document.querySelector('.method h2').innerHTML=t.methodTitle;
 [...document.querySelectorAll('.method-steps article')].forEach((el,i)=>{el.querySelector('h3').textContent=t.steps[i][0];el.querySelector('p').textContent=t.steps[i][1]});
 document.querySelector('.section-band strong').textContent=t.section;
 document.querySelector('.viewer-bar>div:first-child span').textContent=t.open;
 downloadLink.textContent=t.download;
 document.querySelector('#prevGuide').textContent=t.prev;
 document.querySelector('#nextGuide').textContent=t.next;
 [...document.querySelectorAll('.viewer-context>div>span')].forEach((el,i)=>el.textContent=t.context[i]);
 document.querySelector('footer>span:nth-child(2)').textContent=t.footer;
 guides.forEach((guide,i)=>{
  const item=meta[guide.dataset.key][language];
  const image=guide.dataset[language+'Image'];
  guide.dataset.title=item.title;guide.dataset.image=image;
  guide.querySelector('.guide-copy strong').textContent=item.title;
  guide.querySelector('.guide-copy small').textContent=item.subtitle;
  guide.querySelector('.guide-preview img').src=image;
  document.querySelectorAll('.chapter-index strong')[i].textContent=item.title;
 });
 document.querySelector('#counter').textContent=t.count(guides.filter(g=>!g.hidden).length);
 if(viewer.open)showGuide(currentIndex);
}

function showGuide(index){
 currentIndex=(index+guides.length)%guides.length;
 const guide=guides[currentIndex];
 const item=meta[guide.dataset.key][currentLanguage];
 const image=guide.dataset.image;
 viewerTitle.textContent=item.title;
 viewerImage.src=image;
 viewerImage.alt=`${currentLanguage==='sk'?'Fotografický ťahák':'Photography guide'}: ${item.title}`;
 viewerPosition.textContent=`${currentIndex+1} / ${guides.length}`;
 downloadLink.href=image;
 downloadLink.download=`${guide.dataset.key}-${currentLanguage}.jpg`;
 document.querySelector('#contextWhen').textContent=item.when;
 document.querySelector('#contextStart').textContent=item.start;
 document.querySelector('#contextWatch').textContent=item.watch;
 document.querySelector('#contextTask').textContent=item.task;
 if(!viewer.open)viewer.showModal();
 document.querySelector('.viewer-stage').scrollTop=0;
}

guides.forEach((guide,index)=>guide.querySelector('.guide-open').addEventListener('click',()=>showGuide(index)));
document.querySelector('#closeViewer').addEventListener('click',()=>viewer.close());
document.querySelector('#prevGuide').addEventListener('click',()=>showGuide(currentIndex-1));
document.querySelector('#nextGuide').addEventListener('click',()=>showGuide(currentIndex+1));
viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close()});
document.addEventListener('keydown',event=>{if(!viewer.open)return;if(event.key==='ArrowLeft')showGuide(currentIndex-1);if(event.key==='ArrowRight')showGuide(currentIndex+1)});
languageButton.addEventListener('click',()=>applyLanguage(currentLanguage==='sk'?'en':'sk'));

document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('.filter').forEach(item=>{item.classList.remove('active');item.setAttribute('aria-pressed','false')});
 button.classList.add('active');button.setAttribute('aria-pressed','true');
 const filter=button.dataset.filter;let visible=0;
 guides.forEach(guide=>{guide.hidden=filter!=='all'&&guide.dataset.category!==filter;if(!guide.hidden)visible++});
 document.querySelector('#counter').textContent=ui[currentLanguage].count(visible);
}));

const themeButton=document.querySelector('#themeButton');
if(localStorage.getItem('photo-guide-theme')==='dark')document.body.classList.add('light');
themeButton.addEventListener('click',()=>{document.body.classList.toggle('light');localStorage.setItem('photo-guide-theme',document.body.classList.contains('light')?'dark':'light')});

const chapterLinks=[...document.querySelectorAll('.chapter-index a')];
const chapterObserver=new IntersectionObserver(entries=>{const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!visible)return;chapterLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${visible.target.id}`))},{rootMargin:'-20% 0px -65% 0px',threshold:[0,.15,.35]});
guides.forEach(guide=>chapterObserver.observe(guide));
applyLanguage(currentLanguage);

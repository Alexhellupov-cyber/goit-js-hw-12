/* empty css                      */import{S as m,i as c,a as h}from"./assets/vendor-DEenWwFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const y of s.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&o(y)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();function b(a){const r=document.querySelector(".gallery"),t=document.querySelector(".fetchButton");t.style.display="block";const o=a.map(e=>`
        <li class="gallery-item">
            <a class="gallery-link" href="${e.largeImageURL}">
                <img 
                    class="gallery-image" 
                    src="${e.webformatURL}" 
                    alt="${e.tags}" 
                />
            </a>
            <div class="gallery-container">
            <p class="gallery-text">Likes: <span class="gallery-span">${e.likes}</span></p>
            <p class="gallery-text">Views: <span class="gallery-span">${e.views}</span></p>
            <p class="gallery-text">Comments: <span class="gallery-span">${e.comments}</span></p>
            <p class="gallery-text">Downloads: <span class="gallery-span">${e.downloads}</span></p>
            </div>
        </li>
    `).join("");r.insertAdjacentHTML("beforeend",o)}const p=new m(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});p.refresh();const w="47343073-38824ad25c719e3c94b2dfcbe",d=document.querySelector(".button"),L=document.querySelector(".input"),i=document.getElementById("loading"),u=document.querySelector(".gallery"),n=document.querySelector(".fetchButton");let l=1,f=15;d.addEventListener("click",async a=>{a.preventDefault(),d.disabled=!0;let r;try{n.style.display="none",u.innerHTML="",l=1,r=await g()}catch(t){console.log(t)}finally{if(r){const t=Math.ceil(r.totalHits/f);l>=t?n.style.display="none":n.style.display="block"}d.disabled=!1}});n.addEventListener("click",async a=>{a.preventDefault(),n.disabled=!0;try{n.style.display="none",l+=1;const r=await g(),t=Math.ceil(r.totalHits/15);if(l>=t){c.info({title:"Hint",message:"We're sorry, but you've reached the end of search results."}),n.style.display="none";return}const o=u.firstElementChild;if(o){const{height:e}=o.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}}catch(r){console.log(r)}finally{n.disabled=!1}});async function g(){const a=L.value.trim();if(!a){c.warning({title:"Hint",message:"Try to enter something into the input..."});return}const r=new URLSearchParams({key:w,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:l,per_page:f});try{i.style.display="block";const{data:t}=await h.get(`https://pixabay.com/api/?${r}`);if(t.hits.length===0){i.style.display="none",c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}return i.style.display="none",b(t.hits),p.refresh(),t}catch(t){i.style.display="none",c.error({title:"Error",message:`Something went wrong: ${t.message}`}),console.error("Fetch error:",t);return}}
//# sourceMappingURL=index.js.map

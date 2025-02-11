import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";
import { renderImages } from './render-functions';
import lightbox from "../main";
import axios from 'axios';


const API_KEY = "47343073-38824ad25c719e3c94b2dfcbe";
const btn = document.querySelector(".button");
const inp = document.querySelector(".input");
const loadingElement = document.getElementById("loading");
const gallery = document.querySelector(".gallery");
const fetchBtn = document.querySelector(".fetchButton")

let page = 1
let perPage = 15;
btn.addEventListener("click", async (e) => {
    e.preventDefault();
    btn.disabled = true;
    let posts
    try {
        fetchBtn.style.display = "none"
        gallery.innerHTML = "";
        page = 1;
        posts = await fetchPosts();
        
    } catch (error) {
        console.log(error);
    }
    finally {
        if (posts) {
            const maxPage = Math.ceil(posts.totalHits / perPage);
            if (page >= maxPage) {
                fetchBtn.style.display = "none";
            } else {
                fetchBtn.style.display = "block";
            }
        }
        btn.disabled = false;
    }

    });
fetchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    fetchBtn.disabled = true;
    try {
        fetchBtn.style.display = "none"
        page += 1
        const posts = await fetchPosts();
        const maxPage = Math.ceil(posts.totalHits / 15);
        if (page >= maxPage) {
            iziToast.info({
                title: "Hint",
                message: "We're sorry, but you've reached the end of search results.",
                
        
            });
            fetchBtn.style.display = "none"
            return
        }
        const firstCard = gallery.firstElementChild;
            if (firstCard) {
                const { height: cardHeight } = firstCard.getBoundingClientRect();
                window.scrollBy({
                    top: cardHeight * 2,
                    behavior: 'smooth',
                });
            }
        
    } catch (error) {
        console.log(error);
    } finally {
        fetchBtn.disabled = false;
    }
     });
    
async function fetchPosts() {
    const query = inp.value.trim();
    if (!query) {
        iziToast.warning({
            title: "Hint",
            message: "Try to enter something into the input...",
        });
        return;
    }
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page,
        per_page: perPage,
    });
    try {
        loadingElement.style.display = "block";
        const { data } = await axios.get(`https://pixabay.com/api/?${searchParams}`);
        if (data.hits.length === 0) {
            loadingElement.style.display = "none"
            iziToast.error({
                title: "Error",
                message: "Sorry, there are no images matching your search query. Please try again!",
            });
            
            return;
        }

        loadingElement.style.display = "none";
        renderImages(data.hits); 
        lightbox.refresh();
        return data;
        
    } catch (error) {
        loadingElement.style.display = "none";
        iziToast.error({
            title: "Error",
            message: `Something went wrong: ${error.message}`,
        });
        console.error("Fetch error:", error);
        return;
    }
}

 
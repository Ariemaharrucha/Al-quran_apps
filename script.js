const surahCotainer = document.querySelector('.container-surah'); 
const descandingBtn = document.querySelector('.Descending');
const ascendingBtn = document.querySelector('.Ascending');
const  btnScrollTop = document.querySelector('.btnScrollTop');
const  btnScrollBottom = document.querySelector('.btnScrollBottom');
const btnScrolltopAyat = document.querySelector('.btnScrolltopAyat')
const btnScrollBottomAyat = document.querySelector('.btnScrollBottomAyat');
const modalBody = document.querySelector('.modal-body');

let terjemahan = false;
let transileterasi = false;

    document.addEventListener('DOMContentLoaded', async function(){
        
            const surah = await fetchSurah();
            updateUIsurah(surah);
        

        descandingBtn.addEventListener('click',async function(){
            try {
                const surah = await fetchSurah();
                descanding(surah);
            } catch (error) {
                console.error('Error fetching surah:', error.message);
                alert('Failed to fetch surah data. Please try again later.');
            }
        });
        
        ascendingBtn.addEventListener('click',async function(){
            try {
                const surah = await fetchSurah();
                updateUIsurah(surah);
            } catch (error) {
                console.error('Error fetching surah:', error.message);
                alert('Failed to fetch surah data. Please try again later.');
            }
        });

        window.onscroll = function(){scrollFuction()};
        modalBody.onscroll = function() {scrollFuction()}

        btnScrollTop.addEventListener('click',function(){
            topFunction();
        });

        btnScrollBottom.addEventListener('click',function(){
            bottomFunction();
        })

        btnScrolltopAyat.addEventListener('click',function(){
            topFuncAyat();
        })

        btnScrollBottomAyat.addEventListener('click',function(){
            bottomFuncAyat();
        })
    })

    document.addEventListener('click', async function (e) {

        const dataSet_surah = e.target.closest('.surah');
        const terjemahanToggle = e.target.closest('.terjemahanBtn');
        const transileterasiToggle = e.target.closest('.transileterasiBtn');
        const copyBtn = e.target.closest('.copy-btn')    
        
        if(dataSet_surah) {
            // console.log(dataSet_surah.dataset.nomer);
            console.log(dataSet_surah.dataset.audio);
            const audio_surah = dataSet_surah.dataset.audio; 
            const nomerSurah = dataSet_surah.dataset.nomer;
            
            const ayat = await fetchAyatQuran(nomerSurah);           
            updateUIayat(ayat,audio_surah);
        }

        if(terjemahanToggle) {
            const translateIcon = document.getElementById('translateIcon');
            const terjemahanSurah = document.querySelectorAll('.terjemahan')
            if(!terjemahan) {
                translateIcon.classList.remove('bi-toggle-on');
                translateIcon.classList.add('bi-toggle-off');
                terjemahanSurah.forEach((e)=>{
                    e.setAttribute('style', 'display:none')
                })
                // terjemahanSurah.style.display='none'
                terjemahan = true;
                
                } else {
                    translateIcon.classList.remove('bi-toggle-off');
                    translateIcon.classList.add('bi-toggle-on');
                    terjemahanSurah.forEach((e)=>{
                        e.setAttribute('style', 'display:block')
                    })
                terjemahan = false;
            }
        }

        if(transileterasiToggle) {
            const transileterasiIcon = document.getElementById('transileterasiIcon');
            const transileterasiSurah = document.querySelectorAll('.transileterasi');
            if(!transileterasi) {
                transileterasiIcon.classList.remove('bi-toggle-on');
                transileterasiIcon.classList.add('bi-toggle-off');
                transileterasiSurah.forEach((e)=>{
                    e.setAttribute('style', 'display:none')
                })
                // transileterasiSurah.style.display='none'
                transileterasi = true;
                
                } else {
                    transileterasiIcon.classList.remove('bi-toggle-off');
                    transileterasiIcon.classList.add('bi-toggle-on');
                    transileterasiSurah.forEach((e)=>{
                        e.setAttribute('style', 'display:block')
                    })
                transileterasi = false;
            }
        }

        if(copyBtn) {         
            const text = copyBtn.dataset.text
            console.log(text);
            copyText(text);         
        }
        
    });

    function fetchSurah () {
        return fetch(`https://al-quran-8d642.firebaseio.com/data.json?print=pretty`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .catch((err) => {
            console.error('Fetch surah error:', err.message);
            throw new Error('Failed to fetch surah data.');
        });
    }

    function fetchAyatQuran(nomer) {
        return fetch(`https://al-quran-8d642.firebaseio.com/surat/${nomer}.json?print=pretty`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .catch((err) => {
            console.error('Fetch ayat error:', err.message);
            throw new Error('Failed to fetch ayat data.');
        });
    }

    function updateUIsurah(result) {
        const surah = result;
            let card = '';
            surah.forEach(s => {
                card += showSurah(s);
            });
            surahCotainer.innerHTML = card;
            // lastSurahState= card;
    }
   
    function updateUIayat(ayatSurah,audio) {
        const headerSurah = document.querySelector('.play-btn');
        const ayat_Surah = document.querySelector('.ayatSurah');
        headerSurah.innerHTML = btnPlay(audio);
        let card = " "
        ayatSurah.forEach((a) => {
            card += showAyat(a,audio)
        }) 
        ayat_Surah.innerHTML = card;                      
    }

    function showSurah (surah) {
        //v2
        return `<div class="col-sm-4 mb-2 mt-4"> 
        <div class="card surah  p-3 " type="button" data-nomer="${surah.nomor}" data-audio="${surah.audio}" data-bs-toggle="modal" href="#ToggleSurah"  >
          
          <div class="row justify-content-between " >                        
              <div class=" col-10 d-flex align-items-center ">
                <div class="border-surah">
                  <img src="Assets/images/border-ayat.png" alt="" style="width: 44px;">
                  <div class="nomor-surah">${surah.nomor}</div>
                </div>              
                  <div class="ms-2">
                    <div class="nama-surah fw-semibold">${surah.nama} (${surah.ayat})</div>
                    <div><small class="text-muted arti-surah">${surah.arti}</small></div> 
                  </div>                                                    
              </div>                                   
          </div>

          <div class="asma-surah ">
            <div class="position-absolute top-0 end-0 mt-3 me-2 text-end">
            <span class="fw-bold">${surah.asma}</span> <br> <span class="text-muted">${surah.type  }</span>
            </div>
          </div>

        </div> 
    </div>`;
    }
  
    function btnPlay(audio) {                
        return `<div class="col">
        <audio controls ">
        <source src="${audio}" type="audio/mpeg">
      </audio> 
      </div>

      <div class="col ">
      <div class="dropdown ">      
      <button class="btn  dropdown-toggle btn-detail border border-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Lihat detail
        </button>
         <ul class="dropdown-menu ">

            <li class="d-flex align-items-center justify-content-between mx-2"> 
                <small class="font-monospace fs-6" >Transileterasi</small>
                <span class="transileterasiBtn ms-2" type="button"><i class="bi bi-toggle-on fs-3 " id="transileterasiIcon"></i></span>
            </li> 
            <li class="d-flex align-items-center justify-content-between mx-2"> 
                <small class="fs-6 " >terjemahan</small>
                <span class="terjemahanBtn" type="button"><i class="bi bi-toggle-on fs-3" id="translateIcon"></i></span>
            </li>           
            </ul>
        </div>
    </div>`;
    }

    function showAyat(ayat,audio) {      
        
        const surah_ayat = `<div class="col-12 wraperAlert">
        <div class="card mb-4 mx-2" >
          <div class="card-body row justify-content-between align-items-center box-ayat" >
            <div class="col fs-4 fw-semibold d-flex justify-content-between ">
                <div class="border-surah">
                    <img src="Assets/images/border-ayat.png" alt="" style="width: 44px;">
                    <div class="nomor-surah fs-6">${ayat.nomor}</div>
                </div>
                               
                <div class="btn-group " role="group" aria-label="Basic example">

                  <button type="button" class="btn border border-0 copy-btn" data-text="${ayat.ar}  ${ayat.id}""> <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16" style="color: green;">
                    <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                  </svg></button>
                </div>
            </div>            
            <div class="col card-body  p-2 text-end  "  >
                <div class="card  p-3 text-end ">  
                <p class="card-text fs-3">${ayat.ar}</p>                             
                </div>                
            </div>
            <div class="col p-2 card-body " style="margin:0 10px" ;>
            <p class="card-text font-monospace  fs-5 transileterasi">${ayat.tr}</p>
                    <p class="card-text terjemahan fw-semibold">${ayat.id}.</p>           
                </div>
          </div>                   
        </div>
      </div>`
        return surah_ayat

    }

    function descanding(surah) {
        const arrSurah = []
            surah.forEach(e=>{
                arrSurah.push(e);
            })
            // console.log(arrSurah.length);
            // for (let i = 0; i < surah.length; i++) {
            //     const element = surah[i];
            //     // console.log(surah.reverse());                               
            // }
            arrSurah.sort()
            arrSurah.reverse()
            updateUIsurah(arrSurah)
    }

    async function copyText(text) {
        const alert = document.querySelector('.wraperAlert');
        try {
            const alertMessage = document.createElement('div');
            alertMessage.innerHTML = "Succes copy text"
            alertMessage.setAttribute("class","alert alert-success position-absolute top-0 start-50 translate-middle mt-5 ","role","alert","syle","");
            alert.appendChild(alertMessage);
            
            setTimeout(() => {
                alert.removeChild(alertMessage)
            }, 1000);

            const textCopy = await navigator.clipboard.writeText(text);           
            return textCopy;

        } catch (err) {
            console.error('Failed to copy: ', err);
        }

    }
    
    function scrollFuction() {
        if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            btnScrollTop.style.display = 'block';
            // btnScrolltopAyat.style.display = 'block';
        } else {
            btnScrollTop.style.display = 'none';
        };

        if(modalBody.scrollTop > 20 ) {
            btnScrolltopAyat.style.display = 'block';
        } else {
            btnScrolltopAyat.style.display = 'none'
        }
    }

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }

    function bottomFunction() {
        document.body.scrollTo(0,100000);
        document.documentElement.scrollTo(0,100000);
      }

    function bottomFuncAyat(){
        modalBody.scrollTo({
            top: 1000000,
            left: 0,
            behavior: "smooth",
        });
      }

    function topFuncAyat(){
        modalBody.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }
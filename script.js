const surahCotainer = document.querySelector('.container-surah');

    document.addEventListener('DOMContentLoaded', async function(){
        const surah = await fetchSurah();
        updateUIsurah(surah);
    })

    document.addEventListener('click', async function (e) {
        const dataSet_surah = e.target.closest('.surah')
        if(dataSet_surah) {
            console.log(dataSet_surah.dataset.nomer);
            console.log(dataSet_surah.dataset.audio);
            const ayat = await fetchAyatQuran(dataSet_surah.dataset.nomer);
            const audio_surah = dataSet_surah.dataset.audio; 
            updateUIayat(ayat,audio_surah)
        }

        const playBtn= e.target.closest('.play-audio')
        if(playBtn) {
            const audioURL = playBtn.dataset.audiosurah;
            console.log(audioURL);
            const playAudio = new Audio(audioURL)

            playAudio.play()
        }
    });



    function fetchSurah () {
      return fetch(`https://al-quran-8d642.firebaseio.com/data.json?print=pretty`)
        .then(response => response.json())
        .then(result => result)
        .catch(err => console.log(err));
    }

    function fetchAyatQuran(nomer) {
        return fetch(`https://al-quran-8d642.firebaseio.com/surat/${nomer}.json?print=pretty`)
        .then(response => response.json())
        .then(result => result)
        .catch(err => console.log(err))
    }


    function updateUIsurah(result) {
        const surah = result;
            let card = '';
            surah.forEach(s => {
                card += showSurah(s);
            });
            surahCotainer.innerHTML = card;
    }

    function updateUIayat(ayatSurah,audio) {
        let card = " "
        ayatSurah.forEach((a) => {
            card += showAyat(a,audio)
        })        
        surahCotainer.innerHTML = card;  
    }

    function showSurah (surah) {
        //v2
        return `<div class="col-sm-4 mb-4"> 
        <div class="card surah btn p-3" type="button" data-nomer=${surah.nomor} data-audio=${surah.audio} style=" " >
              <div class="row justify-content-between " >                        
                  <div class=" col d-flex align-items-center">
                      <strong class="nomer-surah ">${surah.nomor}</strong>
                      <div class="ms-3">
                          <div class="card-title nama-surah fw-semibold ">${surah.nama}</div>           
                          <span class="card-subtitle type-surah text-muted ">${surah.type} <small class="text-muted jumlah-ayat">ayat ${surah.ayat}</small></span>
                      </div>
                                                
                  </div>
                  
                   <div class="col text-end">
                          <div class="card-text asma-surah"> "${surah.asma}"</di>
                          <div><small class="text-muted arti-surah">( ${surah.arti} )</small> </div> 
                  </div> 
  
              </div> 
          </div> 
      </div>
          </div> `
      }
  

    function showAyat(ayat,audio) {      
        return `<div class="col-12 mb-4">
        <div class="card" >
          <div class="card-body row justify-content-between align-items-center">
            <div class="col fs-4 fw-semibold d-flex justify-content-between">
                <div>${ayat.nomor}</div>
                               
                <div class="btn-group " role="group" aria-label="Basic example">

                  <button type="button" class="btn border border-0 play-audio" data-audiosurah=${audio}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16" style="color: green;">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
                  </svg></button>

                  <button type="button" class="btn border border-0" ><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16" style="color: green;">
                    <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                  </svg></button>

                </div>

            </div>
            
            <div class="col card-body  p-2 text-end  "  >
                <div class="card  p-3 text-end ">  
                <p class="card-text fs-2">${ayat.ar}</p>                             
                </div>                
            </div>

          </div>
          
          <div class="card-body">
            <p class="card-text font-monospace  fs-5 huruf-latin">${ayat.tr}</p>
            <p class="card-text terjemahan fw-semibold">${ayat.id}.</p>
            
          </div>
        </div>
      </div>`
    }


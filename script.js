const surahCotainer = document.querySelector('.container-surah');

const apiUrl = ``;


fetch(`https://al-quran-8d642.firebaseio.com/data.json?print=pretty`)
    .then(response => response.json())
    .then(ressult => {
        const surah = ressult
        let card = ' '
        surah.forEach(s => {
            card += showSurah(s)
        });

        surahCotainer.innerHTML = card
    })
    .catch(err=> console.log(err))


    function showSurah (surah) {
        return `<div class="col-sm-4 mb-4">
        <div class="card">
          <div class="card-body">
              <div class="d-flex justify-content-between">
                  <div class=" d-flex gap-3 align-items-center">
                      <h4 class="nomer-surah ">${surah.nomor}</h4>
                      <div>
                          <h5 class="card-title nama-surah fw-semibold">${surah.nama}</h5>           
                          <p class="card-subtitle type-surah text-muted ">${surah.type} <small class="text-muted jumlah-ayat">${surah.ayat}</small></p>
                      </div>                          
                  </div>
                  
                  <div class="">
                        <div class="card-text asma-surah text-end"> "${surah.asma}"</div>
                        <div><small class="text-muted arti-surah">( ${surah.arti} )</small> </div> 
                  </div>

              </div>

          </div>
        </div>
      </div>`
    }
const surahCotainer = document.querySelector('.container-surah');
const apiUrl = ``;


    fetchSurah();



    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('surah')) {
            alert("adsad");
        }
    });



    function fetchSurah () {
        fetch(`https://al-quran-8d642.firebaseio.com/data.json?print=pretty`)
        .then(response => response.json())
        .then(result => {
            const surah = result;
            let card = '';
            surah.forEach(s => {
                card += showSurah(s);
            });
            surahCotainer.innerHTML = card;
        })
        .catch(err => console.log(err));
    }

    function showSurah (surah) {
        return `<div class="col-sm-4 mb-4  ">
        <div class="card surah btn">
          <div class="card-body ">
              <div class="d-flex justify-content-between">
                  <div class=" d-flex gap-3 align-items-center">
                      <h4 class="nomer-surah ">${surah.nomor}</h4>
                      <div>
                          <h5 class="card-title nama-surah fw-semibold">${surah.nama}</h5>           
                          <p class="card-subtitle type-surah text-muted ">${surah.type} <small class="text-muted jumlah-ayat">${surah.ayat}</small></p>
                      </div>                          
                  </div>
                  
                  <div class="d">
                        <h5 class="card-text asma-surah text-end"> "${surah.asma}"</h5>
                        <p><small class="text-muted arti-surah">( ${surah.arti} )</small> </p> 
                  </div>

              </div>

          </div>
        </div>
      </div>`
    }
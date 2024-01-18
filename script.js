const surahCotainer = document.querySelector('.container-surah');
// const btnSurah = document.querySelectorAll('.surah')
const apiUrl = ``;


    fetchSurah();


    document.addEventListener('click', function (e) {
        // console.log(e.target);
        // if (e.target.dataset.test = 'test') {
        //     console.log(e.target);
        // }
        
        if(e.target.id === 'surah') {
            // console.log(e.target.dataset.nomerSurah);
            console.log(e.target.dataset.nomerSurah);
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

            // for (let i = 0; i< 5; i++) {
            //     card += showSurah(surah[i])
            //     console.log(surah[i]);
            // }
            surahCotainer.innerHTML = card;
        })
        .catch(err => console.log(err));
    }

    function fetchAyatQuran(nomer) {

    }

    function showSurah (surah) {
        /*return `<div class="col-sm-4 mb-4  ">
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
      </div>`*/

      //v2
      return `<div class="col-sm-4 mb-4" id="surah" data-nomerSurah="${surah.nomor}"> 
      <div class="card btn p-3" >
            <div class="row justify-content-between " >                        
                <div class=" col d-flex align-items-center">
                    <h4 class="nomer-surah ">${surah.nomor}</h4>
                    <div class="ms-3">
                        <h5 class="card-title nama-surah fw-semibold">${surah.nama}</h5>           
                        <p class="card-subtitle type-surah text-muted ">${surah.type} <small class="text-muted jumlah-ayat">ayat ${surah.ayat}</small></p>
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
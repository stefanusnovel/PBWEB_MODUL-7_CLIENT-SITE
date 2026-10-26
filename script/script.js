//Mencari tombol dengan id "btn-tema" dan menyimpannya dalam variabel tombolTema
const tombolTema = document.getElementById("btn-tema");

function muatPreferensiTema(){
    const tema  =localStorage.getItem("tema");
    if(tema  === "dark"){
        document.body.classList.add("dark-mode");
    }
}
//Mendefinisikan fungsi gantiTema yang akan menambahkan atau 
//menghapus kelas "dark-mode" pada elemen body
function gantiTema() {
    document.body.classList.toggle("dark-mode");
    const temaSekarang =  document.body.classList.contains("dark-mode")
    ?   "dark"  : "light";
    localStorage.setItem("tema",temaSekarang);
}

//Menambahkan event listener pada tombolTema yang akan memanggil fungsi gantiTema saat tombol diklik
if (tombolTema) {
    tombolTema.addEventListener("click", gantiTema);
}

//Mendefinisikan array dataPortofolio yang berisi objek-objek portofolio
const dataPortofolio = [
    {
        judul: "Membuat Website Portofolio",
        deskripsi: "Membuat website portofolio menggunakan HTML, CSS, dan JavaScript."
    },
    {
        judul: "Praktikum DOM JS",
        deskripsi: "Membuat website portofolio menggunakan DOM JS."
    }
];

//Mencari elemen dengan class "daftar-portofolio" dan menyimpannya dalam variabel daftarPortofolio
const daftarPortofolio = document.querySelector(".daftar-portofolio");
//Mencari tombol dengan id "btn-tambah" dan menyimpannya dalam variabel tombolTambah
const tombolTambah = document.getElementById("btn-tambah");

//Menyimpan  jumlah like
function  simpanLike(judulArtikel,jumlah){
    const semuaLike  =JSON.parse(localStorage.getItem("semuaLike"))  || {};
    semuaLike[judulArtikel] = jumlah;
    localStorage.setItem("semuaLike",JSON.stringify(semuaLike));
}

//Mendefinisikan fungsi renderItem yang akan membuat elemen artikel untuk setiap item portofolio
function renderItem(data) {
    const artikel = document.createElement("article");
    const judul = document.createElement("h3"); 
    judul.textContent = data.judul;
    const deskripsi = document.createElement("p");
    deskripsi.textContent = data.deskripsi;
    
    //Persiapan Tombol Like 
    const tombolLike = document.createElement("button");
    let jumlahLike = 0;
    tombolLike.textContent = `Like (${jumlahLike})`;
    tombolLike.dataset.like = jumlahLike;

    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";
    
    artikel.appendChild(judul);
    artikel.appendChild(deskripsi);
    artikel.appendChild(tombolLike);
    artikel.appendChild(tombolHapus);
    
    daftarPortofolio.appendChild(artikel);
}

//Jika elemen daftarPortofolio ada, maka setiap item dalam dataPortofolio akan dirender menggunakan fungsi renderItem 
if (daftarPortofolio) {
    dataPortofolio.forEach(renderItem);

    //Efek hover pada artikel portofolio
    daftarPortofolio.addEventListener("mouseover", (e) => {
        const article = e.target.closest("article");
        if (article) article.classList.add("artikel-hover");
    });

    daftarPortofolio.addEventListener("mouseout", (e) => {
        const article = e.target.closest("article");
        if (article) article.classList.remove("artikel-hover");
    });

    //Efek klik pada tombol Like & Hapus
    daftarPortofolio.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            //Tombol hapus
            if (e.target.textContent === "Hapus") {
                e.target.closest("article").remove();
            } 
            //Tombol Like
            else if (e.target.textContent.startsWith("Like")) {
                let jumlah = parseInt(e.target.dataset.like || 0);
                jumlah++;
                e.target.dataset.like = jumlah;
                e.target.textContent = `Like (${jumlah})`;
            }
        }
    });
}

//Jika tombolTambah ada, maka akan ditambahkan event listener yang akan menambahkan item baru ke daftar portofolio saat tombol diklik.  
if (tombolTambah) {
    tombolTambah.addEventListener("click", () => {
        const inputJudul = document.getElementById("input-judul");
        const inputDeskripsi = document.getElementById("input-deskripsi");
        
        //Jika input judul atau deskripsi kosong, maka akan menampilkan alert dan menghentikan eksekusi fungsi.
        if (inputJudul.value.trim() === "" || inputDeskripsi.value.trim() === "") {
            alert("Judul dan deskripsi harus diisi!");
            return;
        }
        const itemBaru = {
            judul: inputJudul.value,
            deskripsi: inputDeskripsi.value
        };
        //Menambahkan item baru ke array dataPortofolio
        dataPortofolio.push(itemBaru);
        renderItem(itemBaru);
        inputJudul.value = "";
        inputDeskripsi.value = "";
    });
}

//Form komentar ,validasi, error di halaman, daan tombol  hapus masing-masing
const formKomentar = document.querySelector("#form-komentar");
const daftarKomentar = document.querySelector("#daftar-komentar");
const errorMessage = document.querySelector("#error-message");
const  inputPesanKomen  = document.querySelector("#input-pesan");

function   simpanKomentar(nama,pesan){
    const daftar =JSON.parse(localStorage.getItem("komentar")) ||[];
    daftar.push({nama,pesan});
    localStorage.setItem("komentar",JSON.stringify(daftar));
}

function muatKomentar(){
    if(!daftarKomentar) return;
    daftarKomentar.innerHTML = "";
    const daftar = JSON.parse(localStorage.getItem("komentar")) ||[];
    
    daftar.forEach((k,index) => {
        const itemKomentar =  document.createElement("li");
        const teksKomentar =  document.createElement("span");
        teksKomentar.textContent  =  '${k.nama}:{k.pesan}';

        const tombolHapusKomen  =  document.createElement("button");
        tombolHapusKomen.textContent =  "Hapus";
        tombolHapusKomen.classList.add =  "btn-hapus";
        tombolHapusKomen.dataset.index = index;;

        itemKomentar.appendChild(teksKomentar);
        itemKomentar.appendChild(tombolHapusKomen);
        daftarKomentar.appendChild(itemKomentar);
    });
}
muatKomentar();

if (formKomentar) {
    formKomentar.addEventListener("submit", (e) => {
        e.preventDefault();
        const nama = document.querySelector("#input-nama").value.trim();
        const pesan = document.querySelector("#input-pesan").value.trim();
        
        //Validasi kosong
        if (nama === "" || pesan === "") {
            errorMessage.textContent = "Nama dan komentar wajib diisi!";
            errorMessage.classList.add("show");
            return;
        }

        //Validasi  minimal 5 Karakter 
        if (pesan.length < 5) {
            errorMessage.textContent = "Komentar terlalu pendek! Minimal 5 karakter.";
            errorMessage.classList.add("show");
            return;
        }

        //Sembunyikan error jika berhasil
        errorMessage.classList.remove("show");

        simpanKomentar(nama,pesan);
        muatKomentar();
        formKomentar.reset();

        sessionStorage.removeItem("draftKomentar");
    });
}

//Event Delegation untuk menghapus komentar satuan
if (daftarKomentar) {
    daftarKomentar.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON" && e.target.classList.contains("btn-hapus")) {
            const daftar =JSON.parse(localStorage.getItem("komentar")) ||[];
            const index = e.target.dataset.index;
            daftar.splice(index,1);
            localStorage.setItem("komentar",JSON.stringify(daftar));
            muatKomentar();;
        }
    });
}

//Tombol hapus semua komenta
const btnHapusSemua = document.getElementById("btn-hapus-semua");
if (btnHapusSemua) {
    btnHapusSemua.addEventListener("click", () => {
        localStorage.removeItem("komentar");
        muatKomentar();
    });
}

//Event scroll untuk tombol "Kembali ke Atas"
const btnKembaliAtas = document.getElementById("btn-kembali-atas");
if (btnKembaliAtas) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            btnKembaliAtas.style.display = "block";
        } else {
            btnKembaliAtas.style.display = "none";
        }
    });

    btnKembaliAtas.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

//Keyboard shortcut dark mode
//Keyboard shortcut dark mode
document.addEventListener("keydown", (e) => {
    //Abaikan jika sedang mengetik di kolom input atau textarea
    const sedangMengetik = ["INPUT", "TEXTAREA"].includes(e.target.tagName);
    if (!sedangMengetik && e.key.toLowerCase() === "d") {
        gantiTema();
    }
});

const  btnReset = document.querySelector("#btn-reset");
if(btnReset){
    btnReset.addEventListener("click",() => {
        const  konfirmasi = confirm("Hapus semua data");
        if(konfirmasi){
            localStorage.clear();
            location.reload();
        }
    });
}

if(inputPesanKomen){
    inputPesanKomen.addEventListener("input",function(){
        sessionStorage.setItem("draftKomentar",this.value);
    });

    const  draft = sessionStorage.getItem("daftarKomentar");
    if(draft){
        inputPesanKomen.value =draft;
    }
}

const btnTampilAside =document.getElementById("btn-tampil-aside");
const sidebar = document.querySelector("aside");

if(btnTampilAside && sidebar){
    const isAsideHidden = localStorage.getItem("asideStatuus") === "true";
    if(isAsideHidden){
        sidebar.style.display =  "none";
    }

    btnTampilAside.addEventListener("click", () => {
        const  isHidden = sidebar.style.display === "none";
        if(isHidden){
            sidebar.style.display = "block";
            localStorage.setItem("asideStatus","false");
        }else{
            sidebar.style.display = "none";
            localStorage.setItem("asideStatus","true");
        }
    });
}
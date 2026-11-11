// Inisialisasi Diagram Mermaid saat pertama kali dibuka
document.addEventListener("DOMContentLoaded", function() {
    mermaid.initialize({ startOnLoad: true, theme: 'dark' });

    // Tambah Event Listener untuk Form Login
    const formLogin = document.getElementById('form-login-app');
    if (formLogin) {
        formLogin.addEventListener('submit', prosesLogin);
    }

    // Tambah Event Listener untuk Input Hitung Sampah
    const inputPlastik = document.getElementById('input-plastik');
    const inputKardus = document.getElementById('input-kardus');
    if (inputPlastik && inputKardus) {
        inputPlastik.addEventListener('input', hitungSetoran);
        inputKardus.addEventListener('input', hitungSetoran);
    }
});

// Fungsi Pindah Tab Navigasi Utama (1..4)
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-emerald-600', 'text-white');
        btn.classList.add('bg-slate-800', 'text-slate-400');
    });

    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.remove('hidden');
    }

    const activeBtn = document.getElementById('btn-' + tabId.replace('tab-', ''));
    if (activeBtn) {
        activeBtn.classList.remove('bg-slate-800', 'text-slate-400');
        activeBtn.classList.add('bg-emerald-600', 'text-white');
    }

    // PAKSA MERMAID RENDERING DIAGRAM SAAT TAB ARSITEKTUR DIKLIK
    if (tabId === 'tab-arsitektur' && typeof mermaid !== 'undefined') {
        setTimeout(() => {
            mermaid.run({ querySelector: '.mermaid' });
        }, 150);
    }
}

// Fungsi Logika Simulasi Login
function prosesLogin(event) {
    event.preventDefault();
    const role = document.getElementById('select-role').value;
    const username = document.getElementById('input-username').value;

    document.querySelectorAll('.ui-page').forEach(el => el.classList.add('hidden'));

    if (role === 'nasabah') {
        document.getElementById('page-nasabah').classList.remove('hidden');
        document.getElementById('nasabah-nama').innerText = "Halo, " + username + "!";
    } else if (role === 'petugas') {
        document.getElementById('page-petugas').classList.remove('hidden');
    } else if (role === 'bendahara') {
        document.getElementById('page-bendahara').classList.remove('hidden');
    } else if (role === 'ketua') {
        document.getElementById('page-ketua').classList.remove('hidden');
    }
}

// Fungsi Logika Keluar (Logout)
function logout() {
    document.querySelectorAll('.ui-page').forEach(el => el.classList.add('hidden'));
    document.getElementById('page-login').classList.remove('hidden');
}

// Logika Perhitungan Otomatis Setoran Sampah (90% Saldo & 10% Kas)
function hitungSetoran() {
    const kgPlastik = parseFloat(document.getElementById('input-plastik').value) || 0;
    const kgKardus = parseFloat(document.getElementById('input-kardus').value) || 0;

    const bruto = (kgPlastik * 2500) + (kgKardus * 1500);
    const kas = bruto * 0.10;
    const netto = bruto * 0.90;

    document.getElementById('txt-bruto').innerText = "Rp " + bruto.toLocaleString('id-ID');
    document.getElementById('txt-kas').innerText = "- Rp " + kas.toLocaleString('id-ID');
    document.getElementById('txt-netto').innerText = "+ Rp " + netto.toLocaleString('id-ID');
}

// Logika Validasi Penarikan Saldo
function prosesPenarikan() {
    const nominal = parseFloat(document.getElementById('input-tarik').value) || 0;
    if (nominal < 50000) {
        alert("Gagal: Aturan Bisnis membatasi Penarikan Minimum Rp 50.000!");
    } else {
        alert("Berhasil: Saldo sebesar Rp " + nominal.toLocaleString('id-ID') + " berhasil dicairkan!");
    }
}

function simpanSetoranAlert() {
    alert("Setoran Berhasil Disimpan ke Database!");
}

// Fungsi Copy Kode SQL Script
function salinSQL() {
    const code = document.getElementById('sqlCode').innerText;
    navigator.clipboard.writeText(code);
    alert('Kode SQL berhasil disalin!');
}

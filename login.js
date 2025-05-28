function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const errorEl = document.getElementById("login-error");

  // Data login statik
  const akun = {
    budi123: "sehat123",
    ibu_ani: "hipertensi",
    pak_rudi: "12345"
  };

  if (akun[user] && akun[user] === pass) {
    // Simpan status login di localStorage
    localStorage.setItem("login", "true");
    window.location.href = "beranda.html";
  } else {
    errorEl.innerText = "Nama pengguna atau kata sandi salah.";
  }
}

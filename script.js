function deteksi() {
  const usia = parseInt(document.getElementById("usia").value);
  const berat = parseFloat(document.getElementById("berat").value);
  const sistolik = parseInt(document.getElementById("sistolik").value);
  const diastolik = parseInt(document.getElementById("diastolik").value);
  const keluarga = document.getElementById("keluarga").value;
  const merokok = document.getElementById("merokok").value;
  const penyakit = document.getElementById("penyakit").value;

  if (
    isNaN(usia) || isNaN(berat) || isNaN(sistolik) || isNaN(diastolik) ||
    keluarga === "" || merokok === "" || penyakit === ""
  ) {
    alert("Mohon isi semua data dengan benar.");
    return;
  }

  let skor = 0;

  if (usia >= 60) skor++;
  if (berat <= 60) skor++;
  if (sistolik >= 140 && diastolik >= 90) skor++;
  if (keluarga === "ya") skor++;
  if (merokok === "ya") skor++;
  if (penyakit === "ya") skor++;

  let risiko = "Rendah";
  if (skor >= 2 && skor <= 3) {
    risiko = "Sedang";
  } else if (skor > 3) {
    risiko = "Tinggi";
  }

  const hasil = `Risiko Hipertensi: ${risiko}`;
  document.getElementById("hasil").innerText = hasil;

  // Simpan hasil & data input di localStorage untuk cetak
  localStorage.setItem("hasilDeteksi", hasil);
  localStorage.setItem(
    "dataInput",
    JSON.stringify({ usia, berat, sistolik, diastolik, keluarga, merokok, penyakit })
  );

  // Tampilkan tombol cetak
  const btnCetak = document.getElementById("btn-cetak");
  if (btnCetak) btnCetak.style.display = "inline-block";
}

function cetakHasil() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const nama = localStorage.getItem("nama") || "Pengguna";
  const hasil = localStorage.getItem("hasilDeteksi") || "Tidak ada hasil";
  const dataInput = JSON.parse(localStorage.getItem("dataInput") || "{}");

  function tampilkanNilai(n) {
    return (n !== undefined && n !== null && n !== "") ? n : "-";
  }

  doc.setFontSize(16);
  doc.text("Laporan Deteksi Risiko Hipertensi", 20, 20);

  doc.setFontSize(12);
  doc.text(`Nama: ${nama}`, 20, 30);
  doc.text(`Usia: ${tampilkanNilai(dataInput.usia)} tahun`, 20, 40);
  doc.text(`Berat Badan: ${tampilkanNilai(dataInput.berat)} kg`, 20, 50);
  doc.text(
    `Tekanan Darah: ${tampilkanNilai(dataInput.sistolik)} / ${tampilkanNilai(dataInput.diastolik)} mmHg`,
    20,
    60
  );
  doc.text(`Riwayat Keluarga: ${tampilkanNilai(dataInput.keluarga)}`, 20, 70);
  doc.text(`Merokok: ${tampilkanNilai(dataInput.merokok)}`, 20, 80);
  doc.text(`Riwayat Penyakit: ${tampilkanNilai(dataInput.penyakit)}`, 20, 90);

  doc.setFontSize(14);
  doc.text(hasil, 20, 110);

  doc.save("hasil_deteksi_hipertensi.pdf");
}

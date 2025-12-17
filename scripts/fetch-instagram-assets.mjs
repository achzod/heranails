import fs from "node:fs";
import path from "node:path";

/**
 * Télécharge des images Instagram (URLs CDN) et les stocke en local dans /public/instagram.
 * NOTE: les URLs Instagram signées expirent; on télécharge donc les fichiers pour les servir localement.
 */

const outDir = path.join(process.cwd(), "public", "instagram");
fs.mkdirSync(outDir, { recursive: true });

// URLs récupérées depuis le profil Instagram (requêtes réseau du navigateur).
// On privilégie les versions p640x640 / s640x640 (pas les thumbnails s150x150).
const urls = [
  "https://instagram.fdxb1-1.fna.fbcdn.net/v/t51.2885-15/500576186_1023205693336755_3559990965420784862_n.jpg?stp=dst-jpg_e15_p640x640_tt6&_nc_ht=instagram.fdxb1-1.fna.fbcdn.net&_nc_cat=103&_nc_oc=Q6cZ2QGNZ_VG3rS_0KNS_Ksh84kvkD2rbDogwttq-DlwKrIRQtBxlae7bUEBwW88nrYm-ntM2SjC6sO8VxW-Q1swKwBM&_nc_ohc=uJry2_HVYyUQ7kNvwHw9f43&_nc_gid=bbdTNwfU60NLImeKYZ358w&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_Afk_0WDbxfFvn1zEbuWnfjJHUcLPseZqOc_fQ4_deXEBUg&oe=69476B34&_nc_sid=8b3546",
  "https://instagram.fdxb1-1.fna.fbcdn.net/v/t51.29350-15/436269660_456833523357907_7136039292753768500_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_ht=instagram.fdxb1-1.fna.fbcdn.net&_nc_cat=107&_nc_oc=Q6cZ2QGNZ_VG3rS_0KNS_Ksh84kvkD2rbDogwttq-DlwKrIRQtBxlae7bUEBwW88nrYm-ntM2SjC6sO8VxW-Q1swKwBM&_nc_ohc=Lf4FOneic4kQ7kNvwHgGTj6&_nc_gid=bbdTNwfU60NLImeKYZ358w&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfmEpejpEmKBWVZYUNOqqGHy9fMdyamg3VSFuHOCxtZK_Q&oe=694762A6&_nc_sid=8b3546",
  "https://instagram.fdxb1-1.fna.fbcdn.net/v/t39.30808-6/467948861_18467584078008513_4651463947701487219_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08_tt6&_nc_ht=instagram.fdxb1-1.fna.fbcdn.net&_nc_cat=109&_nc_oc=Q6cZ2QGNZ_VG3rS_0KNS_Ksh84kvkD2rbDogwttq-DlwKrIRQtBxlae7bUEBwW88nrYm-ntM2SjC6sO8VxW-Q1swKwBM&_nc_ohc=VtB-_4XyF6gQ7kNvwGI-urQ&_nc_gid=bbdTNwfU60NLImeKYZ358w&edm=AOQ1c0wAAAAA&ccb=7-5&oh=00_AfkXThdo6lHulosjzpUjjoYwbyu-9l_CpC5A8kPnJxIkMQ&oe=69477855&_nc_sid=8b3546",
  "https://instagram.fdxb1-1.fna.fbcdn.net/v/t51.2885-15/601410389_18549332932041742_572149670909394783_n.jpg?stp=dst-jpg_e15_p640x640_tt6&_nc_ht=instagram.fdxb1-1.fna.fbcdn.net&_nc_cat=110&_nc_oc=Q6cZ2QGNZ_VG3rS_0KNS_Ksh84kvkD2rbDogwttq-DlwKrIRQtBxlae7bUEBwW88nrYm-ntM2SjC6sO8VxW-Q1swKwBM&_nc_ohc=vXVqNWr579cQ7kNvwH0n7qu&_nc_gid=bbdTNwfU60NLImeKYZ358w&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_Afm80SekYmc3fR5xFv7M26NvTyBxBHUc_8PllfBz5h6FaA&oe=69478015&_nc_sid=8b3546",
  "https://instagram.fdxb1-1.fna.fbcdn.net/v/t51.2885-15/600976904_18549150694041742_1387614328679822156_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_ht=instagram.fdxb1-1.fna.fbcdn.net&_nc_cat=110&_nc_oc=Q6cZ2QGNZ_VG3rS_0KNS_Ksh84kvkD2rbDogwttq-DlwKrIRQtBxlae7bUEBwW88nrYm-ntM2SjC6sO8VxW-Q1swKwBM&_nc_ohc=pGKjHsxovKIQ7kNvwEBJtfH&_nc_gid=bbdTNwfU60NLImeKYZ358w&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AflyNp6A10mZWSggHKETZWAiXwgvU9-PFwrbKf-aaTNkRQ&oe=694769C5&_nc_sid=8b3546",
  "https://instagram.fdxb1-1.fna.fbcdn.net/v/t51.2885-15/588017377_18549013762041742_2360536967252025198_n.jpg?stp=dst-jpg_e15_s640x640_tt6&_nc_ht=instagram.fdxb1-1.fna.fbcdn.net&_nc_cat=110&_nc_oc=Q6cZ2QGNZ_VG3rS_0KNS_Ksh84kvkD2rbDogwttq-DlwKrIRQtBxlae7bUEBwW88nrYm-ntM2SjC6sO8VxW-Q1swKwBM&_nc_ohc=jPvFv51Fl-wQ7kNvwGMH8LS&_nc_gid=bbdTNwfU60NLImeKYZ358w&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfmV60WWLffzSh90eCH_uD9DiKWcw995qn14BQ5duB4tWw&oe=69476F18&_nc_sid=8b3546",
  "https://instagram.fdxb1-1.fna.fbcdn.net/v/t51.2885-15/598579383_18548957191041742_8516793454014082291_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_ht=instagram.fdxb1-1.fna.fbcdn.net&_nc_cat=110&_nc_oc=Q6cZ2QGNZ_VG3rS_0KNS_Ksh84kvkD2rbDogwttq-DlwKrIRQtBxlae7bUEBwW88nrYm-ntM2SjC6sO8VxW-Q1swKwBM&_nc_ohc=rU67oDs0YMcQ7kNvwFX-Xnj&_nc_gid=bbdTNwfU60NLImeKYZ358w&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_Afm8phB4XT0bTR1K9zlSS4S_w9eiN0dbhc4CfYJnGbJJjQ&oe=69476111&_nc_sid=8b3546",
  "https://instagram.fdxb1-1.fna.fbcdn.net/v/t51.2885-15/590412465_18548792143041742_846067478873265890_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08_tt6&_nc_ht=instagram.fdxb1-1.fna.fbcdn.net&_nc_cat=110&_nc_oc=Q6cZ2QGNZ_VG3rS_0KNS_Ksh84kvkD2rbDogwttq-DlwKrIRQtBxlae7bUEBwW88nrYm-ntM2SjC6sO8VxW-Q1swKwBM&_nc_ohc=0-ZV_6swNXgQ7kNvwFzJbd7&_nc_gid=bbdTNwfU60NLImeKYZ358w&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_Afk4hKY7PL8bqXWtd3yGeIh6YvNGfTxqNHt3kfJBh1HP8w&oe=694765F9&_nc_sid=8b3546",
  "https://instagram.fdxb1-1.fna.fbcdn.net/v/t51.2885-15/589736097_787859827643644_6485741434558191854_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=instagram.fdxb1-1.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QGNZ_VG3rS_0KNS_Ksh84kvkD2rbDogwttq-DlwKrIRQtBxlae7bUEBwW88nrYm-ntM2SjC6sO8VxW-Q1swKwBM&_nc_ohc=hqdUVp4Opk4Q7kNvwHQnnY2&_nc_gid=bbdTNwfU60NLImeKYZ358w&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfklN5LwObaLGlgEdV8PmgIy0j698uIsldTSusfCnIcyGQ&oe=69476C35&_nc_sid=8b3546",
  "https://instagram.fdxb1-1.fna.fbcdn.net/v/t51.2885-15/590425389_18548196541041742_578344735450146677_n.jpg?stp=dst-jpg_e15_p640x640_tt6&_nc_ht=instagram.fdxb1-1.fna.fbcdn.net&_nc_cat=110&_nc_oc=Q6cZ2QGNZ_VG3rS_0KNS_Ksh84kvkD2rbDogwttq-DlwKrIRQtBxlae7bUEBwW88nrYm-ntM2SjC6sO8VxW-Q1swKwBM&_nc_ohc=PN7FfPEEe5UQ7kNvwF01KdE&_nc_gid=bbdTNwfU60NLImeKYZ358w&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfnVFDvOF36ohsuHVbW0FbYPaqP5VwrJsXPXAQ_wQGwrZQ&oe=69476EB8&_nc_sid=8b3546",
  "https://instagram.fdxb1-1.fna.fbcdn.net/v/t51.2885-15/591151667_18547839379041742_4718023358082031378_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08_tt6&_nc_ht=instagram.fdxb1-1.fna.fbcdn.net&_nc_cat=110&_nc_oc=Q6cZ2QGNZ_VG3rS_0KNS_Ksh84kvkD2rbDogwttq-DlwKrIRQtBxlae7bUEBwW88nrYm-ntM2SjC6sO8VxW-Q1swKwBM&_nc_ohc=k5YEOcGMuCAQ7kNvwEzT0FP&_nc_gid=bbdTNwfU60NLImeKYZ358w&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_Afl2B4wPiXz4brPB3eyLN9G_ANDBCUIS5kkHfQpiQoUZDA&oe=69477EB3&_nc_sid=8b3546"
];

async function downloadOne(url, index) {
  const file = path.join(outDir, `ig-${String(index + 1).padStart(2, "0")}.jpg`);
  const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(file, buf);
  return file;
}

async function main() {
  console.log(`Downloading ${urls.length} images to ${outDir}`);
  for (let i = 0; i < urls.length; i++) {
    process.stdout.write(`- ${i + 1}/${urls.length} ... `);
    try {
      const file = await downloadOne(urls[i], i);
      console.log(`ok (${path.basename(file)})`);
    } catch (e) {
      console.log("failed");
      console.error(e);
    }
  }

  const manifest = urls.map((_, i) => ({
    id: i + 1,
    src: `/instagram/ig-${String(i + 1).padStart(2, "0")}.jpg`,
    alt: `Nailsby Hera Instagram photo ${i + 1}`
  }));
  fs.mkdirSync(path.join(process.cwd(), "data"), { recursive: true });
  fs.writeFileSync(
    path.join(process.cwd(), "data", "instagram-manifest.json"),
    JSON.stringify(manifest, null, 2)
  );
  console.log("Wrote data/instagram-manifest.json");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});





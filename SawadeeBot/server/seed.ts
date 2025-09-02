import { db } from "./db";
import { learningPacks, packVideos } from "@shared/schema";

const packs = [
  { id: "pack1", title: "Pack 1", order: 1 },
  { id: "pack2", title: "Pack 2", order: 2 },
  { id: "pack3", title: "Pack 3", order: 3 },
  { id: "pack4", title: "Pack 4", order: 4 },
  { id: "pack5", title: "Pack 5", order: 5 },
  { id: "pack6", title: "Pack 6", order: 6 },
  { id: "pack7", title: "Pack 7", order: 7 },
  { id: "pack8", title: "Pack 8", order: 8 },
  { id: "pack9", title: "Pack 9", order: 9 },
  { id: "pack10", title: "Pack 10", order: 10 },
  { id: "pack11", title: "Pack 11", order: 11 },
  { id: "pack12", title: "Pack 12", order: 12 },
  { id: "pack13", title: "Pack 13", order: 13 },
  { id: "pack14", title: "Pack 14", order: 14 },
  { id: "pack15", title: "Pack 15", order: 15 },
];

const videos = [
  // Pack 1
  { packId: "pack1", order: 1, title: "Buzzolute Business Opportunity", youtubeId: "FrhJ2B-r9OQ" },
  { packId: "pack1", order: 2, title: "Rally: คุณวันชัย - คุณดารณี รุ่งภูวภัทร", youtubeId: "2ojVpSuca7Q" },
  { packId: "pack1", order: 3, title: "Question Mark", youtubeId: "3W1LXXC5_Ds" },
  { packId: "pack1", order: 4, title: "EDC Recognition: ชลธีร์ แก้วมณีสกุล-รัตนพร วชิรบัญชร", youtubeId: "oyACCrjoG-s" },
  { packId: "pack1", order: 5, title: "Buzz Global Rally: กัญญ์นลิน ปิยนันทวารินทร์", youtubeId: "EbVwceHxCRc" },
  { packId: "pack1", order: 6, title: "Basic Nutrilite: ปรียาภัทร อุดมนิทัศน์", youtubeId: "tyXUgi12gXI" },
  { packId: "pack1", order: 7, title: "Never Stop Fighting: เชวง คุณชยางกูร-กัญญ์นลิน ปิยนันทวารินทร์", youtubeId: "Ypa_dooGRsg" },
  { packId: "pack1", order: 8, title: "BUZZ BEYOND PROMO", youtubeId: "tzm2ISUWLi0" },

  // Pack 2
  { packId: "pack2", order: 1, title: "Blueprint Part 1: เชวง คุณชยางกูร", youtubeId: "kfZIiZBMLPM" },
  { packId: "pack2", order: 2, title: "Blueprint Part 2: เชวง คุณชยางกูร", youtubeId: "CimEUJ4lu3Q" },
  { packId: "pack2", order: 3, title: "งานที่ชอบกับชีวิตที่ใช่: พิบูลย์ ดิษฐอุดม", youtubeId: "uxZrNH3pYYw" },
  { packId: "pack2", order: 4, title: "Passion Rally: รศ.พญ. ธัญญพัทธ์ เบญจวลีย์มาศ", youtubeId: "YL1N0aj7Rww" },
  { packId: "pack2", order: 5, title: "Rally: พงษ์พันธ์ เพ็ชร์จันทร์ - ยุวธิดา โชยดำ", youtubeId: "yPON3IlOfWQ" },
  { packId: "pack2", order: 6, title: "Buzzolute Global: กัญญ์นลิน ปิยนันทวารินทร์", youtubeId: "8_SBunrW7gA" },
  { packId: "pack2", order: 7, title: "Buzz Global Leaders", youtubeId: "NGUBX7PgHKA" },
  { packId: "pack2", order: 8, title: "เครื่องกรองอากาศ ATMOSPHERE : เอกภพ สัมพันธ์เวชกุล - นนตรา สัมพันธ์เวชกุล", youtubeId: "Xgu0uhSKlO8" },

  // Pack 3
  { packId: "pack3", order: 1, title: "แนวคิดผู้นำ: ภญ.ทิพวรรณ - รศ.นพ.เจริญเกียรติ ฤกษ์เกลี้ยง", youtubeId: "baXLrGLWlVo" },
  { packId: "pack3", order: 2, title: "Be Diamond: เชวง คุณชยางกูร", youtubeId: "DgcydlOd96E" },
  { packId: "pack3", order: 3, title: "BUZZ GLOBAL 2024 : คุณปัญจพล จุรีเกษ และ คุณภารดี ปิยนันทวารินทร์ - Double Diamond", youtubeId: "WG-35lQYhwc" },
  { packId: "pack3", order: 4, title: "Passion Rally: กาญจนา - ธนภัทร กิ่งก้าน(ครูยุ)", youtubeId: "qdmfIowlEKI" },
  { packId: "pack3", order: 5, title: "List รายชื่อ นัดหมาย และการเขียน Business Model: เชวง คุณชยางกูร", youtubeId: "5lojtV_gbr0" },
  { packId: "pack3", order: 6, title: "การเคลียร์ความคิด: ภาคภูมิ นิติธรรม - คริสมาส เสถียรวราภรณ์", youtubeId: "OUNMT1-PFis" },
  { packId: "pack3", order: 7, title: "Good Morning Nutrition - สาโรช, หมอมิลค์, หมอเอิ๊ก", youtubeId: "LvMyj3Da9wA" },
  { packId: "pack3", order: 8, title: "RALLY คุณพงศชา เบ็ญจพรกุลพงศ์ - คุณพิชญา มานะธัญญา Founders Double Diamond", youtubeId: "NP-ay8r2pmQ" },

  // Pack 4
  { packId: "pack4", order: 1, title: "Rally: คุณประภาคาร-คุณจริยา เมืองมั่น _ เพชรคู่", youtubeId: "ADgK_vPiokQ" },
  { packId: "pack4", order: 2, title: "Buzz Beyond TH กฤษดา - อังคณา กรประดิษฐ์ศิลป์ F.EDC", youtubeId: "nMay4DfossU" },
  { packId: "pack4", order: 3, title: "อดีต กรรมกรก่อสร้าง: คำดี ศิริพรพรหม", youtubeId: "Ci8aay25bJk" },
  { packId: "pack4", order: 4, title: "เครื่องกรองน้ำ eSpring หัสนะ เนตรมงคลชัย", youtubeId: "mmMieKvI2mw" },
  { packId: "pack4", order: 5, title: "การทำ PV สูง: สิริมนต์ บุญบูรพงศ์", youtubeId: "V8HKlRwVixs" },
  { packId: "pack4", order: 6, title: "ธรรมชาติธุรกิจ: เชวง คุณชยางกูร", youtubeId: "vqhXgOgNYBE" },
  { packId: "pack4", order: 7, title: "Rally: เฟิร์ส อัทธวัฒน์ เพิ่มพูลศักดิ์ - สปอย ชนัญญา สุทธิรัตน์", youtubeId: "l8ZGzU2vWZg" },
  { packId: "pack4", order: 8, title: "การติดตามดาวน์ไลน์และจัดHM: เชวง คุณชยางกูร", youtubeId: "JxCX3P9Hc2g" },
  { packId: "pack4", order: 9, title: "การทำตลาด Detox - พี่เปิ้ล พี่เติ้ล ดร.โบ้ง", youtubeId: "lYcw9lCMjVA" },

  // Pack 5
  { packId: "pack5", order: 1, title: "Mr.Jose Crown Ambassador from Colombia", youtubeId: "wpvGH4BYi1A" },
  { packId: "pack5", order: 2, title: "Rally: นภาวรรณ ธัญญเจริญ", youtubeId: "fYHYpnUnfzw" },
  { packId: "pack5", order: 3, title: "Total Commitment: อรอนงค์ ศิริรังคมานนท์", youtubeId: "OooLLMKwAR0" },
  { packId: "pack5", order: 4, title: "คุณพีระ พันธุ์พิพัฒน์ - คุณชนัดดา ปรีชาหาญ Founders Executive Diamond", youtubeId: "VLuOzZEOl1M" },
  { packId: "pack5", order: 5, title: "Artistry - สิริมนต์ บุญบูรพงศ์ & ปริม เปรมถาวร & ชัญญา นาครภิรมย์ & บิน รุ่งวัฒนภักดิ์", youtubeId: "ro6h-W8ejb8" },
  { packId: "pack5", order: 6, title: "วัฒนธรรมองค์กร: เชวง คุณชยางกูร", youtubeId: "WgTqk-NgMhQ" },
  { packId: "pack5", order: 7, title: "Leader Training: สมารมย์ โกมลวนิช", youtubeId: "uoanX180XeY" },
  { packId: "pack5", order: 8, title: "ธรรมชาติคน: เชวง คุณชยางกูร", youtubeId: "x8_FHMdsJWY" },

  // Pack 6
  { packId: "pack6", order: 1, title: "Buzz Beyond ANA ไนท์ อัครบดินทร์ - ดร.พัชชา ศิวพรพิทักษ์ Emerald", youtubeId: "Kh8Tug8BTAQ" },
  { packId: "pack6", order: 2, title: "เทคนิคคุยสร้างใจ", youtubeId: "MUK5l43KjAA" },
  { packId: "pack6", order: 3, title: "Perfect health Good Morning Nutrition By พี่บี ปัญจพร - Emeralad", youtubeId: "NLFIk2Av8v0" },
  { packId: "pack6", order: 4, title: "Q&A with FCA100 GAR: เชวง คุณชยางกูร-กัญญ์นลิน ปิยนันทวารินทร์", youtubeId: "fNYselnE0IM" },
  { packId: "pack6", order: 5, title: "Rally: นพ.กิตติพงษ์ หมั่นเขตรกิจ - ฐิติมา ภิระบรรณ์", youtubeId: "TSsFUutHBKA" },
  { packId: "pack6", order: 6, title: "Buzz Inspire : พรชัย - อิงขนิษฐ ศิรินภาพันธ์ - Founders EDC", youtubeId: "B5B95NOkdwE" },
  { packId: "pack6", order: 7, title: "คุณสมบัติผู้นำ: เชวง คุณชยางกูร", youtubeId: "ELESwbCK4RY" },
  { packId: "pack6", order: 8, title: "How to Start: วิรุฬ โตศะสุข นักธุรกิจแอมเวย์ระดับเพชร", youtubeId: "9dDhL9wvgE8" },

  // Pack 7
  { packId: "pack7", order: 1, title: "Passion Rally: วิไล หงส์ลดารมภ์", youtubeId: "R7wYUepu4LA" },
  { packId: "pack7", order: 2, title: "Buzz Pride: คุณจมาพร แสงทอง - คุณธัญภ์ไชย วิพรสถิตย์", youtubeId: "hrTE4_5aT4U" },
  { packId: "pack7", order: 3, title: "การสร้างธุรกิจ ARTISTRY ด้วย Facial Spa - สายวรีย์ & พลัฏฐ์ พัชรการัณย์ EDC", youtubeId: "3pDth1_lJQo" },
  { packId: "pack7", order: 4, title: "โค้งสุดท้าย Diamond: เชวง คุณชยางกูร", youtubeId: "mOBPEeaql0M" },
  { packId: "pack7", order: 5, title: "Rally: ดร.รัฐนนท์ - ดร.รินรดา สันติวิชช์", youtubeId: "mrV6HtsWrWM" },
  { packId: "pack7", order: 6, title: "Rally Family Story: Dr. Peter & Eva Mueller", youtubeId: "o4dj_lsJ40c" },
  { packId: "pack7", order: 7, title: "BUZZ BEYOND ANZ NOV 2023 _ คุณวีระนันท์ ศรีกิตติพงศ์ - คุณจักรพันธุ์ กังวานโสภณ - Diamond", youtubeId: "bC4fLaKsqrc" },
  { packId: "pack7", order: 8, title: "BUZZ BRIDGE - จรรยาบรรณน่ารู้ - ณัฐวุฒิ อนันต์เกษมสันต์ & สราวุธ ดีศิลปกิจ", youtubeId: "E-ck5ewYJTM" },

  // Pack 8
  { packId: "pack8", order: 1, title: "Live in Malaysia (Sub Thai): Kaoru Nakajima", youtubeId: "bMYj48nuqC8" },
  { packId: "pack8", order: 2, title: "การทำงานสายลึก Part1: เชวง คุณชยางกูร", youtubeId: "rirVv7lpNMs" },
  { packId: "pack8", order: 3, title: "การทำงานสายลึก Part2: เชวง คุณชยางกูร", youtubeId: "0ioPOiJXbtc" },
  { packId: "pack8", order: 4, title: "Nutrilite Wellness Living Part 2: (CoQ10,Les-terol,Gingo Plus) ปัญจพร พุทธเทศน์", youtubeId: "QcnB87YMz7c" },
  { packId: "pack8", order: 5, title: "Moving Up: ปัญจพล จุรีเกษ", youtubeId: "rxkjewpxIW4" },
  { packId: "pack8", order: 6, title: "การทำตลาดกรองอากาศ: ธนัท พานิชอิงอร - พนิดา ตันประดิษฐ์", youtubeId: "xUmcTDOKVvk" },
  { packId: "pack8", order: 7, title: "ทำตลาด SOP 100 ชุด: ธเนศ โชคชัยพลกุล & บังอร ชุ่มชวย", youtubeId: "cmXHepH1I58" },
  { packId: "pack8", order: 8, title: "การตัดสินใจสร้างธุรกิจลดน้ำหนักให้ประสบความสำเร็จ by กิระศิษฎ์ ภัทรฐิตินันท์ - วนันธร กิจพิศุทธิ์", youtubeId: "e3oLiFSDdpo" },

  // Pack 9
  { packId: "pack9", order: 1, title: "National Convention: สุพัฒน์ ภัทรวรกุลวงศ์", youtubeId: "tnvhlyJummc" },
  { packId: "pack9", order: 2, title: "Home Care Personal Care: ณรงค์กรณ์ จันทร์ศิริ & สราวุธ ดีศิลปกิจ", youtubeId: "rZyHE4_IPSU" },
  { packId: "pack9", order: 3, title: "Crown Ambassador: ศิริพรรณ บุญอริยะ", youtubeId: "5QsrvwLhH5k" },
  { packId: "pack9", order: 4, title: "National Convention: Holly Chen - Barry Chi", youtubeId: "_4SGGL-CqUg" },
  { packId: "pack9", order: 5, title: "From Ground to Crown: กัญญ์นลิน ปิยนันทวารินทร์", youtubeId: "DAWQjayw1nk" },
  { packId: "pack9", order: 6, title: "วิเคราะห์องค์กร และตั้งเป้าหมาย: เชวง คุณชยางกูร", youtubeId: "UJTtW_8lp3k" },
  { packId: "pack9", order: 7, title: "Leader Training: ชลธีร์ แก้วมณีสกุล", youtubeId: "RFW1XH2BFs4" },
  { packId: "pack9", order: 8, title: "Buzz Beyond - นพ.พิชญ์ เพชรมาลา EDC", youtubeId: "kl2t5IG1kTA" },

  // Pack 10
  { packId: "pack10", order: 1, title: "Buzz Beyond ANA คุณตวงทรัพย์ สาทรานุวัฒน์ - คุณศรมลล์ สายแก้ว", youtubeId: "MpthPfbqeeM" },
  { packId: "pack10", order: 2, title: "หลุมพรางของความสำเร็จ: เชวง คุณชยางกูร", youtubeId: "hY4xA_SctmI" },
  { packId: "pack10", order: 3, title: "Business Professional : แขนภา - อมรเทพ แสวงดี", youtubeId: "WOjoOCslFzQ" },
  { packId: "pack10", order: 4, title: "Diamond Rally: สิริกร วาจาวุทธ", youtubeId: "ncEjeYp_SOA" },
  { packId: "pack10", order: 5, title: "เทคนิคการสปอนเซอร์: วรกร ระวิพงษ์", youtubeId: "sof2Iajjjr0" },
  { packId: "pack10", order: 6, title: "Nutrilite Sell Talk: สาโรช สุนทรพิทักษ์กุล & บังอร ชุ่มชวย", youtubeId: "Q2KNSTbPUfM" },
  { packId: "pack10", order: 7, title: "Rally: พญ. รัชดา ขวัญใจพานิช", youtubeId: "fjQMjOZ9k6g" },
  { packId: "pack10", order: 8, title: "XS Energy Drink and Sports Nutrition: ณรุส มหัคฆพงศ์", youtubeId: "bY-ExmHmaDc" },

  // Pack 11
  { packId: "pack11", order: 1, title: "ผู้นำ 5 phase: เชวง คุญชยางกูร", youtubeId: "eSCxp9_vnEY" },
  { packId: "pack11", order: 2, title: "iCook: เชฟ อเล็กซ์", youtubeId: "ij8-vzTlI0Q" },
  { packId: "pack11", order: 3, title: "ผู้นำกับการตัดสินใจ: นพ. สุรินทร์ โตสุโขวงศ์", youtubeId: "UkGorcFm4lo" },
  { packId: "pack11", order: 4, title: "Leader Talk Buzz Beyond BKK: ภาคภูมิ นิติธรรม - คริสมาส เสถียรวราภรณ์", youtubeId: "_Jpz0orp0eE" },
  { packId: "pack11", order: 5, title: "BUZZ GLOBAL 2024 : Clement and Anita Fu - Founders Crown Ambassador GAR _ Rally", youtubeId: "OssQWSaA6sw" },
  { packId: "pack11", order: 6, title: "Buzz Guide: เชวง คุณชยางกูร", youtubeId: "7V5gOJ96PBQ" },
  { packId: "pack11", order: 7, title: "Rally - สาวิตรี พรมใส", youtubeId: "cfyQAV6E0bM" },

  // Pack 12
  { packId: "pack12", order: 1, title: "Amway Fundamentals and Values - กัญญ์นลิน ปิยนันทวารินทร์", youtubeId: "JiGDZtO1xuI" },
  { packId: "pack12", order: 2, title: "First Circle : Rich DeVos", youtubeId: "2zGuKLCAWys" },
  { packId: "pack12", order: 3, title: "การทำงานพื้นฐาน: เชวง คุญชยางกูร", youtubeId: "9GqQVY69e5M" },
  { packId: "pack12", order: 4, title: "Rally นักธุรกิจแอมเวย์ระดับเพชรบริหารใหม่: ภญ.ทิพวรรณ - รศ.นพ.เจริญเกียรติ ฤกษ์เกลี้ยง", youtubeId: "CuccD8PZbH0" },
  { packId: "pack12", order: 5, title: "การตัดสินใจสำเร็จ: เพชรบริหาร ภารดี ปิยนันทวารินทร์", youtubeId: "wVo6FFJfTRI" },
  { packId: "pack12", order: 6, title: "National Convention: Mark Lei", youtubeId: "8A-3KDqO1-g" },
  { packId: "pack12", order: 7, title: "โอกาสทางธุรกิจสินค้าเกษตร: อ สุเทพ คู่สกุลนิรันดร์", youtubeId: "1fi865gAnj4" },
  { packId: "pack12", order: 8, title: "Rally EDC: ประไพพิศ วรรณวีรติกุล-นพวัตติ์ โสภาเศษฐนันท์", youtubeId: "jEHJ4uNGREY" },

  // Pack 13
  { packId: "pack13", order: 1, title: "Business Trend: จักรพันธ์ เธียราวัฒน์", youtubeId: "4RX-P8lnr2o" },
  { packId: "pack13", order: 2, title: "Buzzolute in Japan: Takumi Yamazaki", youtubeId: "fXNKJU-ZHXU" },
  { packId: "pack13", order: 3, title: "ผู้นำกับการตัดสินใจ: เกียรติ์พงษ์ ขุนหลัด", youtubeId: "M_MfwFtBBsE" },
  { packId: "pack13", order: 4, title: "Go Diamond: การ ปิยะธนิน", youtubeId: "v-fGxx34faA" },
  { packId: "pack13", order: 5, title: "eSpring 60 เครื่องใน 1 เดือน: อัฒฑ์ โล่ห์ตระกูลวัฒน์", youtubeId: "sv57Gfyt_xQ" },
  { packId: "pack13", order: 6, title: "Rich DeVos: งาน A50", youtubeId: "TA_uZgfHXnY" },
  { packId: "pack13", order: 7, title: "สิ่งสำคัญต่อความสำเร็จ: เชวง คุณชยางกูร", youtubeId: "7cQ7HxhEpPI" },
  { packId: "pack13", order: 8, title: "Passion Rally: นพ. เจนวิทย์ คลังสุวรรณ", youtubeId: "Rj_YC0O3TUE" },

  // Pack 14
  { packId: "pack14", order: 1, title: "See Spray Legend: Dr. Peter & Eva Mueller", youtubeId: "5VlKq4H4gEk" },
  { packId: "pack14", order: 2, title: "การสร้าง BT12%  เชวง คุณชยางกูร", youtubeId: "aOuBRxs7NRM" },
  { packId: "pack14", order: 3, title: "Productivity vs Activity:  Dr. Peter & Eva Mueller", youtubeId: "8tufvqFqXQk" },
  { packId: "pack14", order: 4, title: "การตัดสินใจสำเร็จ: EDC ณัฏฐารีย์ - คุณณัฐดนัย แป้นวิเศษ", youtubeId: "4YTlT8w_wtk" },
  { packId: "pack14", order: 5, title: "BUZZ PRIDE คุณกฤษดา - คุณอังคณา กรประดิษฐ์ศิลป์", youtubeId: "ciAgSWrUU1k" },
  { packId: "pack14", order: 6, title: "การทำสายลึก: เชวง คุณชยางกูร", youtubeId: "wnwsfLnGUE8" },
  { packId: "pack14", order: 7, title: "การเคลียร์ความคิด: เชวง คุณชยางกูร", youtubeId: "1GpoLPfG0dg" },

  // Pack 15
  { packId: "pack15", order: 1, title: "Future Leader Club : คุณวรกร ระวิพงษ์ - Double Diamond", youtubeId: "MaNF3eB_mno" },
  { packId: "pack15", order: 2, title: "ตำนานความสำเร็จ: นพ.วัชรา ทรัพย์สุวรรณ", youtubeId: "8WFtbHVUxuI" },
  { packId: "pack15", order: 3, title: "Go Silver: เชวง คุณชยางกูร", youtubeId: "tp439l0IRUI" },
  { packId: "pack15", order: 4, title: "Be 21%  นภาวรรณ ธัญญเจริญ", youtubeId: "EPIsGSSMky4" },
  { packId: "pack15", order: 5, title: "Buzz Pride ดนยมน ธนาทรัพย์", youtubeId: "aqSMb90rHtw" },
  { packId: "pack15", order: 6, title: "8 ขั้นตอนสู่ความสำเร็จ: Foo Howe Kean", youtubeId: "JLPgs1_9gWg" },
  { packId: "pack15", order: 7, title: "Buzz Pride พัชริดา โชตวีรวัฒน์", youtubeId: "NORJAEOnnXQ" },
  { packId: "pack15", order: 8, title: "Buzz Global Leader FCA 40FAA: Richmond Ryu", youtubeId: "v0kav_U0LQg" },
];

async function seed() {
  await db.delete(packVideos);
  await db.delete(learningPacks);
  await db.insert(learningPacks).values(packs);
  await db.insert(packVideos).values(videos);
}

seed()
  .then(() => {
    console.log("Seeding completed");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });


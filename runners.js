/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import playwright from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";
import { stringify } from 'csv-stringify/sync';

const text =
  "LAST NAME FIRST NAME GENDER AGE AS OF 12/31/2023 COUNTRY ADKINS PHILLIP MALE 32 US ALIMONOS COSTA MALE 35 US ALLEN RICHARD MALE 45 CA ALLEN HILLARY FEMALE 35 US ALLI AHMAD MALE 44 CA ALTON CONNOR MALE 23 US ALVAREZ VALLEJO VICTOR EDUARDO MALE 32 MX AMITAL CHUCK MALE 65 US ANDRADA AUGUSTUS MALE 36 US AREPALLI RAJANI MALE 53 US ASSEER RUDI MALE 45 CA AUDETTE GUILLAUME MALE 41 CA BAHAMUNDI JASON MALE 50 US BAINES PAUL MALE 40 US BALKANSKI ERIC MALE 31 US BALLOU DOUG MALE 52 US BALTAZAR EDUARDO MALE 31 MX BANERJEE ARNAB MALE 50 US BASSETT ALISON FEMALE 47 US BEARDEN SHAWN MALE 51 US BEAVERS MORGAN FEMALE 29 US BEEBE ANTHONY MALE 35 US BEESLEY TREVOR MALE 37 US BEHUNIN JOHN MALE 47 US BEIER RICARDO MALE 51 MX BELISLE ALEX MALE 36 US BENCI MICHAEL FEMALE 36 CH BENNA JENNIFER FEMALE 44 US BENNETT EVAN MALE 24 US 100M 2023 PARTICIPANT LIST Last updated February 6, 2023 BERALDO MARCELO MALE 47 US BIGGS ASHLEIGH FEMALE 28 US BISHOP JAMES MALE 42 US BITTERMAN TODD MALE 51 US BJORNLIE SHANE MALE 54 US BLANCHETTE ROBERT MALE 34 US BONE KEVIN MALE 35 CA BRAMER JULIA FEMALE 59 US BRAND NAOMI FEMALE 34 NZ BRASHEAR BOB MALE 64 US BRENNAN PAUL MALE 38 GB BROOKS HEATHER FEMALE 35 US BUSH LORENA FEMALE 45 US BUTLER JOEL MALE 46 US CASH KYLE MALE 33 US CATANGLAN LEXIE FEMALE 43 US CHAN CHUN HONG MALE 33 HK CHEN WEIGUO MALE 52 US CHIASSON HAILEY FEMALE 34 US CHRISTENSEN STEVEN MALE 44 US CHRISTOPHERSON DAVID MALE 44 US CLÉMENT MATHIEU MALE 28 CH CONNOLLY NICHOLAS MALE 40 US COOPER SAMUEL MALE 38 US CORYELL LAIN MALE 60 US COURTRIGHT JOSHUA MALE 34 US CRELLIN ALEXIS FEMALE 38 US CROCKETT BUCK MALE 36 US CRONMILLER DEREK MALE 35 CA CUMMINGS RAYMOND MALE 36 US CURLEY MATT MALE 57 US 100M 2023 PARTICIPANT LIST Last updated February 6, 2023 DAINTON MARK MALE 34 CA DAVIS WYATT MALE 32 US DE BORD ELISIA FEMALE 45 US DELAPAZ RICHARD MALE 47 US DEMAR RYAN MALE 45 US DEMPSEY RYAN MALE 41 US DESHPANDE SHASHANK MALE 59 US DEVINE ADAM MALE 41 US DIAZ OMAR MALE 40 US DINAMPO IBAR MALE 43 US DOMARADZKA SYLWIA FEMALE 48 US DOYLE ALEXIS FEMALE 28 US DSCHAAK TYLER MALE 39 US DUNCAN-FRIEND EMILY FEMALE 34 US ECKARDT SCOTT MALE 49 US EHLAND SEAN MALE 38 US ELKES JOSH MALE 32 US FAILUTTI QUENTIN MALE 30 FR FEICKERT ZACH MALE 34 US FERNANDEZ JARA ALONSO JOSE MALE 43 CR FIEDLER AMY FEMALE 41 US FOLLMAR AMANDA FEMALE 41 US FOUQUET MAXIME MALE 46 CA FRIGON SAMUEL MALE 28 CA FUENTES RIVERA HECTOR MALE 44 SV GAIDE MATT MALE 36 US GALLE MATTHEW MALE 26 US GAMSJAEGER TOM MALE 61 US GANDHI KARTHIKEYAN MALE 44 US GANDON NICOLAS MALE 35 US GAO FEI FEMALE 34 CN 100M 2023 PARTICIPANT LIST Last updated February 6, 2023 GIOMI ROBERT MALE 40 US GIROUD MATHILDE FEMALE 33 FR GLAZE ANDREW MALE 45 US GOMEZ MAURICIO MALE 50 CL GRANAT THOMAS MALE 26 US GRASSO JOSEPH MALE 35 US GRINIUS GEDIMINAS MALE 44 LT GUARISCHI ROSALIA FEMALE 44 BR GUERRERO VAZQUEZ LEONEL MALE 42 MX GUTHRIE TOM MALE 43 CA HALL ASHLEY FEMALE 41 US HAMILTON NICHOLAS MALE 40 US HAMILTON MICHELLE FEMALE 43 US HAMMOND MARK MALE 38 US HARCUM JASON MALE 40 US HARDEBECK KRISTA FEMALE 29 US HARDING HUNTER MALE 40 US HARRINGTON CHRISTOPHER MALE 39 US HARTMAN PHILIP MALE 27 US HASTON KELLY FEMALE 53 US HAUGH BRADY MALE 32 US HAUSTEIN CHRIS MALE 45 US HEZLEP STUART MALE 30 US HIRATE SHINGO MALE 43 US HOLTSCHNEIDER JOHN MALE 48 US HOMSEY STEPHEN MALE 39 US HUCHINGSON JAMES MALE 54 US HUDSON JOHN MALE 44 US HUGHES ANNIE FEMALE 25 US IMASA MARK MALE 45 US IMHOFF KYLE MALE 33 US 100M 2023 PARTICIPANT LIST Last updated February 6, 2023 ISENBERG REBEKAH FEMALE 43 US IWAMA HIROYUKI MALE 49 JP JOHNSON ANNE FEMALE 62 US JOHNSON PAUL MALE 27 US JOYES GABE MALE 38 US KAPIL AMIT MICHAEL MALE 45 US KELLER KROSBY MALE 40 US KELLY ERIN FEMALE 44 US KISO TETSUO MALE 55 JP KISSLO ANDREW MALE 53 US KLATT DENISE FEMALE 32 US KLINK TONY MALE 48 US KOCHAVI SHIRAN MALE 54 US KOHR AARON MALE 59 US KOHSAKA YASUSHI MALE 45 JP KOPPY MICHAEL MALE 73 US KOWALCZYK RON MALE 52 US LANEY DAVID MALE 35 US LARICK STEVEN MALE 30 US LAUGHLIN DIANE FEMALE 59 US LEE BEN MALE 54 LEEDS VERONICA FEMALE 35 US LEESE BEN MALE 43 US LINGENFELTER DAN MALE 35 US LIU ZITAO MALE 52 US LODER DANIEL MALE 48 US LOGAN TODD MALE 41 US LOWTHER JAZMINE FEMALE 31 CA LUKES PETER MALE 53 US LUO CANHUA MALE 31 CN MAEJIMA SHINICHI MALE 50 JP 100M 2023 PARTICIPANT LIST Last updated February 6, 2023 MAGARIÑOS GONZALO MALE 42 AR MAIZE RYAN MALE 29 US MANGUM BRENT MALE 35 US MARINAS JAMES MALE 52 US MARION STACEY FEMALE 34 US MARROQUIN DIEGO MALE 35 US MARTIN TIMOTHY MALE 45 US MARTINEZ BRETT MALE 39 US MARTINS LARA FEMALE 46 BR MATHEWS BRANDON MALE 47 US MATSUURA ANDY MALE 29 US MAYORGA AURA FEMALE 53 US MCCUE MARK MALE 46 US MCGHEE CASEN MALE 26 US MCHENRY HAGAN MALE 25 US MCKUNE JOHN MALE 48 US MCNAMARA CHRIS MALE 33 CA MESKELL BRIAN MALE 43 IE MICHAUD JEAN-FRANCOIS MALE 40 CA MOHAMMED ERSINAN MALE 41 US MONTGOMERY ROBERT MALE 42 US MOORE ANDREW MALE 46 US MORALES GERARD MALE 48 ES MORGAN JEFF MALE 55 US MORRIS PAUL MALE 55 US MORTON-LANGEHAUG JESSI FEMALE 45 US MOSLEY SHARON FEMALE 61 US MUELLER DREW MALE 39 US MUKKAMALA HIMAGIRI MALE 50 US MUNDT KARL MALE 47 US MURREL JACK MALE 29 US 100M 2023 PARTICIPANT LIST Last updated February 6, 2023 MUSIYENKO VITALIY MALE 37 US NATRAJ NATTU MALE 60 US NGUYEN BRUCE MALE 48 US NIELSEN KEN MALE 47 US OJEDA RYAN MALE 26 US OLSON ZACK MALE 36 US O'MALLEY BRIAN MALE 31 US O'MALLEY MARK MALE 31 US ONGENA ANN FEMALE 59 US OOSTRA MARIA FEMALE 50 US ORR BRAD MALE 37 US ORTEGA JIMMY MALE 32 US ORTIZ PALOMA FEMALE 31 US OSORIO OSCAR MALE 47 US OWENSBY AMANDA FEMALE 28 US PACHECO ROJAS FEDERICO MALE 44 CR PAISLEY BRYAN MALE 57 US PARK STEPHEN MALE 51 CA PATAPOFF JACOB MALE 31 US PEARCE LANCE MALE 42 US PERSAUD HARRY MALE 31 US PETERS ETHAN MALE 25 CA PLEITEZ VERO FEMALE 43 US POEHNELT JUSTIN MALE 41 US POHL JASON MALE 33 US POP ADRIAN MALE 44 US POPE KARSON MALE 30 US PRICE ZAC MALE 27 US PYTKA BRENDAN MALE 42 US QUINN MARTIN MALE 44 US RAILSBACK CHRISTIAN MALE 42 US 100M 2023 PARTICIPANT LIST Last updated February 6, 2023 RAMIREZ EDHER MALE 38 US REED PAM FEMALE 62 US REGEHR BENTLEY MALE 32 US REVENIS BRADLEY MALE 37 US RICKELS MICHAEL MALE 47 US ROBERTS PAUL MALE 47 US ROMEO MARISA FEMALE 29 US RUSSELL KRISTYNE FEMALE 33 US RUSSELL ALEX MALE 45 US RYDER JONATHAN MALE 29 US SALDANA JR IGNACIO MALE 34 US SANCHEZ DELOPE MATEO MALE 19 US SANDSTROM ERIK MALE 35 US SARGENT ROB MALE 59 US SAVIOLA ANTHONY MALE 43 US SAYAG ALBAN MALE 42 FR SCHARENBROCH DOE FEMALE 39 US SCHENONE KYLE MALE 33 US SCHERGER ELMER MALE 44 US SCHNEEKLOTH MARTIN MALE 52 US SCHRYBURT PATRICK MALE 54 CA SCOTT JOHN MALE 50 US SELF CLAY MALE 48 US SENGO MARTIN MALE 43 US SERY YOHAN MALE 32 US SHAND CHAZ MALE 33 US SHENG HUANYUAN MALE 48 US SHIELDS CODY MALE 34 US SKOROKHOD OLEKSANDR MALE 39 US SMITH MIKE MALE 66 US SMITH SHAWN MALE 35 US 100M 2023 PARTICIPANT LIST Last updated February 6, 2023 SMITH SEAN MALE 28 US SORENSON ERIK MALE 37 US SORIANO FRANCO MALE 52 US SPIKE TAYLOR MALE 45 US STINES CHRISTOPHER MALE 40 US SUBERTAS HAROLDAS MALE 32 US SUN LU MALE 49 US SUZUKI HIDEYUKI MALE 55 US SWITZER PRESTON MALE 35 US SYSE BJORN MALE 34 US TAJAN JOEY MALE 39 US TANG JIANSHAN MALE 54 US TELLO CHRISTOPHER MALE 27 US TERTYCHNYI GENNADII MALE 44 US TESCH BENJAMIN MALE 41 THAI HAA CHENG FEMALE 44 US THOMAS JACOBS RENEE FEMALE 56 US THORPE GAVIN MALE 41 TH THRONE JONATHAN MALE 36 US TIERNEY PAUL MALE 44 IE TISDELL ANNE FEMALE 35 US TISDELL TYLER MALE 37 TOPCU MERT MALE 50 US TRACH ROMAN MALE 37 US TURLEY RICHARD MALE 46 US TURNER IAIN MALE 34 US VAJENTE GABRIELE MALE 43 US VAN CASTEREN ELISABETH FEMALE 29 US VAN DUSEN RANDY MALE 48 US VANDERHOVEL JASON MALE 35 US VIANO JOHN CONRAD MALE 33 US 100M 2023 PARTICIPANT LIST Last updated February 6, 2023 VICKROY KHRIS MALE 48 US VILASECA MANUELA FEMALE 44 ES VO THANH DAT MALE 30 US VYRVICH ANDREY MALE 39 US WAN LING FEMALE 48 US WANG LEE MALE 29 US WATROUS BRITTANY FEMALE 45 US WEIDMAN WILLIAM MALE 40 US WEIR IAN MALE 32 CA WINTERS CAMERON MALE 48 US WINTERS AMY FEMALE 51 US WITKO RYAN MALE 40 US WNUK JAY MALE 55 WU SIQI MALE 32 US XIAO YUNGUO MALE 44 US XU YEJUN MALE 59 US YAMASHITA MAKIKO FEMALE 49 US YANO JUNKO FEMALE 49 JP YOUNG JEFFREY MALE 59 US YOUNG PHIL MALE 37 US YUNGMANN JENNA FEMALE 22 US ZEILE KARL MALE 57 US ZHAO MING MALE 45 CA ZHAO MENG MALE 48 US ZHENG XIAOHUI MALE 52 CA ZHU JIN MALE 58 CN";

const pattern = /([A-Z]+) ([A-Z]+) (MALE|FEMALE) ([0-9]+) ([A-Z]{2})/g;

const runners = text.match(pattern).map((match) => {
  const [last, first, gender, age] = match.trim().split(" ");
  return { last, first, gender, age };
});

const browser = await playwright.chromium.launch({
  headless: true,
});

const page = await browser.newPage();

async function ultrasignup(runner) {
  const url = `https://ultrasignup.com/results_participant.aspx?fname=${runner.first}&lname=${runner.last}`;

  const localUrl = fileURLToPath(
    new URL(`./.cache/${runner.last}-${runner.first}.html`, import.meta.url)
  );

  // if file exists, read from file
  if (fs.existsSync(localUrl)) {
    await page.goto(`file://${localUrl}`);
  } else {
    await page.goto(url);
    await page.waitForTimeout(1000);
    const html = await page.content();

    // write to file
    fs.mkdirSync(path.dirname(localUrl), { recursive: true });
    fs.writeFileSync(localUrl, html);
  }

  const dataBind = cssEscape("    text: (Rank * 100).toFixed(2)");

  const ranks = await page.locator(`[data-bind=${dataBind}]`).all();

  if (ranks) {
    runner.ranks = await Promise.all(
      ranks.map(async (r) => await r.textContent())
    );
  } else {
    runner.ranks = [];
  }

  runner.ultrasignup = url;
}

for (const runner of runners) {
  await ultrasignup(runner);
}

await browser.close();

const data = runners.map((runner) => {
  return [
    runner.first,
    runner.last,
    runner.gender,
    runner.age,
    runner.ranks.join("|"),
    runner.ultrasignup,
  ];
});

fs.writeFileSync("data.csv", stringify(data));


function cssEscape(value) {
  if (arguments.length == 0) {
    throw new TypeError("`CSS.escape` requires an argument.");
  }
  var string = String(value);
  var length = string.length;
  var index = -1;
  var codeUnit;
  var result = "";
  var firstCodeUnit = string.charCodeAt(0);

  if (
    // If the character is the first character and is a `-` (U+002D), and
    // there is no second character, […]
    length == 1 &&
    firstCodeUnit == 0x002d
  ) {
    return "\\" + string;
  }

  while (++index < length) {
    codeUnit = string.charCodeAt(index);
    // Note: there’s no need to special-case astral symbols, surrogate
    // pairs, or lone surrogates.

    // If the character is NULL (U+0000), then the REPLACEMENT CHARACTER
    // (U+FFFD).
    if (codeUnit == 0x0000) {
      result += "\uFFFD";
      continue;
    }

    if (
      // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
      // U+007F, […]
      (codeUnit >= 0x0001 && codeUnit <= 0x001f) ||
      codeUnit == 0x007f ||
      // If the character is the first character and is in the range [0-9]
      // (U+0030 to U+0039), […]
      (index == 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
      // If the character is the second character and is in the range [0-9]
      // (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
      (index == 1 &&
        codeUnit >= 0x0030 &&
        codeUnit <= 0x0039 &&
        firstCodeUnit == 0x002d)
    ) {
      // https://drafts.csswg.org/cssom/#escape-a-character-as-code-point
      result += "\\" + codeUnit.toString(16) + " ";
      continue;
    }

    // If the character is not handled by one of the above rules and is
    // greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
    // is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
    // U+005A), or [a-z] (U+0061 to U+007A), […]
    if (
      codeUnit >= 0x0080 ||
      codeUnit == 0x002d ||
      codeUnit == 0x005f ||
      (codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
      (codeUnit >= 0x0041 && codeUnit <= 0x005a) ||
      (codeUnit >= 0x0061 && codeUnit <= 0x007a)
    ) {
      // the character itself
      result += string.charAt(index);
      continue;
    }

    // Otherwise, the escaped character.
    // https://drafts.csswg.org/cssom/#escape-a-character
    result += "\\" + string.charAt(index);
  }
  return result;
}
